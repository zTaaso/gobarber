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
            uri: data.provider.avatar
              ? data.provider.avatar.url
              : `https://api.adorable.io/avatars/50/${data.provider.name}.png`,
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
