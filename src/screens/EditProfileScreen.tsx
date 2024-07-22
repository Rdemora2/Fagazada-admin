import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {updateProfile, fetchProfile} from '../services/apiMock';
import {
  EditProfileScreenNavigationProp,
  RootStackParamList,
} from '../types/types';
import {RouteProp} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type EditProfileScreenRouteProp = RouteProp<RootStackParamList, 'EditProfile'>;

type Props = {
  route: EditProfileScreenRouteProp;
  navigation: EditProfileScreenNavigationProp;
};

const EditProfileScreen: React.FC<Props> = ({route, navigation}) => {
  const {userId} = route.params;
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [nickname, setNickname] = useState<string | undefined>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [photo, setPhoto] = useState<string | undefined>('');
  const [role, setRole] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchProfile(userId);
        setFullName(data.fullName);
        setEmail(data.email);
        setNickname(data.nickname);
        setPhoneNumber(data.phoneNumber);
        setCpf(data.cpf);
        setAddress(data.address);
        setPhoto(data.photo);
        setRole(data.role);
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
      }
    };

    loadProfile();
  }, [userId]);

  const handleSubmit = async () => {
    try {
      await updateProfile(userId, {
        fullName,
        nickname,
        phoneNumber,
        cpf,
        address,
        photo,
        role,
      });
      setIsModalVisible(true);
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    navigation.navigate('Profile', {userId});
  };

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Ionicons name="person" size={24} style={styles.icon} />
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={text => setFullName(text)}
          placeholder="Nome Completo"
        />
      </View>
      <View style={styles.item}>
        <Ionicons name="mail" size={24} style={styles.icon} />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="Email"
        />
      </View>
      <View style={styles.item}>
        <Ionicons name="call" size={24} style={styles.icon} />
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
          placeholder="Número de Contato"
        />
      </View>
      <View style={styles.item}>
        <Ionicons name="card" size={24} style={styles.icon} />
        <TextInput
          style={styles.input}
          value={cpf}
          onChangeText={text => setCpf(text)}
          placeholder="CPF"
        />
      </View>
      <View style={styles.item}>
        <Ionicons name="home" size={24} style={styles.icon} />
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={text => setAddress(text)}
          placeholder="Endereço"
        />
      </View>
      <View style={styles.item}>
        <Ionicons name="briefcase" size={24} style={styles.icon} />
        <TextInput
          style={styles.input}
          value={role}
          onChangeText={text => setRole(text)}
          placeholder="Papel"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Atualizar Perfil"
          onPress={handleSubmit}
          color="#00786A"
        />
      </View>

      <Modal visible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Perfil Atualizado!</Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={handleModalClose}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
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
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
    color: '#00786A',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#E66901',
    marginHorizontal: 10,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#00786A',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#00786A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default EditProfileScreen;
