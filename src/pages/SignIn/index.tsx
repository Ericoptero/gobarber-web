import React from 'react';
import { FiLogIn, FiLock, FiMail } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="GoBarber" />

      <form>
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
      </form>

      <a href="criar">
        <FiLogIn />
        Criar conta
      </a>
    </Content>

    <Background />
  </Container>
);

export default SignIn;
