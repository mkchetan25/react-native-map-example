import React from 'react';
import Styled from 'styled-components/native';
import { View, Image, Text, StyleSheet } from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const Container = Styled.View`
    flex: 1;
`;

const CurrentLocation = () => {
  return (
    <Container>
      <View style = {styles.container}>
            <Image
                source={{uri:'https://png.icons8.com/dusk/100/000000/compass.png'}}
                style={{width: 100, height: 100}}
            />
            <Text style = {styles.boldText}>
                You are Here
            </Text>
            <Text style={{justifyContent:'center',alignItems: 'center',marginTop:16}}>
                Longitude: 
            </Text>
            <Text style={{justifyContent:'center',alignItems: 'center',marginTop:16}}>
                Latitude: 
            </Text>
        </View>
    </Container>
  );
};

const styles = StyleSheet.create ({
    container: {
       flex: 1,
       alignItems: 'center',
       justifyContent:'center',
       marginTop: 50,
       padding:16,
       backgroundColor:'white'
    },
    boldText: {
       fontSize: 30,
       color: 'red',
    }
});

export default CurrentLocation;;
