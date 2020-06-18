import React, { useState, useMemo, useEffect } from 'react';
import {
  format,
  addDays,
  subDays,
  setHours,
  setMinutes,
  setSeconds,
  isBefore,
  isEqual,
  parseISO,
  isSameHour,
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import { pt } from 'date-fns/locale';
import { Container, Time } from './styles';
import api from '~/services/api';

const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

function Dashboard() {
  const [schedule, setSchedule] = useState([]);
  const [date, setDate] = useState(new Date());

  const formatedDate = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  function handleChangeDate(character) {
    if (character === '>') {
      setDate(addDays(date, 1));
      return;
    }

    setDate(subDays(date, 1));
  }

  useEffect(() => {
    async function loadSchedule() {
      const response = await api.get('schedule', {
        params: { date },
      });

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const data = range.map((hour) => {
        const checkDate = setSeconds(setMinutes(setHours(date, hour), 0), 0);
        const compareDate = utcToZonedTime(checkDate, timezone);

        return {
          time: `${hour}:00h`,
          past: isBefore(compareDate, new Date()),
          appointment: response.data.find((a) => {
            console.log({
              apDate: parseISO(a.date).getTime(),
              checkDate: checkDate.getTime(),
              isIgual: isSameHour(parseISO(a.date), checkDate),
            });
            return isSameHour(parseISO(a.date), checkDate);
          }),
        };
      });

      setSchedule(data);
    }
    loadSchedule();
  }, [date]);

  return (
    <Container>
      <header>
        <button type="button" onClick={() => handleChangeDate('<')}>
          <MdChevronLeft size={36} color="#Fff" />
        </button>
        <strong>{formatedDate}</strong>
        <button type="button">
          <MdChevronRight
            size={36}
            color="#Fff"
            onClick={() => handleChangeDate('>')}
          />
        </button>
      </header>

      <ul>
        {schedule.map((time) => (
          <Time key={time.time} past={time.past} available={!time.appointment}>
            <strong>{time.time}</strong>
            <span>
              {time.appointment ? time.appointment.user.name : 'Em aberto'}
            </span>
          </Time>
        ))}
      </ul>
    </Container>
  );
}

export default Dashboard;
