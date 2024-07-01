import React, {useState} from 'react';
import {
  View,
  TextInput,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {LoginScreenNavigationProp} from '../types/types';
import {login} from '../services/apiMock';

type Props = {
  navigation: LoginScreenNavigationProp;
};

const {width, height} = Dimensions.get('window');

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
    <SafeAreaView>
      <ImageBackground
        source={require('../assets/images/basquetBackground.jpg')}
        style={styles.fullScreen}>
        <BlurView style={styles.fullScreen} blurAmount={4}>
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.inputContainer}>
                <Text style={styles.title}>Faça seu login:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#ffffff"
                  value={email}
                  onChangeText={setEmail}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Senha"
                  placeholderTextColor="#ffffff"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={handleLogin}>
                  <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNavigateToRegister}>
                  <Text style={styles.registerText}>
                    Não tem uma conta? Cadastre-se aqui
                  </Text>
                </TouchableOpacity>
              </View>
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
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '55%',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    padding: 35,
    borderRadius: 25,
  },
  title: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 24,
  },
  input: {
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 0,
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

export default LoginScreen;
