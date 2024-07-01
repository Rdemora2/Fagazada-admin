import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BlurView} from '@react-native-community/blur';

export default function App(): React.JSX.Element {
  const navigation = useNavigation();

  const handleContinue = () => {
    navigation.navigate('IdentificationScreen' as never);
  };

  return (
    <SafeAreaView>
      <ImageBackground
        source={require('../assets/images/basquetBackground.jpg')}
        style={styles.fullScreen}>
        <BlurView style={styles.fullScreen} blurAmount={4}>
          <View style={styles.container}>
            <ImageBackground
              style={styles.logo}
              source={require('../assets/images/logo.png')}
            />
            <View style={styles.spacingContainer} />
            <View style={styles.inputContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.paragraph1}>Bem vindo ao</Text>
                <Text style={styles.paragraph2}>Fagazada Gestores</Text>
                <Text style={styles.paragraph3}>
                  Sua plataforma de aluguel de quadras a um toque
                </Text>
              </View>
              <TouchableOpacity onPress={handleContinue}>
                <View style={styles.continueButton}>
                  <Text style={styles.buttonText}>Continuar</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </ImageBackground>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  fullScreen: {
    width: '100%',
    height: '100%',
  },
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    paddingTop: 130,
    paddingBottom: 40,
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
    width: '90%',
    height: '43%',
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
    height: 190,
  },
  textContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    paddingTop: 6,
    paddingBottom: 6,
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
  continueButton: {
    display: 'flex',
    width: '100%',
    backgroundColor: '#00786a',
    paddingTop: 14,
    paddingRight: 24,
    paddingBottom: 14,
    paddingLeft: 24,
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
