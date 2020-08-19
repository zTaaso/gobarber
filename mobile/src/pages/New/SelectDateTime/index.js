import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Proptypes from 'prop-types';
import Icon from '@expo/vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';
import DateInput from '~/components/DateInput';
import Loading from '~/components/Loading';

import { Container, HoursList, Hour, Title } from './styles';

const SelectDateTime = ({ navigation, route }) => {
  navigation.setOptions({
    title: 'Selecione o horário',
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={20} color="#fff" />
      </TouchableOpacity>
    ),
  });

  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState([]);
  const [loading, setLoading] = useState(true);

  const { provider } = route.params;

  function handleNavigate(time) {
    navigation.navigate('New', {
      screen: 'Confirm',
      params: { provider, time },
    });
  }

  useEffect(() => {
    async function loadAvailable() {
      setLoading(true);
      const response = await api.get(`providers/${provider.id}/available`, {
        params: {
          date: date.getTime(),
        },
      });
      setHours(response.data);
      setLoading(false);
    }
    loadAvailable();
  }, [date, provider.id]);

  return (
    <Background>
      <Container>
        <DateInput date={date} onChange={setDate} />

        {loading ? (
          <Loading size={80} color="#fff" />
        ) : (
          <HoursList
            data={hours}
            keyExtractor={(item) => item.time}
            renderItem={({ item }) => (
              <Hour
                enabled={item.available}
                onPress={() => handleNavigate(item.value)}
              >
                <Title>{item.time}</Title>
              </Hour>
            )}
          />
        )}
      </Container>
    </Background>
  );
};

export default SelectDateTime;

SelectDateTime.propTypes = {
  navigation: Proptypes.shape({
    setOptions: Proptypes.func,
    navigate: Proptypes.func,
    goBack: Proptypes.func,
  }).isRequired,
  route: Proptypes.shape({
    params: Proptypes.shape({
      provider: Proptypes.shape({
        id: Proptypes.number,
      }),
    }),
  }).isRequired,
};
