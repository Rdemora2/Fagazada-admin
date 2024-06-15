// src/services/apiMock.ts

const users = [
  {
    id: 1,
    email: 'user1@example.com',
    password: 'password1',
    profile: {name: 'User One', age: 30},
  },
  {
    id: 2,
    email: 'user2@example.com',
    password: 'password2',
    profile: {name: 'User Two', age: 25},
  },
];

const courts = [
  {
    id: '1',
    name: 'Quadra 1',
    location: 'Rua A, 123',
    description: 'Quadra de tênis',
  },
  {
    id: '2',
    name: 'Quadra 2',
    location: 'Rua B, 456',
    description: 'Quadra de basquete',
  },
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

export const register = async (email: string, password: string) => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const existingUser = users.find(user => user.email === email);

  if (existingUser) {
    throw new Error('Email já registrado');
  }

  const newUser = {
    id: users.length + 1,
    email,
    password,
    profile: {name: '', age: 0},
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

  return user.profile;
};

export const updateProfile = async (
  userId: number,
  profile: {name: string; age: number},
) => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const user = users.find(user => user.id === userId);

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  user.profile = profile;

  return user.profile;
};

export const fetchCourts = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return courts;
};

export const fetchCourtDetails = async (courtId: string) => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const court = courts.find(court => court.id === courtId);

  if (!court) {
    throw new Error('Quadra não encontrada');
  }

  return court;
};
