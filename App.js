import React from 'react';
import {Platform, Alert} from "react-native";
import Loading from "./Loading";
import * as Location from 'expo-location';
import axios from "axios";

const API_KEY = "b6907d289e10d714a6e88b30761fae22"; // this is sample key

export default class App extends React.Component {
    state = {
        isLoading: true,
    };

    getWeather = async(latitude, longitude) => {
        const {data} = await axios.get(
            `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`
        );
        console.log(data);
    };

    getLocation = async () => {
        try {
            await Location.requestPermissionsAsync();

            let options = {};
            if (Platform.OS === 'android') {
                options = {accuracy: Location.Accuracy.High};
            }

            const {
                coords: {latitude, longitude}
            } = await Location.getCurrentPositionAsync(options);
            this.getWeather(latitude, longitude);
            this.setState({isLoading: false});
        } catch (error) {
            Alert.alert("Can't find you", "So sad");
            console.error(error);
        }
    };

    componentDidMount() {
        this.getLocation();
    }

    render() {
        const {isLoading} = this.state;
        return (
            isLoading ? <Loading/> : null
        );
    }
}

