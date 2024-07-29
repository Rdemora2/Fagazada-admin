import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {fetchCourts, deleteCourt} from '../services/apiMock';
import {Court, RootStackParamList} from '../types/types';
import HomeCard from '../components/HomeCard';
import {HomeScreenNavigationProp} from '../types/types';
import {RouteProp} from '@react-navigation/native';
import {useUser} from '../context/UserContext';

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
  route: HomeScreenRouteProp;
};

const HomeScreen: React.FC<Props> = ({route}) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const isFocused = useIsFocused();
  const [courts, setCourts] = useState<Court[]>([]);
  const {userId} = useUser();

  const loadCourts = async () => {
    if (userId !== null) {
      try {
        const data = await fetchCourts(userId);
        setCourts(data);
      } catch (error) {
        console.error('Erro ao carregar quadras:', error);
      }
    }
  };

  const handleDeleteCourt = async (courtId: number) => {
    try {
      await deleteCourt(courtId);
      setCourts(courts.filter(court => court.id !== courtId));
    } catch (error) {
      Alert.alert(
        'Erro',
        'Erro ao excluir quadra. Por favor, tente novamente.',
      );
      console.error('Erro ao excluir quadra:', error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      loadCourts();
    }
  }, [isFocused]);

  const handleCourtDetail = (courtId: number) => {
    navigation.navigate('CourtDetail', {courtId});
  };

  const handleAddCourt = () => {
    navigation.navigate('AddCourt');
  };

  const renderItem = ({item}: {item: Court}) => (
    <HomeCard
      court={item}
      onPress={() => handleCourtDetail(item.id)}
      onDelete={handleDeleteCourt}
    />
  );

  return (
    <View style={styles.container}>
      {courts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.welcomeText}>Bem-vindo!</Text>
          <Text style={styles.infoText}>
            Você ainda não cadastrou nenhuma quadra.
          </Text>
        </View>
      ) : (
        <FlatList
          data={courts}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
      <TouchableOpacity style={styles.addButton} onPress={handleAddCourt}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  infoText: {
    fontSize: 18,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#E66901',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 4,
  },
  addButtonText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default HomeScreen;
