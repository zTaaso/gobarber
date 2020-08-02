import { all, takeLatest, call, put, delay } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;
    const response = yield call(api.post, 'sessions', { email, password });
    console.log(response.data);
    const { token, user } = response.data;

    if (user.provider) {
      Alert.alert(
        'Erro no login',
        'O usuário não pode ser prestador de serviços! Use a aplicação web.'
      );

      return;
    }

    api.defaults.headers.authorization = `Bearer ${token}`;

    yield delay(3000);

    yield put(signInSuccess(token, user));
    // history.push('/dashboard');
  } catch (err) {
    Alert.alert('Falha na autenticação', 'Houve um erro no login.');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;
    yield call(api.post, 'users', {
      name,
      email,
      password,
      provider: false,
    });

    yield delay(3000);
    Alert.alert('Cadastro realizado', 'mama meu cu');

    // history.push('/');
  } catch (err) {
    Alert.alert('Erro no cadastro', 'Verifique seus dados e tente novamente.');
    yield put(signFailure());
  }
}

function setToken({ payload }) {
  if (!payload) {
    return;
  }

  const { token } = payload.auth;
  if (token) {
    api.defaults.headers.authorization = `Bearer ${token}`;
  }
}

function signOut() {
  api.defaults.headers.authorization = null;
  // history.push('/');
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
  takeLatest('persist/REHYDRATE', setToken),
]);
