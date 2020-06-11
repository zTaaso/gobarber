import React, { useState } from 'react';
import { MdErrorOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import Input from '~/components/Input';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

function SignIn() {
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  async function handleSubmit(data, { reset }) {
    setEmailError('');
    setPasswordError('');

    try {
      await schema.validate(data, { abortEarly: false });
      reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          switch (error.path) {
            case 'email':
              setEmailError(error.message);
              break;
            case 'password':
              setPasswordError(error.message);
              break;
            default:
          }
        });
      }
    }
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form onSubmit={handleSubmit} schema={schema}>
        <Input type="email" name="email" placeholder="Seu email" />
        {emailError && (
          <span>
            {emailError}
            <MdErrorOutline color="#F46" size={20} />
          </span>
        )}

        <Input type="password" name="password" placeholder="Sua senha" />
        {passwordError && (
          <span>
            {passwordError}
            <MdErrorOutline color="#F46" size={20} />
          </span>
        )}

        <button type="submit">Acessar</button>
        <Link to="/register">Criar conta gratuita</Link>
      </Form>
    </>
  );
}

export default SignIn;
