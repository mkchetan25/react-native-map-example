import React, { useState } from 'react';
import { StyleSheet, Image, View, Text, Platform, PermissionsAndroid, Alert } from 'react-native';
import Styled from 'styled-components/native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirection from 'react-native-maps-directions';
import * as Locations from './locations.json'

interface LocationProps {

}

interface IGeoCoordinates {
    longitude: number;
    latitude: number;
}

interface LocationState {
    currentLongitude?: number;
    currentLatitude?: number;
    destLongitude?: number;
    destLatitude?: number;
    locations?: any[];
    distance: string;
    duration: string;
}

class CurrentLocation extends React.Component<LocationProps, LocationState> {
    private watchID: any;
    constructor(props: LocationProps) {
        super(props);
        this.state = {
            currentLatitude: undefined,
            currentLongitude: undefined,
            destLatitude: undefined,
            destLongitude: undefined,
            locations: Locations,
            distance: '',
            duration: '',
        }
    }

    componentDidMount() {
        this.callLocation();
    }

    callLocation() {
        // Alert.alert("callLocation Called");
        Geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {
                
                const currentLongitude = JSON.stringify(position.coords.longitude);
                //getting the Longitude from the location json
                const currentLatitude = JSON.stringify(position.coords.latitude);
                //getting the Latitude from the location json
                console.log(`current longitude ${currentLongitude}`);
                console.log(`current latitude ${currentLatitude}`);
                this.setState({ currentLongitude:Number(currentLongitude) });
                //Setting state Longitude to re re-render the Longitude Text
                this.setState({ currentLatitude:Number(currentLatitude) });
                //Setting state Latitude to re re-render the Longitude Text
            },
            (error) => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
        this.watchID = Geolocation.watchPosition((position) => {
            //Will give you the location on location change
            console.log(position);
            const currentLongitude = JSON.stringify(position.coords.longitude);
            //getting the Longitude from the location json
            const currentLatitude = JSON.stringify(position.coords.latitude);
            //getting the Latitude from the location json
            this.setState({ currentLongitude:Number(currentLongitude) });
            //Setting state Longitude to re re-render the Longitude Text
            this.setState({ currentLatitude:Number(currentLatitude) });
            //Setting state Latitude to re re-render the Longitude Text
        });
    }

    mergeCoords = async () => {
        const {currentLatitude, currentLongitude, destLatitude, destLongitude} = this.state;

        const hasStartAndEnd = currentLatitude !== null && destLatitude !== null;
        if (hasStartAndEnd) {
            const currentLoc: IGeoCoordinates = {
                latitude: currentLatitude ? currentLatitude : -112.009,
                longitude: currentLongitude ? currentLongitude : 32.980
            };
            const destLoc: IGeoCoordinates = {
                latitude: destLatitude ? destLatitude : -112.009,
                longitude: destLongitude ? destLongitude : 32.980
            };
            // await this.getDirection(currentLoc, destLoc);
        }
    }

    // async getDirection(startLoc: IGeoCoordinates, destLoc: IGeoCoordinates) {
    //     try{
    //         const concatStart = `${startLoc.latitude},${startLoc.longitude}`;
    //         const concatEnd = `${destLoc.latitude},${destLoc.longitude}`;
    //         const resp = await fetch(`https://maps.google.com/maps/api/directions/json?origin=${concatStart}&desination=${concatEnd}&key=AIzaSyAB34lB3ehVeIlNc3seSqNXQjaviJ8Fc94`)
    //         const respJson = await resp.json();
    //         // const points = Polyline.
    //     } catch(err) {

    //     }
    // }

    render() {
        const GOOGLE_MAPS_APIKEY = 'AIzaSyAB34lB3ehVeIlNc3seSqNXQjaviJ8Fc94';
        return (
            <Container>
                <MapView
                    showsUserLocation
                    followsUserLocation
                    style={{flex: 1}}
                    initialRegion={{
                        latitude: Number(this.state.currentLatitude),
                        longitude: Number(this.state.currentLongitude),
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    >
                        <Marker coordinate={{ latitude: 12.1189, longitude: 76.6928 }}
                            title="pickup location"
                            description="this is a marker example"
                        ></Marker>
                        <Marker coordinate={{ latitude: 12.2732, longitude: 76.6707 }}
                            title="drop location"
                            description="this is a marker example"
                        ></Marker>
                        <MapViewDirection
                            apikey={GOOGLE_MAPS_APIKEY}
                            origin={{ latitude: 12.1189, longitude: 76.6928 }}
                            destination={{ latitude: 12.2732, longitude: 76.6707 }}
                            mode='DRIVING'
                            language='en'
                            strokeWidth={4}
                            strokeColor="hotpink"
                            onReady={result => {
                                console.log(`Distance: ${result.distance} km`)
                                console.log(`Duration: ${result.duration} min.`)
                                this.setState({distance: result.distance, duration: result.duration});
                            }}
                        ></MapViewDirection>
                        <View>
                            <Text>distance : {this.state.distance} km.time : {this.state.duration} min</Text>
                        </View>
                        {/* <Polyline
                            coordinates={[
                                { latitude: 12.1189, longitude: 76.6928 },
                                { latitude: 12.2732, longitude: 76.6707 }
                            ]}
                            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                            strokeColors={[
                                '#7F0000',
                                '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                                '#B24112',
                                '#E5845C',
                                '#238C23',
                                '#7F0000'
                            ]}
                            strokeWidth={6}
                        /> */}

                    {/* <Marker
                    coordinate={{
                        latitude: Number(this.state.currentLatitude), 
                        longitude: Number(this.state.currentLongitude)
                    }}
                    title="this is a marker"
                    description="this is a marker example"
                    /> */}
                </MapView>
            </Container>
        )
    }
}

const Container = Styled.View`
    flex: 1;
`;

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

export default CurrentLocation;