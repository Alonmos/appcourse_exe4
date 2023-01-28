import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Pages/Home';
import Notes from './Pages/Notes';
import  FCNotesContext from './FCNotesContext';
import AddNote from './Pages/AddNote';

const Stack = createNativeStackNavigator();


function App() {
  return (
    <FCNotesContext>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Notes" component={Notes} />
          <Stack.Screen name="AddNote" component={AddNote} />
        </Stack.Navigator>
      </NavigationContainer>
    </FCNotesContext>
  );
}

export default App;