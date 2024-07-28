import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/HomeScreen';
import CourtListScreen from './screens/CourtListScreen';
import CourtDetailScreen from './screens/CourtDetailScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import AddCourtScreen from './screens/AddCourtScreen';
import EditCourtScreen from './screens/EditCourtScreen';
import ReservationListScreen from './screens/ReservationListScreen';
import MenuScreen from './screens/MenuScreen';
import AuthenticationScreen from './screens/authScreen';
import {RootStackParamList} from './types/types';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Início') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Reservas') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Menu') {
            iconName = focused ? 'menu' : 'menu-outline';
          }

          return <Ionicons name={iconName ?? ''} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#E66901',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingTop: 10,
          paddingBottom: 10,
          height: 60,
        },
        headerShown: false,
      })}>
      <Tab.Screen name="Início" component={HomeScreen} />
      <Tab.Screen name="Reservas" component={ReservationListScreen} />
      <Tab.Screen name="Menu" component={MenuScreen} />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Authentication"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#00786A',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen
          name="Authentication"
          component={AuthenticationScreen}
          options={{title: '', headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={MainTabs}
          options={{title: 'Fagazada gestores', headerLeft: () => null}}
        />
        <Stack.Screen
          name="CourtList"
          component={CourtListScreen}
          options={{title: 'Lista de Quadras'}}
        />
        <Stack.Screen
          name="CourtDetail"
          component={CourtDetailScreen}
          options={{title: 'Detalhes da Quadra'}}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{title: 'Perfil'}}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{title: 'Editar Perfil'}}
        />
        <Stack.Screen
          name="AddCourt"
          component={AddCourtScreen}
          options={{title: 'Adicionar Quadra'}}
        />
        <Stack.Screen
          name="EditCourt"
          component={EditCourtScreen}
          options={{title: 'Editar Quadra'}}
        />
        <Stack.Screen
          name="ReservationList"
          component={ReservationListScreen}
          options={{title: 'Lista de Reservas'}}
        />
        <Stack.Screen
          name="Menu"
          component={MenuScreen}
          options={{title: 'Menu'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
