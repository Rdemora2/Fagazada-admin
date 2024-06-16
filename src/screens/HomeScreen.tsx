import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {fetchCourts} from '../services/apiMock';
import {Court, RootStackParamList} from '../types/types';
import HomeCard from '../components/HomeCard';
import {HomeScreenNavigationProp} from '../types/types';
import {RouteProp} from '@react-navigation/native';

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

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

  const handleAddCourt = () => {
    navigation.navigate('AddCourt'); // Navegar para AddCourtScreen
  };

  const renderItem = ({item}: {item: Court}) => (
    <HomeCard court={item} onPress={handleCourtDetail} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={courts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />

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
