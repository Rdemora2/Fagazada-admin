import {Court, Reservation, User} from '../types/types';

const users: User[] = [
  {
    id: 1,
    email: 'user1@example.com',
    password: 'password1',
    fullName: 'User One',
    nickname: 'U1',
    phoneNumber: '123456789',
    cpf: '123.456.789-00',
    address: 'Rua A, 123',
    photo: '',
    role: 'dono',
  },
  {
    id: 2,
    email: 'user2@example.com',
    password: 'password2',
    fullName: 'User Two',
    phoneNumber: '987654321',
    cpf: '987.654.321-00',
    address: 'Rua B, 456',
    photo: '',
    role: 'gestor',
  },
];

const courts: Court[] = [
  {
    id: 1,
    name: 'Quadra 1',
    type: 'tenis',
    description: 'Quadra de tênis',
    photos: [],
    availability: [],
    hourlyRate: 50,
    bookingPeriods: ['morning', 'afternoon'],
    address: 'Rua A, 123',
    workingHours: '8:00 - 18:00',
    optionalServices: ['professor', 'aluguel de bolas'],
  },
  {
    id: 2,
    name: 'Quadra 2',
    type: 'basquete',
    description: 'Quadra de basquete',
    photos: [],
    availability: [],
    hourlyRate: 60,
    bookingPeriods: ['morning', 'evening'],
    address: 'Rua B, 456',
    workingHours: '10:00 - 22:00',
    optionalServices: ['aluguel de bolas'],
  },
];

const reservations: Reservation[] = [
  {id: 1, courtId: 1, userId: 1, date: '2023-07-01', status: 'pending'},
  {id: 2, courtId: 2, userId: 2, date: '2023-07-02', status: 'confirmed'},
];

export const login = async (email: string, password: string) => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const user = users.find(
    user => user.email === email && user.password === password,
  );

  if (!user) {
    throw new Error('Credenciais inválidas');
  }

  return user;
};

export const register = async (
  email: string,
  password: string,
  fullName: string,
  nickname: string,
  phoneNumber: string,
  cpf: string,
  address: string,
  photo: string,
  role: string,
) => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const existingUser = users.find(user => user.email === email);

  if (existingUser) {
    throw new Error('Email já registrado');
  }

  const newUser = {
    id: users.length + 1,
    email,
    password,
    fullName,
    nickname,
    phoneNumber,
    cpf,
    address,
    photo,
    role,
    profile: {name: fullName, age: 0},
  };
  users.push(newUser);

  return newUser;
};

export const fetchProfile = async (userId: number) => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const user = users.find(user => user.id === userId);

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  return user;
};

export const updateProfile = async (
  userId: number,
  profile: {
    fullName: string;
    nickname?: string;
    phoneNumber: string;
    cpf: string;
    address: string;
    photo?: string;
    role: string;
  },
) => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const user = users.find(user => user.id === userId);

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  user.fullName = profile.fullName;
  user.nickname = profile.nickname;
  user.phoneNumber = profile.phoneNumber;
  user.cpf = profile.cpf;
  user.address = profile.address;
  user.photo = profile.photo;
  user.role = profile.role;

  return user;
};

export const fetchCourts = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return courts;
};

export const fetchCourtDetails = async (courtId: number) => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const court = courts.find(court => court.id === courtId);

  if (!court) {
    throw new Error('Quadra não encontrada');
  }

  return court;
};

export const addCourt = async (court: Omit<Court, 'id'>) => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const newCourt = {...court, id: courts.length + 1};
  courts.push(newCourt);

  return newCourt;
};

export const updateCourt = async (
  courtId: number,
  updatedDetails: Partial<Court>,
) => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const courtIndex = courts.findIndex(court => court.id === courtId);

  if (courtIndex === -1) {
    throw new Error('Quadra não encontrada');
  }

  courts[courtIndex] = {...courts[courtIndex], ...updatedDetails};

  return courts[courtIndex];
};

export const fetchReservations = async (userId: number) => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return reservations.filter(reservation => reservation.userId === userId);
};

export const updateReservationStatus = async (
  reservationId: number,
  status: 'pending' | 'confirmed',
) => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const reservation = reservations.find(res => res.id === reservationId);

  if (!reservation) {
    throw new Error('Reserva não encontrada');
  }

  reservation.status = status;

  return reservation;
};
