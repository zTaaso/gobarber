import React, { useMemo } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { formatRelative, parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Proptypes from 'prop-types';
import Icon from '@expo/vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';

import { Container, Avatar, Name, Time, SubmitButton } from './styles';

const Confirm = ({ navigation, route }) => {
  navigation.setOptions({
    title: 'Confirmar agendamento',
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={20} color="#fff" />
      </TouchableOpacity>
    ),
  });

  const { provider } = route.params;
  const { time } = route.params;

  const dateFormatted = useMemo(
    () => formatRelative(parseISO(time), new Date(), { locale: pt }),
    [time]
  );

  async function handleSubmit() {
    try {
      await api.post('/appointments', {
        provider_id: provider.id,
        date: time,
      });

      navigation.reset({
        routes: [{ name: 'New' }],
      });
      Alert.alert(
        'Agendamento confirmado!',
        format(
          parseISO(time),
          `'Seu agendamento foi marcado para ás' H 'horas com o prestador ${provider.name}. ' `
        )
      );
      navigation.navigate('Dashboard');
    } catch (err) {
      Alert.alert(
        'Oops!',
        'Algo deu errado ao confirmar o agendamento, tente novamente.'
      );
    }
  }

  return (
    <Background>
      <Container>
        <Avatar
          source={{
            uri: provider.avatar
              ? provider.avatar.url
              : `https://api.adorable.io/avatars/120/${provider.name}.png`,
          }}
        />

        <Name>{provider.name}</Name>
        <Time>{dateFormatted}</Time>

        <SubmitButton onPress={handleSubmit}>
          Confirmar Agendamento
        </SubmitButton>
      </Container>
    </Background>
  );
};

export default Confirm;

Confirm.propTypes = {
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
