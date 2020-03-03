import React from 'react';
import Styled from 'styled-components/native';
import MapView from 'react-native-maps';

const Container = Styled.View`
    flex: 1;
`;

const InitialLocation = () => {
  return (
    <Container>
      <MapView
        style={{flex: 1}}
        initialRegion={{
          // latitude: 37.78825,
          // longitude: -122.4324,
          latitude: 12.1160,
          longitude: 76.6782,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </Container>
  );
};

export default InitialLocation;
