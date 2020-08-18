import React, { useMemo, useState } from 'react';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from '@expo/vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Container, DateButton, DateText } from './styles';

const DateInput = ({ date, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt }),
    [date]
  );

  // async function handlePress() {
  //   const { action, year, month, day } = await DatePickerAndroid.open({
  //     minDate: new Date(),
  //     mode: 'calendar',
  //     date,
  //   });

  //   if (action === 'dateSetAction') {
  //     const selectedDate = new Date(year, month, day);
  //     onChange(selectedDate);
  //   }
  // }

  function handleChange(_, selectedDate) {
    setIsOpen(false);
    if (!selectedDate) return;

    onChange(selectedDate);
  }

  return (
    <Container>
      <DateButton onPress={() => setIsOpen(!isOpen)}>
        <Icon name="event" color="#fff" size={20} />
        <DateText>{dateFormatted}</DateText>
      </DateButton>

      {isOpen && (
        <DateTimePicker
          value={date}
          minimumDate={new Date()}
          onChange={handleChange}
          mode="date"
        />
      )}
    </Container>
  );
};

export default DateInput;
