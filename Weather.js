import React from "react";
import {StyleSheet, View, Text} from "react-native";
import PropTypes from "prop-types";
import { Feather } from '@expo/vector-icons';

export default function Weather({temp, condition}) {
    return (
        <View style={styles.container}>
            <View style={styles.halfContainer}>
                <Feather name="cloud-rain" size={96} color="green" />
                <Text style={styles.temp}>{temp}°C</Text>
            </View>
            <View style={styles.halfContainer}>
                <Text>{condition}</Text>
            </View>
        </View>
    );
}

Weather.propTypes = {
    temp: PropTypes.number.isRequired,
    condition: PropTypes.oneOf([
        "Thunderstorm",
        "Drizzle",
        "Rain",
        "Snow",
        "Atmosphere",
        "Clear",
        "Clouds",
        "Haze",
        "Fog"
    ]).isRequired
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    temp: {
         fontSize: 42
    },
    halfContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

});
