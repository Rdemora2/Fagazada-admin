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

type Props = {
  navigation: CourtListScreenNavigationProp;
};

const AddCourtScreen: React.FC<Props> = ({navigation}) => {
  const [courtDetails, setCourtDetails] = useState({
    name: '',
    type: '',
    description: '',
    photos: [],
    availability: [],
    hourlyRate: '',
    bookingPeriods: [],
    address: '',
    workingHours: '',
    optionalServices: [],
    monthlyRate: '',
  });

  const handleAddCourt = async () => {
    try {
      await addCourt({
        ...courtDetails,
        hourlyRate: parseFloat(courtDetails.hourlyRate),
        monthlyRate: courtDetails.monthlyRate
          ? parseFloat(courtDetails.monthlyRate)
          : undefined,
      });
      navigation.navigate('CourtList');
    } catch (error) {
      console.error('Erro ao adicionar quadra:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nome da Quadra</Text>
      <TextInput
        style={styles.input}
        value={courtDetails.name}
        onChangeText={text => setCourtDetails({...courtDetails, name: text})}
      />
      <Text style={styles.label}>Tipo da Quadra</Text>
      <TextInput
        style={styles.input}
        value={courtDetails.type}
        onChangeText={text => setCourtDetails({...courtDetails, type: text})}
      />
      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        value={courtDetails.description}
        onChangeText={text =>
          setCourtDetails({...courtDetails, description: text})
        }
      />
      <Button title="Adicionar Quadra" onPress={handleAddCourt} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
});

export default AddCourtScreen;
