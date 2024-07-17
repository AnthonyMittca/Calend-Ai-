import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Modal, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

const DevoirScreen = () => {
  const [intitule, setIntitule] = useState('');
  const [description, setDescription] = useState('');
  const [dateFin, setDateFin] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [devoirs, setDevoirs] = useState([]);
  const [selectedDevoirIndex, setSelectedDevoirIndex] = useState(-1);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);

  const ajouterDevoir = () => {
    const nouveauDevoir = {
      intitule,
      description,
      dateFin: dateFin.toLocaleDateString(),
    };
    setDevoirs([...devoirs, nouveauDevoir]);
    resetState();
  };

  const modifierDevoir = () => {
    if (selectedDevoirIndex !== -1) {
      const updatedDevoirs = [...devoirs];
      updatedDevoirs[selectedDevoirIndex] = {
        intitule,
        description,
        dateFin: dateFin.toLocaleDateString(),
      };
      setDevoirs(updatedDevoirs);
      resetState();
    }
    setEditModalVisible(false);
  };

  const supprimerDevoir = (index) => {
    const updatedDevoirs = [...devoirs];
    updatedDevoirs.splice(index, 1);
    setDevoirs(updatedDevoirs);
    resetState();
  };

  const resetState = () => {
    setIntitule('');
    setDescription('');
    setDateFin(new Date());
    setAddModalVisible(false);
    setSelectedDevoirIndex(-1);
  };

  const onSelectDevoir = (index) => {
    setSelectedDevoirIndex(index);
    setIntitule(devoirs[index].intitule);
    setDescription(devoirs[index].description);
    setDateFin(new Date(devoirs[index].dateFin));
    setEditModalVisible(true);
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || dateFin;
    setShowDatePicker(false);
    setDateFin(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestion des Devoirs</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => setAddModalVisible(true)}>
        <Text style={styles.addButtonText}>Ajouter un Devoir</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={addModalVisible}
        onRequestClose={() => setAddModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Ajouter un Devoir</Text>
            <TextInput
              style={styles.input}
              placeholder="Intitulé"
              value={intitule}
              onChangeText={setIntitule}
            />
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Description"
              multiline
              numberOfLines={4}
              value={description}
              onChangeText={setDescription}
            />
            <View style={styles.datePickerContainer}>
              <Text style={styles.datePickerText}>Date de fin : {dateFin.toLocaleDateString()}</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
                <Ionicons name="calendar-outline" size={24} color="black" />
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={dateFin}
                  mode="date"
                  display="default"
                  onChange={onChangeDate}
                />
              )}
            </View>
            <View style={styles.buttonsContainer}>
              <Button title="Annuler" onPress={() => setAddModalVisible(false)} color="#f44336" />
              <Button title="Ajouter" onPress={ajouterDevoir} />
            </View>
          </View>
        </View>
      </Modal>

      <ScrollView style={styles.devoirsContainer}>
        {devoirs.map((devoir, index) => (
          <TouchableOpacity key={index} onPress={() => onSelectDevoir(index)} style={styles.devoirContainer}>
            <Text style={styles.devoirIntitule}>{devoir.intitule}</Text>
            <Text>{devoir.description}</Text>
            <Text style={styles.dateText}>Date de fin : {devoir.dateFin}</Text>
            <View style={styles.devoirActions}>
              <Ionicons name="create-outline" size={24} color="#007bff" onPress={() => onSelectDevoir(index)} />
              <Ionicons name="trash-outline" size={24} color="#f44336" onPress={() => supprimerDevoir(index)} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Modifier le Devoir</Text>
            <TextInput
              style={styles.input}
              placeholder="Intitulé"
              value={intitule}
              onChangeText={setIntitule}
            />
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Description"
              multiline
              numberOfLines={4}
              value={description}
              onChangeText={setDescription}
            />
            <View style={styles.datePickerContainer}>
              <Text style={styles.datePickerText}>Date de fin : {dateFin.toLocaleDateString()}</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
                <Ionicons name="calendar-outline" size={24} color="black" />
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={dateFin}
                  mode="date"
                  display="default"
                  onChange={onChangeDate}
                />
              )}
            </View>
            <View style={styles.buttonsContainer}>
              <Button title="Annuler" onPress={() => setEditModalVisible(false)} color="#f44336" />
              <Button title="Enregistrer" onPress={modifierDevoir} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007bff',
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalView: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007bff',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#e0e0e0',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  multilineInput: {
    height: 100,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  datePickerText: {
    flex: 1,
    marginRight: 10,
  },
  datePickerButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  devoirsContainer: {
    flex: 1,
    width: '100%',
  },
  devoirContainer: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#ffffff',
  },
  devoirIntitule: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#007bff',
  },
  dateText: {
    marginBottom: 5,
  },
  devoirActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
});

export default DevoirScreen;
