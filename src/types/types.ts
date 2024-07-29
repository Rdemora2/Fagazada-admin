import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

export type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
  Login: undefined;
  Register: undefined;
  CourtList: undefined;
  CourtDetail: {courtId: number};
  Profile: {userId: number};
  EditProfile: {userId: number};
  AddCourt: undefined;
  EditCourt: {courtId: number};
  ReservationList: undefined;
  ReservationDetail: {reservationId: number; onGoBack: () => void};
  IdentificationScreen: undefined;
  Menu: {userId: number};
  Authentication: undefined;
  AddReservation: undefined;
};

export interface Court {
  id: number;
  companyId: number;
  name: string;
  type: string;
  description: string;
  photos: string[];
  hourlyRate: number;
  address: string;
  workingHours: string;
  workingDays: string;
  optionalServices: string[];
  monthlyRate?: number;
}

export interface Reservation {
  id: number;
  courtId: number;
  userId: number;
  value: number;
  date: string;
  status: 'pending' | 'confirmed' | 'canceled';
  startTime: string;
  endTime: string;
}

export interface Timeslot {
  startTime: string;
  endTime: string;
}

export type User = {
  id: number;
  email: string;
  password: string;
  fullName: string;
  nickname?: string;
  phoneNumber: string;
  cpf: string;
  address: string;
  photo?: string;
  role: string;
};

export type Client = {
  id: number;
  fullName: string;
  birthDate: string;
  cpf: string;
  gender: string;
  email: string;
  phoneNumber: string;
};

export type WelcomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Welcome'
>;
export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;
export type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;
export type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Register'
>;
export type CourtListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CourtList'
>;
export type CourtDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CourtDetail'
>;
export type CourtDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'CourtDetail'
>;

export type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile'
>;
export type EditProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EditProfile'
>;
export type AddCourtScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddCourt'
>;
export type EditCourtScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EditCourt'
>;
export type ReservationListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ReservationList'
>;
export type ReservationDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ReservationDetail'
>;
export type ReservationDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'ReservationDetail'
>;

export type AddReservationScreenRouteProp = RouteProp<
  RootStackParamList,
  'AddReservation'
>;
