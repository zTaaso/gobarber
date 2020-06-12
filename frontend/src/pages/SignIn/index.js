import React, { useState } from 'react';
import { MdErrorOutline } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Input from '~/components/Input';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

function SignIn() {
  const dispatch = useDispatch();

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  async function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  async function handleValidation(data, { reset }) {
    setEmailError('');
    setPasswordError('');

    try {
      await schema.validate(data, { abortEarly: false });
      handleSubmit(data);
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
        reset();
      }
    }
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form onSubmit={handleValidation} schema={schema}>
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
