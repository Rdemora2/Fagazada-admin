import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {useNavigation, useIsFocused, RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../types/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {fetchProfile} from '../services/apiMock';

type MenuScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Menu'>;
type MenuScreenRouteProp = RouteProp<RootStackParamList, 'Menu'>;

type Props = {
  navigation: MenuScreenNavigationProp;
  route: MenuScreenRouteProp;
};

const MenuScreen: React.FC<Props> = ({route, navigation}) => {
  const {userId} = route.params;
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

  const menuItems = [
    {
      id: '1',
      title: 'Perfil',
      navigateTo: 'Profile' as keyof RootStackParamList,
    },
  ];

  const handleNavigation = (navigateTo: keyof RootStackParamList) => {
    switch (navigateTo) {
      case 'Profile':
      case 'EditProfile':
        navigation.navigate(navigateTo, {userId});
        break;
      case 'Menu':
        navigation.navigate(navigateTo, {userId});
        break;
      default:
        navigation.navigate(navigateTo as never);
    }
  };

  const renderItem = ({item}: {item: (typeof menuItems)[0]}) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => handleNavigation(item.navigateTo)}>
      <Text style={styles.buttonText}>{item.title}</Text>
    </TouchableOpacity>
  );

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text>Carregando perfil...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Olá, {profile.fullName}</Text>
      <FlatList
        data={menuItems}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#fafafa',
    padding: 12,
    borderRadius: 0,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E66901',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#00786A',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MenuScreen;
