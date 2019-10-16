import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';

import Background from '~/components/Background';
import Input from '~/components/Input';
import Button from '~/components/Button';

import logo from '~/assets/logo.png';

import { Container, Form, SignLink, SignLinkText } from './styles';

export default function SignUp({ navigation }) {
  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form>
          <Input
            placeholder="Nome completo"
            autoCorrect={false}
            autoCapitalize="none"
          />
          <Input
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
          />
          <Input placeholder="Sua senha secreta" secureTextEntry />
          <Button onPress={() => {}} style={{ backgroundColor: '#E5556E' }}>
            Criar conta
          </Button>
        </Form>
        <SignLink onPress={() => navigation.navigate('SignIn')}>
          <SignLinkText>Já tenho login</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
