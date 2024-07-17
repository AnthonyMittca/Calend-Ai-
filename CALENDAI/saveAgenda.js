import React, { useState, useCallback, useEffect } from 'react';
import { View, TouchableOpacity, Text, Modal, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Agenda } from 'react-native-calendars';
import { Card, Button, Title, TextInput } from 'react-native-paper';

const AgendaScreen = () => {
  const [items, setItems] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemDate, setNewItemDate] = useState(new Date());
  const [newItemNote, setNewItemNote] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);

  // Fonction pour charger les événements pour un jour donné
  const loadItems = useCallback((day) => {
    setTimeout(() => {
      const date = day.dateString;
      if (!items[date]) {
        const newItems = { ...items };
        newItems[date] = [];
        setItems(newItems);
      }
    }, 1000);
  }, [items]);

  // Fonction pour récupérer les cours depuis le backend
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://10.0.2.2:3001/cours');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des cours.');
      }
      const courses = await response.json();
      const formattedItems = {};

      // Formattez les données pour les adapter à l'Agenda
      courses.forEach(course => {
        const date = course.date_debut.split('T')[0]; // Utilisez la date de début pour la clé
        if (!formattedItems[date]) {
          formattedItems[date] = [];
        }
        formattedItems[date].push({
          name: course.matiere, // Utilisez l'intitulé de la matière
          note: `Intervenant: ${course.intervenant_nom} ${course.intervenant_prenom} Salle: ${course.numero_salle}`,
          heure_debut: course.heure_debut,
          heure_fin: course.heure_fin,
          height: Math.max(50, Math.floor(Math.random() * 150)),
        });
      });

      setItems(formattedItems);
    } catch (error) {
      console.error('Erreur lors de la récupération des cours:', error);
    } finally {
      setLoading(false);
    }
  };

  // Appel fetchCourses une fois au chargement initial
  useEffect(() => {
    fetchCourses();
  }, []);

  // Fonction pour ajouter un événement
  const addItem = () => {
    const date = selectedDate;
    const newItems = { ...items };
    if (!newItems[date]) {
      newItems[date] = [];
    }
    newItems[date].push({
      name: newItemName,
      note: newItemNote,
      height: Math.max(50, Math.floor(Math.random() * 150)),
    });
    setItems(newItems);
    setModalVisible(false);
    resetForm();
  };

  // Fonction pour modifier un événement
  const editItem = () => {
    const date = timeToString(newItemDate);
    const updatedItems = { ...items };

    // Supprimer l'ancien événement si c'est le même que celui sélectionné
    if (selectedItem && updatedItems[selectedItem.date]) {
      const itemIndex = updatedItems[selectedItem.date].findIndex(item => item.name === selectedItem.name && item.note === selectedItem.note);
      if (itemIndex !== -1) {
        updatedItems[selectedItem.date].splice(itemIndex, 1);
        if (updatedItems[selectedItem.date].length === 0) {
          delete updatedItems[selectedItem.date];
        }
      }
    }

    // Ajouter le nouvel événement
    if (!updatedItems[date]) {
      updatedItems[date] = [];
    }

    updatedItems[date].push({
      name: newItemName,
      note: newItemNote,
      height: Math.max(50, Math.floor(Math.random() * 150)),
    });

    setItems(updatedItems);
    setEditModalVisible(false);
    resetForm();
  };

  // Fonction pour supprimer un événement
  const deleteItem = (item, date) => {
    const updatedItems = { ...items };

    if (updatedItems[date]) {
      const filteredItems = updatedItems[date].filter(e => !(e.name === item.name && e.note === item.note));
      if (filteredItems.length === 0) {
        delete updatedItems[date];
      } else {
        updatedItems[date] = filteredItems;
      }
      setItems(updatedItems);
    }
  };

  // Fonction pour réinitialiser le formulaire
  const resetForm = () => {
    setNewItemName('');
    setNewItemNote('');
    setNewItemDate(new Date());
  };

