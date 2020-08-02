import { put, call, takeLatest, all } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '~/services/api';
import { updateProfileSuccess } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { data } = payload;
    const { email, name, avatar_id, ...rest } = data;

    const profile = {
      email,
      name,
      avatar_id,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'users', profile);

    yield put(updateProfileSuccess(response.data));
    Alert.alert('Sucesso!', 'O usuário foi atualizado com sucesso.');
  } catch (err) {
    Alert.alert(
      'Falha na atualização',
      'Houve um erro na atualização do perfil, verifique seus dados.'
    );
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
