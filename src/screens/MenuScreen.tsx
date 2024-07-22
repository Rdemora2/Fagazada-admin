// src/screens/MenuScreen.tsx
import React from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {useNavigation, RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../types/types';
import {StackNavigationProp} from '@react-navigation/stack';

type MenuScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Menu'>;
type MenuScreenRouteProp = RouteProp<RootStackParamList, 'Menu'>;

type Props = {
  navigation: MenuScreenNavigationProp;
  route: MenuScreenRouteProp;
};

const MenuScreen: React.FC<Props> = ({route, navigation}) => {
  const {userName, userId} = route.params;

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
        navigation.navigate(navigateTo, {userName, userId});
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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Olá, {userName}</Text>
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
    borderTopWidth: 2,
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
