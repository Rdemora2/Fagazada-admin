import React, {useEffect, useState} from 'react';
import {View, TextInput, Button, StyleSheet, Text} from 'react-native';
import {updateProfile, fetchProfile} from '../services/apiMock';
import {
  EditProfileScreenNavigationProp,
  RootStackParamList,
} from '../types/types';
import {RouteProp} from '@react-navigation/native';

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
      navigation.navigate('Profile', {userId});
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome Completo</Text>
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={text => setFullName(text)}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Text style={styles.label}>Apelido (opcional)</Text>
      <TextInput
        style={styles.input}
        value={nickname || ''}
        onChangeText={text => setNickname(text)}
      />
      <Text style={styles.label}>Número de Contato</Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
      />
      <Text style={styles.label}>CPF</Text>
      <TextInput
        style={styles.input}
        value={cpf}
        onChangeText={text => setCpf(text)}
      />
      <Text style={styles.label}>Endereço</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={text => setAddress(text)}
      />
      <Text style={styles.label}>URL da Foto</Text>
      <TextInput
        style={styles.input}
        value={photo || ''}
        onChangeText={text => setPhoto(text)}
      />
      <Text style={styles.label}>Papel</Text>
      <TextInput
        style={styles.input}
        value={role}
        onChangeText={text => setRole(text)}
        placeholder="dono, gestor ou professor"
      />
      <Button title="Atualizar Perfil" onPress={handleSubmit} />
    </View>
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

export default EditProfileScreen;
