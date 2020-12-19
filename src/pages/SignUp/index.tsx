import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiLock, FiUser, FiMail } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    formRef.current?.setErrors({});

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O campo de nome é obrigatório'),
        email: Yup.string()
          .required('O campo de email é obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'A senha deve ter no mínimo 6 digitos'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      formRef.current?.setErrors(getValidationErrors(err));
    }
  }, []);

  return (
    <Container>
      <Background />

      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>

          <Input icon={FiUser} name="name" type="text" placeholder="Nome" />
          <Input icon={FiMail} name="email" type="text" placeholder="E-mail" />
          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Cadastrar</Button>
        </Form>

        <a href="criar">
          <FiArrowLeft />
          Voltar para logon
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
