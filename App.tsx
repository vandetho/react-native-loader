import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import {
    BarLoader,
    BipLoader,
    CircularLoader,
    FollowLoader,
    JumpingLoader,
    PulseLoader,
    SpinnerLoader,
    SquareLoader,
} from './src';

export default function App() {
    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.row}>
                    <BarLoader opacity />
                </View>
                <View style={styles.row}>
                    <JumpingLoader round />
                </View>
                <View style={styles.row}>
                    <SquareLoader />
                </View>
                <View style={styles.row}>
                    <PulseLoader />
                </View>
                <View style={styles.row}>
                    <BipLoader />
                </View>
                <View style={styles.row}>
                    <FollowLoader />
                </View>
                <View style={styles.row}>
                    <CircularLoader />
                </View>
                <View style={styles.row}>
                    <SpinnerLoader />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingVertical: 20,
    },
    row: {
        marginVertical: 20,
    },
});
