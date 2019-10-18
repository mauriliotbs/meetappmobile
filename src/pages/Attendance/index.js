import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import Header from '~/components/Header';
import Background from '~/components/Background';

// import { Container } from './styles';

export default function Attendance() {
  return (
    <>
      <Header />
      <Background />
    </>
  );
}

const tabBarIcon = ({ tintColor }) => (
  <Icon name="local-offer" size={20} color={tintColor} />
);

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Attendance.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon,
};
