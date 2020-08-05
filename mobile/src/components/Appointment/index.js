import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';

import { Container, Left, Avatar, Info, Name, Time } from './styles';

const Appointment = ({ data, onCancel }) => {
  const formatedDate = useMemo(() => {
    return formatRelative(parseISO(data.date), new Date(), { locale: pt });
  }, [data.date]);

  return (
    <Container past={data.past}>
      <Left>
        <Avatar
          source={{
            uri: data.avatar
              ? data.avatar.url
              : 'https://api.adorable.io/avatar/50/ztaaso.png',
          }}
        />

        <Info>
          <Name>{data.provider.name}</Name>
          <Time>{formatedDate}</Time>
        </Info>
      </Left>

      {data.cancelable && (
        <TouchableOpacity onPress={onCancel}>
          <Icon name="event-busy" size={20} color="#f64c75" />
        </TouchableOpacity>
      )}
    </Container>
  );
};

export default Appointment;
