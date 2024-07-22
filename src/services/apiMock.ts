import {Court, Reservation, User, Availability} from '../types/types';

const users: User[] = [
  {
    id: 1,
    email: 'admin@fagazada.com',
    password: '12345',
    fullName: 'Admin Fagazada',
    nickname: 'admin_fagazada',
    phoneNumber: '(11) 9 8765-4321',
    cpf: '123.456.789-00',
    address: 'Avenida fagazada, 123',
    photo: '',
    role: 'dono',
  },
  {
    id: 2,
    email: 'teste@fagazada.com',
    password: '12345',
    fullName: 'Teste Fagazada',
    nickname: 'teste_fagazada',
    phoneNumber: '(11) 9 4321-8765',
    cpf: '987.654.321-00',
    address: 'Avenida fagazada, 321',
    photo: '',
    role: 'dono',
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
    address: 'Rua A, 123',
    workingHours: '8:00 - 18:00',
    workingDays: 'Seg - Sab',
    optionalServices: ['professor', 'aluguel de bolas'],
  },
  {
    id: 2,
    name: 'Quadra 2',
    type: 'basquete',
    description: 'Quadra de basquete',
    photos: [
      'https://static1.squarespace.com/static/5cee719a52ab760001a563d8/5d12491fca4ce20001fb0e24/5d1249faca4ce20001fb4028/1561479674612/56d450bbd5fd513636077becc9f843d50db0ee97a826b.jpg?format=original',
      'https://www.sescpr.com.br/wp-content/uploads/2020/11/20201001_173756.jpg',
    ],
    availability: [],
    hourlyRate: 60,
    address: 'Rua B, 456',
    workingHours: '10:00 - 22:00',
    workingDays: 'Ter - Dom',
    optionalServices: ['aluguel de bolas'],
  },
];

const reservations: Reservation[] = [
  {
    id: 1,
    courtId: 1,
    userId: 1,
    value: 100,
    date: '2023-07-01',
    status: 'pending',
    startTime: '12:00',
    endTime: '13:00',
  },
  {
    id: 2,
    courtId: 2,
    userId: 2,
    value: 200,
    date: '2023-07-02',
    status: 'confirmed',
    startTime: '18:00',
    endTime: '20:00',
  },
  {
    id: 3,
    courtId: 2,
    userId: 1,
    value: 200,
    date: '2023-07-09',
    status: 'confirmed',
    startTime: '11:00',
    endTime: '13:00',
  },
  {
    id: 4,
    courtId: 2,
    userId: 2,
    value: 100,
    date: '2023-07-09',
    status: 'confirmed',
    startTime: '11:00',
    endTime: '12:00',
  },
];

const availabilities: Availability[] = [];

export const login = async (email: string, password: string) => {
  await new Promise(resolve => setTimeout(resolve, 100));

  const user = users.find(
    user => user.email === email && user.password === password,
  );

  if (!user) {
    throw new Error('Credenciais inválidas');
  }

  return user;
};

export const checkEmail = async (email: string) => {
  await new Promise(resolve => setTimeout(resolve, 100));

  const user = users.find(user => user.email === email);

  if (!user) {
    throw new Error('Usuário não encontrado');
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
  await new Promise(resolve => setTimeout(resolve, 100));

  const existingUser = users.find(user => user.email === email);

  if (existingUser) {
    throw new Error('Email já registrado');
  }

  const newUser: User = {
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
  };

  users.push(newUser);

  return newUser;
};

export const fetchProfile = async (userId: number) => {
  await new Promise(resolve => setTimeout(resolve, 100));

  const user = users.find(user => user.id == userId);

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  return user;
};

export const updateProfile = async (userId: number, profile: Partial<User>) => {
  await new Promise(resolve => setTimeout(resolve, 100));

  const userIndex = users.findIndex(user => user.id == userId);

  if (userIndex === -1) {
    throw new Error('Usuário não encontrado');
  }

  users[userIndex] = {...users[userIndex], ...profile};

  return users[userIndex];
};

export const fetchCourts = async () => {
  await new Promise(resolve => setTimeout(resolve, 100));

  return courts;
};

export const fetchCourtDetails = async (courtId: number) => {
  await new Promise(resolve => setTimeout(resolve, 100));

  const court = courts.find(court => court.id === courtId);

  if (!court) {
    throw new Error('Quadra não encontrada');
  }

  return court;
};

export const addCourt = async (court: Omit<Court, 'id'>) => {
  await new Promise(resolve => setTimeout(resolve, 100));

  const newCourt = {...court, id: courts.length + 1};
  courts.push(newCourt);

  return newCourt;
};

export const updateCourt = async (
  courtId: number,
  updatedDetails: Partial<Court>,
) => {
  await new Promise(resolve => setTimeout(resolve, 100));

  const courtIndex = courts.findIndex(court => court.id === courtId);

  if (courtIndex === -1) {
    throw new Error('Quadra não encontrada');
  }

  courts[courtIndex] = {...courts[courtIndex], ...updatedDetails};

  return courts[courtIndex];
};

export const fetchReservations = async (userId: number) => {
  await new Promise(resolve => setTimeout(resolve, 100));

  return reservations.filter(reservation => reservation.userId === userId);
};

export const updateReservationStatus = async (
  reservationId: number,
  status: 'pending' | 'confirmed',
) => {
  await new Promise(resolve => setTimeout(resolve, 100));

  const reservation = reservations.find(res => res.id === reservationId);

  if (!reservation) {
    throw new Error('Reserva não encontrada');
  }

  reservation.status = status;

  return reservation;
};

export const fetchAvailabilities = async () => {
  await new Promise(resolve => setTimeout(resolve, 100));

  return availabilities;
};

export const addAvailability = async (
  availability: Omit<Availability, 'id'>,
) => {
  await new Promise(resolve => setTimeout(resolve, 100));

  const newAvailability = {...availability, id: availabilities.length + 1};
  availabilities.push(newAvailability);

  return newAvailability;
};

export const bulkAddAvailability = async (
  availabilitiesToAdd: Omit<Availability, 'id'>[],
) => {
  await new Promise(resolve => setTimeout(resolve, 100));

  const newAvailabilities = availabilitiesToAdd.map((availability, index) => ({
    ...availability,
    id: availabilities.length + index + 1,
  }));

  availabilities.push(...newAvailabilities);

  return newAvailabilities;
};
