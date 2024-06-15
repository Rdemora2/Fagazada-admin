import React, {useEffect, useState} from 'react';
import {View, Text, Button, FlatList, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {fetchCourts} from '../services/apiMock';
import {RootStackParamList, Court} from '../types/types';
import {HomeScreenNavigationProp} from '../types/types'; // Importe o tipo correto de navegação
import {RouteProp} from '@react-navigation/native';

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>; // Defina o tipo correto de RouteProp para 'Home'

type Props = {
  route: HomeScreenRouteProp;
};

const HomeScreen: React.FC<Props> = ({route}) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [courts, setCourts] = useState<Court[]>([]);

  useEffect(() => {
    const loadCourts = async () => {
      try {
        const data = await fetchCourts();
        setCourts(data);
      } catch (error) {
        console.error('Erro ao carregar quadras:', error);
      }
    };

    loadCourts();
  }, []);

  const handleCourtDetail = (courtId: number) => {
    navigation.navigate('CourtDetail', {courtId});
  };

  const renderItem = ({item}: {item: Court}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <Text>{item.description}</Text>
      <Button
        title="Ver Detalhes da Quadra"
        onPress={() => handleCourtDetail(item.id)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={courts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default HomeScreen;
