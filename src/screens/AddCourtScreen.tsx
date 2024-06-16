import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import {addCourt} from '../services/apiMock';
import {CourtListScreenNavigationProp} from '../types/types';
import {Court} from '../types/types'; // Importando o tipo Court

type Props = {
  navigation: CourtListScreenNavigationProp;
};

const initialCourtDetails: Court = {
  id: 0, // Definido como 0 inicialmente ou outro valor padrão
  name: '',
  type: '',
  description: '',
  photos: [],
  availability: [],
  hourlyRate: 0,
  bookingPeriods: [],
  address: '',
  workingHours: '',
  optionalServices: [],
  monthlyRate: undefined,
};

const AddCourtScreen: React.FC<Props> = ({navigation}) => {
  const [courtDetails, setCourtDetails] = useState<Court>(initialCourtDetails);

  const handleAddCourt = async () => {
    try {
      // Convertendo valores numéricos de string para number
      const hourlyRateNumber = parseFloat(courtDetails.hourlyRate.toString());
      const monthlyRateNumber = courtDetails.monthlyRate
        ? parseFloat(courtDetails.monthlyRate.toString())
        : undefined;

      // Verificando se a conversão foi bem-sucedida para todos os campos necessários
      if (isNaN(hourlyRateNumber)) {
        throw new Error('Taxa horária inválida');
      }
      // Você pode adicionar validações semelhantes para outros campos se necessário

      // Enviando os dados formatados para a função de adicionar quadra
      await addCourt({
        ...courtDetails,
        hourlyRate: hourlyRateNumber,
        monthlyRate: monthlyRateNumber,
      });

      // Navegando de volta para a lista de quadras após adicionar
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erro ao adicionar quadra:', error);
    }
  };

  const handleChangeText = (key: keyof Court, value: string | string[]) => {
    if (Array.isArray(value)) {
      // Tratamento específico para arrays
      setCourtDetails({...courtDetails, [key]: value});
    } else if (key === 'hourlyRate' || key === 'monthlyRate') {
      // Tratamento para campos numéricos
      const numericValue = parseFloat(value.trim());
      if (!isNaN(numericValue)) {
        setCourtDetails({...courtDetails, [key]: numericValue});
      }
    } else {
      // Tratamento padrão para campos de texto
      setCourtDetails({...courtDetails, [key]: value});
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nome da Quadra</Text>
      <TextInput
        style={styles.input}
        value={courtDetails.name}
        onChangeText={text => handleChangeText('name', text)}
      />
      <Text style={styles.label}>Tipo da Quadra</Text>
      <TextInput
        style={styles.input}
        value={courtDetails.type}
        onChangeText={text => handleChangeText('type', text)}
      />
      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        multiline
        numberOfLines={4}
        value={courtDetails.description}
        onChangeText={text => handleChangeText('description', text)}
      />
      <Text style={styles.label}>Fotos (separadas por vírgula)</Text>
      <TextInput
        style={styles.input}
        value={courtDetails.photos.join(',')}
        onChangeText={text => handleChangeText('photos', text.split(','))}
      />
      <Text style={styles.label}>Disponibilidade (separadas por vírgula)</Text>
      <TextInput
        style={styles.input}
        value={courtDetails.availability.join(',')}
        onChangeText={text => handleChangeText('availability', text.split(','))}
      />
      <Text style={styles.label}>Taxa Horária</Text>
      <TextInput
        style={styles.input}
        value={courtDetails.hourlyRate.toString()} // Mostrar como string
        onChangeText={text => handleChangeText('hourlyRate', text)}
        keyboardType="numeric" // Teclado numérico para taxa horária
      />
      <Text style={styles.label}>
        Períodos de Reserva (separados por vírgula)
      </Text>
      <TextInput
        style={styles.input}
        value={courtDetails.bookingPeriods.join(',')}
        onChangeText={text =>
          handleChangeText('bookingPeriods', text.split(','))
        }
      />
      <Text style={styles.label}>Endereço</Text>
      <TextInput
        style={styles.input}
        value={courtDetails.address}
        onChangeText={text => handleChangeText('address', text)}
      />
      <Text style={styles.label}>Horário de Funcionamento</Text>
      <TextInput
        style={styles.input}
        value={courtDetails.workingHours}
        onChangeText={text => handleChangeText('workingHours', text)}
      />
      <Text style={styles.label}>
        Serviços Opcionais (separados por vírgula)
      </Text>
      <TextInput
        style={styles.input}
        value={courtDetails.optionalServices.join(',')}
        onChangeText={text =>
          handleChangeText('optionalServices', text.split(','))
        }
      />
      <Text style={styles.label}>Taxa Mensal (opcional)</Text>
      <TextInput
        style={styles.input}
        value={
          courtDetails.monthlyRate ? courtDetails.monthlyRate.toString() : ''
        }
        onChangeText={text => handleChangeText('monthlyRate', text)}
        keyboardType="numeric" // Teclado numérico para taxa mensal
      />
      <Button title="Adicionar Quadra" onPress={handleAddCourt} />
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
  descriptionInput: {
    height: 120,
    textAlignVertical: 'top',
  },
});

export default AddCourtScreen;
