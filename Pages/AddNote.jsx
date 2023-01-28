import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { NotesContext } from '../FCNotesContext';
import { Input, Icon, Dialog } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';


export default function AddNote(props) {

  const { addNote, notesID } = useContext(NotesContext);

  const [noteTitle, setnoteTitle] = useState('')

  const [noteDesc, setnoteDesc] = useState('')

  const [visible, setVisible] = useState(false);

  const [strSuccess, setstrSuccess] = useState('')

  const toggleDialog = () => {
    setVisible(!visible);
  };


  const navigation = useNavigation();


  const time = Date().toLocaleString()

  const createNote = () => {

    if (noteTitle  == ''|| noteDesc == '')
    {
      setstrSuccess(<Text style={{fontSize:20 , color:'red'}}>Please Fill All Fields</Text>)
      return;
    }

    const noteJSON = {
      id: notesID + 1,
      category: props.route.params,
      title: noteTitle,
      description: noteDesc,
      timestamp: time.slice(0, time.indexOf('G'))
    }

    console.log('noteJSON=', noteJSON)

    addNote(noteJSON, props.route.params.index)

    setstrSuccess(<Text style={{fontSize:20 , color:'green'}}>Success!</Text>)

  }



  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Add Note</Text>
      <View style={{ marginTop: 25, marginBottom: 25 }}>
        <Input onChangeText={(txt) => setnoteTitle(txt)} placeholder='Enter Title' margin={5} />
        <Input onChangeText={(txt) => setnoteDesc(txt)} placeholder='Enter Details' margin={5} />
      </View>
      <View style={styles.addNoteBTN}>
        {strSuccess}
        <TouchableOpacity onPress={createNote}><Icon name='send' size={35} color="white" backgroundColor='#6495ED' borderRadius={45} style={{ padding: 10 }} /></TouchableOpacity>
      </View>


    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    padding: 10,
    backgroundColor: '#ffefd5',
    flex: 1
  },

  headerTitle: {
    fontSize: 35,
    color: '#6495ED',
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  addNoteBTN: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15
  }
});


