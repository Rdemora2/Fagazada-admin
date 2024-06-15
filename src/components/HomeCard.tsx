import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
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
        <Text>{court.description}</Text>
        <Button
          title="Ver Detalhes da Quadra"
          onPress={() => onPress(court.id)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  image: {
    width: width - 32, // Adjust as needed
    height: 200, // Adjust as needed
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default HomeCard;
