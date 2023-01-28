import React, { createContext, useState, useEffect } from 'react'


export const NotesContext = createContext();

export default function FCNotesContext(props) {


    const [categories, setCategories] = useState(['House', 'Studies'])
    
    const [notes, setNotes] = useState(
        [
            { id: 1, category: 'House', title: 'Shopping', description: 'Go to the supermarket', timestamp: 'Sat Jan 21 2023 15:39:48' },
            { id: 2, category: 'House', title: 'Cooking', description: 'Cook lunch', timestamp: 'Sat Jan 14 2023 15:39:48' },
            { id: 3, category: 'Studies', title: 'Learn To Test', description: 'Test on sunday. need to continue learning.', timestamp: 'Sat Jan 14 2023 15:39:48' }
        ]
    )


    const [notesID, setnotesID] = useState(notes.length)




    const addCatg = (newCtg) => {

        setCategories((prev)=> [...prev , newCtg])

    }



    const addNote = (newNote) => {

        setnotesID(prev => prev + 1)

        setNotes((prev) => [...prev , newNote])

    }



    const removeNote = (noteID) => {

        let newNotes = notes.filter((note) => note.id !== noteID)

        setNotes (newNotes)
    }


    return (
        <NotesContext.Provider value={{categories,  notes, notesID, setNotes, addNote, removeNote  , addCatg }}>
            {props.children}
        </NotesContext.Provider>
    )
}
