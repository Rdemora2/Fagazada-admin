import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {WelcomeScreenNavigationProp} from '../types/types';

type Props = {
  navigation: WelcomeScreenNavigationProp;
};

const WelcomeScreen: React.FC<Props> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Fagazada Gestores!</Text>
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
      <Button
        title="Registrar"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default WelcomeScreen;
