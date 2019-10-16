import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';

import Background from '~/components/Background';
import Input from '~/components/Input';
import Button from '~/components/Button';

import logo from '~/assets/logo.png';

import { Container, Form, SignLink, SignLinkText } from './styles';

export default function SignIn({ navigation }) {
  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form>
          <Input
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
          />
          <Input placeholder="Sua senha secreta" secureTextEntry />
          <Button onPress={() => {}} style={{ backgroundColor: '#F94D6A' }}>
            Entrar
          </Button>
        </Form>
        <SignLink onPress={() => navigation.navigate('SignUp')}>
          <SignLinkText>Criar conta grátis</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
