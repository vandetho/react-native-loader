import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    bar: {
        width: 5,
        height: 5,
    },
});

interface BarLoadingProps {
    color?: string;
    size?: number;
    duration?: number;
}

const BarLoading: React.FunctionComponent<BarLoadingProps> = ({ color = '#0a57e7', size = 5, duration = 250 }) => {
    const firstBar = React.useRef(new Animated.Value(3)).current;
    const secondBar = React.useRef(new Animated.Value(2)).current;
    const thirdBar = React.useRef(new Animated.Value(1)).current;
    const fourthBar = React.useRef(new Animated.Value(1)).current;

    React.useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.sequence([
                    Animated.timing(firstBar, { toValue: 2, duration, useNativeDriver: true }),
                    Animated.timing(secondBar, { toValue: 3, duration, useNativeDriver: true }),
                    Animated.timing(thirdBar, { toValue: 2, duration, useNativeDriver: true }),
                    Animated.timing(fourthBar, { toValue: 1, duration, useNativeDriver: true }),
                ]),
                Animated.sequence([
                    Animated.timing(firstBar, { toValue: 1, duration, useNativeDriver: true }),
                    Animated.timing(secondBar, { toValue: 2, duration, useNativeDriver: true }),
                    Animated.timing(thirdBar, { toValue: 3, duration, useNativeDriver: true }),
                    Animated.timing(fourthBar, { toValue: 2, duration, useNativeDriver: true }),
                ]),
                Animated.sequence([
                    Animated.timing(firstBar, { toValue: 2, duration, useNativeDriver: true }),
                    Animated.timing(secondBar, { toValue: 1, duration, useNativeDriver: true }),
                    Animated.timing(thirdBar, { toValue: 2, duration, useNativeDriver: true }),
                    Animated.timing(fourthBar, { toValue: 3, duration, useNativeDriver: true }),
                ]),
                Animated.sequence([
                    Animated.timing(firstBar, { toValue: 3, duration, useNativeDriver: true }),
                    Animated.timing(secondBar, { toValue: 2, duration, useNativeDriver: true }),
                    Animated.timing(thirdBar, { toValue: 1, duration, useNativeDriver: true }),
                    Animated.timing(fourthBar, { toValue: 2, duration, useNativeDriver: true }),
                ]),
            ]),
        ).start();
    }, [duration, firstBar, fourthBar, secondBar, thirdBar]);

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.bar,
                    { backgroundColor: color, width: size, height: 5 },
                    { transform: [{ translateY: firstBar }] },
                ]}
            />
            <Animated.View
                style={[
                    styles.bar,
                    { backgroundColor: color, width: size, height: 5 },
                    { transform: [{ translateY: secondBar }] },
                ]}
            />
            <Animated.View
                style={[
                    styles.bar,
                    { backgroundColor: color, width: size, height: 5 },
                    { transform: [{ translateY: thirdBar }] },
                ]}
            />
            <Animated.View
                style={[
                    styles.bar,
                    { backgroundColor: color, width: size, height: 5 },
                    { transform: [{ translateY: fourthBar }] },
                ]}
            />
        </View>
    );
};

export default BarLoading;
