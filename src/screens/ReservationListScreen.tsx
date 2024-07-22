import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {
  fetchReservations,
  fetchCourts,
  updateReservationStatus,
} from '../services/apiMock';
import {HomeScreenNavigationProp} from '../types/types';

type Reservation = {
  id: number;
  courtId: number;
  userId: number;
  date: string;
  status: 'pending' | 'confirmed';
};

type Court = {
  id: number;
  name: string;
  type: string;
  description: string;
  photos: string[];
  availability: any[];
  hourlyRate: number;
  address: string;
  workingHours: string;
  optionalServices: string[];
};

type Props = {
  navigation: HomeScreenNavigationProp;
};

const ReservationListScreen: React.FC<Props> = ({navigation}) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [courts, setCourts] = useState<Court[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const reservationData: Reservation[] = await fetchReservations(1);
        const courtData: Court[] = await fetchCourts();
        setReservations(reservationData);
        setCourts(courtData);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    getData();
  }, []);

  const handleConfirmReservation = async (reservationId: number) => {
    try {
      await updateReservationStatus(reservationId, 'confirmed');
      const updatedReservations = await fetchReservations(1);
      setReservations(updatedReservations);
    } catch (error) {
      console.error('Erro ao confirmar reserva:', error);
    }
  };

  const renderItem = ({item}: {item: Reservation}) => {
    const court = courts.find(court => court.id === item.courtId);
    const courtName = court ? court.name : 'Quadra não encontrada';

    return (
      <View style={styles.item}>
        <Text style={styles.title}>{courtName}</Text>
        <Text style={styles.label}>ID da reserva: {item.id}</Text>
        <Text style={styles.label}>Data: {item.date}</Text>
        {item.status === 'confirmed' && (
          <Text style={styles.label}>Status: Confirmado</Text>
        )}
        {item.status === 'pending' && (
          <Text style={styles.label}>Status: Pendente</Text>
        )}
        {item.status === 'pending' && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleConfirmReservation(item.id)}>
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={reservations}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  item: {
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  button: {
    marginTop: 8,
    backgroundColor: '#E66901',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReservationListScreen;
