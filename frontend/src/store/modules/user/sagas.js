import { put, call, takeLatest, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
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
    toast.success('Usuário editado com suecesso!');
  } catch (err) {
    toast.error('Algo deu errado. Verifique seus dados e tente novamente. ');
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
