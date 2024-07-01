import React, {useState} from 'react';
import {
  View,
  TextInput,
  ImageBackground,
  SafeAreaView,
  Button,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {register} from '../services/apiMock';
import {RegisterScreenNavigationProp} from '../types/types';

type Props = {
  navigation: RegisterScreenNavigationProp;
};

const {width, height} = Dimensions.get('window');

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
    <SafeAreaView>
      <ImageBackground
        source={require('../assets/images/basquetBackground.jpg')}
        style={styles.fullScreen}>
        <BlurView style={styles.fullScreen} blurAmount={4}>
          <ScrollView style={styles.fullScreen}>
            <View style={styles.container}>
              <Text style={styles.title}>Cadastre-se na plataforma:</Text>

              <Text style={[styles.label, styles.labelStart]}>
                Nome Completo
              </Text>
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

              <Text style={[styles.label, styles.labelStart]}>
                Número de Contato
              </Text>
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
                placeholderTextColor="#ffffff"
              />

              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={handleSubmit}>
                <Text style={styles.buttonText}>Registrar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleNavigateToLogin}>
                <Text style={styles.registerText}>
                  Já tem uma conta? Faça login aqui
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </BlurView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    width: width,
    height: height,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    padding: 35,
    borderRadius: 25,
  },
  title: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#ffffff',
  },
  labelStart: {
    alignSelf: 'flex-start',
    textAlign: 'left',
    width: '100%',
  },
  input: {
    width: '100%',
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E66901',
    color: '#ffffff',
    backgroundColor: 'rgba(0, 0, 0, 0.17)',
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
