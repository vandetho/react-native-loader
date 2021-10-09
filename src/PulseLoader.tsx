import React from 'react';
import { Animated, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {},
});

interface PulseLoaderProps {
    size?: number;
    color?: string;
    duration?: number;
}

const PulseLoader: React.FunctionComponent<PulseLoaderProps> = ({ size = 50, color = '#0A57E7', duration = 1000 }) => {
    const opacityValue = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacityValue, { toValue: 1, useNativeDriver: true, duration }),
                Animated.timing(opacityValue, { toValue: 0, useNativeDriver: true, duration }),
            ]),
        ).start();
    }, [duration, opacityValue]);

    return (
        <Animated.View
            style={[
                styles.container,
                { height: size, width: size, backgroundColor: color, borderRadius: size / 2 },
                {
                    opacity: opacityValue,
                },
            ]}
        />
    );
};

export default PulseLoader;
