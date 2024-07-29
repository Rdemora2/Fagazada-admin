import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
  value: number;
  date: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed';
};

type Court = {
  id: number;
  name: string;
  type: string;
  description: string;
  photos: string[];
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
  const [filteredReservations, setFilteredReservations] = useState<
    Reservation[]
  >([]);
  const [selectedCourt, setSelectedCourt] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  useEffect(() => {
    const getData = async () => {
      try {
        const reservationData: Reservation[] = await fetchReservations(1);
        const courtData: Court[] = await fetchCourts();
        setReservations(reservationData);
        setCourts(courtData);
        setFilteredReservations(reservationData);
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
      applyFilters(updatedReservations);
    } catch (error) {
      console.error('Erro ao confirmar reserva:', error);
    }
  };

  const applyFilters = (reservations: Reservation[]) => {
    let filtered = reservations;
    if (selectedCourt) {
      filtered = filtered.filter(reservation =>
        courts.find(
          court =>
            court.id === reservation.courtId && court.name === selectedCourt,
        ),
      );
    }
    if (selectedDate) {
      filtered = filtered.filter(
        reservation => reservation.date === selectedDate,
      );
    }
    if (selectedStatus) {
      filtered = filtered.filter(
        reservation => reservation.status === selectedStatus,
      );
    }
    setFilteredReservations(filtered);
  };

  const resetFilters = () => {
    setSelectedCourt('');
    setSelectedDate('');
    setSelectedStatus('');
    setFilteredReservations(reservations);
  };

  useEffect(() => {
    applyFilters(reservations);
  }, [selectedCourt, selectedDate, selectedStatus]);

  const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const renderItem = ({item}: {item: Reservation}) => {
    const court = courts.find(court => court.id === item.courtId);
    const courtName = court ? court.name : 'Quadra não encontrada';

    return (
      <View style={styles.item}>
        <Text style={styles.title}>Reserva #{item.id}</Text>
        <Text style={styles.label}>Quadra: {courtName}</Text>
        <Text style={styles.label}>Data: {formatDate(item.date)}</Text>
        <Text style={styles.label}>
          Horário: {item.startTime} - {item.endTime}
        </Text>
        <Text style={styles.label}>Valor: R${item.value}</Text>
        {item.status === 'confirmed' && (
          <Text style={styles.label}>Status: Confirmado</Text>
        )}
        {item.status === 'pending' && (
          <>
            <Text style={styles.label}>Status: Pendente</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleConfirmReservation(item.id)}>
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCourt}
            onValueChange={itemValue => setSelectedCourt(itemValue)}
            style={styles.picker}>
            <Picker.Item label="Quadra" value="" />
            {courts.map(court => (
              <Picker.Item
                key={court.id}
                label={court.name}
                value={court.name}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedDate}
            onValueChange={itemValue => setSelectedDate(itemValue)}
            style={styles.picker}>
            <Picker.Item label="Data" value="" />
            {[
              ...new Set(reservations.map(reservation => reservation.date)),
            ].map(date => (
              <Picker.Item key={date} label={formatDate(date)} value={date} />
            ))}
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedStatus}
            onValueChange={itemValue => setSelectedStatus(itemValue)}
            style={styles.picker}>
            <Picker.Item label="Status" value="" />
            <Picker.Item label="Pendente" value="pending" />
            <Picker.Item label="Confirmado" value="confirmed" />
          </Picker>
        </View>
        <TouchableOpacity onPress={resetFilters} style={styles.resetButton}>
          <Ionicons name="close-circle" size={24} color="#E66901" />
        </TouchableOpacity>
      </View>
      {filteredReservations.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.infoText}>Nenhuma reserva encontrada</Text>
        </View>
      ) : (
        <FlatList
          data={filteredReservations}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  pickerContainer: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
  },
  picker: {
    flex: 1,
    width: '115%',
  },
  pickerItem: {
    fontSize: 16,
  },
  resetButton: {
    paddingLeft: 7,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
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
