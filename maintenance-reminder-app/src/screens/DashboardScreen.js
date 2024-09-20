import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from '../api';

export default function DashboardScreen({ navigation }) {
  const [maintenances, setMaintenances] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar as manutenções
  useEffect(() => {
    const fetchMaintenances = async () => {
      try {
        const response = await axios.get('/maintenances');  // Rota da sua API
        setMaintenances(response.data);
      } catch (error) {
        console.error('Error fetching maintenances:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaintenances();
  }, []);

  // Função para renderizar cada item da lista
  const renderMaintenance = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('MaintenanceDetail', item)}  // Navegar com os detalhes
    >
      <Text style={styles.title}>Equipamento: {item.machine_name}</Text>
      <Text>Status: {item.status}</Text>
      <Text>Descrição: {item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Carregando manutenções...</Text>
      ) : (
        <FlatList
          data={maintenances}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMaintenance}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
