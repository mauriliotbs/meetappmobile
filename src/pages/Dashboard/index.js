import React, { useState, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { isBefore, isAfter, subDays, addDays, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Header from '~/components/Header';
import Background from '~/components/Background';

import { Container, DateView, DateText } from './styles';

export default function Dashboard() {
  const today = new Date();
  console.tron.log('today', today);
  const [date, setDate] = useState(today);

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM", { locale: pt }),
    [date],
  );

  function handlePrevDay() {
    const newDate = subDays(date, 1);
    console.tron.log('data', newDate);
    if (isAfter(newDate, today)) {
      setDate(newDate);
    }
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  return (
    <>
      <Header />
      <Background>
        <Container>
          <DateView>
            <TouchableOpacity onPress={handlePrevDay}>
              <Icon name="chevron-left" size={32} color="#ffffff" />
            </TouchableOpacity>
            <DateText>{dateFormatted}</DateText>
            <TouchableOpacity onPress={handleNextDay}>
              <Icon name="chevron-right" size={32} color="#ffffff" />
            </TouchableOpacity>
          </DateView>
        </Container>
      </Background>
    </>
  );
}

const tabBarIcon = ({ tintColor }) => (
  <Icon name="format-list-bulleted" size={20} color={tintColor} />
);

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon,
};
