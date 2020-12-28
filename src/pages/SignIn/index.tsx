import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiLock, FiMail } from 'react-icons/fi';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/AuthContext';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Background } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      formRef.current?.setErrors({});

      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('O campo de email é obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('O campo de senha é obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }

        // Mensagens de toast
      }

      signIn({
        email: data.email,
        password: data.password,
      });
    },
    [signIn],
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu login</h1>

          <Input icon={FiMail} name="email" type="text" placeholder="E-mail" />
          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Entrar</Button>

          <a href="esqueci">Esqueci minha senha</a>
        </Form>

        <a href="criar">
          <FiLogIn />
          Criar conta
        </a>
      </Content>

      <Background />
    </Container>
  );
};

export default SignIn;
