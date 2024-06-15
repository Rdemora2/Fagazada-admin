// src/screens/CourtDetailScreen.tsx

import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CourtDetailScreenRouteProp} from '../types/types';
import {fetchCourtDetails} from '../services/apiMock';

type Props = {
  route: CourtDetailScreenRouteProp;
};

const CourtDetailScreen: React.FC<Props> = ({route}) => {
  const {courtId} = route.params;
  const [court, setCourt] = useState<{
    name: string;
    location: string;
    description: string;
  } | null>(null);

  useEffect(() => {
    const getCourtDetails = async () => {
      try {
        const courtDetails = await fetchCourtDetails(courtId);
        setCourt(courtDetails);
      } catch (error) {
        console.error('Erro ao buscar detalhes da quadra:', error);
      }
    };

    getCourtDetails();
  }, [courtId]);

  if (!court) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes da Quadra</Text>
      <Text>Nome: {court.name}</Text>
      <Text>Localização: {court.location}</Text>
      <Text>Descrição: {court.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});

export default CourtDetailScreen;
