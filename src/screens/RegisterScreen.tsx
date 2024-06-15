import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Text} from 'react-native';
import {register} from '../services/apiMock';
import {RegisterScreenNavigationProp} from '../types/types';

type Props = {
  navigation: RegisterScreenNavigationProp;
};

const RegisterScreen: React.FC<Props> = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cpf, setCpf] = useState('');
  const [address, setAddress] = useState('');
  const [photo, setPhoto] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async () => {
    try {
      await register(
        fullName,
        email,
        password,
        nickname,
        phoneNumber,
        cpf,
        address,
        photo,
        role as any,
      );
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
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
      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <Text style={styles.label}>Apelido (opcional)</Text>
      <TextInput
        style={styles.input}
        value={nickname}
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
        value={photo}
        onChangeText={text => setPhoto(text)}
      />
      <Text style={styles.label}>Papel</Text>
      <TextInput
        style={styles.input}
        value={role}
        onChangeText={text => setRole(text)}
        placeholder="dono, gestor ou professor"
      />
      <Button title="Registrar" onPress={handleSubmit} />
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

export default RegisterScreen;
