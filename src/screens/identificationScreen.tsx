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
import {useNavigation} from '@react-navigation/native';
import {BlurView} from '@react-native-community/blur';
import {checkEmail} from '../services/apiMock';

const {width, height} = Dimensions.get('window');

export default function IdentificationScreen(): React.JSX.Element {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleContinue = async () => {
    try {
      const user = await checkEmail(email);
      if (user) {
        navigation.navigate('Login' as never);
      }
    } catch (error) {
      navigation.navigate('Register' as never);
    }
  };

  const handleBack = () => {
    navigation.goBack();
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
              <View style={styles.inputContainer}>
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
                  <TouchableOpacity onPress={handleContinue}>
                    <View style={styles.continueButton}>
                      <Text style={styles.buttonText}>Continuar</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleBack}>
                    <View style={styles.backButton}>
                      <Text style={styles.buttonText}>Voltar</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </BlurView>
      </ImageBackground>
    </SafeAreaView>
  );
}

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
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '55%',
    backgroundColor: 'rgba(0, 0, 0, 0.24)',
    paddingTop: 30,
    paddingBottom: 30,
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
    height: '45%',
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
  buttonText: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: '#ffffff',
  },
});
