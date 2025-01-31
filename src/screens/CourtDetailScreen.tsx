import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {fetchCourtDetails} from '../services/apiMock';
import {
  CourtDetailScreenRouteProp,
  HomeScreenNavigationProp,
  Court,
} from '../types/types';

type Props = {
  route: CourtDetailScreenRouteProp;
};

const CourtDetailScreen: React.FC<Props> = ({route}) => {
  const {courtId} = route.params;
  const [court, setCourt] = useState<Court | null>(null);
  const windowWidth = Dimensions.get('window').width;
  const carouselItemWidth = windowWidth * 0.93;
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const getCourtDetails = async () => {
    try {
      const courtDetails: Court = await fetchCourtDetails(courtId);
      setCourt(courtDetails);
    } catch (error) {
      console.error('Erro ao buscar detalhes da quadra:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getCourtDetails();
    }, [courtId]),
  );

  const handleCourtEdit = () => {
    navigation.navigate('EditCourt', {courtId});
  };

  if (!court) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={court.photos}
        renderItem={({item}) => (
          <View style={[styles.carouselItem, {width: carouselItemWidth}]}>
            <Image source={{uri: item}} style={styles.carouselImage} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}
        contentContainerStyle={{alignItems: 'center'}}
      />

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{court.name}</Text>

        <Text style={styles.sectionTitle}>Descrição</Text>
        <Text style={styles.sectionContent}>{court.description}</Text>

        <Text style={styles.sectionTitle}>Modalidade</Text>
        <Text style={styles.sectionContent}>{court.type}</Text>

        <Text style={styles.sectionTitle}>Endereço</Text>
        <Text style={styles.sectionContent}>{court.address}</Text>

        <Text style={styles.sectionTitle}>Dias de Funcionamento</Text>
        <Text style={styles.sectionContent}>{court.workingDays}</Text>

        <Text style={styles.sectionTitle}>Horário de Funcionamento</Text>
        <Text style={styles.sectionContent}>{court.workingHours}</Text>

        <Text style={styles.sectionTitle}>Valor por hora</Text>
        <Text style={styles.sectionContent}>R${court.hourlyRate}</Text>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={handleCourtEdit}>
        <Text style={styles.editButtonText}>Editar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  carousel: {
    marginVertical: 16,
  },
  carouselItem: {
    height: 200,
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  detailsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 16,
  },
  editButton: {
    backgroundColor: '#00786A',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CourtDetailScreen;
