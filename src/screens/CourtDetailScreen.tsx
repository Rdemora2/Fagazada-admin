import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, Image, FlatList} from 'react-native';
import {CourtDetailScreenRouteProp, Court} from '../types/types';
import {fetchCourtDetails} from '../services/apiMock';

type Props = {
  route: CourtDetailScreenRouteProp;
};

const CourtDetailScreen: React.FC<Props> = ({route}) => {
  const {courtId} = route.params;
  const [court, setCourt] = useState<Court | null>(null);

  useEffect(() => {
    const getCourtDetails = async () => {
      try {
        const courtDetails: Court = await fetchCourtDetails(courtId);
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
      <FlatList
        data={court.photos}
        renderItem={({item}) => (
          <View style={styles.carouselItem}>
            <Image source={{uri: item}} style={styles.carouselImage} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <Text style={styles.title}>Detalhes da Quadra</Text>
      <Text>Nome: {court.name}</Text>
      <Text>Tipo: {court.type}</Text>
      <Text>Descrição: {court.description}</Text>
      <Text>Endereço: {court.address}</Text>
      <Text>Horário de Funcionamento: {court.workingHours}</Text>
      <Button
        title="Editar"
        onPress={() => {
          console.log('Editar quadra');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  carouselItem: {
    width: 350,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
});

export default CourtDetailScreen;
