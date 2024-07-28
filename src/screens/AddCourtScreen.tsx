import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {addCourt} from '../services/apiMock';
import {Court, CourtListScreenNavigationProp} from '../types/types';

type Props = {
  navigation: CourtListScreenNavigationProp;
};

const {width} = Dimensions.get('window');

const AddCourtScreen: React.FC<Props> = ({navigation}) => {
  const [courtDetails, setCourtDetails] = useState<Court>({
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
    availability: [],
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [openingHour, setOpeningHour] = useState('08:00');
  const [closingHour, setClosingHour] = useState('22:00');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleAddCourt = async () => {
    const newErrors: {[key: string]: string} = {};

    if (!courtDetails.name) newErrors.name = 'Nome é obrigatório';
    if (!courtDetails.type) newErrors.type = 'Tipo é obrigatório';
    if (!courtDetails.description)
      newErrors.description = 'Descrição é obrigatória';
    if (!courtDetails.hourlyRate)
      newErrors.hourlyRate = 'Taxa horária é obrigatória';
    if (!courtDetails.address) newErrors.address = 'Endereço é obrigatório';
    if (!openingHour || !closingHour)
      newErrors.workingHours = 'Horário de funcionamento é obrigatório';
    if (!courtDetails.workingDays)
      newErrors.workingDays = 'Dias de funcionamento são obrigatórios';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const hourlyRateNumber = parseFloat(courtDetails.hourlyRate.toString());

      if (isNaN(hourlyRateNumber)) {
        throw new Error('Taxa horária inválida');
      }

      await addCourt({
        ...courtDetails,
        hourlyRate: hourlyRateNumber,
        workingHours: `${openingHour}-${closingHour}`,
      });

      setShowConfirmation(true);
    } catch (error) {
      console.error('Erro ao adicionar quadra:', error);
      Alert.alert(
        'Erro',
        'Erro ao adicionar quadra. Por favor, tente novamente.',
      );
    }
  };

  const handleModalClose = () => {
    setShowConfirmation(false);
    navigation.navigate('Home');
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Nome da Quadra</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome da quadra"
          value={courtDetails.name}
          onChangeText={text => setCourtDetails({...courtDetails, name: text})}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <Text style={styles.label}>Tipo da Quadra</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={courtDetails.type}
            style={styles.picker}
            onValueChange={itemValue =>
              setCourtDetails({...courtDetails, type: itemValue})
            }>
            <Picker.Item label="Futebol" value="Futebol" />
            <Picker.Item label="Futsal" value="Futsal" />
            <Picker.Item label="Tênis" value="Tênis" />
            <Picker.Item label="Basquete" value="Basquete" />
            <Picker.Item label="Vôlei" value="Vôlei" />
            <Picker.Item label="Beach Vôlei" value="Beach Vôlei" />
            <Picker.Item label="Beach Tênis" value="Beach Tênis" />
            <Picker.Item label="Squash" value="Squash" />
          </Picker>
        </View>
        {errors.type && <Text style={styles.errorText}>{errors.type}</Text>}

        <Text style={styles.label}>Descrição da Quadra</Text>
        <TextInput
          style={styles.textarea}
          placeholder="Digite a descrição da quadra"
          multiline
          numberOfLines={4}
          value={courtDetails.description}
          onChangeText={text =>
            setCourtDetails({...courtDetails, description: text})
          }
        />
        {errors.description && (
          <Text style={styles.errorText}>{errors.description}</Text>
        )}

        <Text style={styles.label}>Valor por hora: (R$)</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a taxa horária"
          keyboardType="numeric"
          value={courtDetails.hourlyRate.toString()}
          onChangeText={text =>
            setCourtDetails({
              ...courtDetails,
              hourlyRate: parseFloat(text) || 0,
            })
          }
        />
        {errors.hourlyRate && (
          <Text style={styles.errorText}>{errors.hourlyRate}</Text>
        )}

        <Text style={styles.label}>Endereço da Quadra</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o endereço da quadra"
          value={courtDetails.address}
          onChangeText={text =>
            setCourtDetails({...courtDetails, address: text})
          }
        />
        {errors.address && (
          <Text style={styles.errorText}>{errors.address}</Text>
        )}

        <Text style={styles.label}>Horário de Funcionamento</Text>
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

        <Text style={styles.label}>Dias de Funcionamento</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={courtDetails.workingDays}
            style={styles.picker}
            onValueChange={itemValue =>
              setCourtDetails({...courtDetails, workingDays: itemValue})
            }>
            <Picker.Item label="Segunda a Sexta" value="Segunda a Sexta" />
            <Picker.Item label="Segunda a Sábado" value="Segunda a Sábado" />
            <Picker.Item label="Segunda a Domingo" value="Segunda a Domingo" />
            <Picker.Item label="Finais de Semana" value="Finais de Semana" />
          </Picker>
        </View>
        {errors.workingDays && (
          <Text style={styles.errorText}>{errors.workingDays}</Text>
        )}
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddCourt}>
        <Text style={styles.textButton}>Adicionar Quadra</Text>
      </TouchableOpacity>

      <Modal
        visible={showConfirmation}
        transparent={true}
        animationType="slide"
        onRequestClose={handleModalClose}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Quadra adicionada com sucesso!</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleModalClose}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    marginRight: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  textarea: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    height: 80,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingBottom: 12,
  },
  pickerContainer2: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingBottom: 12,
    width: '48%',
  },
  picker: {
    height: 40,
    width: '100%',
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
  addButton: {
    backgroundColor: '#00786A',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  textButton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: width * 0.8,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
  },
  modalButton: {
    backgroundColor: '#00786A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
  },
});

export default AddCourtScreen;
