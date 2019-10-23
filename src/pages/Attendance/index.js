import React, { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import api from '~/services/api';

import Header from '~/components/Header';
import Background from '~/components/Background';
import Button from '~/components/Button';

import {
  Container,
  MeetupView,
  MeetupViewDetails,
  MeetupViewText,
  MeetupTitle,
  MeetupText,
  MeetupImage,
} from './styles';

export default function Attendance({ navigation }) {
  const [meetups, setMeetups] = useState([]);

  async function getAttendances() {
    try {
      const response = await api.get('/attendances');
      if (response.data) {
        const aux = response.data.map(meetup => {
          return {
            ...meetup,
            formattedDate: format(
              parseISO(meetup.Meetup.date),
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
      Alert.alert('Erro', 'Falha ao buscar lista de incrições');
    }
  }

  useEffect(() => {
    getAttendances();

    navigation.addListener('didFocus', () => {
      getAttendances();
    });
  }, []); // eslint-disable-line

  async function handleAttendanceCancel(attendanceId) {
    try {
      await api.delete(`/attendances/${attendanceId}`);
      Alert.alert('Sucesso', 'Você não está mais inscrito no Meetup');
      getAttendances();
    } catch (err) {
      Alert.alert(
        'Erro',
        'Falha ao tentar cancelar a sua inscrição no Meetup.',
      );
    }
  }

  return (
    <>
      <Header />
      <Background>
        <Container>
          {meetups.length > 0 ? (
            <FlatList
              data={meetups}
              keyExtractor={item => item.Meetup.id.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <MeetupView>
                  <MeetupImage
                    source={{
                      uri: item.Meetup.File.url,
                    }}
                  />
                  <MeetupViewDetails>
                    <MeetupTitle>{item.Meetup.title}</MeetupTitle>
                    <MeetupViewText>
                      <Icon name="event" size={13} color="#999999" />
                      <MeetupText>{item.formattedDate}</MeetupText>
                    </MeetupViewText>
                    <MeetupViewText>
                      <Icon
                        name="place"
                        size={13}
                        color="#999999"
                        margin={15}
                      />
                      <MeetupText>{item.Meetup.location}</MeetupText>
                    </MeetupViewText>
                    <MeetupViewText>
                      <Icon name="person" size={13} color="#999999" />
                      <MeetupText>
                        Organizador: {item.Meetup.User.name}
                      </MeetupText>
                    </MeetupViewText>

                    <Button
                      style={{ backgroundColor: '#D44059' }}
                      onPress={() => handleAttendanceCancel(item.id)}>
                      Cancelar inscrição
                    </Button>
                  </MeetupViewDetails>
                </MeetupView>
              )}
            />
          ) : (
            <MeetupViewDetails>
              <MeetupText>
                Você não está inscrito em nenhum Meetup =(
              </MeetupText>
            </MeetupViewDetails>
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

Attendance.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    addListener: PropTypes.func.isRequired,
  }).isRequired,
};
