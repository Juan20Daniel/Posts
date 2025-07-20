import { useContext, useEffect } from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View, Vibration } from 'react-native';
import { Note } from '../../../infrestructure/interfaces/Notes';
import { NotesContext } from '../../context/NotesContext';

interface Props {
    note:Note;
}

export const ItemNote = ({ note }:Props) => {
    const { id, title, description, isNew, isSelected } = note;
    const noteContext = useContext(NotesContext);
    const width = useWindowDimensions().width;
    const handleOnLongPress = () => {
        Vibration.vibrate(50);
        noteContext?.selectNote(id);
    }
    return (
        <Pressable onLongPress={() => handleOnLongPress()}>
            <View style={{
                ...styles.container,
                width:width-40,
                backgroundColor: isNew ? '#21174f' : 'white',
            }}>
                <View style={{
                    ...styles.verticalLine, 
                    backgroundColor:isSelected ? 'white' : '#21174f'}} 
                />
                <View>
                    <Text 
                        numberOfLines={1}
                        style={{
                            color: isNew ? 'white' : 'black',
                            fontSize: 20
                        }}
                    >
                        {title}
                    </Text>
                    <Text 
                        numberOfLines={1}
                        style={{
                            color: isNew ? 'white' : 'black',
                            fontSize: 14,
                            marginTop: 5
                        }}
                    >
                        {description}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 100,
        marginHorizontal: 20,
        borderRadius: 20,
        marginBottom: 20,
        paddingVertical: 20,
        paddingLeft: 0,
        paddingRight: 20,
        alignItems: 'center'
    },
     verticalLine: {
        width: 5,
        height: '80%',
        marginRight: 10,
        marginLeft: 3,
        borderRadius: 5,
    },
});
