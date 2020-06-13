import React, { useState } from 'react';
import { MdNotifications } from 'react-icons/md';

import {
  Container,
  Badge,
  NotificationList,
  Scroll,
  Notification,
} from './styles';

function Notifications() {
  const [openNotification, setOpenNotification] = useState(false);

  return (
    <Container>
      <Badge
        hasUnread
        onClick={() =>
          openNotification
            ? setOpenNotification(false)
            : setOpenNotification(true)
        }
      >
        <MdNotifications size={25} color="#7159c1" />
      </Badge>

      <NotificationList isOpen={openNotification}>
        <Scroll>
          <Notification unread>
            <p>Você possui um novo agendamento pra amanhã.</p>
            <time> Há 2 dias </time>
            <button type="button">Marcar como lida. </button>
          </Notification>
          <Notification>
            <p>Você possui um novo agendamento pra amanhã.</p>
            <time> Há 2 dias </time>
            <button type="button">Marcar como lida. </button>
          </Notification>
          <Notification>
            <p>Você possui um novo agendamento pra amanhã.</p>
            <time> Há 2 dias </time>
            <button type="button">Marcar como lida. </button>
          </Notification>
          <Notification>
            <p>Você possui um novo agendamento pra amanhã.</p>
            <time> Há 2 dias </time>
            <button type="button">Marcar como lida. </button>
          </Notification>
          <Notification>
            <p>Você possui um novo agendamento pra amanhã.</p>
            <time> Há 2 dias </time>
            <button type="button">Marcar como lida. </button>
          </Notification>
          <Notification>
            <p>Você possui um novo agendamento pra amanhã.</p>
            <time> Há 2 dias </time>
            <button type="button">Marcar como lida. </button>
          </Notification>
          <Notification>
            <p>Você possui um novo agendamento pra amanhã.</p>
            <time> Há 2 dias </time>
            <button type="button">Marcar como lida. </button>
          </Notification>
        </Scroll>
      </NotificationList>
    </Container>
  );
}

export default Notifications;
