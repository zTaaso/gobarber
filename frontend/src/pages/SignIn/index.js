import React from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import Input from '~/components/Input';

import logo from '~/assets/logo.svg';
// import { Container } from './styles';

function SignIn() {
  function handleSubmit(data, { reset }) {
    reset();
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form onSubmit={handleSubmit}>
        <Input type="email" name="email" placeholder="Seu email" />
        <Input type="password" name="password" placeholder="Sua senha" />

        <button type="submit">Acessar</button>
        <Link to="/register">Criar conta gratuita</Link>
      </Form>
    </>
  );
}

export default SignIn;
