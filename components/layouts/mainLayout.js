// A component which wraps a title and a body

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function MainLayout({ title, children }) {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        {children}
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
    title: {
        fontSize: 30,
        color: 'green',
    },
});