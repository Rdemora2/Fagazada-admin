import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, Button} from 'react-native';
import {fetchReservations, updateReservationStatus} from '../services/apiMock';
import {HomeScreenNavigationProp} from '../types/types';

type Reservation = {
  id: string;
  courtId: string;
  userId: number;
  date: string;
  status: 'pending' | 'confirmed';
};

type Props = {
  navigation: HomeScreenNavigationProp;
};

const ReservationListScreen: React.FC<Props> = ({navigation}) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const getReservations = async () => {
      try {
        const data = await fetchReservations(1); // Substituir pelo id do usuário logado
        setReservations(data);
      } catch (error) {
        console.error('Erro ao buscar reservas:', error);
      }
    };

    getReservations();
  }, []);

  const handleConfirmReservation = async (reservationId: string) => {
    try {
      await updateReservationStatus(reservationId, 'confirmed');
      const updatedReservations = await fetchReservations(1);
      setReservations(updatedReservations);
    } catch (error) {
      console.error('Erro ao confirmar reserva:', error);
    }
  };

  const renderItem = ({item}: {item: Reservation}) => (
    <View style={styles.item}>
      <Text>Quadra ID: {item.courtId}</Text>
      <Text>Data: {item.date}</Text>
      <Text>Status: {item.status}</Text>
      {item.status === 'pending' && (
        <Button
          title="Confirmar"
          onPress={() => handleConfirmReservation(item.id)}
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={reservations}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 8,
  },
});

export default ReservationListScreen;
