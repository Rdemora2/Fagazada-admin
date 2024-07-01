import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {addCourt} from '../services/apiMock';
import {
  Court,
  Availability,
  CourtListScreenNavigationProp,
} from '../types/types';

type Props = {
  navigation: CourtListScreenNavigationProp;
};

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
    optionalServices: [],
    availability: [],
  });

  const handleAddCourt = async () => {
    try {
      const hourlyRateNumber = parseFloat(courtDetails.hourlyRate.toString());

      if (isNaN(hourlyRateNumber)) {
        throw new Error('Taxa horária inválida');
      }

      await addCourt({
        ...courtDetails,
        hourlyRate: hourlyRateNumber,
      });

      setShowConfirmation(true);

      setTimeout(() => {
        setShowConfirmation(false);
        navigation.navigate('Home');
      }, 5000);
    } catch (error) {
      console.error('Erro ao adicionar quadra:', error);
      Alert.alert(
        'Erro',
        'Erro ao adicionar quadra. Por favor, tente novamente.',
      );
    }
  };

  const [date, setDate] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleAddAvailability = () => {
    if (date && startTime && endTime) {
      const newAvailability: Availability = {
        id: courtDetails.availability.length + 1,
        date,
        startTime,
        endTime,
      };
      setCourtDetails({
        ...courtDetails,
        availability: [...courtDetails.availability, newAvailability],
      });
      setDate('');
      setStartTime('');
      setEndTime('');
      Alert.alert('Sucesso', 'Disponibilidade adicionada com sucesso.');
    } else {
      Alert.alert(
        'Erro',
        'Por favor, preencha todos os campos de disponibilidade.',
      );
    }
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirmDate = (selectedDate: Date) => {
    const formattedDate = selectedDate.toISOString().split('T')[0];
    setDate(formattedDate);
    hideDatePicker();
  };

  const showStartTimePicker = () => {
    setStartTimePickerVisible(true);
  };

  const hideStartTimePicker = () => {
    setStartTimePickerVisible(false);
  };

  const handleConfirmStartTime = (selectedTime: Date) => {
    const formattedTime = selectedTime.toISOString().split('T')[1].slice(0, 5);
    setStartTime(formattedTime);
    hideStartTimePicker();
  };

  const showEndTimePicker = () => {
    setEndTimePickerVisible(true);
  };

  const hideEndTimePicker = () => {
    setEndTimePickerVisible(false);
  };

  const handleConfirmEndTime = (selectedTime: Date) => {
    const formattedTime = selectedTime.toISOString().split('T')[1].slice(0, 5);
    setEndTime(formattedTime);
    hideEndTimePicker();
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showConfirmation) {
      timer = setTimeout(() => {
        setShowConfirmation(false);
        navigation.navigate('Home');
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showConfirmation, navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Adicionar Nova Quadra</Text>

        <Text style={styles.label}>Nome da Quadra</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome da quadra"
          value={courtDetails.name}
          onChangeText={text => setCourtDetails({...courtDetails, name: text})}
        />

        <Text style={styles.label}>Tipo da Quadra</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o tipo da quadra"
          value={courtDetails.type}
          onChangeText={text => setCourtDetails({...courtDetails, type: text})}
        />

        <Text style={styles.label}>Descrição da Quadra</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a descrição da quadra"
          multiline
          numberOfLines={4}
          value={courtDetails.description}
          onChangeText={text =>
            setCourtDetails({...courtDetails, description: text})
          }
        />

        <Text style={styles.label}>Taxa Horária (R$)</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a taxa horária"
          keyboardType="numeric"
          value={courtDetails.hourlyRate.toString()}
          onChangeText={text =>
            setCourtDetails({...courtDetails, hourlyRate: parseFloat(text)})
          }
        />

        <Text style={styles.label}>Endereço da Quadra</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o endereço da quadra"
          value={courtDetails.address}
          onChangeText={text =>
            setCourtDetails({...courtDetails, address: text})
          }
        />

        <Text style={styles.label}>Horário de Funcionamento</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o horário de funcionamento da quadra"
          value={courtDetails.workingHours}
          onChangeText={text =>
            setCourtDetails({...courtDetails, workingHours: text})
          }
        />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddCourt}>
        <Text style={styles.textButton}>Adicionar Quadra</Text>
      </TouchableOpacity>

      {showConfirmation && (
        <View style={styles.confirmationPopup}>
          <Text style={styles.confirmationText}>
            Quadra adicionada com sucesso!
          </Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('CourtAvailability')}>
            <Text style={styles.textButton}>Adicionar Disponibilidade</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 24,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
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
    paddingHorizontal: 10,
  },
  picker: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
  },
  dateInputContainer: {
    marginBottom: 12,
  },
  timeInputContainer: {
    marginBottom: 12,
  },
  confirmationPopup: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#4CAF50',
    padding: 16,
    alignItems: 'center',
  },
  confirmationText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
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
  textButton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddCourtScreen;
