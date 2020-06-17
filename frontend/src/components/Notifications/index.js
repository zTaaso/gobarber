import React, { useState, useEffect, useMemo } from 'react';
import { MdNotifications } from 'react-icons/md';
import { formatDistance, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import {
  Container,
  Badge,
  NotificationList,
  Scroll,
  Notification,
} from './styles';

function Notifications() {
  const [isToggled, setIsToggled] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const hasUnread = useMemo(
    () => !!notifications.find((notification) => !notification.read),
    [notifications]
  );

  async function handleMarkAsRead(id) {
    await api.put(`notifications/${id}`);

    setNotifications(
      notifications.map((n) => (n._id === id ? { ...n, read: true } : n))
    );
  }

  useEffect(() => {
    api.get('/notifications').then((response) => {
      const data = response.data.map((notification) => ({
        ...notification,
        timeDistance: formatDistance(
          parseISO(notification.createdAt),
          new Date(),
          {
            addSuffix: true,
            locale: pt,
          }
        ),
      }));

      setNotifications(data);
    });
  }, []);

  return (
    <Container>
      <Badge hasUnread={hasUnread} onClick={() => setIsToggled(!isToggled)}>
        <MdNotifications size={25} color="#7159c1" />
      </Badge>

      <NotificationList isOpen={isToggled}>
        <Scroll>
          {notifications.map((notification) => (
            <Notification key={notification._id} unread={!notification.read}>
              <p>{notification.content}</p>
              <time> ~ {notification.timeDistance}. </time>
              {!notification.read && (
                <button
                  type="button"
                  onClick={() => handleMarkAsRead(notification._id)}
                >
                  Marcar como lida.{' '}
                </button>
              )}
            </Notification>
          ))}
        </Scroll>
      </NotificationList>
    </Container>
  );
}

export default Notifications;
