import React, { useState, useCallback } from 'react';
import { View, TouchableOpacity, Text, Modal, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Agenda } from 'react-native-calendars';
import { Card, Avatar, FAB, TextInput, Button } from 'react-native-paper';

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const Schedule = () => {
  const [items, setItems] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemDate, setNewItemDate] = useState(new Date());
  const [newItemNote, setNewItemNote] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const loadItems = useCallback((day) => {
    setTimeout(() => {
      const newItems = { ...items };
      for (let i = -30; i < 365; i++) {  // Ajuster la plage pour couvrir plus d'années
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!newItems[strTime]) {
          newItems[strTime] = [];
        }
      }
      setItems(newItems);
    }, 1000);
  }, [items]);

  const addItem = () => {
    const strTime = timeToString(newItemDate);
    const newItems = { ...items };
    if (!newItems[strTime]) {
      newItems[strTime] = [];
    }
    newItems[strTime].push({
      name: newItemName,
      note: newItemNote,
      height: Math.max(50, Math.floor(Math.random() * 150)),
    });
    setItems(newItems);
    setModalVisible(false);
    setNewItemName('');
    setNewItemNote('');
    setNewItemDate(new Date());
  };

  const editItem = () => {
    const strTime = timeToString(newItemDate);
    const updatedItems = { ...items };

    if (selectedItem && updatedItems[selectedItem.date]) {
      const itemIndex = updatedItems[selectedItem.date].findIndex(item => item.name === selectedItem.name && item.note === selectedItem.note);
      if (itemIndex !== -1) {
        updatedItems[selectedItem.date].splice(itemIndex, 1);
        if (updatedItems[selectedItem.date].length === 0) {
          delete updatedItems[selectedItem.date];
        }
      }
    }

    if (!updatedItems[strTime]) {
      updatedItems[strTime] = [];
    }

    updatedItems[strTime].push({
      name: newItemName,
      note: newItemNote,
      height: Math.max(50, Math.floor(Math.random() * 150)),
    });

    setItems(updatedItems);
    setEditModalVisible(false);
    setSelectedItem(null);
    setNewItemName('');
    setNewItemNote('');
    setNewItemDate(new Date());
  };

  const renderItem = (item, date) => (
    <TouchableOpacity
      style={{ marginRight: 10, marginTop: 17 }}
      onPress={() => {
        setSelectedItem({ ...item, date });
        setNewItemName(item.name);
        setNewItemNote(item.note);
        setNewItemDate(new Date(date));
        setEditModalVisible(true);
      }}
    >
      <Card>
        <Card.Content>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text>{item.name}</Text>
              {item.note ? <Text style={styles.note}>{item.note}</Text> : null}
            </View>
            <Avatar.Text label="J" />
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || newItemDate;
    setShowDatePicker(Platform.OS === 'ios');
    setNewItemDate(currentDate);
  };

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={timeToString(new Date())} // Utiliser la date actuelle comme date sélectionnée par défaut
        renderItem={(item, firstItemInDay) => renderItem(item, firstItemInDay)}
        
      />
      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => setModalVisible(true)}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              label="Item Name"
              value={newItemName}
              onChangeText={setNewItemName}
              style={styles.input}
              mode="outlined"
            />
            <TextInput
              label="Note"
              value={newItemNote}
              onChangeText={setNewItemNote}
              style={styles.input}
              mode="outlined"
            />
            <Button mode="contained" onPress={() => setShowDatePicker(true)} style={styles.button}>
              Select Date
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
            <Button mode="contained" onPress={addItem} style={styles.button}>
              Add
            </Button>
            <Button mode="text" onPress={() => setModalVisible(false)} style={styles.button}>
              Cancel
            </Button>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              label="Item Name"
              value={newItemName}
              onChangeText={setNewItemName}
              style={styles.input}
              mode="outlined"
            />
            <TextInput
              label="Note"
              value={newItemNote}
              onChangeText={setNewItemNote}
              style={styles.input}
              mode="outlined"
            />
            <Button mode="contained" onPress={() => setShowDatePicker(true)} style={styles.button}>
              Select Date
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
            <Button mode="contained" onPress={editItem} style={styles.button}>
              Save
            </Button>
            <Button mode="text" onPress={() => setEditModalVisible(false)} style={styles.button}>
              Cancel
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 300,
  },
  input: {
    width: '100%',
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    width: '100%',
  },
  note: {
    fontStyle: 'italic',
    color: 'gray',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Schedule;
