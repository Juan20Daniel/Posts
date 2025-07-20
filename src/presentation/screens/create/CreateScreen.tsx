import 'react-native-get-random-values'
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Alert, Button, Input, IonIcon } from '../../components/ui';
import { useNavigation } from '@react-navigation/native';
import { NotesContext } from '../../context/NotesContext';
import { v4 as uuid } from 'uuid';
import { Note } from '../../../infrestructure/interfaces/Notes';
import Icons from 'react-native-vector-icons/Ionicons';

export const CreateScreen = () => {
    const [ title, setTitle ] = useState<string>('');
    const [ description, setDescription ] = useState<string>('');
    const [ error, setError ] = useState({title:'normal', description:'normal'});
    const [ alertError, setAlertError ] = useState(false);
    const [ alert, setAlert ] = useState<boolean>(false);
    const { top } = useSafeAreaInsets();
    const notesContext = useContext(NotesContext);
    const navigation = useNavigation();

    const verifyCamps = () => {
        const isValidTitle = title !== '';
        const isValidDescription = description !== '';
        setError({
            title:isValidTitle ? 'valid' : 'invalid',
            description:isValidDescription ? 'valid' : 'invalid',
        });
       
        if(isValidTitle && isValidDescription) return true;
        setAlertError(true);
        return false;
    }
    const addNote = () => {
        if(!verifyCamps()) return;
        const newNote:Note = {
            id:uuid(),
            title: title,
            description: description,
            isNew: true,
            isSelected: false,
        }
        notesContext?.addNote(newNote);
        navigation.goBack();
    }
    const canBack = () => {
        if(title === '' && description === '') return true;
        setAlert(true);
        return false;
    }
    return (
        <View style={{...styles.container, padding:top}}>
            <Alert 
                title='Salir'
                message='¿Seguro que quieres salir?, se perderan los datos agregados.'
                visible={alert} 
                icon={<IonIcon name='alert-circle-outline' color="white" size={80}/>}
            >
                <View style={styles.btnBoxBtnsAlert}>
                    <Button
                        onPress={() => setAlert(false)}
                        text="No"
                        customStyle={{
                            height: 40,
                            width: 100,
                            backgroundColor: '#291d49'
                        }}
                        customTextStyles={{
                            color:'white',
                            fontSize: 16,
                        }}
                    />
                    <Button
                        onPress={() => {
                            setAlert(false)
                            navigation.goBack()
                        }}
                        text="Si"
                        customStyle={{
                            height: 40,
                            width: 100,
                            backgroundColor: '#291d49'
                        }}
                        customTextStyles={{
                            color:'white',
                            fontSize: 16,
                        }}
                    />
               </View>
            </Alert>
            <Alert 
                title='Error'
                message='No puede habar campos vacios'
                visible={alertError} 
                icon={<IonIcon name='alert-circle-outline' color="white" size={80}/>}
                closeAlert={() => setAlertError(false)}
            />
            
            <View style={styles.boxHeader}>
                <Icons name='add-circle-outline' size={120} color='#21174f' />
                <Text style={styles.title}>Nuevo</Text>
                <Text>Agregar cualquier cosa a la lista</Text>
            </View>
            <View style={styles.boxInputs}>
                <Input 
                    placeholder='Agrega un titulo'
                    keyboardType='default'
                    isValid={error.title === 'normal' || error.title === 'valid'}
                    state={title}
                    setState={setTitle}
                />
                <Input 
                    placeholder='Agrega un descripción'
                    keyboardType='default'
                    isValid={error.description === 'normal' || error.description === 'valid'}
                    state={description}
                    setState={setDescription}
                />
            </View>
            <View style={styles.boxBtns}>
                <Button 
                    onPress={() => addNote()}
                    text='Agregar'
                    customStyle={{
                        backgroundColor:'#21174f',
                        borderRadius: 5
                    }}
                    customTextStyles={{
                        color:'white',
                        fontSize: 16
                    }}
                /> 
                <Button 
                    text='Salir'
                     customStyle={{
                        backgroundColor:'#edefff',
                        borderRadius: 5
                    }}
                    customTextStyles={{
                        color:'#21174f',
                        fontSize: 16
                    }}
                    onPress={() => {
                        if(canBack()) navigation.goBack();
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    btnBoxBtnsAlert: {
        flexDirection: 'row',
        gap: 15
    },
    container: {
        flex:1, 
        backgroundColor: 'white',
        paddingTop: 100,
    },
    boxHeader: {
        alignItems: 'center',
        gap: 10
    },
    title: {
        fontSize: 40
    },
    boxInputs: {
        marginTop: 20,
        gap: 10,
    },
    boxBtns: {
        marginTop: 50,
        gap: 15,
        height: 50,
    }
});