import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {LoginScreenNavigationProp} from '../types/types';
import {login} from '../services/apiMock';

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const user = await login(email, password);
      navigation.navigate('Home');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao fazer login:', error.message);
      } else {
        console.error('Erro ao fazer login:', error);
      }
    }
  };

  const handleNavigateToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNavigateToRegister}>
        <Text style={styles.registerText}>
          Não tem uma conta? Cadastre-se aqui
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#00786A',
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

export default LoginScreen;
