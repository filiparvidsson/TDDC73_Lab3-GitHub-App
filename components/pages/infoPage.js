// An info page that shows the info of the element that was clicked on

import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import MainLayout from '../layouts/mainLayout';
import tinycolor from 'tinycolor2';

// the infopage that takes in an item as a prop
export default function InfoPage({ route }) {
    // the item that was clicked on
    
    // get the item from the route
    const { item: blob } = route.params;

    

    // a list of burger colors
    const burgerColors = [
        // smooth colors from a color palette
        
        '#B3B3B3',
        '#A6A6A6',
        // more smooth colors
        '#999999',
        '#8C8C8C',
        '#808080',

    ];

    // a function that takes in a YYYY-MM-DD-THH:MM:SSZ string and returns a string with the date
    function getDate(date) {
        // split the date string into an array
        const dateArray = date.split('T');
        // return the first element of the array
        return dateArray[0];
    }

    // a function that shifts a hex-code color by a random amount
    function shiftColor(color) {
        // the random amount to shift the color by
        const shiftAmount = Math.floor(Math.random() * 100);
        // the new color
        // make the hex-code into hsv and rotate the hue by the shift amount
        const newColor = tinycolor(color).spin(shiftAmount).toHexString();
        // make the color into a hax-code

        return newColor;
    }

    return (
        <MainLayout title="Info">
            <View style={styles.container}>
        
            <View style={styles.item}>
                <Text style={styles.title}>{blob.node.name}</Text>
                <Text style={styles.description}>{blob.node.description}</Text>
                {/*text to display the owner*/}
                <Text style={styles.owner}>Chef: {blob.node.owner.login}</Text>


                {/*a view shaped like a burger bun*/}
                <View style={styles.bunTop}
                    // the color is the items primary language color if it exists
                    // otherwise it is agreen color
                    backgroundColor={blob.node.primaryLanguage ? blob.node.primaryLanguage.color : '#00FF00'}
                    
                />
                {/*a view shaped like a burger bun bottom*/}
                <View style={styles.bunBottom}
                    // the color is the items primary language color if it exists
                    // otherwise it is a green color
                    backgroundColor={blob.node.primaryLanguage ? blob.node.primaryLanguage.color : '#00FF00'}
                />
                {/* Display the languages in a flat list with different colors and place it in a small view */}
                <View style={styles.languages}>
                    {/*give the item a random burger color from the burgercolor object*/}
                    <FlatList
                        data={blob.node.languages.edges}
                        renderItem={({ item }) => (
                            <View style={styles.language}
                            // if a primary language exists, set the color to the primary language color
                            // otherwise set the color to a random color from the burgercolor object
                                backgroundColor={blob.node.primaryLanguage ? shiftColor(blob.node.primaryLanguage.color) : burgerColors[Math.floor(Math.random() * burgerColors.length)]}
                            >
                                <Text style={styles.languageText}
                                // if the blob primary language color exists and is light, set the text color to black
                                // otherwise set the text color to white
                                    color={blob.node.primaryLanguage ? (blob.node.primaryLanguage.color === '#ffffff' ? 'black' : 'white') : 'white'}
                                
                                >{item.node.name}</Text>
                            </View>
                        )}
                        keyExtractor={item => item.node.name}
                    />
                    
                        
                    
                </View>

                {/* In the buttom display number of forks and stars with emojis */}
                <Text style={styles.stars}>{blob.node.stargazers.totalCount} <Text style={styles.stars}>⭐</Text></Text>
                <Text style={styles.forks}>{blob.node.forkCount} <Text style={styles.forks}>🍴</Text></Text>
                
                {/* Lastly pushed at */}
                <Text style={styles.pushedAt}>Recipy last updated at: {getDate(blob.node.pushedAt)}</Text>
    
            </View>
                
                

            </View>
        </MainLayout>
    );
}

const styles = StyleSheet.create({
    // the container is a view with a white background
    container: {
        backgroundColor: 'white',
        flex: 1,
        width: '100%',
    },
    item: {
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    description: {
        fontSize: 16,
    },
    owner: {
        fontSize: 16,
    },
    languages: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // move down the languages
        marginTop: 20,
    },
    language: {
        backgroundColor: '#4CAF50',
        padding: 5,
        margin: 5,
        borderRadius: 5,
    },
    languageText: {
        color: '#fff',
    },
    
    
    // place stars in the bottom right corner
    stars: {
        position: 'absolute',
        bottom: -50,
        right: 0,
        fontSize: 16,
        fontStyle: 'bold',
    },
    // place forks in the bottom left corner
    forks: {
        position: 'absolute',
        bottom: -50,
        left: 0,
        fontSize: 16,
        fontStyle: 'bold',
    },
    // place the bun top above the list of languages
    bunTop: {
        position: 'absolute',
        top: 0,
        // place the bun top in the middle
        left: '5%',
    
        width: '100%',
        height: 20,
        
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    // place the bun bottom below the list of languages
    bunBottom: {
        position: 'absolute',
        bottom: 0,
        left: '5%',
        width: '100%',
        height: 20,
       
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    // place the pushed at text in the bottom
    pushedAt: {
        position: 'absolute',
        bottom: -70,
        
        fontSize: 16,
    },

});
