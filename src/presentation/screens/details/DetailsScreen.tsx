import { NavigationProp, RouteProp } from '@react-navigation/native';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../../navigators/StackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import { NotesContext } from '../../context/NotesContext';
import { Note } from '../../../infrestructure/interfaces/Notes';
import { Button } from '../../components/ui';


interface Props extends StackScreenProps<RootStackParamList, 'Details'> {}

export const DetailsScreen = ({route, navigation}:Props) => {
    const [ note, setNote ] = useState<Note|null>(null);
    const { idNote } = route.params;
    const noteContext = useContext(NotesContext);
    useLayoutEffect(() => {
        setNote(noteContext?.getNote(idNote)!);
        noteContext?.checkAsView(idNote);
    },[]);
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={1}>
                    {note?.title}
                </Text>
                <Text style={styles.description} numberOfLines={4}>
                    {note?.description}
                </Text>
                <View style={styles.boxBtns}>
                    <Button 
                        text='Volver'
                        customStyle={{borderColor:'#21174f', borderWidth: 1, width: '45%'}}
                        customTextStyles={{color: '#21174f'}}
                        onPress={() => navigation.goBack()}
                    />
                    <Button 
                        text='Eliminar'
                        customStyle={{backgroundColor:'#21174f', width: '45%'}}
                        customTextStyles={{color: 'white'}}
                        onPress={() => {
                            noteContext?.removeNote(idNote);
                            navigation.goBack()
                        }}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        position: 'relative',
        width: 300,
        height: 300,
        borderWidth: 1,
        borderColor: '#21174f',
        borderRadius: 30,
        alignItems: 'center',
        padding: 10,
        gap: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    description: {
        fontSize: 15,
    },
    boxBtns: {
        position: 'absolute',
        bottom: 30,
        width: 250, 
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between'
    } 
})