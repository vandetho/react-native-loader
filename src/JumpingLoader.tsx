import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    bar: {},
});

interface JumpingLoaderProps {
    color?: string;
    size?: number;
    duration?: number;
    round?: boolean;
}

const JumpingLoader: React.FunctionComponent<JumpingLoaderProps> = ({
    color = '#0A57E7',
    size = 10,
    duration = 300,
    round = false,
}) => {
    const firstDot = React.useRef(new Animated.Value(-18)).current;
    const secondDot = React.useRef(new Animated.Value(1)).current;
    const thirdDot = React.useRef(new Animated.Value(1)).current;
    const fourthDot = React.useRef(new Animated.Value(1)).current;

    const style = React.useMemo(
        () => ({
            backgroundColor: color,
            width: size,
            height: size,
            marginHorizontal: size / 2,
            borderRadius: round ? size / 2 : undefined,
        }),
        [color, round, size],
    );

    React.useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(firstDot, { toValue: 1, duration, useNativeDriver: true }),
                    Animated.timing(secondDot, { toValue: -18, duration, useNativeDriver: true }),
                    Animated.timing(thirdDot, { toValue: 1, duration, useNativeDriver: true }),
                    Animated.timing(fourthDot, { toValue: 1, duration, useNativeDriver: true }),
                ]),
                Animated.parallel([
                    Animated.timing(firstDot, { toValue: 1, duration, useNativeDriver: true }),
                    Animated.timing(secondDot, { toValue: 1, duration, useNativeDriver: true }),
                    Animated.timing(thirdDot, { toValue: -18, duration, useNativeDriver: true }),
                    Animated.timing(fourthDot, { toValue: 1, duration, useNativeDriver: true }),
                ]),
                Animated.parallel([
                    Animated.timing(firstDot, { toValue: 1, duration, useNativeDriver: true }),
                    Animated.timing(secondDot, { toValue: 1, duration, useNativeDriver: true }),
                    Animated.timing(thirdDot, { toValue: 1, duration, useNativeDriver: true }),
                    Animated.timing(fourthDot, { toValue: -18, duration, useNativeDriver: true }),
                ]),
                Animated.parallel([
                    Animated.timing(firstDot, { toValue: -18, duration, useNativeDriver: true }),
                    Animated.timing(secondDot, { toValue: 1, duration, useNativeDriver: true }),
                    Animated.timing(thirdDot, { toValue: 1, duration, useNativeDriver: true }),
                    Animated.timing(fourthDot, { toValue: 1, duration, useNativeDriver: true }),
                ]),
            ]),
        ).start();
    }, [duration, firstDot, fourthDot, secondDot, thirdDot]);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.bar, style, { transform: [{ translateY: firstDot }] }]} />
            <Animated.View style={[styles.bar, style, { transform: [{ translateY: secondDot }] }]} />
            <Animated.View style={[styles.bar, style, { transform: [{ translateY: thirdDot }] }]} />
            <Animated.View style={[styles.bar, style, { transform: [{ translateY: fourthDot }] }]} />
        </View>
    );
};

export default JumpingLoader;
