import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {checkEmail, login, register} from '../services/apiMock';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const AuthenticationScreen = () => {
  const navigation = useNavigation();
  const [step, setStep] = useState('welcome'); // 'welcome', 'identification', 'login', 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [nickname, setNickname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cpf, setCpf] = useState('');
  const [address, setAddress] = useState('');
  const [photo, setPhoto] = useState('');
  const [role, setRole] = useState('');

  const handleContinueFromWelcome = () => setStep('identification');
  const handleContinueFromIdentification = async () => {
    try {
      const user = await checkEmail(email);
      if (user) {
        setStep('login');
      }
    } catch (error) {
      setStep('register');
    }
  };

  const handleLogin = async () => {
    try {
      const user = await login(email, password);
      navigation.navigate('Home', {
        screen: 'Home',
        params: {
          userName: user.fullName,
          userId: user.id,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao fazer login:', error.message);
      } else {
        console.error('Erro ao fazer login:', error);
      }
    }
  };

  const handleRegister = async () => {
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
        role,
      );
      navigation.navigate('Home', {
        screen: 'Menu',
        params: {
          userName: fullName,
          userId: id,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao registrar usuário:', error.message);
      } else {
        console.error('Erro ao registrar usuário:', error);
      }
    }
  };

  return (
    <SafeAreaView>
      <ImageBackground
        source={require('../assets/images/basquetBackground.jpg')}
        style={styles.fullScreen}>
        <BlurView style={styles.fullScreen} blurAmount={4}>
          <ScrollView>
            <View style={styles.container}>
              <ImageBackground
                style={styles.logo}
                source={require('../assets/images/logo.png')}
              />
              <View style={styles.spacingContainer} />
              {step === 'welcome' && (
                <View style={styles.welcomeContainer}>
                  <View style={styles.textContainer}>
                    <Text style={styles.paragraph1}>Bem vindo ao</Text>
                    <Text style={styles.paragraph2}>Fagazada Gestores</Text>
                    <Text style={styles.paragraph3}>
                      Sua plataforma de aluguel de quadras a um toque
                    </Text>
                  </View>
                  <TouchableOpacity onPress={handleContinueFromWelcome}>
                    <View style={styles.continueButton}>
                      <Text style={styles.buttonText}>Continuar</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              {step === 'identification' && (
                <View style={styles.identificationContainer}>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.loginTitle}>Identifique-se</Text>
                    <Text style={styles.label}>E-mail:</Text>
                    <View style={styles.inputBackground}>
                      <TextInput
                        style={styles.input}
                        placeholder="Insira seu e-mail"
                        placeholderTextColor="#ffffff"
                        value={email}
                        onChangeText={setEmail}
                      />
                    </View>
                  </View>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={handleContinueFromIdentification}>
                      <View style={styles.continueButton}>
                        <Text style={styles.buttonText}>Continuar</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setStep('welcome')}>
                      <View style={styles.backButton}>
                        <Text style={styles.buttonText}>Voltar</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              {step === 'login' && (
                <View style={styles.loginContainer}>
                  <Text style={styles.title}>Faça seu login:</Text>
                  <TextInput
                    style={styles.loginInput}
                    placeholder="Email"
                    placeholderTextColor="#ffffff"
                    value={email}
                    onChangeText={setEmail}
                  />
                  <TextInput
                    style={styles.loginInput}
                    placeholder="Senha"
                    placeholderTextColor="#ffffff"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                  <TouchableOpacity
                    style={styles.loginButtonContainer}
                    onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Entrar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setStep('register')}>
                    <Text style={styles.registerText}>
                      Não tem uma conta? Cadastre-se aqui
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              {step === 'register' && (
                <View style={styles.registerContainer}>
                  <Text style={styles.title}>Cadastre-se na plataforma:</Text>
                  <Text style={[styles.label, styles.labelStart]}>
                    Nome Completo
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={fullName}
                    onChangeText={setFullName}
                  />
                  <Text style={[styles.label, styles.labelStart]}>Email</Text>
                  <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                  />
                  <Text style={[styles.label, styles.labelStart]}>Senha</Text>
                  <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                  <Text style={[styles.label, styles.labelStart]}>
                    Apelido (opcional)
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={nickname}
                    onChangeText={setNickname}
                  />
                  <Text style={[styles.label, styles.labelStart]}>
                    Número de Contato
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                  />
                  <Text style={[styles.label, styles.labelStart]}>CPF</Text>
                  <TextInput
                    style={styles.input}
                    value={cpf}
                    onChangeText={setCpf}
                  />
                  <Text style={[styles.label, styles.labelStart]}>
                    Endereço
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={address}
                    onChangeText={setAddress}
                  />
                  <Text style={[styles.label, styles.labelStart]}>
                    URL da Foto
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={photo}
                    onChangeText={setPhoto}
                  />
                  <Text style={[styles.label, styles.labelStart]}>Papel</Text>
                  <TextInput
                    style={styles.input}
                    value={role}
                    onChangeText={setRole}
                    placeholder="dono, gestor ou professor"
                    placeholderTextColor="#ffffff"
                  />
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={handleRegister}>
                    <Text style={styles.buttonText}>Registrar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setStep('login')}>
                    <Text style={styles.registerText}>
                      Já tem uma conta? Faça login aqui
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
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
    display: 'flex',
    width: width,
    height: height,
    paddingTop: 130,
    paddingBottom: 80,
    paddingRight: 30,
    paddingLeft: 30,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  welcomeContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    height: '43%',
    backgroundColor: 'rgba(0, 0, 0, 0.24)',
    paddingTop: 30,
    paddingBottom: 30,
    borderRadius: 25,
  },
  identificationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    height: '47%',
    backgroundColor: 'rgba(0, 0, 0, 0.24)',
    paddingTop: 30,
    paddingBottom: 30,
    borderRadius: 25,
  },
  loginContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: '55%',
    backgroundColor: 'rgba(0, 0, 0, 0.24)',
    padding: 35,
    borderRadius: 25,
  },
  registerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: '80%',
    backgroundColor: 'rgba(0, 0, 0, 0.24)',
    padding: 30,
    borderRadius: 25,
  },
  logo: {
    width: 300,
    height: 187,
  },
  spacingContainer: {
    width: '100%',
    height: 140,
  },
  inputWrapper: {
    width: '80%',
    height: '35%',
  },
  label: {
    height: '30%',
    flexBasis: 'auto',
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'left',
  },
  loginTitle: {
    height: '35%',
    flexBasis: 'auto',
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 24,
    color: '#ffffff',
    textAlign: 'center',
  },
  inputBackground: {
    display: 'flex',
    width: '100%',
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.17)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e66901',
  },
  input: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexBasis: 'auto',
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'left',
  },
  loginInput: {
    width: '100%',
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
    height: 'auto',
    alignItems: 'center',
    gap: 10,
  },
  continueButton: {
    display: 'flex',
    width: 150,
    height: 'auto',
    paddingTop: 14,
    paddingRight: 24,
    paddingBottom: 14,
    paddingLeft: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00786a',
    borderRadius: 20,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
  },
  backButton: {
    display: 'flex',
    width: 150,
    height: 'auto',
    paddingTop: 14,
    paddingRight: 24,
    paddingBottom: 14,
    paddingLeft: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e66901',
    borderRadius: 20,
  },
  loginButtonContainer: {
    width: '100%',
    marginTop: 12,
    backgroundColor: '#00786A',
    paddingVertical: 12,
    borderRadius: 16,
  },
  loginButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: '#ffffff',
  },
  title: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 24,
  },
  labelStart: {
    alignSelf: 'flex-start',
    textAlign: 'left',
    width: '100%',
  },
  registerText: {
    marginTop: 16,
    color: '#E66901',
  },
  textContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    paddingTop: 6,
    paddingBottom: 26,
  },
  paragraph1: {
    display: 'flex',
    textAlign: 'center',
    width: '100%',
    fontSize: 24,
    lineHeight: 29,
    fontFamily: 'Inter',
    fontWeight: '700',
    color: '#ffffff',
  },
  paragraph2: {
    display: 'flex',
    textAlign: 'center',
    width: '100%',
    fontSize: 28,
    lineHeight: 42,
    fontFamily: 'Inter',
    fontWeight: '700',
    color: '#ffffff',
  },
  paragraph3: {
    display: 'flex',
    textAlign: 'center',
    width: '90%',
    fontSize: 22,
    lineHeight: 33,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: '#ffffff',
  },
});

export default AuthenticationScreen;
