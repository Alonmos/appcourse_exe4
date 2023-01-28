import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Button, color, Icon, Input } from '@rneui/base';
import { NotesContext } from '../FCNotesContext';


export default function Notes(props) {


  const { notes, removeNote } = useContext(NotesContext);

  const [strNotes, setstrNotes] = useState('');

  const [notesByCatCounter, setnotesByCatCounter] = useState(0)

  const navigation = useNavigation();


  const printNotes = () => {

    console.log('notes.length = ', notes.length)


    if (notes.length) {

      console.log('printnotes - if')

      console.log('notes', notes)

      let notesToRender = [];

      let strNotesToRender = '';

      notes.map((note) => {
        if (note.category === props.route.params)
          notesToRender.push(note)
      })

      if (notesToRender.length) {

        console.log('notesToRender = ', notesToRender)

        setnotesByCatCounter(notesToRender.length)

        strNotesToRender = notesToRender.map((note, indx) => {

          return (

            <View key={indx} style={styles.note}>

              <View style={{ flex: 0.8 }}>
                <Text style={{ marginBottom: 5, fontSize: 16, fontWeight: 'bold', color: '#6495ED' }}>{note.timestamp}</Text>
                <Text style={{ marginBottom: 5, fontSize: 16, fontWeight: 'bold' }}>{note.title}</Text>
                <Text>{note.description}</Text>
              </View>

              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => deleteNote(note.id)}><Icon name='delete' size={25} color="white" backgroundColor='#6495ED' borderRadius={45} style={{ padding: 10 }}  /></TouchableOpacity>
              </View>

            </View>

          )
        })
      }

      else {
        console.log('printnotes - else')
        setnotesByCatCounter(0)
        setstrNotes('')
      }

      setstrNotes(strNotesToRender)
    }

    else {
      console.log('printnotes - else')
      setnotesByCatCounter(0)
      setstrNotes('')
    }
  }



  const deleteNote = (noteID) => {

    removeNote(noteID);

  }



  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      console.log('notes - focus');

      printNotes()

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        console.log('notes - unfocus');
      };
    }, [notes])
  );



  return (
    <View style={styles.container} >
      <ScrollView>

        <Text style={styles.headerTitle}>{props.route.params}</Text>
        <Text style={styles.notesNum}>{notesByCatCounter} Notes:</Text>
        {strNotes}
        <View style={{ marginTop: 15, alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => navigation.navigate('AddNote', props.route.params)} ><Icon name='add' size={35} color="white" backgroundColor='#6495ED' borderRadius={45} style={{ padding: 10 }} /></TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    padding: 10,
    backgroundColor: '#ffefd5',
    flex: 1

  },

  headerTitle: {
    fontSize: 36,
    color: '#6495ED',
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  notesNum: {
    fontSize: 26,
    color: '#6495ED',
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 10
  },
  note: {
    backgroundColor: '#ffffcc',
    borderRightWidth: 6,
    borderRightColor: '#ffeb3b',
    margin: 8,
    padding: 15,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between'
  },
  button: {
    borderRadius: 6
  }
});

