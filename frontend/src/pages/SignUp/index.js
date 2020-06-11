import React from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import Input from '~/components/Input';

import logo from '~/assets/logo.svg';
// import { Container } from './styles';

function SignUp() {
  function handleSubmit(data, { reset }) {
    console.tron.log(data);
    reset();
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form onSubmit={handleSubmit}>
        <Input type="text" name="name" placeholder="Nome completo" />
        <Input type="email" name="email" placeholder="Seu email" />
        <Input type="password" name="password" placeholder="Sua senha" />

        <button type="submit">Criar conta</button>
        <Link to="/register">Já tenho conta</Link>
      </Form>
    </>
  );
}

export default SignUp;
