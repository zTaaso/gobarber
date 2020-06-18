import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo-purple.svg';

import Notifications from '~/components/Notifications';
import { Container, Content, Profile } from './styles';
import api from '~/services/api';

function Header() {
  const profile = useSelector((state) => state.user.profile);
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    async function getAvatar() {
      try {
        await api.get(profile.avatar.url);
        setAvatarUrl(profile.avatar.url);
      } catch (err) {
        setAvatarUrl('https://api.adorable.io/avatars/50/abott@adorable.png');
      }
    }
    getAvatar();
  }, []);

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GoBarber" />

          <Link to="/dashboard">DASHBOARD</Link>
        </nav>

        <aside>
          <Notifications />

          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile">Meu perfil</Link>
            </div>
            <img src={avatarUrl} alt={profile.name} />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}

export default Header;