// Fonction pour rendre un événement dans l'agenda
const renderItem = (item, date) => (
  <TouchableOpacity
    style={styles.itemContainer}
    onPress={() => {
      setSelectedItem({ ...item, date });
      setNewItemName(item.name);
      setNewItemNote(item.note);
      setNewItemDate(new Date(date));
      setEditModalVisible(true);
    }}
  >
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.cardContent}>
          <View style={styles.itemDetailsContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDetails}>{item.note}</Text>
            
            <Text style={styles.itemDetails}>
              {`${item.heure_debut} - ${item.heure_fin}`}
            </Text>
          </View>
          <TouchableOpacity onPress={() => deleteItem(item, date)} style={styles.deleteButtonContainer}>
            <Text style={styles.deleteButton}>Supprimer</Text>
          </TouchableOpacity>
        </View>
      </Card.Content>
    </Card>
  </TouchableOpacity>
);


  // Fonction pour changer la date sélectionnée
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || newItemDate;
    setShowDatePicker(Platform.OS === 'ios');
    setNewItemDate(currentDate);
    setSelectedDate(timeToString(currentDate));
  };

  // Fonction pour convertir une date en string
  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  // Afficher un indicateur de chargement pendant le chargement initial
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={selectedDate}
        renderItem={(item, firstItemInDay) => renderItem(item, firstItemInDay)}
      />
      <Button
        style={styles.fab}
        icon="plus"
        mode="contained"
        onPress={() => setModalVisible(true)}
      >
        Ajouter un événement
      </Button>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            <Card style={styles.card}>
              <Card.Content>
                <Title>Ajouter un événement</Title>
                <TextInput
                  label="Titre de l'événement"
                  value={newItemName}
                  onChangeText={setNewItemName}
                  style={styles.input}
                  mode="outlined"
                />
                <TextInput
                  label="Description"
                  value={newItemNote}
                  onChangeText={setNewItemNote}
                  style={[styles.input, styles.multilineInput]}
                  mode="outlined"
                  multiline={true}
                  numberOfLines={4}
                  textAlignVertical="top"
                />
                <View style={styles.datePickerContainer}>
                  <Button mode="contained" onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
                    Choisir une date
                  </Button>
                  {showDatePicker && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={newItemDate}
                      mode="date"
                      display="default"
                      onChange={onChangeDate}
                    />
                  )}
                </View>
                <View style={styles.buttonContainer}>
                  <Button mode="contained" onPress={addItem} style={styles.actionButton}>
                    Ajouter
                  </Button>
                  <Button mode="text" onPress={() => setModalVisible(false)} style={styles.actionButton}>
                    Annuler
                  </Button>
                </View>
              </Card.Content>
            </Card>
          </ScrollView>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalView}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            <Card style={styles.card}>
              <Card.Content>
                <Title>Modifier l'événement</Title>
                <TextInput
                  label="Titre de l'événement"
                  value={newItemName}
                  onChangeText={setNewItemName}
                  style={styles.input}
                  mode="outlined"
                />
                <TextInput
                  label="Description"
                  value={newItemNote}
                  onChangeText={setNewItemNote}
                  style={[styles.input, styles.multilineInput]}
                  mode="outlined"
                  multiline={true}
                  numberOfLines={4}
                  textAlignVertical="top"
                />
                <View style={styles.datePickerContainer}>
                  <Button mode="contained" onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
                    Choisir une date
                  </Button>
                  {showDatePicker && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={newItemDate}
                      mode="date"
                      display="default"
                      onChange={onChangeDate}
                    />
                  )}
                </View>
                <View style={styles.buttonContainer}>
                  <Button mode="contained" onPress={editItem} style={styles.actionButton}>
                    Enregistrer les modifications
                  </Button>
                  <Button mode="text" onPress={() => setEditModalVisible(false)} style={styles.actionButton}>
                    Annuler
                  </Button>
                </View>
              </Card.Content>
            </Card>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default AgendaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  itemContainer: {
    marginBottom: 10,
  },
  card: {
    marginVertical: 4,
    borderRadius: 10,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDetailsContainer: {
    flex: 1,
  },
  itemDetails: {
    fontSize: 14,
    color: '#888',
    marginBottom: 2,
  },
  deleteButtonContainer: {
    backgroundColor: '#ff4d4d',
    padding: 6,
    borderRadius: 4,
  },
  deleteButton: {
    color: 'white',
    fontSize: 12,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 50,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },
  input: {
    marginBottom: 10,
  },
  multilineInput: {
    minHeight: 100,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateButton: {
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
