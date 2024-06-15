import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../types/types';
import {fetchProfile, updateProfile} from '../services/apiMock';

type EditProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EditProfile'
>;
type EditProfileScreenRouteProp = RouteProp<RootStackParamList, 'EditProfile'>;

type Props = {
  navigation: EditProfileScreenNavigationProp;
  route: EditProfileScreenRouteProp;
};

const EditProfileScreen: React.FC<Props> = ({navigation, route}) => {
  const {userId} = route.params;
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | string>('');

  useEffect(() => {
    const getProfile = async () => {
      try {
        const userProfile = await fetchProfile(userId);
        setName(userProfile.name);
        setAge(userProfile.age);
      } catch (error) {
        console.error('Erro ao buscar perfil:', error);
      }
    };

    getProfile();
  }, [userId]);

  const handleSave = async () => {
    try {
      await updateProfile(userId, {name, age: Number(age)});
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Idade"
        value={age.toString()}
        onChangeText={text => setAge(Number(text))}
        keyboardType="numeric"
      />
      <Button title="Salvar" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
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
