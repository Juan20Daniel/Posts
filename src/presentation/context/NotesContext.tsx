import { createContext, PropsWithChildren, useState } from "react";
import { Note } from "../../infrestructure/interfaces/Notes";


interface NotesContext {
    notes: Note[];
    hasSelectedNotes: boolean;
    addNote: (note:Note) => void;
    selectNote: (id:string) => void;
    deselectAll: () => void;
    removeNotesSelecteds: () => void;
    checkAsView:(id:string) => void;
    getNote: (id:string) => Note;
    removeNote: (id:string) => void;
}

export const NotesContext = createContext<NotesContext|null>(null);

export const NotesProvider = ({children}:PropsWithChildren) => {
    const [ notes, setNotes ] = useState<Note[]>([]);
    const [ hasSelectedNotes, setHasSeletedNotes ] = useState<boolean>(false);
    const addNote = (note:Note):void => {
        const newNotes = [note, ...notes]
        orderNotes(newNotes);
    }
    const thereAreNotesSelecteds = (notes:Note[]): void => {
        const result = notes.find(note => note.isSelected);
        setHasSeletedNotes(result ? true : false);
    }
    const selectNote = (id:string):void => {
        const notes_copy = [...notes];
        const markerNotesHasSelected = notes_copy.map(note => {
            return note.id === id 
                ? {...note, isSelected:!note.isSelected}
                : note
        });
        thereAreNotesSelecteds(markerNotesHasSelected);
        setNotes(markerNotesHasSelected);
    }
    const orderNotes = (notes:Note[]) => {
        const notes_copy = [...notes];
        const result = notes_copy.sort((a, b) => {
            if(b.isNew > a.isNew) {
                return 1;
            } 
            if(b.isNew < a.isNew ) {
                return -1;
            }
            return 0
        });
        setNotes(result);
    }
    const deselectAll = ():void => {
        const notes_copy = [...notes];
        const result = notes_copy.map(note => ({...note, isSelected:false}));
        setHasSeletedNotes(false);
        setNotes(result);
    }
    const removeNotesSelecteds = ():void => {
        const notes_copy = [...notes];
        const result = notes_copy.filter(note => !note.isSelected);
        setHasSeletedNotes(false);
        setNotes(result);
    } 
    const checkAsView = (id:string):void => {
        const notes_copy = [...notes];
        const result = notes_copy.map(note => note.id === id ? {...note, isNew:false} : note);
        orderNotes(result);
    }
    const getNote = (id:string):Note => {
        return notes.find(note => note.id === id)!;
    }
    const removeNote = (id:string) => {
        const notes_copy = [...notes];
        const result = notes_copy.filter(note => note.id !== id);
        setHasSeletedNotes(false);
        setNotes(result);
    }
    return (
        <NotesContext.Provider value={{
            notes,
            hasSelectedNotes,
            addNote,
            selectNote,
            deselectAll,
            removeNotesSelecteds,
            checkAsView,
            getNote,
            removeNote
        }}>
            {children}
        </NotesContext.Provider>
    )
}