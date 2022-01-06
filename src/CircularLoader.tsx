import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
    },
    circle: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
});

interface CircularLoaderProps {
    size?: number;
    circleSize?: number;
    color?: string;
    duration?: number;
}

const CircularLoaderComponent: React.FunctionComponent<CircularLoaderProps> = ({
    size = 25,
    color = '#0A57E7',
    duration = 6000,
}) => {
    const circle = React.useRef(new Animated.Value(0)).current;
    const circleSize = React.useMemo(() => size * 4, [size]);
    const translate = React.useMemo(() => -circleSize * 3, [circleSize]);

    React.useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(circle, { toValue: 1, useNativeDriver: true, duration }),
                Animated.timing(circle, { toValue: 0, useNativeDriver: true, duration }),
            ]),
        ).start();
    }, [circle, circleSize, duration]);

    return (
        <View style={[styles.container, { width: circleSize, height: circleSize, borderRadius: circleSize / 2 }]}>
            <Animated.View
                style={[
                    styles.circle,
                    {
                        height: size,
                        width: size,
                        backgroundColor: color,
                        borderRadius: size / 2,
                    },
                    {
                        transform: [
                            {
                                rotate: circle.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0deg', '360deg'],
                                }),
                            },
                            {
                                translateX: circle.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [translate, translate],
                                }),
                            },
                            {
                                translateY: circle.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [translate, translate],
                                }),
                            },
                        ],
                    },
                ]}
            />
            <View
                style={[
                    {
                        borderWidth: 1,
                        width: circleSize,
                        height: circleSize,
                        borderRadius: circleSize / 2,
                        position: 'absolute',
                        left: -circleSize / 2,
                        top: -circleSize / 2,
                    },
                ]}
            />
        </View>
    );
};

const CircularLoader  = React.memo(CircularLoaderComponent);

export default CircularLoader;
