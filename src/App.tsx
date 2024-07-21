import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import CourtListScreen from './screens/CourtListScreen';
import CourtDetailScreen from './screens/CourtDetailScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import AddCourtScreen from './screens/AddCourtScreen';
import EditCourtScreen from './screens/EditCourtScreen';
import ReservationListScreen from './screens/ReservationListScreen';
import CourtAvailability from './screens/CourtAvailability';
import IdentificationScreen from './screens/identificationScreen';
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

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Início" component={HomeScreen} />
      <Tab.Screen name="Reservas" component={ReservationListScreen} />
      <Tab.Screen name="Menu" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#00786A',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {},
          headerShown: false,
        }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={MainTabs} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="CourtList" component={CourtListScreen} />
        <Stack.Screen name="CourtDetail" component={CourtDetailScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="AddCourt" component={AddCourtScreen} />
        <Stack.Screen name="EditCourt" component={EditCourtScreen} />
        <Stack.Screen
          name="IdentificationScreen"
          component={IdentificationScreen}
        />
        <Stack.Screen
          name="ReservationList"
          component={ReservationListScreen}
        />
        <Stack.Screen name="CourtAvailability" component={CourtAvailability} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
