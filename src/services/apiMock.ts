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
    photos: [
      'https://www.pardinisport.com.br/img/servicos/quadra-de-tenis.jpg',
      'https://www.construtoraplaneta.com.br/wp-content/uploads/2021/03/DRONE-S-DIJON.00_15_52_33.Still003-scaled.jpg',
    ],
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
    photos: [
      'https://static1.squarespace.com/static/5cee719a52ab760001a563d8/5d12491fca4ce20001fb0e24/5d1249faca4ce20001fb4028/1561479674612/56d450bbd5fd513636077becc9f843d50db0ee97a826b.jpg?format=original',
      'data:image/jpeg;base64,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',
    ],
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
