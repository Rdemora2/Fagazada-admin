import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Court} from '../types/types';

const {width} = Dimensions.get('window');

type Props = {
  court: Court;
  onPress: (courtId: number) => void;
};

const HomeCard: React.FC<Props> = ({court, onPress}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={court.photos}
        renderItem={({item}) => (
          <Image source={{uri: item}} style={styles.image} resizeMode="cover" />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{court.name}</Text>
        <Text style={styles.description}>{court.description}</Text>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => onPress(court.id)}>
          <Text style={styles.detailsButtonText}>Ver Detalhes da Quadra</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: width - 2, // Ajustado para preencher o container sem margens
    height: 200,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 12,
  },
  detailsButton: {
    backgroundColor: '#00786A',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeCard;
