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

interface FollowLoaderProps {
    color?: string;
    size?: number;
    duration?: number;
    round?: boolean;
}

const FollowLoader = React.memo<FollowLoaderProps>(({ color = '#0A57E7', size = 10, duration = 200, round = true }) => {
    const animatedValue = React.useRef(new Animated.Value(0)).current;

    const runAnimation = React.useCallback(() => {
        Animated.sequence([
            Animated.timing(animatedValue, { toValue: 1, useNativeDriver: true, duration }),
            Animated.timing(animatedValue, { toValue: 2, useNativeDriver: true, duration }),
            Animated.timing(animatedValue, { toValue: 3, useNativeDriver: true, duration }),
            Animated.timing(animatedValue, { toValue: 4, useNativeDriver: true, duration }),
            Animated.timing(animatedValue, { toValue: 5, useNativeDriver: true, duration }),
        ]).start(() => {
            animatedValue.setValue(0);
            runAnimation();
        });
    }, [animatedValue, duration]);

    React.useEffect(() => {
        runAnimation();
    }, [runAnimation]);

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

    const renderDot = React.useCallback(
        () => (
            <React.Fragment>
                <Animated.View
                    style={[
                        styles.bar,
                        style,
                        {
                            opacity: animatedValue.interpolate({
                                inputRange,
                                outputRange: [1, 0.8, 0.6, 0.4, 0.2, 0],
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
                                outputRange: [0.8, 0.6, 0.4, 0.2, 0, 1],
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
                                outputRange: [0.6, 0.4, 0.2, 0, 1, 0.8],
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
                                outputRange: [0.4, 0.2, 0, 1, 0.8, 0.6],
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
                                outputRange: [0.2, 0, 1, 0.8, 0.6, 0.4],
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
                                outputRange: [0, 1, 0.8, 0.6, 0.4, 0.2],
                            }),
                        },
                    ]}
                />
            </React.Fragment>
        ),
        [animatedValue, inputRange, style],
    );

    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={styles.dotContainer}>{renderDot()}</View>
            <View style={[styles.dotContainer, { paddingTop: 20 }]}>{renderDot()}</View>
            <View style={[styles.dotContainer, { paddingTop: 40 }]}>{renderDot()}</View>
            <View style={[styles.dotContainer, { paddingTop: 60 }]}>{renderDot()}</View>
        </View>
    );
});

export default FollowLoader;
