import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  height: 50px;
  border-radius: 4px;

  align-items: center;
  justify-content: center;
  margin: 10px 0;
`;

export const Text = styled.Text`
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
`;
