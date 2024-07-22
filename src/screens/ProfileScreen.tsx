import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {fetchProfile} from '../services/apiMock';
import {ProfileScreenNavigationProp, RootStackParamList} from '../types/types';
import {RouteProp} from '@react-navigation/native';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

type Props = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
};

const ProfileScreen: React.FC<Props> = ({route, navigation}) => {
  const userId = route.params?.userId;
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        if (userId) {
          const data = await fetchProfile(userId);
          setProfile(data);
        } else {
          console.error('userId não disponível');
        }
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
      }
    };

    loadProfile();
  }, [userId]);

  if (!userId) {
    return (
      <View style={styles.container}>
        <Text>Erro: ID do usuário não disponível.</Text>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text>Carregando perfil...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome Completo: {profile.fullName}</Text>
      <Text style={styles.label}>Email: {profile.email}</Text>
      <Text style={styles.label}>Número de Contato: {profile.phoneNumber}</Text>
      <Text style={styles.label}>CPF: {profile.cpf}</Text>
      <Text style={styles.label}>Endereço: {profile.address}</Text>
      <Text style={styles.label}>Papel: {profile.role}</Text>
      <Button
        title="Editar Perfil"
        onPress={() => {
          navigation.navigate('EditProfile', {userId});
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default ProfileScreen;
