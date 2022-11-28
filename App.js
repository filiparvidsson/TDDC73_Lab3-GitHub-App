import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// Import the screens
import HomePage from './components/pages/homePage';
import ExplorePage from './components/pages/explorePage';
import InfoPage from './components/pages/infoPage';

// import the navigation tools
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import the apolloprovider
import { ApolloProvider } from '@apollo/client';
import { getApolloClient } from './components/apollo/apolloClient';




export default function App() {

  // Fetch trending projects from the github api using graphql

  // Create the stack navigator
  const Stack = createStackNavigator();

  // Create the apollo client
  const client = getApolloClient();

  

  return (
    /*All the pages from the pages folder*/
<ApolloProvider client={client}>
    <NavigationContainer>
      <Stack.Navigator>
      {/*The home page*/}
        <Stack.Screen name="Home" component={HomePage} />
      {/*The explore page that takes in the client*/}
        <Stack.Screen name="Explore" component={ExplorePage} />
      {/*The info page*/}
        <Stack.Screen name="Info" component={InfoPage} />
      </Stack.Navigator>
    </NavigationContainer>
    </ApolloProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusbar: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
