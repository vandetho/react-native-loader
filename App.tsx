import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { BarLoader, JumpingLoader, PulseLoader, SquareLoader } from './src';

export default function App() {
    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.row}>
                    <BarLoader opacity round />
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
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    row: {
        marginVertical: 20,
    },
});
