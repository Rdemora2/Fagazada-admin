import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {CourtListScreenNavigationProp} from '../types/types';
import {fetchCourts} from '../services/apiMock';
import {Court} from '../types/types';

type Props = {
  navigation: CourtListScreenNavigationProp;
};

const CourtListScreen: React.FC<Props> = ({navigation}) => {
  const [courts, setCourts] = useState<Court[]>([]);

  useEffect(() => {
    const getCourts = async () => {
      try {
        const data = await fetchCourts();
        setCourts(data);
      } catch (error) {
        console.error('Erro ao buscar quadras:', error);
      }
    };

    getCourts();
  }, []);

  const renderItem = ({item}: {item: Court}) => (
    <Text
      style={styles.item}
      onPress={() => navigation.navigate('CourtDetail', {courtId: item.id})}>
      {item.name}
    </Text>
  );

  const keyExtractor = (item: Court) => item.id.toString();

  return (
    <View style={styles.container}>
      <FlatList
        data={courts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default CourtListScreen;
