// src/screens/MenuScreen.tsx
import React from 'react';
import {View, Text, Button, FlatList, StyleSheet} from 'react-native';
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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{userName}</Text>
      <FlatList
        data={menuItems}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Button
            title={item.title}
            onPress={() => handleNavigation(item.navigateTo)}
          />
        )}
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default MenuScreen;
