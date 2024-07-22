import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
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
    availability: [],
    hourlyRate: 0,
    address: '',
    workingHours: '',
    workingDays: '',
    optionalServices: [],
    monthlyRate: 0,
  });

  useEffect(() => {
    const getCourtDetails = async () => {
      try {
        const courtData = await fetchCourtDetails(courtId);
        const hourlyRate =
          typeof courtData.hourlyRate === 'string'
            ? parseFloat(courtData.hourlyRate)
            : 0;
        const monthlyRate =
          typeof courtData.monthlyRate === 'string'
            ? parseFloat(courtData.monthlyRate)
            : 0;

        setCourtDetails({
          id: courtData.id,
          name: courtData.name,
          type: courtData.type,
          description: courtData.description,
          photos: courtData.photos,
          availability: courtData.availability,
          hourlyRate: hourlyRate,
          address: courtData.address,
          workingHours: courtData.workingHours,
          workingDays: courtData.workingDays,
          optionalServices: courtData.optionalServices,
          monthlyRate: monthlyRate,
        });
      } catch (error) {
        console.error('Erro ao buscar detalhes da quadra:', error);
      }
    };

    getCourtDetails();
  }, [courtId]);

  const handleUpdateCourt = async () => {
    try {
      await updateCourt(courtId, {
        name: court.name,
        type: court.type,
        description: court.description,
        photos: court.photos,
        availability: court.availability,
        hourlyRate: court.hourlyRate,
        address: court.address,
        workingHours: court.workingHours,
        optionalServices: court.optionalServices,
        monthlyRate: court.monthlyRate,
      });
      navigation.navigate('CourtDetail', {courtId});
    } catch (error) {
      console.error('Erro ao atualizar quadra:', error);
    }
  };

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
        <Text style={styles.label}>Tipo</Text>
        <TextInput
          style={styles.input}
          value={court.type}
          onChangeText={text => setCourtDetails({...court, type: text})}
        />
        <Text style={styles.label}>Endereço</Text>
        <TextInput
          style={styles.input}
          value={court.address}
          onChangeText={text => setCourtDetails({...court, type: text})}
        />
        <Text style={styles.label}>Dias de funcionamento</Text>
        <TextInput
          style={styles.input}
          value={court.workingDays}
          onChangeText={text => setCourtDetails({...court, type: text})}
        />
        <Text style={styles.label}>Horário de funcionamento</Text>
        <TextInput
          style={styles.input}
          value={court.workingHours}
          onChangeText={text => setCourtDetails({...court, type: text})}
        />
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          value={court.description}
          onChangeText={text => setCourtDetails({...court, description: text})}
        />
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
});

export default EditCourtScreen;
