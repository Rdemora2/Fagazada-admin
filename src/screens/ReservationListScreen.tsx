import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  fetchReservations,
  fetchCourts,
  updateReservationStatus,
} from '../services/apiMock';
import {ReservationListScreenNavigationProp} from '../types/types';
import {useUser} from '../context/UserContext';

type Reservation = {
  id: number;
  courtId: number;
  userId: number;
  value: number;
  date: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'canceled';
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
  navigation: ReservationListScreenNavigationProp;
};

const ReservationListScreen: React.FC<Props> = ({navigation}) => {
  const {userId} = useUser();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [courts, setCourts] = useState<Court[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<
    Reservation[]
  >([]);
  const [selectedCourt, setSelectedCourt] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const getData = async () => {
    try {
      if (userId !== null) {
        const reservationData: Reservation[] = await fetchReservations(userId);
        const courtData: Court[] = await fetchCourts(userId);

        // Filtra reservas futuras
        const now = new Date();
        const futureReservations = reservationData.filter(reservation => {
          const reservationDate = new Date(reservation.date);
          const reservationTime = reservation.startTime.split(':');
          reservationDate.setHours(parseInt(reservationTime[0]));
          reservationDate.setMinutes(parseInt(reservationTime[1]));
          return reservationDate > now;
        });

        setReservations(futureReservations);
        setCourts(courtData);
        setFilteredReservations(futureReservations);
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  useEffect(() => {
    getData();
  }, [userId]);

  const handleConfirmReservation = async (reservationId: number) => {
    try {
      await updateReservationStatus(reservationId, 'confirmed');
      setShowConfirmation(true);
      getData();
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
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.navigate('ReservationDetail', {
            reservationId: item.id,
            onGoBack: getData,
          })
        }>
        <Text style={styles.title}>Reserva #{item.id}</Text>
        <Text style={styles.label}>Quadra: {courtName}</Text>
        <Text style={styles.label}>Data: {formatDate(item.date)}</Text>
        <Text style={styles.label}>
          Horário: {item.startTime} - {item.endTime}
        </Text>
        <Text style={styles.label}>Valor: R${item.value}</Text>
        {item.status === 'confirmed' && (
          <Text style={styles.label}>Status: Confirmada</Text>
        )}
        {item.status === 'canceled' && (
          <Text style={styles.label}>Status: Cancelada</Text>
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
      </TouchableOpacity>
    );
  };

  const handleAddReservation = () => {
    navigation.navigate('AddReservation');
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
            <Picker.Item label="Confirmada" value="confirmed" />
            <Picker.Item label="Cancelada" value="canceled" />
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
      <TouchableOpacity style={styles.addButton} onPress={handleAddReservation}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <Modal
        visible={showConfirmation}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowConfirmation(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              Reserva confirmada com sucesso!
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowConfirmation(false)}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#E66901',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 4,
  },
  addButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
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
    backgroundColor: '#E66901',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ReservationListScreen;
