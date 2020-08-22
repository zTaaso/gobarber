import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Icon from '@expo/vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';
import Appointment from '~/components/Appointment';

import { Container, Title, List } from './styles';

const Dashboard = ({ navigation }) => {
  navigation.setOptions({
    title: 'Agendamentos',
    tabBarIcon: ({ color, size }) => (
      <Icon name="event" size={size} color={color} />
    ),
  });

  const isFocused = useIsFocused();

  const [appointments, setAppointments] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  async function loadAppointments() {
    setRefreshing(true);
    const response = await api.get('/appointments');
    setAppointments(response.data);

    setRefreshing(false);
  }

  async function handleCancel(id) {
    try {
      await api.delete(`appointments/${id}`);

      await loadAppointments();
    } catch (err) {
      Alert.alert(
        'Erro ao cancelar agendamento',
        'Atualize a página e tente novamente.'
      );
    }
  }

  useEffect(() => {
    if (isFocused) {
      loadAppointments();
    }
  }, [isFocused]);

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>

        <List
          data={appointments}
          keyExtractor={(item) => String(item.id)}
          refreshing={refreshing}
          onRefresh={loadAppointments}
          renderItem={({ item }) => (
            <Appointment onCancel={() => handleCancel(item.id)} data={item} />
          )}
        />
      </Container>
    </Background>
  );
};

export default Dashboard;
