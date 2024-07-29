import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  Alert,
  Linking,
} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {
  fetchReservationDetails,
  fetchCourtDetails,
  updateReservationStatus,
  cancelReservation,
  fetchClientDetails,
} from '../services/apiMock';
import {
  ReservationDetailScreenRouteProp,
  HomeScreenNavigationProp,
  Reservation,
  Court,
} from '../types/types';

type Props = {
  route: ReservationDetailScreenRouteProp & {params: {onGoBack: () => void}};
};

const ReservationDetailScreen: React.FC<Props> = ({route}) => {
  const {reservationId, onGoBack} = route.params;
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [court, setCourt] = useState<Court | null>(null);
  const [client, setClient] = useState<any | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showCancellation, setShowCancellation] = useState(false);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const navigation = useNavigation<HomeScreenNavigationProp>();

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
      const clientDetails = await fetchClientDetails(reservationDetails.userId);
      setClient(clientDetails);
    } catch (error) {
      console.error('Erro ao buscar detalhes da reserva:', error);
    }
  };

  useEffect(() => {
    getReservationDetails();
  }, [reservationId]);

  const handleConfirmReservation = async () => {
    if (reservation) {
      try {
        await updateReservationStatus(reservation.id, 'confirmed');
        setShowConfirmation(true);
        getReservationDetails();
      } catch (error) {
        console.error('Erro ao confirmar reserva:', error);
      }
    }
  };

  const handleCancelReservation = async () => {
    if (reservation) {
      try {
        await cancelReservation(reservation.id);
        setShowCancellation(true);
        getReservationDetails();
      } catch (error) {
        console.error('Erro ao cancelar reserva:', error);
      }
    }
  };

  const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const formatPhoneNumber = (phoneNumber: string): string => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const phoneWithCountryCode = `+55${cleaned.slice(-11)}`;
    return phoneWithCountryCode;
  };

  const openWhatsApp = (phoneNumber: string) => {
    const url = `whatsapp://send?phone=${formatPhoneNumber(phoneNumber)}`;
    Linking.openURL(url)
      .then(() => {
        console.log('WhatsApp Opened');
      })
      .catch(() => {
        Alert.alert('Erro', 'Não foi possível abrir o WhatsApp');
      });
  };

  if (!reservation || !court || !client) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reserva #{reservation.id}</Text>
      {court.photos.length > 0 && (
        <Image source={{uri: court.photos[0]}} style={styles.courtImage} />
      )}
      <Text style={styles.label}>{court.name}</Text>
      <Text style={styles.label}>Data: {formatDate(reservation.date)}</Text>
      <Text style={styles.label}>
        Horário: {reservation.startTime} - {reservation.endTime}
      </Text>
      <Text style={styles.label}>Valor: R${reservation.value}</Text>
      <Text style={styles.label}>
        Status:{' '}
        {reservation.status === 'confirmed'
          ? 'Confirmado'
          : reservation.status === 'pending'
          ? 'Pendente'
          : 'Cancelado'}
      </Text>
      <Text style={styles.sectionTitle}>Detalhes do Cliente</Text>
      <Text style={styles.label}>{client.fullName}</Text>
      <Text style={styles.label}>{client.email}</Text>
      <TouchableOpacity
        style={styles.whatsappContainer}
        onPress={() => openWhatsApp(client.phoneNumber)}>
        <Image
          source={require('../assets/images/whatsapp.png')}
          style={styles.whatsappIcon}
        />
        <Text style={[styles.label, styles.link]}>{client.phoneNumber}</Text>
      </TouchableOpacity>
      {reservation.status === 'pending' && (
        <TouchableOpacity
          style={styles.button}
          onPress={handleConfirmReservation}>
          <Text style={styles.buttonText}>Confirmar Reserva</Text>
        </TouchableOpacity>
      )}
      {reservation.status !== 'canceled' &&
        reservation.status !== 'pending' && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setShowCancelConfirmation(true)}>
            <Text style={styles.buttonText}>Cancelar Reserva</Text>
          </TouchableOpacity>
        )}
      <TouchableOpacity
        style={styles.button2}
        onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Voltar</Text>
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
              onPress={() => {
                setShowConfirmation(false);
                onGoBack();
                navigation.goBack();
              }}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={showCancellation}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCancellation(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Reserva cancelada com sucesso!</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setShowCancellation(false);
                onGoBack();
                navigation.goBack();
              }}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={showCancelConfirmation}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCancelConfirmation(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              Você tem certeza que deseja cancelar esta reserva?
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setShowCancelConfirmation(false);
                handleCancelReservation();
              }}>
              <Text style={styles.modalButtonText}>Sim</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, {backgroundColor: '#00786A'}]}
              onPress={() => setShowCancelConfirmation(false)}>
              <Text style={styles.modalButtonText}>Não</Text>
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
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  courtImage: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
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
  cancelButton: {
    marginTop: 16,
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
  link: {
    color: '#25d366',
    textDecorationLine: 'none',
  },
  whatsappContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  whatsappIcon: {
    width: 20,
    height: 20,
    marginRight: 3,
    marginBottom: 5,
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
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#E66901',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ReservationDetailScreen;
