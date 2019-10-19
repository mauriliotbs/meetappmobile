import React, { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import api from '~/services/api';

import Header from '~/components/Header';
import Background from '~/components/Background';

import { Container, MeetupView, MeetupTitle, MeetupText } from './styles';

export default function Attendance() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function getAttendances() {
      try {
        const response = await api.get('/attendances');
        if (response.data) {
          const aux = response.data.map(meetup => {
            return {
              ...meetup,
              formattedDate: format(
                parseISO(meetup.date),
                "dd 'de' MMMM 'de' yyyy', às' HH:mm",
                {
                  locale: pt,
                },
              ),
            };
          });
          setMeetups(aux);
        }
      } catch (err) {
        console.tron.log(meetups);
        Alert.alert('Erro', 'Falha ao buscar lista de incrições');
      }
    }

    getAttendances();
  }, [meetups]);

  return (
    <>
      <Header />
      <Background>
        <Container>
          {meetups.length > 0 ? (
            <FlatList
              data={meetups}
              keyExtractor={item => item.Meetup.id}
              renderItem={item => (
                <MeetupView>
                  <MeetupTitle>{item.Meetup.title}</MeetupTitle>
                  <MeetupText>{item.Meetup.formattedDate}</MeetupText>
                  <MeetupText>{item.Meetup.location}</MeetupText>
                  <Icon name="person" size={14} color="#999999" />
                  <MeetupText>Organizador: {item.Meetup.User.name}</MeetupText>
                </MeetupView>
              )}
            />
          ) : (
            <MeetupText>Você não está inscrito em nenhum Meetup =(</MeetupText>
          )}
        </Container>
      </Background>
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
