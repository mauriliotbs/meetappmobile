import React from 'react';
import { Image } from 'react-native';

import { Container } from './styles';
import logo from '~/assets/logo-small.png';

export default function Header() {
  return (
    <Container>
      <Image source={logo} />
    </Container>
  );
}
