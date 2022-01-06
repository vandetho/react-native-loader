import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';

const SPACING = 5;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    bar: {
        marginVertical: 5,
    },
    dotContainer: {
        paddingHorizontal: SPACING,
    },
});

interface BipLoaderProps {
    color?: string;
    size?: number;
    duration?: number;
    round?: boolean;
}

const BipLoader = React.memo<BipLoaderProps>(({ color = '#0A57E7', size = 10, duration = 300, round = true }) => {
    const animatedValue = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animatedValue, { toValue: 1, useNativeDriver: true, duration }),
                Animated.timing(animatedValue, { toValue: 2, useNativeDriver: true, duration }),
                Animated.timing(animatedValue, { toValue: 3, useNativeDriver: true, duration }),
                Animated.timing(animatedValue, { toValue: 4, useNativeDriver: true, duration }),
                Animated.timing(animatedValue, { toValue: 5, useNativeDriver: true, duration }),
                Animated.timing(animatedValue, { toValue: 4, useNativeDriver: true, duration }),
                Animated.timing(animatedValue, { toValue: 3, useNativeDriver: true, duration }),
                Animated.timing(animatedValue, { toValue: 2, useNativeDriver: true, duration }),
                Animated.timing(animatedValue, { toValue: 1, useNativeDriver: true, duration }),
            ]),
        ).start();
    }, [animatedValue, duration]);

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

    const inputRange = React.useMemo(() => [0, 1, 2, 3, 4, 5], []);

    return (
        <View style={{ flexDirection: 'row' }}>
            <Animated.View
                style={[
                    styles.bar,
                    style,
                    {
                        opacity: animatedValue.interpolate({
                            inputRange,
                            outputRange: [0, 1, 0.75, 0.5, 0.25, 0],
                        }),
                    },
                ]}
            />
            <Animated.View
                style={[
                    styles.bar,
                    style,
                    {
                        opacity: animatedValue.interpolate({
                            inputRange,
                            outputRange: [1, 0.75, 0.5, 0.25, 0, 1],
                        }),
                    },
                ]}
            />
            <Animated.View
                style={[
                    styles.bar,
                    style,
                    {
                        opacity: animatedValue.interpolate({
                            inputRange,
                            outputRange: [0.75, 0.5, 0.25, 0, 1, 0.75],
                        }),
                    },
                ]}
            />
            <Animated.View
                style={[
                    styles.bar,
                    style,
                    {
                        opacity: animatedValue.interpolate({
                            inputRange,
                            outputRange: [0.5, 0.25, 0, 1, 0.75, 0.5],
                        }),
                    },
                ]}
            />
            <Animated.View
                style={[
                    styles.bar,
                    style,
                    {
                        opacity: animatedValue.interpolate({
                            inputRange,
                            outputRange: [0.25, 0, 1, 0.75, 0.5, 0.25],
                        }),
                    },
                ]}
            />
        </View>
    );
});

export default BipLoader;
