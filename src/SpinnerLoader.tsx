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

interface SpinnerLoaderProps {
    dotSize?: number;
    circleSize?: number;
    color?: string;
    duration?: number;
    numberOfDots?: number;
}

const SpinnerLoaderComponent: React.FunctionComponent<SpinnerLoaderProps> = ({
    dotSize = 15,
    circleSize = 120,
    color = '#0A57E7',
    numberOfDots = 12,
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
                        return 0.75;
                    }
                    if (i === index) {
                        return 1;
                    }
                    return 0.5;
                }),
            );
        }
        return outputRanges;
    }, [numberOfDots]);

    const rotations = React.useMemo(() => {
        const quarter = numberOfDots / 4;
        const secondQuarter = quarter * 2;
        const thirdQuarter = quarter * 3;
        const fourthQuarter = quarter * 4;
        return Array.from({ length: numberOfDots }, (_, i) => {
            if (i === 0) {
                return '90deg';
            }
            if (i === fourthQuarter) {
                return '0deg';
            }
            if (i > thirdQuarter) {
                return '45deg';
            }
            if (i === thirdQuarter) {
                return '360deg';
            }
            if (i > secondQuarter) {
                return '315deg';
            }
            if (i === secondQuarter) {
                return '270deg';
            }
            if (i > quarter) {
                return '215deg';
            }
            if (i === quarter) {
                return '180deg';
            }
            if (i < quarter) {
                return '135deg';
            }
            return '90deg';
        });
    }, [numberOfDots]);

    const renderSpinner = React.useCallback(() => {
        const dots: JSX.Element[] = [];
        const size = circleSize / 2;
        const radius = dotSize / 2;
        const height = dotSize * 2;
        for (let i = 0; i < numberOfDots; ++i) {
            const left = size + size * Math.cos((2 * Math.PI * i) / numberOfDots);
            const top = size + size * Math.sin((2 * Math.PI * i) / numberOfDots);
            dots.push(
                <Animated.View
                    style={[
                        styles.dot,
                        {
                            width: dotSize,
                            height: height,
                            backgroundColor: color,
                            borderRadius: radius,
                            top,
                            left,
                            opacity: animatedValue.interpolate({
                                inputRange,
                                outputRange: outputRanges[i],
                            }),
                            transform: [
                                {
                                    rotate: rotations[i],
                                },
                            ],
                        },
                    ]}
                    key={`circle-loader-dot-${i}`}
                />,
            );
        }

        return dots;
    }, [animatedValue, circleSize, color, dotSize, inputRange, numberOfDots, outputRanges, rotations]);

    return <View style={{ height: circleSize, width: circleSize }}>{renderSpinner()}</View>;
};

const SpinnerLoader = React.memo(SpinnerLoaderComponent);

export default SpinnerLoader;
