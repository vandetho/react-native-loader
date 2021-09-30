import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SquareLoading } from './src';

export default function App() {
    return (
        <View style={styles.container}>
            <SquareLoading />
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
