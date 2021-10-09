import React from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    bar: {},
});

interface SquareLoaderProps {
    color?: string;
    size?: number;
    duration?: number;
    delay?: number;
}

const SquareLoader: React.FunctionComponent<SquareLoaderProps> = ({
    color = '#0A57E7',
    size = 50,
    duration = 500,
    delay = 500,
}) => {
    const rotateX = React.useRef(new Animated.Value(1)).current;
    const rotateY = React.useRef(new Animated.Value(1)).current;

    React.useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.sequence([
                    Animated.timing(rotateX, {
                        toValue: 0,
                        duration,
                        easing: Easing.linear,
                        delay,
                        useNativeDriver: true,
                    }),
                    Animated.timing(rotateY, {
                        toValue: 0,
                        duration,
                        easing: Easing.linear,
                        delay,
                        useNativeDriver: true,
                    }),
                ]),
                Animated.sequence([
                    Animated.timing(rotateX, {
                        toValue: 1,
                        duration,
                        easing: Easing.linear,
                        delay,
                        useNativeDriver: true,
                    }),
                    Animated.timing(rotateY, {
                        toValue: 1,
                        duration,
                        easing: Easing.linear,
                        delay,
                        useNativeDriver: true,
                    }),
                ]),
            ]),
        ).start();
    }, [delay, duration, rotateX, rotateY]);

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.bar,
                    { backgroundColor: color, width: size, height: size, marginHorizontal: size / 2 },
                    {
                        transform: [
                            {
                                rotateY: rotateY.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0deg', '180deg'],
                                }),
                            },
                            {
                                rotateX: rotateX.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0deg', '180deg'],
                                }),
                            },
                        ],
                    },
                ]}
            />
        </View>
    );
};

export default SquareLoader;
