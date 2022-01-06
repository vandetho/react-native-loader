import React from 'react';
import { Animated, View } from 'react-native';

interface FollowLoaderProps {
    color?: string;
    size?: number;
    duration?: number;
    opacity?: boolean;
    round?: boolean;
}

const FollowLoader = React.memo<FollowLoaderProps>((props) => {
    const animatedValue = React.useRef(new Animated.Value(0)).current

    React.useEffect(() => {
        Animated.loop(Animated.sequence([
            Animated.timing(animatedValue, {toValue: 1, useNativeDriver: true}),
            Animated.timing(animatedValue, {toValue: 2, useNativeDriver: true}),
            Animated.timing(animatedValue, {toValue: 3, useNativeDriver: true}),
            Animated.timing(animatedValue, {toValue: 4, useNativeDriver: true}),
            Animated.timing(animatedValue, {toValue: 5, useNativeDriver: true}),
        ])).start();
    }, [])

    return (
        <View>
            <Animated.View></Animated.View>
            <Animated.View></Animated.View>
            <Animated.View></Animated.View>
            <Animated.View></Animated.View>
        </View>
    );
});

export default FollowLoader;
