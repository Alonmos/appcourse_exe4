import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useContext } from 'react'
import { Dialog } from '@rneui/themed';
import { Icon, Input, Slider } from '@rneui/base';
import { NotesContext } from '../FCNotesContext';
import { useNavigation, useFocusEffect } from '@react-navigation/native';


export default function Home(props) {


    const { notes, categories, addCatg } = useContext(NotesContext);
    const navigation = useNavigation();

    const [allNotes, setallNotes] = useState()
    const [visible, setVisible] = useState(false);
    const [strERR, setstrERR] = useState('');
    const [newCat, setnewCat] = useState('');
    const [strSuccess, setstrSuccess] = useState('');


    const toggleDialog = () => {
        setstrSuccess('')
        setVisible(!visible);
    };


    const addCategory = () => {

        let contain = false;

        categories.map((catg) => {

            if (catg === newCat) {
                setstrSuccess(<Text >category already exists!</Text>)
                contain = true;
                return;
            }
        })


        if (contain)
            return false;

        addCatg(newCat)

        setstrSuccess(<Text>Success!</Text>)

    }



    useFocusEffect(
        React.useCallback(() => {
            // Do something when the screen is focused
            console.log('home - focus');

            renderNotesByCategories();

            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions
                console.log('home - unfocus');
            };
        }, [categories, notes])
    );




    const renderNotesByCategories = () => {

        let strnotesBycatgs = categories.map((catg, indx) => {

            let counter = 0;

            if (notes !== undefined) {

                notes.map((note) => {
                    if (note.category == catg)
                        counter = counter + 1
                })

            }


            return (
                <View style={styles.allNotesView} key={indx}>
                    <Text style={{ flex: 0.8, margin: 2, fontSize: 22, color: 'navy', fontWeight: 'bold' }}>{catg} : {counter}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Notes', catg)}><Icon name='list' size={30} color="white" backgroundColor='#6495ED' borderRadius={45} style={{ padding: 10 }} /></TouchableOpacity>
                </View >
            )

        });

        setallNotes(strnotesBycatgs)

    }



    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Welcome !</Text>
            <View style={{ marginTop: 20 }}>
                <Text style={styles.MyNotes}>My Notes:</Text>
                <View style={{ marginTop: 10 }}>{allNotes}</View>
                <View style={styles.addCatBTN}>
                    <TouchableOpacity onPress={toggleDialog}><Icon name='add' size={35} color="white" backgroundColor='#6495ED' borderRadius={45} style={{ padding: 10 }} /></TouchableOpacity>
                </View>
            </View>



            <Dialog
                isVisible={visible}
                onBackdropPress={toggleDialog}
            >
                <Dialog.Title title="Add Category" />
                <View>
                    <Input
                        onChangeText={(txt) => setnewCat(txt)}
                        placeholder='Enter Category Name'
                        errorStyle={{ color: 'red' }}
                        marginTop={2} />
                        {strSuccess}
                    <Button onPress={addCategory} title='Add Now!' color='#6495ED' /></View>
            </Dialog>


        </View >

    )
}





const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        padding: 15,
        backgroundColor: '#ffefd5',
        flex: 1
    },

    headerTitle: {
        fontSize: 38,
        color: '#6495ED',
        fontStyle: 'italic',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    MyNotes: {
        fontSize: 28,
        color: '#6495ED',
        fontStyle: 'italic',
        fontWeight: 'bold'
    },
    allNotesView: {
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 15,
        flexDirection: 'row-reverse',
        flexWrap: 'wrap'
    },
    addCatBTN: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15
    },
    note: {
        backgroundColor: '#ffffcc',
        borderRightWidth: 6,
        borderRightColor: '#ffeb3b',
        margin: 5,
        padding: 10
    }
});