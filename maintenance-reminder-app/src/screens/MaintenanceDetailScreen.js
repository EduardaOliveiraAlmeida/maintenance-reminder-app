import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MaintenanceDetailScreen({ route }) {
  // Pegando os detalhes da manutenção a partir dos parâmetros de navegação
  const { machine_name, status, description, scheduled_date, completed_date } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes da Manutenção</Text>

      <Text style={styles.label}>Equipamento:</Text>
      <Text style={styles.value}>{machine_name}</Text>

      <Text style={styles.label}>Status:</Text>
      <Text style={styles.value}>{status}</Text>

      <Text style={styles.label}>Descrição:</Text>
      <Text style={styles.value}>{description}</Text>

      <Text style={styles.label}>Data Agendada:</Text>
      <Text style={styles.value}>{scheduled_date ? scheduled_date : 'Não agendada'}</Text>

      <Text style={styles.label}>Data Concluída:</Text>
      <Text style={styles.value}>{completed_date ? completed_date : 'Não concluída'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
});
