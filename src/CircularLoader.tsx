import React from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import CompositeAnimation = Animated.CompositeAnimation;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
    },
    dot: {
        position: 'absolute',
    },
});

interface CircularLoaderProps {
    dotSize?: number;
    circleSize?: number;
    color?: string;
    duration?: number;
    numberOfDots?: number;
}

const CircularLoaderComponent: React.FunctionComponent<CircularLoaderProps> = ({
    dotSize = 10,
    circleSize = 100,
    color = '#0A57E7',
    numberOfDots = 10,
    duration = 500,
}) => {
    const animatedValue = React.useRef(new Animated.Value(0)).current;

    const runAnimation = React.useCallback(() => {
        const animations: CompositeAnimation[] = [];
        for (let i = -1; i < numberOfDots; i++) {
            animations.push(
                Animated.timing(animatedValue, { toValue: i, useNativeDriver: true, duration, easing: Easing.linear }),
            );
        }
        Animated.sequence(animations).start(() => {
            animatedValue.setValue(1);
            runAnimation();
        });
    }, [animatedValue, duration, numberOfDots]);

    React.useEffect(() => {
        runAnimation();
    }, [runAnimation]);

    const inputRange = React.useMemo(() => [...Array(numberOfDots).keys()], [numberOfDots]);
    const outputRanges = React.useMemo(() => {
        const outputRanges: number[][] = [];
        for (let i = 0; i < numberOfDots; i++) {
            outputRanges.push(
                Array.from({ length: numberOfDots }, (_, index) => {
                    if (i === index - 1) {
                        return 2;
                    }
                    if (i === index) {
                        return 3;
                    }
                    return 1;
                }),
            );
        }
        return outputRanges;
    }, [numberOfDots]);

    const renderCircle = React.useCallback(() => {
        const dots: JSX.Element[] = [];
        for (let i = 0; i < numberOfDots; ++i) {
            const size = circleSize / 2;
            const left = size + size * Math.cos((2 * Math.PI * i) / numberOfDots);
            const top = size + size * Math.sin((2 * Math.PI * i) / numberOfDots);
            dots.push(
                <Animated.View
                    style={[
                        styles.dot,
                        {
                            width: dotSize,
                            height: dotSize,
                            backgroundColor: color,
                            borderRadius: dotSize,
                            top,
                            left,
                            transform: [
                                {
                                    scale: animatedValue.interpolate({
                                        inputRange,
                                        outputRange: outputRanges[i],
                                    }),
                                },
                            ],
                        },
                    ]}
                    key={`circle-loader-dot-${i}`}
                />,
            );
        }

        return dots;
    }, [animatedValue, circleSize, color, dotSize, inputRange, numberOfDots, outputRanges]);

    return <View style={{ height: circleSize, width: circleSize }}>{renderCircle()}</View>;
};

const CircularLoader = React.memo(CircularLoaderComponent);

export default CircularLoader;
