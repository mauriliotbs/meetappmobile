import React, { useRef, useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { updateProfileRequest } from '~/store/modules/user/actions';

import Header from '~/components/Header';
import Background from '~/components/Background';
import Input from '~/components/Input';
import Button from '~/components/Button';

import { Container, Form, Separator, DivExitButton } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome completo é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  oldPassword: Yup.string(),
  password: Yup.string().when('oldPassword', (oldPassword, field) =>
    oldPassword
      ? field
          .min(6, 'A nova senha deve conter pelo menos 6 dígitos')
          .required('Você deve digitar um nova senha para modificar a antiga')
      : field,
  ),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password
      ? field
          .oneOf(
            [Yup.ref('password')],
            'Por favor, confirme a sua nova senha de forma exata',
          )
          .min(6, 'A nova senha deve conter pelo menos 6 dígitos')
          .required('É obrigatório confirmar a nova senha')
      : field,
  ),
});

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function handleSubmit() {
    try {
      const data = { name, email, oldPassword, password, confirmPassword };
      await schema.validate(data);
      dispatch(updateProfileRequest(data));
      setOldPassword('');
      setPassword('');
      setConfirmPassword('');
      Alert.alert('Sucesso', 'Dados atualizados');
    } catch ({ message }) {
      Alert.alert('Erro', message);
    }
  }

  function handleExit() {}

  return (
    <>
      <Header />
      <Background>
        <Container>
          <Form>
            <Input
              placeholder="Nome completo"
              autoCorrect={false}
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
              onSubmitEditing={() => oldPasswordRef.current.focus()}
              value={email}
              onChangeText={setEmail}
            />
            <Separator />
            <Input
              placeholder="Senha atual"
              secureTextEntry
              ref={oldPasswordRef}
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current.focus()}
              value={oldPassword}
              onChangeText={setOldPassword}
            />
            <Input
              placeholder="Nova senha"
              secureTextEntry
              ref={passwordRef}
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordRef.current.focus()}
              value={password}
              onChangeText={setPassword}
            />
            <Input
              placeholder="Confirmação de senha"
              secureTextEntry
              ref={confirmPasswordRef}
              returnKeyType="send"
              onSubmitEditing={handleSubmit}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <Button
              onPress={handleSubmit}
              style={{ backgroundColor: '#E5556E' }}>
              Salvar perfil
            </Button>
          </Form>
          <DivExitButton>
            <Button onPress={handleExit} style={{ backgroundColor: '#d44059' }}>
              Sair do Meetapp
            </Button>
          </DivExitButton>
        </Container>
      </Background>
    </>
  );
}

const tabBarIcon = ({ tintColor }) => (
  <Icon name="person" size={20} color={tintColor} />
);

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Profile.navigationOptions = {
  tabBarLabel: 'Meu perfil',
  tabBarIcon,
};
