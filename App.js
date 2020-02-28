import React from 'react';
import {Platform, Alert} from "react-native";
import Loading from "./Loading";
import Weather from "./Weather";
import * as Location from 'expo-location';
import axios from "axios";
import config from "./api.config";

export default class App extends React.Component {
    state = {
        isLoading: true,
    };

    getWeather = async(latitude, longitude) => {
        const {data} = await axios.get(
            `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${config.apiKey}&units=metric`
        );
        this.setState({isLoading:false, temp: data.main.temp});
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
            console.log(latitude, longitude);
            this.getWeather(latitude, longitude);
        } catch (error) {
            Alert.alert("Can't find you", "So sad");
            console.error(error);
        }
    };

    componentDidMount() {
        this.getLocation();
    }

    render() {
        const {isLoading, temp} = this.state;
        return (
            isLoading ? <Loading/> : <Weather temp={Math.round(temp)}/>
        );
    }
}

