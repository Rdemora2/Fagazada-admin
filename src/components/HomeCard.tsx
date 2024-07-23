import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';
import {Court} from '../types/types';

const {width} = Dimensions.get('window');

type Props = {
  court: Court;
  onPress: (courtId: number) => void;
  onDelete: (courtId: number) => void;
};

const HomeCard: React.FC<Props> = ({court, onPress, onDelete}) => {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    onDelete(court.id);
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={court.photos}
        renderItem={({item}) => (
          <Image source={{uri: item}} style={styles.image} resizeMode="cover" />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{court.name}</Text>
        <Text style={styles.description}>{court.description}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() => onPress(court.id)}>
            <Text style={styles.detailsButtonText}>Ver Detalhes da Quadra</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => setShowModal(true)}>
            <Text style={styles.deleteButtonText}>Excluir Quadra</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Deseja excluir esta quadra?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setShowModal(false)}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalConfirmButton}
                onPress={handleDelete}>
                <Text style={styles.modalButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: width - 2,
    height: 200,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsButton: {
    backgroundColor: '#00786A',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#E66901',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
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
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#E66901',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  modalConfirmButton: {
    backgroundColor: '#00786A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HomeCard;
