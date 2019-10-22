import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Image, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { signUpRequest } from '~/store/modules/auth/actions';

import Background from '~/components/Background';
import Input from '~/components/Input';
import Button from '~/components/Button';

import logo from '~/assets/logo.png';

import { Container, Form, SignLink, SignLinkText } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome completo é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'A senha deve possuir no mínimo 6 dígitos')
    .required('A senha é obrigatória'),
});

export default function SignUp({ navigation }) {
  const emailRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit() {
    try {
      const data = { name, email, password };
      await schema.validate(data);
      dispatch(signUpRequest(name, email, password));
    } catch ({ message }) {
      Alert.alert('Erro', message);
    }
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form>
          <Input
            placeholder="Nome completo"
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            value={name}
            onChangeText={setName}
          />
          <Input
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            ref={emailRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />
          <Input
            placeholder="Sua senha secreta"
            secureTextEntry
            ref={passwordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword}
          />
          <Button onPress={handleSubmit} style={{ backgroundColor: '#E5556E' }}>
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
