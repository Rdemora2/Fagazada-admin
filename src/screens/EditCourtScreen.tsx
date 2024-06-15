import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import {fetchCourtDetails, updateCourt} from '../services/apiMock';
import {
  EditCourtScreenNavigationProp,
  RootStackParamList,
} from '../types/types';
import {RouteProp} from '@react-navigation/native';

type EditCourtScreenRouteProp = RouteProp<RootStackParamList, 'EditCourt'>;

type Props = {
  route: EditCourtScreenRouteProp;
  navigation: EditCourtScreenNavigationProp;
};

type CourtDetails = {
  name: string;
  type: string;
  description: string;
  photos: string[];
  availability: string[];
  hourlyRate: string;
  bookingPeriods: string[];
  address: string;
  workingHours: string;
  optionalServices: string[];
  monthlyRate: string;
};

const EditCourtScreen: React.FC<Props> = ({route, navigation}) => {
  const {courtId} = route.params;
  const [courtDetails, setCourtDetails] = useState<CourtDetails>({
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

  useEffect(() => {
    const getCourtDetails = async () => {
      try {
        const court = await fetchCourtDetails(courtId);
        setCourtDetails({
          name: court.name,
          type: court.type,
          description: court.description,
          photos: court.photos,
          availability: court.availability,
          hourlyRate: court.hourlyRate.toString(),
          bookingPeriods: court.bookingPeriods,
          address: court.address,
          workingHours: court.workingHours,
          optionalServices: court.optionalServices,
          monthlyRate: court.monthlyRate ? court.monthlyRate.toString() : '',
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
        name: courtDetails.name,
        type: courtDetails.type,
        description: courtDetails.description,
        photos: courtDetails.photos,
        availability: courtDetails.availability,
        hourlyRate: parseFloat(courtDetails.hourlyRate),
        bookingPeriods: courtDetails.bookingPeriods,
        address: courtDetails.address,
        workingHours: courtDetails.workingHours,
        optionalServices: courtDetails.optionalServices,
        monthlyRate: courtDetails.monthlyRate
          ? parseFloat(courtDetails.monthlyRate)
          : undefined,
      });
      navigation.navigate('CourtDetail', {courtId});
    } catch (error) {
      console.error('Erro ao atualizar quadra:', error);
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
      <Button title="Atualizar Quadra" onPress={handleUpdateCourt} />
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

export default EditCourtScreen;
