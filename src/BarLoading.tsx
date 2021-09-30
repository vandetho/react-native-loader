import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    bar: {},
});

interface BarLoadingProps {
    color?: string;
    size?: number;
    duration?: number;
}

const BarLoading: React.FunctionComponent<BarLoadingProps> = ({ color = '#0A57E7', size = 10, duration = 300 }) => {
    const firstBar = React.useRef(new Animated.Value(3)).current;
    const secondBar = React.useRef(new Animated.Value(2)).current;
    const thirdBar = React.useRef(new Animated.Value(1)).current;
    const fourthBar = React.useRef(new Animated.Value(1)).current;

    React.useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(firstBar, { toValue: 2, duration, useNativeDriver: true }),
                    Animated.timing(secondBar, { toValue: 3, duration, useNativeDriver: true }),
                    Animated.timing(thirdBar, { toValue: 2, duration, useNativeDriver: true }),
                    Animated.timing(fourthBar, { toValue: 1, duration, useNativeDriver: true }),
                ]),
                Animated.parallel([
                    Animated.timing(firstBar, { toValue: 1, duration, useNativeDriver: true }),
                    Animated.timing(secondBar, { toValue: 2, duration, useNativeDriver: true }),
                    Animated.timing(thirdBar, { toValue: 3, duration, useNativeDriver: true }),
                    Animated.timing(fourthBar, { toValue: 2, duration, useNativeDriver: true }),
                ]),
                Animated.parallel([
                    Animated.timing(firstBar, { toValue: 2, duration, useNativeDriver: true }),
                    Animated.timing(secondBar, { toValue: 1, duration, useNativeDriver: true }),
                    Animated.timing(thirdBar, { toValue: 2, duration, useNativeDriver: true }),
                    Animated.timing(fourthBar, { toValue: 3, duration, useNativeDriver: true }),
                ]),
                Animated.parallel([
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
                    { backgroundColor: color, width: size, height: size, marginHorizontal: size / 2 },
                    { transform: [{ scaleY: firstBar }] },
                ]}
            />
            <Animated.View
                style={[
                    styles.bar,
                    { backgroundColor: color, width: size, height: size, marginHorizontal: size / 2 },
                    { transform: [{ scaleY: secondBar }] },
                ]}
            />
            <Animated.View
                style={[
                    styles.bar,
                    { backgroundColor: color, width: size, height: size, marginHorizontal: size / 2 },
                    { transform: [{ scaleY: thirdBar }] },
                ]}
            />
            <Animated.View
                style={[
                    styles.bar,
                    { backgroundColor: color, width: size, height: size, marginHorizontal: size / 2 },
                    { transform: [{ scaleY: fourthBar }] },
                ]}
            />
        </View>
    );
};

export default BarLoading;
