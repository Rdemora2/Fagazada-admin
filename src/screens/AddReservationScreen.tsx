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
  Modal,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {addReservation, addClient, fetchCourts} from '../services/apiMock';
import {
  Reservation,
  Client,
  Court,
  CourtListScreenNavigationProp,
} from '../types/types';
import {useUser} from '../context/UserContext';

type Props = {
  navigation: CourtListScreenNavigationProp;
};

const {width} = Dimensions.get('window');

const AddReservationScreen: React.FC<Props> = ({navigation}) => {
  const {userId} = useUser();
  const [courts, setCourts] = useState<Court[]>([]);
  const [reservationDetails, setReservationDetails] = useState<Reservation>({
    id: 0,
    courtId: 0,
    userId: 0,
    value: 0,
    date: '',
    startTime: '',
    endTime: '',
    status: 'pending',
  });

  const [clientDetails, setClientDetails] = useState<Client>({
    id: 0,
    fullName: '',
    birthDate: '',
    cpf: '',
    gender: 'male',
    email: '',
    phoneNumber: '',
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (userId !== null) {
      fetchCourts(userId).then(setCourts).catch(console.error);
    }
  }, [userId]);

  const handleAddReservation = async () => {
    const newErrors: {[key: string]: string} = {};

    if (!reservationDetails.courtId) newErrors.courtId = 'Quadra é obrigatória';
    if (!reservationDetails.date) newErrors.date = 'Data é obrigatória';
    if (!reservationDetails.startTime)
      newErrors.startTime = 'Horário de início é obrigatório';
    if (!reservationDetails.endTime)
      newErrors.endTime = 'Horário de término é obrigatório';
    if (!reservationDetails.value) newErrors.value = 'Valor é obrigatório';

    if (!clientDetails.fullName) newErrors.fullName = 'Nome é obrigatório';
    if (!clientDetails.birthDate)
      newErrors.birthDate = 'Data de nascimento é obrigatória';
    if (!clientDetails.cpf) newErrors.cpf = 'CPF é obrigatório';
    if (!clientDetails.email) newErrors.email = 'Email é obrigatório';
    if (!clientDetails.phoneNumber)
      newErrors.phoneNumber = 'Número de telefone é obrigatório';

    if (!validateCPF(clientDetails.cpf)) newErrors.cpf = 'CPF inválido';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await addClient(clientDetails);
      await addReservation(reservationDetails);
      setShowConfirmation(true);
    } catch (error) {
      console.error('Erro ao adicionar reserva:', error);
      Alert.alert(
        'Erro',
        'Erro ao adicionar reserva. Por favor, tente novamente.',
      );
    }
  };

  const handleModalClose = () => {
    setShowConfirmation(false);
    navigation.navigate('ReservationList');
  };

  const validateCPF = (cpf: string): boolean => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.charAt(10));
  };

  const formatCPF = (cpf: string): string => {
    return cpf
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const formatPhoneNumber = (phoneNumber: string): string => {
    return phoneNumber
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{1})(\d{4})(\d{4})$/, '$1 $2-$3');
  };

  const handleDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    setReservationDetails({
      ...reservationDetails,
      date: currentDate.toISOString().split('T')[0],
    });
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
        <Text style={styles.label}>Quadra</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={reservationDetails.courtId}
            style={styles.picker}
            onValueChange={itemValue =>
              setReservationDetails({...reservationDetails, courtId: itemValue})
            }>
            <Picker.Item label="Selecione uma quadra" value={0} />
            {courts.map(court => (
              <Picker.Item key={court.id} label={court.name} value={court.id} />
            ))}
          </Picker>
        </View>
        {errors.courtId && (
          <Text style={styles.errorText}>{errors.courtId}</Text>
        )}

        <Text style={styles.label}>Data</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput
            style={styles.input}
            placeholder="Selecione a data"
            value={reservationDetails.date}
            editable={false}
          />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}

        <Text style={styles.label}>Horário de Início</Text>
        <View style={styles.pickerContainer2}>
          <Picker
            selectedValue={reservationDetails.startTime}
            style={styles.picker2}
            onValueChange={itemValue =>
              setReservationDetails({
                ...reservationDetails,
                startTime: itemValue,
              })
            }>
            {timeOptions.map(time => (
              <Picker.Item key={time} label={time} value={time} />
            ))}
          </Picker>
        </View>
        {errors.startTime && (
          <Text style={styles.errorText}>{errors.startTime}</Text>
        )}

        <Text style={styles.label}>Horário de Término</Text>
        <View style={styles.pickerContainer2}>
          <Picker
            selectedValue={reservationDetails.endTime}
            style={styles.picker2}
            onValueChange={itemValue =>
              setReservationDetails({
                ...reservationDetails,
                endTime: itemValue,
              })
            }>
            {timeOptions
              .filter(time => time > reservationDetails.startTime)
              .map(time => (
                <Picker.Item key={time} label={time} value={time} />
              ))}
          </Picker>
        </View>
        {errors.endTime && (
          <Text style={styles.errorText}>{errors.endTime}</Text>
        )}

        <Text style={styles.label}>Valor</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o valor"
          keyboardType="numeric"
          value={reservationDetails.value.toString()}
          onChangeText={text =>
            setReservationDetails({
              ...reservationDetails,
              value: parseFloat(text),
            })
          }
        />
        {errors.value && <Text style={styles.errorText}>{errors.value}</Text>}

        <Text style={styles.sectionTitle}>Dados do Cliente</Text>

        <Text style={styles.label}>Nome Completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome completo"
          value={clientDetails.fullName}
          onChangeText={text =>
            setClientDetails({...clientDetails, fullName: text})
          }
        />
        {errors.fullName && (
          <Text style={styles.errorText}>{errors.fullName}</Text>
        )}

        <Text style={styles.label}>Data de Nascimento</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a data de nascimento (YYYY-MM-DD)"
          value={clientDetails.birthDate}
          onChangeText={text =>
            setClientDetails({...clientDetails, birthDate: text})
          }
        />
        {errors.birthDate && (
          <Text style={styles.errorText}>{errors.birthDate}</Text>
        )}

        <Text style={styles.label}>CPF</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o CPF"
          value={clientDetails.cpf}
          onChangeText={text =>
            setClientDetails({...clientDetails, cpf: formatCPF(text)})
          }
        />
        {errors.cpf && <Text style={styles.errorText}>{errors.cpf}</Text>}

        <Text style={styles.label}>Gênero</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={clientDetails.gender}
            style={styles.picker}
            onValueChange={itemValue =>
              setClientDetails({...clientDetails, gender: itemValue})
            }>
            <Picker.Item label="Masculino" value="male" />
            <Picker.Item label="Feminino" value="female" />
          </Picker>
        </View>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o email"
          value={clientDetails.email}
          onChangeText={text =>
            setClientDetails({...clientDetails, email: text})
          }
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <Text style={styles.label}>Número de Telefone</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o número de telefone"
          value={clientDetails.phoneNumber}
          onChangeText={text =>
            setClientDetails({
              ...clientDetails,
              phoneNumber: formatPhoneNumber(text),
            })
          }
        />
        {errors.phoneNumber && (
          <Text style={styles.errorText}>{errors.phoneNumber}</Text>
        )}
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddReservation}>
        <Text style={styles.textButton}>Adicionar Reserva</Text>
      </TouchableOpacity>

      <Modal
        visible={showConfirmation}
        transparent={true}
        animationType="slide"
        onRequestClose={handleModalClose}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              Reserva adicionada com sucesso!
            </Text>
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

export default AddReservationScreen;
