import React, { useState, useMemo, useEffect } from 'react';
import { TouchableOpacity, Alert, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { isBefore, subDays, addDays, parseISO } from 'date-fns';
import { format } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';
import * as RNLocalize from 'react-native-localize';

import Header from '~/components/Header';
import Background from '~/components/Background';
import Button from '~/components/Button';

import api from '~/services/api';

import {
  Container,
  DateView,
  DateText,
  MeetupView,
  MeetupViewDetails,
  MeetupTitle,
  MeetupViewText,
  MeetupText,
  MeetupImage,
} from './styles';

export default function Dashboard({ navigation }) {
  const today = new Date();
  const timeZone = RNLocalize.getTimeZone(); // Need the TIMEZONE to avoid a day after. Example: 22:00 T-3
  const compareToday = parseISO(format(today, 'yyyy-MM-dd', { timeZone }));
  const [date, setDate] = useState(compareToday);
  const [page, setPage] = useState(1);
  const [schedule, setSchedule] = useState([]);
  const [reload, setReload] = useState(false);
  const user_id = useSelector(state => state.user.profile.id);

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM", { locale: pt }),
    [date],
  );

  useEffect(() => {
    async function loadSchedule() {
      try {
        const queryDate = format(date, 'yyyy-MM-dd');
        const response = await api.get('/schedule', {
          params: { date: queryDate, page },
        });
        setReload(false);
        if (response.data) {
          const aux = response.data
            .filter(meetup => meetup.past === false)
            .filter(
              meetup =>
                meetup.Attendances.every(user => user.user_id !== user_id) ===
                true,
            )
            .map(meetup => {
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

          setSchedule(aux);
        }
      } catch (err) {
        Alert.alert('Erro', 'Erro ao tentar buscar os Meetups do dia');
      }
    }

    loadSchedule();
  }, [date, page, reload, user_id]);

  useEffect(() => {
    navigation.addListener('didFocus', () => {
      setReload(true);
    });
  }, []); // eslint-disable-line

  function handlePrevDay() {
    const newDate = subDays(date, 1);

    /**
     * Check if it is not a past date
     */
    if (!isBefore(newDate, compareToday)) {
      setDate(newDate);
    }
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  async function handleAttend(meetup_id) {
    try {
      await api.post('/attendances', {
        meetup_id,
      });
      setPage(1);

      navigation.navigate('Attendance');
      Alert.alert('Sucesso', 'Inscrição realizada com sucesso!');
    } catch (err) {
      Alert.alert(
        'Erro',
        'Erro ao tentar realizar sua inscrição a este Meetup.',
      );
    }
  }

  return (
    <>
      <Header />
      <Background>
        <Container>
          <DateView>
            <TouchableOpacity onPress={handlePrevDay}>
              <Icon name="chevron-left" size={30} color="#ffffff" />
            </TouchableOpacity>
            <DateText>{dateFormatted}</DateText>
            <TouchableOpacity onPress={handleNextDay}>
              <Icon name="chevron-right" size={30} color="#ffffff" />
            </TouchableOpacity>
          </DateView>
          {schedule.length > 0 ? (
            <FlatList
              data={schedule}
              keyExtractor={item => item.id.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <MeetupView>
                  <MeetupImage
                    source={{
                      uri: item.File.url,
                    }}
                  />
                  <MeetupViewDetails>
                    <MeetupTitle>{item.title}</MeetupTitle>
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
                      <MeetupText>{item.location}</MeetupText>
                    </MeetupViewText>
                    <MeetupViewText>
                      <Icon name="person" size={13} color="#999999" />
                      <MeetupText>Organizador: {item.User.name}</MeetupText>
                    </MeetupViewText>

                    <Button
                      style={{ backgroundColor: '#F94D6A' }}
                      onPress={() => {
                        handleAttend(item.id);
                      }}>
                      Realizar inscrição
                    </Button>
                  </MeetupViewDetails>
                </MeetupView>
              )}
            />
          ) : (
            <MeetupViewDetails>
              <MeetupText>
                Não há novos meetups programados para esta data. {'\n\n'}
                Aproveite para agendar o seu próprio meetup =)
              </MeetupText>
            </MeetupViewDetails>
          )}
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

Dashboard.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    addListener: PropTypes.func.isRequired,
  }).isRequired,
};
