import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BarLoading } from './src';

export default function App() {
    return (
        <View style={styles.container}>
            <BarLoading />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
