// A page which uses the mainLayout and has a text and a button

import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import MainLayout from '../layouts/mainLayout';
// import the picker
import { Picker } from '@react-native-picker/picker';

// import usenavigation hook
import { useNavigation } from '@react-navigation/native';

export default function HomePage() {

    // use navigation
    const navigation = useNavigation();

    // a state which chooees a programming language
    const [language, setLanguage] = useState('');

    // a function which takes in the language and extracts the programming language from the string
    const getLanguage = (language) => {
        const languageArray = language.split(':');
        return languageArray[1];
    }

    return (
        <MainLayout title="GitBurger 🍔">

        <Text style={styles.text}>Explore the greatest {getLanguage(language)} dishes!</Text>

        <View style={styles.button}>
            <Button
            title="Explore"
            color="grey"

            // when clicked goes to the explorePage with as prop
            onPress={() => navigation.navigate('Explore', // send the language as a prop
                { language: language })}
            />
        </View>

        {/* A dropdown menu to filter the repositories programming language and set the programming language 
        placed inside a circle that looks like a button*/}
        {/* <View style={styles.picker}>
            <Picker
                selectedValue={language}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) => setLanguage(itemValue)}
            >
                <Picker.Item label="All" value="" />
                <Picker.Item label="JavaScript" value="language:JavaScript" />
                <Picker.Item label="Java" value="language:Java" />
                <Picker.Item label="Python" value="language:Python" />
                <Picker.Item label="C#" value="language:C#" />
                <Picker.Item label="C++" value="language:C++" />
                <Picker.Item label="C" value="language:C" />
                <Picker.Item label="PHP" value="language:PHP" />
                
            </Picker> 
        </View> */}
        
        </MainLayout>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: 'green',
    },
    button: {
        fontSize: 50,
       
    },
    dropdown: {
        fontSize: 40,
        marginTop: 20,
    },
    // A circle that looks like a button
    picker: {
        marginTop: 20,
        width: 150,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
    },



    
});