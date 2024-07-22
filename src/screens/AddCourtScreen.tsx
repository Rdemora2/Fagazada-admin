import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
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

const {width, height} = Dimensions.get('window');

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

  const [date, setDate] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [showConfirmation, setShowConfirmation] = useState(false);

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
          style={styles.textarea}
          placeholder="Digite a descrição da quadra"
          multiline
          numberOfLines={4}
          value={courtDetails.description}
          onChangeText={text =>
            setCourtDetails({...courtDetails, description: text})
          }
        />

        <Text style={styles.label}>Valor por hora: (R$)</Text>
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
  confirmationPopup: {
    backgroundColor: '#4CAF50',
    padding: 16,
    alignItems: 'center',
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
  confirmationText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default AddCourtScreen;
