import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  padding: 0 30px;
  margin-top: 20px;
`;

export const DateView = styled.View`
  flex-direction: row;
  align-items: stretch;
  margin: 10px 0 20px;
`;

export const DateText = styled.Text`
  color: #ffffff;
  font-size: 20px;
  margin: 0px 10px;
`;

export const MeetupView = styled.View`
  background: #ffffff;
  border-radius: 4px;
  height: 345px;
  width: 335px;
  margin: 10px 0 15px;
`;

export const MeetupViewDetails = styled.View`
  padding: 15px;
`;

export const MeetupViewText = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 3px;
`;

export const MeetupTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333333;
`;

export const MeetupText = styled.Text`
  font-size: 13px;
  color: #999999;
  margin-left: 5px;
`;

export const MeetupImage = styled.Image`
  border-radius: 4px;
  height: 150px;
  width: 335px;
`;
