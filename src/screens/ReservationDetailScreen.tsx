import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {
  fetchReservationDetails,
  fetchCourtDetails,
  updateReservationStatus,
} from '../services/apiMock';
import {
  ReservationDetailScreenRouteProp,
  HomeScreenNavigationProp,
  Reservation,
  Court,
} from '../types/types';

type Props = {
  route: ReservationDetailScreenRouteProp;
};

const ReservationDetailScreen: React.FC<Props> = ({route}) => {
  const {reservationId} = route.params;
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [court, setCourt] = useState<Court | null>(null);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    const getReservationDetails = async () => {
      try {
        const reservationDetails: Reservation = await fetchReservationDetails(
          reservationId,
        );
        setReservation(reservationDetails);
        const courtDetails: Court = await fetchCourtDetails(
          reservationDetails.courtId,
        );
        setCourt(courtDetails);
      } catch (error) {
        console.error('Erro ao buscar detalhes da reserva:', error);
      }
    };

    getReservationDetails();
  }, [reservationId]);

  const handleConfirmReservation = async () => {
    if (reservation) {
      try {
        await updateReservationStatus(reservation.id, 'confirmed');
        const updatedReservation = await fetchReservationDetails(
          reservation.id,
        );
        setReservation(updatedReservation);
      } catch (error) {
        console.error('Erro ao confirmar reserva:', error);
      }
    }
  };

  const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  if (!reservation || !court) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reserva #{reservation.id}</Text>
      <Text style={styles.label}>Quadra: {court.name}</Text>
      <Text style={styles.label}>Data: {formatDate(reservation.date)}</Text>
      <Text style={styles.label}>
        Horário: {reservation.startTime} - {reservation.endTime}
      </Text>
      <Text style={styles.label}>Valor: R${reservation.value}</Text>
      <Text style={styles.label}>
        Status: {reservation.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
      </Text>
      {reservation.status === 'pending' && (
        <TouchableOpacity
          style={styles.button}
          onPress={handleConfirmReservation}>
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.button2}
        onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
    backgroundColor: '#E66901',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  button2: {
    marginTop: 16,
    backgroundColor: '#00786A',
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

export default ReservationDetailScreen;
