import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
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

  const handleNavigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Cadastre-se</Text>

        <Text style={[styles.label, styles.labelStart]}>Nome Completo</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={text => setFullName(text)}
        />

        <Text style={[styles.label, styles.labelStart]}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
        />

        <Text style={[styles.label, styles.labelStart]}>Senha</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />

        <Text style={[styles.label, styles.labelStart]}>
          Apelido (opcional)
        </Text>
        <TextInput
          style={styles.input}
          value={nickname}
          onChangeText={text => setNickname(text)}
        />

        <Text style={[styles.label, styles.labelStart]}>Número de Contato</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
        />

        <Text style={[styles.label, styles.labelStart]}>CPF</Text>
        <TextInput
          style={styles.input}
          value={cpf}
          onChangeText={text => setCpf(text)}
        />

        <Text style={[styles.label, styles.labelStart]}>Endereço</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={text => setAddress(text)}
        />

        <Text style={[styles.label, styles.labelStart]}>URL da Foto</Text>
        <TextInput
          style={styles.input}
          value={photo}
          onChangeText={text => setPhoto(text)}
        />

        <Text style={[styles.label, styles.labelStart]}>Papel</Text>
        <TextInput
          style={styles.input}
          value={role}
          onChangeText={text => setRole(text)}
          placeholder="dono, gestor ou professor"
        />

        <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNavigateToLogin}>
          <Text style={styles.registerText}>
            Já tem uma conta? Faça login aqui
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#f6f6f6',
    padding: 16,
  },
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#00786A',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#00786A',
  },
  labelStart: {
    alignSelf: 'flex-start',
    textAlign: 'left',
    width: '100%',
  },
  input: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E66901',
    paddingHorizontal: 10,
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: '#fff',
    color: '#333',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 12,
    backgroundColor: '#00786A',
    paddingVertical: 12,
    borderRadius: 16,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerText: {
    marginTop: 16,
    color: '#E66901',
  },
});

export default RegisterScreen;
