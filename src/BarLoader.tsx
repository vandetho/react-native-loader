import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    bar: {},
});

interface BarLoaderProps {
    color?: string;
    size?: number;
    duration?: number;
    opacity?: boolean;
    round?: boolean;
}

const BarLoaderComponent: React.FunctionComponent<BarLoaderProps> = ({
    color = '#0A57E7',
    size = 10,
    duration = 300,
    opacity = false,
    round = false,
}) => {
    const firstBar = React.useRef(new Animated.Value(3)).current;
    const secondBar = React.useRef(new Animated.Value(1)).current;
    const thirdBar = React.useRef(new Animated.Value(1)).current;
    const fourthBar = React.useRef(new Animated.Value(1)).current;

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
                    Animated.timing(firstBar, { toValue: 1, duration, useNativeDriver: true }),
                    Animated.timing(secondBar, { toValue: 3, duration, useNativeDriver: true }),
                    Animated.timing(thirdBar, { toValue: 1, duration, useNativeDriver: true }),
                    Animated.timing(fourthBar, { toValue: 1, duration, useNativeDriver: true }),
                ]),
                Animated.parallel([
                    Animated.timing(firstBar, { toValue: 1, duration, useNativeDriver: true }),
                    Animated.timing(secondBar, { toValue: 1, duration, useNativeDriver: true }),
                    Animated.timing(thirdBar, { toValue: 3, duration, useNativeDriver: true }),
                    Animated.timing(fourthBar, { toValue: 1, duration, useNativeDriver: true }),
                ]),
                Animated.parallel([
                    Animated.timing(firstBar, { toValue: 1, duration, useNativeDriver: true }),
                    Animated.timing(secondBar, { toValue: 1, duration, useNativeDriver: true }),
                    Animated.timing(thirdBar, { toValue: 1, duration, useNativeDriver: true }),
                    Animated.timing(fourthBar, { toValue: 3, duration, useNativeDriver: true }),
                ]),
                Animated.parallel([
                    Animated.timing(firstBar, { toValue: 3, duration, useNativeDriver: true }),
                    Animated.timing(secondBar, { toValue: 1, duration, useNativeDriver: true }),
                    Animated.timing(thirdBar, { toValue: 1, duration, useNativeDriver: true }),
                    Animated.timing(fourthBar, { toValue: 1, duration, useNativeDriver: true }),
                ]),
            ]),
        ).start();
    }, [duration, firstBar, fourthBar, secondBar, thirdBar]);

    const firstOpacity = React.useMemo(
        () =>
            opacity
                ? firstBar.interpolate({
                      inputRange: [1, 2, 3],
                      outputRange: [0.25, 0.5, 1],
                  })
                : undefined,
        [firstBar, opacity],
    );
    const secondOpacity = React.useMemo(
        () =>
            opacity
                ? secondBar.interpolate({
                      inputRange: [1, 2, 3],
                      outputRange: [0.25, 0.5, 1],
                  })
                : undefined,
        [opacity, secondBar],
    );
    const thirdOpacity = React.useMemo(
        () =>
            opacity
                ? thirdBar.interpolate({
                      inputRange: [1, 2, 3],
                      outputRange: [0.25, 0.5, 1],
                  })
                : undefined,
        [opacity, thirdBar],
    );
    const fourthOpacity = React.useMemo(
        () =>
            opacity
                ? fourthBar.interpolate({
                      inputRange: [1, 2, 3],
                      outputRange: [0.25, 0.5, 1],
                  })
                : undefined,
        [fourthBar, opacity],
    );

    return (
        <View style={styles.container}>
            <Animated.View
                style={[styles.bar, style, { opacity: firstOpacity }, { transform: [{ scaleY: firstBar }] }]}
            />
            <Animated.View
                style={[styles.bar, style, { opacity: secondOpacity }, { transform: [{ scaleY: secondBar }] }]}
            />
            <Animated.View
                style={[styles.bar, style, { opacity: thirdOpacity }, { transform: [{ scaleY: thirdBar }] }]}
            />
            <Animated.View
                style={[styles.bar, style, { opacity: fourthOpacity }, { transform: [{ scaleY: fourthBar }] }]}
            />
        </View>
    );
};

const BarLoader  = React.memo(BarLoaderComponent);

export default BarLoader;
