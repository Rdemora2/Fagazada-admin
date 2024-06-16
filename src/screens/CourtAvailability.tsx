import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, ScrollView, Alert} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Availability} from '../types/types';

const CourtAvailabilityScreen: React.FC = () => {
  const [date, setDate] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false);
  const [availabilityList, setAvailabilityList] = useState<Availability[]>([]);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirmDate = (selectedDate: Date) => {
    const formattedDate = selectedDate.toISOString().split('T')[0];
    setDate(formattedDate);
    hideDatePicker();
  };

  const showStartTimePicker = () => {
    setStartTimePickerVisible(true);
  };

  const hideStartTimePicker = () => {
    setStartTimePickerVisible(false);
  };

  const handleConfirmStartTime = (selectedTime: Date) => {
    const formattedTime = selectedTime.toISOString().split('T')[1].slice(0, 5);
    setStartTime(formattedTime);
    hideStartTimePicker();
  };

  const showEndTimePicker = () => {
    setEndTimePickerVisible(true);
  };

  const hideEndTimePicker = () => {
    setEndTimePickerVisible(false);
  };

  const handleConfirmEndTime = (selectedTime: Date) => {
    const formattedTime = selectedTime.toISOString().split('T')[1].slice(0, 5);
    setEndTime(formattedTime);
    hideEndTimePicker();
  };

  const addAvailability = () => {
    if (date && startTime && endTime) {
      const newAvailability: Availability = {
        id: availabilityList.length + 1,
        date,
        startTime,
        endTime,
      };
      setAvailabilityList([...availabilityList, newAvailability]);
      setDate('');
      setStartTime('');
      setEndTime('');
      Alert.alert('Sucesso', 'Disponibilidade adicionada com sucesso.');
    } else {
      Alert.alert(
        'Erro',
        'Por favor, preencha todos os campos de disponibilidade.',
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>Adicionar Disponibilidade</Text>

      <View style={styles.dateInputContainer}>
        <Text style={styles.label}>Data</Text>
        <Button
          title={date ? date : 'Selecionar data'}
          onPress={showDatePicker}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmDate}
          onCancel={hideDatePicker}
        />
      </View>

      <View style={styles.timeInputContainer}>
        <Text style={styles.label}>Hora de Início</Text>
        <Button
          title={startTime ? startTime : 'Selecionar hora de início'}
          onPress={showStartTimePicker}
        />
        <DateTimePickerModal
          isVisible={isStartTimePickerVisible}
          mode="time"
          onConfirm={handleConfirmStartTime}
          onCancel={hideStartTimePicker}
        />
      </View>

      {/* Seleção de Hora de Término */}
      <View style={styles.timeInputContainer}>
        <Text style={styles.label}>Hora de Término</Text>
        <Button
          title={endTime ? endTime : 'Selecionar hora de término'}
          onPress={showEndTimePicker}
        />
        <DateTimePickerModal
          isVisible={isEndTimePickerVisible}
          mode="time"
          onConfirm={handleConfirmEndTime}
          onCancel={hideEndTimePicker}
        />
      </View>

      <Button title="Adicionar Disponibilidade" onPress={addAvailability} />

      {availabilityList.length > 0 && (
        <View style={styles.availabilityListContainer}>
          <Text style={styles.label}>Disponibilidades Adicionadas:</Text>
          {availabilityList.map(avail => (
            <View key={avail.id} style={styles.availabilityItem}>
              <Text>{`Data: ${avail.date}, Hora de Início: ${avail.startTime}, Hora de Término: ${avail.endTime}`}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  dateInputContainer: {
    marginBottom: 12,
  },
  timeInputContainer: {
    marginBottom: 12,
  },
  availabilityListContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  availabilityItem: {
    marginBottom: 8,
  },
});

export default CourtAvailabilityScreen;
