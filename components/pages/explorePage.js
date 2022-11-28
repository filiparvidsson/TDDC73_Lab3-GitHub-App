// explore screen with a scrollable list of items wrapped in the layout component
import React from 'react';

import { StyleSheet, Text, View, Button, FlatList, ScrollView } from 'react-native';

import MainLayout from '../layouts/mainLayout';

import { useNavigation } from '@react-navigation/native';

// import the getApolloClient function
import { getApolloClient } from '../apollo/apolloClient';

// import useQuery and gql from apollo client
import { useQuery, gql } from '@apollo/client';

// import apollo client
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ApolloProvider } from '@apollo/client';

// import the useeffect hook
import { useEffect, useState } from 'react';

// The XplorePage component that takes in the client as a prop and a string as a prop
export default function ExplorePage( language ) {

  // state for the language
  const [languageState, setLanguageState] = useState('');

    // Create the navigation variable
    const navigation = useNavigation();
    // The useQuery hook to fetch the data from the github api
    const { loading, error, data } = useQuery(gql`
    {
        search(query: "stars:>1000 ${languageState}"
                        type: REPOSITORY,
                        first: 20,
                        ) {
          repositoryCount
          edges {
            node {
              ... on Repository {
                name
                url
                description
                stargazers {
                    totalCount
                }
                owner {
                    login
                }
                primaryLanguage {
                  color
                }
                forkCount
                pushedAt
                watchers {
                    totalCount
                  }
                  languages(
                    first: 3
                    orderBy: { field: SIZE, direction: DESC }
                  ) {
                    edges {
                      node {
                        id
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      
    `);

   

      // get the data and store it in the repositories variable
        const repositories = data?.search.edges;

      // display the repositories a interactive list
        return (
            <MainLayout>
            {/* A horizontal sliding menu to choose the language */}
            <ScrollView horizontal={true} style={styles.scroll}>
                <View style={styles.button}>
                    <Button
                    title="All"
                    // if the languageststate is the same as the button value then make the button color green
                    color={languageState === '' ? 'green' : 'grey'}
                    onPress={() => setLanguageState('')}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                    title="JavaScript"
                    color={languageState === 'language:JavaScript' ? 'green' : 'grey'}
                    onPress={() => setLanguageState('language:JavaScript')}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                    title="Java"
                    color={languageState === 'language:Java' ? 'green' : 'grey'}
                    onPress={() => setLanguageState('language:Java')}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                    title="Python"
                    color={languageState === 'language:Python' ? 'green' : 'grey'}
                    onPress={() => setLanguageState('language:Python')}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                    title="C#"
                    color={languageState === 'language:C#' ? 'green' : 'grey'}
                    onPress={() => setLanguageState('language:C#')}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                    title="C++"
                    color={languageState === 'language:C++' ? 'green' : 'grey'}
                    onPress={() => setLanguageState('language:C++')}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                    title="C"
                    color={languageState === 'language:C' ? 'green' : 'grey'}
                    onPress={() => setLanguageState('language:C')}
                    />
                </View>

            </ScrollView>

                
                {loading ? (
                    <Text>Loading...</Text>
                ) : (
                  <View style={styles.container}>
                    
                    <FlatList
                    data={repositories}
                    // only render the 10 first items and if one of the languages equals the string
                    initialNumToRender={10}
                    renderItem={({ item }) => {
        
        return (
          // console log the string
        <View style={styles.item}>
        <Text style={styles.stars}>{item.node.stargazers.totalCount} <Text style={styles.star}>⭐</Text></Text>
        <Text style={styles.title}>{item.node.name}</Text>
        <Text style={styles.description}>{item.node.description}</Text>
        
    
        <Button
            style={styles.bigButton}
            title="More info"
            onPress={() => navigation.navigate('Info', { item: item })}
        />
            </View>
        )

        }}
        keyExtractor={item => item.node.name}
        />
        </View>
                )}
                
            </MainLayout>
        );
    }

{/*If the item is clicked on, the user is taken to a itemPage*/}


const styles = StyleSheet.create({
    // Items are green boxes with white text and border radius

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
      },
    item: {
        backgroundColor: '#4CAF50',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        // a nice looking shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

    },
    // The text is white and the name is bigger than the description
    title: {
        fontSize: 32,
        color: 'white',
        // all caps
        textTransform: 'uppercase',
        // a fancy font with bold style
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        padding: 5,
    },
    description: {
        fontSize: 16,
        color: 'white',
        // some margin on the top and bottom
        marginBottom: 10,
    },
    // the stars are smaller than the name and description and put in the top right side of the item
    stars: {
        fontSize: 16,
        color: 'white',
        position: 'absolute',
        top: 10,
        right: 10,
    },
    // the button is located in the bottom right corner
    bigButton: {
        
        bottom: 10,
        right: 10,
        // make it a bit smaller and move it away from the top
        padding: 5,
        marginTop: 20,
        
    },
    // the scrollview is located at the top of the page
    scroll: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        // a nice looking shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },

        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    // the buttons are smaller than the default button
    button: {
        padding: 5,
        margin: 5,
    },
    // the languages are displayed in a row and are white
    languages: {
        flexDirection: 'row',
        color: 'white',
        // a nice looking shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },

        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },



});