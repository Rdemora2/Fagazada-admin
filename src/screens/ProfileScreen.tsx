import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../types/types';
import {fetchProfile} from '../services/apiMock';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile'
>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

type Props = {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
};

const ProfileScreen: React.FC<Props> = ({navigation, route}) => {
  const {userId} = route.params;
  const [profile, setProfile] = useState<{name: string; age: number} | null>(
    null,
  );

  useEffect(() => {
    const getProfile = async () => {
      try {
        const userProfile = await fetchProfile(userId);
        setProfile(userProfile);
      } catch (error) {
        console.error('Erro ao buscar perfil:', error);
      }
    };

    getProfile();
  }, [userId]);

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text>Nome: {profile.name}</Text>
      <Text>Idade: {profile.age}</Text>
      <Button
        title="Editar Perfil"
        onPress={() => navigation.navigate('EditProfile', {userId})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});

export default ProfileScreen;
