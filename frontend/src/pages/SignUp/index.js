import React, { useState } from 'react';
import { MdErrorOutline } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import Input from '~/components/Input';

import { signUpRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';
// import { Container } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string()
    .required('A senha é obrigatória')
    .min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

function SignUp() {
  const dispatch = useDispatch();

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }

  async function handleValidate(data, { reset }) {
    setEmailError('');

    setPasswordError('');
    setNameError('');

    try {
      await schema.validate(data, { abortEarly: false });

      handleSubmit(data);
      reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error, index) => {
          switch (error.path) {
            case 'email':
              setEmailError(error.message);
              break;
            case 'password':
              // this condition grants that password will always be setted with the first password error
              if (index === 2 || index === 0) setPasswordError(error.message);

              break;
            case 'name':
              setNameError(error.message);
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

      <Form onSubmit={handleValidate}>
        <Input type="text" name="name" placeholder="Nome completo" />
        {nameError && (
          <span>
            {nameError}
            <MdErrorOutline color="#F46" size={20} />
          </span>
        )}

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

        <button type="submit">Criar conta</button>
        <Link to="/">Já tenho conta</Link>
      </Form>
    </>
  );
}

export default SignUp;
