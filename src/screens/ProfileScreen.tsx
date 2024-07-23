import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {fetchProfile} from '../services/apiMock';
import {ProfileScreenNavigationProp, RootStackParamList} from '../types/types';
import {RouteProp} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

type Props = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
};

const ProfileScreen: React.FC<Props> = ({route, navigation}) => {
  const userId = route.params?.userId;
  const [profile, setProfile] = useState<any>(null);
  const isFocused = useIsFocused();

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

  useEffect(() => {
    if (isFocused) {
      loadProfile();
    }
  }, [isFocused, userId]);

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
      <View style={styles.item}>
        <Ionicons name="person" size={24} style={styles.icon} />
        <Text style={styles.text}>{profile.fullName}</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.item}>
        <Ionicons name="mail" size={24} style={styles.icon} />
        <Text style={styles.text}>{profile.email}</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.item}>
        <Ionicons name="call" size={24} style={styles.icon} />
        <Text style={styles.text}>{profile.phoneNumber}</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.item}>
        <Ionicons name="card" size={24} style={styles.icon} />
        <Text style={styles.text}>{profile.cpf}</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.item}>
        <Ionicons name="home" size={24} style={styles.icon} />
        <Text style={styles.text}>{profile.address}</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.item}>
        <Ionicons name="briefcase" size={24} style={styles.icon} />
        <Text style={styles.text}>{profile.role}</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.buttonContainer}>
        <View
          style={styles.button}
          onTouchEnd={() => navigation.navigate('EditProfile', {userId})}>
          <Text style={styles.buttonText}>Editar Perfil</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
    color: '#00786A',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#E66901',
    marginHorizontal: 10,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#00786A',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
