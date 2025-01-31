import {Court, Reservation, User, Client} from '../types/types';

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

const clients: Client[] = [
  {
    id: 1,
    fullName: 'Roberto Fagazada',
    birthDate: '1990-01-01',
    cpf: '111.111.111-11',
    gender: 'male',
    email: 'cliente_01@fagazada.com',
    phoneNumber: '(11) 9 7387-4345',
  },
  {
    id: 2,
    fullName: 'cliente teste',
    birthDate: '1992-02-02',
    cpf: '222.222.222-22',
    gender: 'female',
    email: 'cliente--02@fagazada.com',
    phoneNumber: '(11) 9 8888-8888',
  },
];

const courts: Court[] = [
  {
    id: 1,
    companyId: 1,
    name: 'Quadra 1',
    type: 'tenis',
    description: 'Descrição da quadra de tênis',
    photos: [
      'https://www.pardinisport.com.br/img/servicos/quadra-de-tenis.jpg',
      'https://www.construtoraplaneta.com.br/wp-content/uploads/2021/03/DRONE-S-DIJON.00_15_52_33.Still003-scaled.jpg',
    ],
    hourlyRate: 50,
    address: 'Rua A, 123',
    workingHours: '8:00-18:00',
    workingDays: 'Segunda a Sexta',
    optionalServices: ['professor', 'aluguel de bolas'],
  },
  {
    id: 2,
    companyId: 2,
    name: 'Quadra 2',
    type: 'basquete',
    description: 'Descrição da quadra de basquete',
    photos: [
      'https://static1.squarespace.com/static/5cee719a52ab760001a563d8/5d12491fca4ce20001fb0e24/5d1249faca4ce20001fb4028/1561479674612/56d450bbd5fd513636077becc9f843d50db0ee97a826b.jpg?format=original',
      'https://www.sescpr.com.br/wp-content/uploads/2020/11/20201001_173756.jpg',
    ],
    hourlyRate: 60,
    address: 'Rua B, 456',
    workingHours: '10:00-22:00',
    workingDays: 'Segunda a Domingo',
    optionalServices: ['aluguel de bolas'],
  },
  {
    id: 3,
    companyId: 1,
    name: 'Quadra 2',
    type: 'basquete',
    description: 'Descrição da quadra de basquete',
    photos: [
      'https://static1.squarespace.com/static/5cee719a52ab760001a563d8/5d12491fca4ce20001fb0e24/5d1249faca4ce20001fb4028/1561479674612/56d450bbd5fd513636077becc9f843d50db0ee97a826b.jpg?format=original',
      'https://www.sescpr.com.br/wp-content/uploads/2020/11/20201001_173756.jpg',
    ],
    hourlyRate: 60,
    address: 'Rua B, 456',
    workingHours: '10:00-22:00',
    workingDays: 'Segunda a Domingo',
    optionalServices: ['aluguel de bolas'],
  },
  {
    id: 4,
    companyId: 2,
    name: 'Quadra 1',
    type: 'tenis',
    description: 'Descrição da quadra de tênis',
    photos: [
      'https://www.pardinisport.com.br/img/servicos/quadra-de-tenis.jpg',
      'https://www.construtoraplaneta.com.br/wp-content/uploads/2021/03/DRONE-S-DIJON.00_15_52_33.Still003-scaled.jpg',
    ],
    hourlyRate: 50,
    address: 'Rua A, 123',
    workingHours: '8:00-18:00',
    workingDays: 'Segunda a Sexta',
    optionalServices: ['professor', 'aluguel de bolas'],
  },
];

const reservations: Reservation[] = [
  {
    id: 1,
    courtId: 1,
    userId: 1,
    value: 100,
    date: '2024-09-15',
    status: 'pending',
    startTime: '12:00',
    endTime: '13:00',
  },
  {
    id: 2,
    courtId: 2,
    userId: 1,
    value: 200,
    date: '2024-09-17',
    status: 'confirmed',
    startTime: '18:00',
    endTime: '20:00',
  },
  {
    id: 3,
    courtId: 3,
    userId: 2,
    value: 200,
    date: '2024-09-15',
    status: 'confirmed',
    startTime: '11:00',
    endTime: '13:00',
  },
  {
    id: 4,
    courtId: 4,
    userId: 2,
    value: 100,
    date: '2024-09-17',
    status: 'confirmed',
    startTime: '11:00',
    endTime: '12:00',
  },
];

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

export const fetchCourts = async (companyId: number) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return courts.filter(court => court.companyId === companyId);
};

export const fetchCourtDetails = async (courtId: number) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  const court = courts.find(court => court.id === courtId);
  if (!court) {
    throw new Error('Quadra não encontrada');
  }
  return court;
};

export const fetchReservationDetails = async (reservationId: number) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  const reservation = reservations.find(
    reservation => reservation.id === reservationId,
  );
  if (!reservation) {
    throw new Error('Reserva não encontrada');
  }
  return reservation;
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

export const deleteCourt = async (courtId: number) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  const courtIndex = courts.findIndex(court => court.id === courtId);
  if (courtIndex === -1) {
    throw new Error('Quadra não encontrada');
  }
  courts.splice(courtIndex, 1);
};

export const fetchReservations = async (companyId: number) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  const companyCourts = courts
    .filter(court => court.companyId === companyId)
    .map(court => court.id);
  return reservations.filter(reservation =>
    companyCourts.includes(reservation.courtId),
  );
};

export const updateReservationStatus = async (
  reservationId: number,
  status: 'pending' | 'confirmed' | 'canceled',
) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  const reservation = reservations.find(res => res.id === reservationId);
  if (!reservation) {
    throw new Error('Reserva não encontrada');
  }
  reservation.status = status;
  return reservation;
};

export const cancelReservation = async (reservationId: number) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  const reservation = reservations.find(res => res.id === reservationId);
  if (!reservation) {
    throw new Error('Reserva não encontrada');
  }
  reservation.status = 'canceled';
  return reservation;
};

export const fetchClientDetails = async (clientId: number) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  const client = clients.find(client => client.id === clientId);
  if (!client) {
    throw new Error('Cliente não encontrado');
  }
  return client;
};

export const addClient = async (client: Omit<Client, 'id'>) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  const newClient = {...client, id: clients.length + 1};
  clients.push(newClient);
  return newClient;
};

export const addReservation = async (reservation: Omit<Reservation, 'id'>) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  const newReservation = {...reservation, id: reservations.length + 1};
  reservations.push(newReservation);
  return newReservation;
};
