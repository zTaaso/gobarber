import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Proptypes from 'prop-types';
import Icon from '@expo/vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';

import { Container, ProvidersList, Provider, Avatar, Name } from './styles';

const SelectProvider = ({ navigation }) => {
  navigation.setOptions({
    title: 'Selecione o prestador',
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={20} color="#fff" />
      </TouchableOpacity>
    ),
  });

  const isFocused = useIsFocused();

  const [providers, setProviders] = useState([]);

  useEffect(() => {
    async function loadProviders() {
      const response = await api.get('/providers');

      setProviders(response.data);
    }

    if (isFocused) {
      loadProviders();
    }
  }, [isFocused]);

  return (
    <Background>
      <Container>
        <ProvidersList
          data={providers}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item: provider }) => (
            <Provider
              onPress={() =>
                navigation.navigate('New', {
                  screen: 'SelectDateTime',
                  params: { provider },
                })
              }
            >
              <Avatar
                source={{
                  uri: provider.avatar
                    ? provider.avatar.url
                    : `https://api.hello-avatar.com/adorables/50/${provider.id}`,
                }}
              />
              <Name>{provider.name}</Name>
            </Provider>
          )}
        />
      </Container>
    </Background>
  );
};

export default SelectProvider;

SelectProvider.propTypes = {
  navigation: Proptypes.shape({
    setOptions: Proptypes.func,
    navigate: Proptypes.func,
    goBack: Proptypes.func,
  }).isRequired,
};
