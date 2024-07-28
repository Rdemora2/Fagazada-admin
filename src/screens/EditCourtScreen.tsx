import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {fetchCourtDetails, updateCourt} from '../services/apiMock';
import {
  Court,
  EditCourtScreenNavigationProp,
  RootStackParamList,
} from '../types/types';
import {RouteProp} from '@react-navigation/native';

type EditCourtScreenRouteProp = RouteProp<RootStackParamList, 'EditCourt'>;

type Props = {
  route: EditCourtScreenRouteProp;
  navigation: EditCourtScreenNavigationProp;
};

const {width} = Dimensions.get('window');

const EditCourtScreen: React.FC<Props> = ({route, navigation}) => {
  const {courtId} = route.params;
  const windowWidth = Dimensions.get('window').width;
  const carouselItemWidth = windowWidth * 0.93;
  const [court, setCourtDetails] = useState<Court>({
    id: 0,
    name: '',
    type: '',
    description: '',
    photos: [],
    hourlyRate: 0,
    address: '',
    workingHours: '',
    workingDays: '',
    optionalServices: [],
    monthlyRate: 0,
  });
  const [openingHour, setOpeningHour] = useState('08:00');
  const [closingHour, setClosingHour] = useState('22:00');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  useEffect(() => {
    const getCourtDetails = async () => {
      try {
        const courtData = await fetchCourtDetails(courtId);
        const hourlyRate =
          typeof courtData.hourlyRate === 'string'
            ? parseFloat(courtData.hourlyRate)
            : courtData.hourlyRate;
        const monthlyRate =
          typeof courtData.monthlyRate === 'string'
            ? parseFloat(courtData.monthlyRate)
            : courtData.monthlyRate;

        setCourtDetails({
          id: courtData.id,
          name: courtData.name,
          type: courtData.type,
          description: courtData.description,
          photos: courtData.photos,
          hourlyRate: hourlyRate,
          address: courtData.address,
          workingHours: courtData.workingHours,
          workingDays: courtData.workingDays,
          optionalServices: courtData.optionalServices,
          monthlyRate: monthlyRate,
        });

        const [opening, closing] = courtData.workingHours.split('-');
        setOpeningHour(opening);
        setClosingHour(closing);
      } catch (error) {
        console.error('Erro ao buscar detalhes da quadra:', error);
      }
    };

    getCourtDetails();
  }, [courtId]);

  const handleUpdateCourt = async () => {
    const newErrors: {[key: string]: string} = {};

    if (!court.name) newErrors.name = 'Nome é obrigatório';
    if (!court.type) newErrors.type = 'Tipo é obrigatório';
    if (!court.description) newErrors.description = 'Descrição é obrigatória';
    if (!court.hourlyRate) newErrors.hourlyRate = 'Taxa horária é obrigatória';
    if (!court.address) newErrors.address = 'Endereço é obrigatório';
    if (!openingHour || !closingHour)
      newErrors.workingHours = 'Horário de funcionamento é obrigatório';
    if (!court.workingDays)
      newErrors.workingDays = 'Dias de funcionamento são obrigatórios';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await updateCourt(courtId, {
        ...court,
        workingHours: `${openingHour}-${closingHour}`,
      });
      navigation.navigate('CourtDetail', {courtId});
    } catch (error) {
      console.error('Erro ao atualizar quadra:', error);
      Alert.alert(
        'Erro',
        'Erro ao atualizar quadra. Por favor, tente novamente.',
      );
    }
  };

  const generateTimeOptions = () => {
    const times = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 30) {
        const hour = h < 10 ? `0${h}` : h;
        const minute = m === 0 ? '00' : m;
        times.push(`${hour}:${minute}`);
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={court.photos}
        renderItem={({item}) => (
          <View style={[styles.carouselItem, {width: carouselItemWidth}]}>
            <Image source={{uri: item}} style={styles.carouselImage} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}
        contentContainerStyle={{alignItems: 'center'}}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={court.name}
          onChangeText={text => setCourtDetails({...court, name: text})}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <Text style={styles.label}>Tipo</Text>
        <TextInput
          style={styles.input}
          value={court.type}
          onChangeText={text => setCourtDetails({...court, type: text})}
        />
        {errors.type && <Text style={styles.errorText}>{errors.type}</Text>}

        <Text style={styles.label}>Endereço</Text>
        <TextInput
          style={styles.input}
          value={court.address}
          onChangeText={text => setCourtDetails({...court, address: text})}
        />
        {errors.address && (
          <Text style={styles.errorText}>{errors.address}</Text>
        )}

        <Text style={styles.label}>Dias de funcionamento</Text>
        <TextInput
          style={styles.input}
          value={court.workingDays}
          onChangeText={text => setCourtDetails({...court, workingDays: text})}
        />
        {errors.workingDays && (
          <Text style={styles.errorText}>{errors.workingDays}</Text>
        )}

        <Text style={styles.label}>Horário de funcionamento</Text>
        <View style={styles.timeInputContainer}>
          <View style={styles.pickerContainer2}>
            <Picker
              selectedValue={openingHour}
              style={styles.picker2}
              onValueChange={itemValue => {
                setOpeningHour(itemValue);
                if (itemValue >= closingHour) {
                  setClosingHour(
                    timeOptions[
                      Math.min(
                        timeOptions.indexOf(itemValue) + 1,
                        timeOptions.length - 1,
                      )
                    ],
                  );
                }
              }}>
              {timeOptions.map(time => (
                <Picker.Item key={time} label={time} value={time} />
              ))}
            </Picker>
          </View>
          <View style={styles.pickerContainer2}>
            <Picker
              selectedValue={closingHour}
              style={styles.picker2}
              onValueChange={itemValue => setClosingHour(itemValue)}>
              {timeOptions
                .filter(time => time > openingHour)
                .map(time => (
                  <Picker.Item key={time} label={time} value={time} />
                ))}
            </Picker>
          </View>
        </View>
        {errors.workingHours && (
          <Text style={styles.errorText}>{errors.workingHours}</Text>
        )}

        <Text style={styles.label}>Valor por hora: (R$)</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a taxa horária"
          keyboardType="numeric"
          value={court.hourlyRate.toString()}
          onChangeText={text =>
            setCourtDetails({...court, hourlyRate: parseFloat(text) || 0})
          }
        />
        {errors.hourlyRate && (
          <Text style={styles.errorText}>{errors.hourlyRate}</Text>
        )}

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          value={court.description}
          onChangeText={text => setCourtDetails({...court, description: text})}
        />
        {errors.description && (
          <Text style={styles.errorText}>{errors.description}</Text>
        )}
      </View>
      <TouchableOpacity style={styles.editButton} onPress={handleUpdateCourt}>
        <Text style={styles.editButtonText}>Atualizar Quadra</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    padding: 8,
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 0,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E66901',
    color: 'black',
  },
  carousel: {
    marginVertical: 16,
  },
  carouselItem: {
    height: 200,
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  editButton: {
    backgroundColor: '#00786A',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pickerContainer2: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingBottom: 12,
    width: '48%',
  },
  picker2: {
    height: 40,
    width: '100%',
  },
  timeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
  },
});

export default EditCourtScreen;
