import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@unform/web';

import Input from '~/components/Input';
import AvatarInput from './AvatarInput';

import { updateProfileRequest } from '~/store/modules/user/actions';

import { Container } from './styles';

function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <AvatarInput name="avatar_id" />

        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Endereço de e-mail" />

        <hr />

        <Input name="oldPassword" type="password" placeholder="Senha antiga" />
        <Input name="password" type="password" placeholder="Nova senha" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirmação da nova senha"
        />

        <button type="submit">Atualizar perfil</button>
      </Form>

      <button type="button">Sair do GoBarber</button>
    </Container>
  );
}

export default Profile;
