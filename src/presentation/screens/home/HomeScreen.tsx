import React, { useContext, useEffect } from 'react';
import { Easing, FlatList, StyleSheet, Text, View } from 'react-native';
import { BtnFloat, NotData } from '../../components/ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigators/StackNavigator';
import { NotesContext } from '../../context/NotesContext';
import { ItemNote } from '../../components/note/ItemNote';
import { useAnumation } from '../../hooks/useAnimation';

export const HomeScreen = () => {
    const { top } = useSafeAreaInsets();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const notesContext = useContext(NotesContext);
    const { animateMove: animateBtnDesellect, animationMove:animationMoveBtnDiselect } = useAnumation();
    const { animateMove: animateBtnDelete, animationMove:animationMoveBtnDelete } = useAnumation();
    useEffect(() => {
        animationMoveBtnDiselect({
            initialValue: 0,
            toValue: notesContext?.hasSelectedNotes ? -75 : 0,
            duration: 200,
            easing: Easing.ease,
        });
        animationMoveBtnDelete({
            initialValue: 0,
            toValue: notesContext?.hasSelectedNotes ? -145 : 0,
            duration: 200,
            easing: Easing.ease,
        });
    },[notesContext?.hasSelectedNotes]);
    return (
        <View style={styles.container}>
            {!notesContext?.notes.length
                ?   <NotData message='No hay notas por el momento' />
                :   <FlatList 
                        data={notesContext?.notes}
                        renderItem={({item}) => <ItemNote note={item} />}
                        keyExtractor={(note, index) => note.id+`${index}`}
                        ListHeaderComponent={() => (
                            <View style={{...styles.boxTitle, height:top+120}} >
                                <Text style={styles.title}>Mis notas</Text>
                            </View>
                        )}
                        ListFooterComponent={() => (
                            <View style={{height:40}} />
                        )}
                        showsVerticalScrollIndicator={false}
                    />
            }
            <BtnFloat 
                iconName='trash-outline'
                sizeIcon={28}
                transform={animateBtnDelete}
                customStylesBox={{
                    bottom: 85,
                    right: 27.5,
                    width: 55,
                    height: 55,
                }}
                customStylesBtn={{
                    backgroundColor: 'white'
                }}
                action={() => notesContext?.removeNotesSelecteds()}
            />
            <BtnFloat 
                iconName='close-outline'
                sizeIcon={30}
                transform={animateBtnDesellect}
                customStylesBox={{
                    bottom: 85,
                    right: 27.5,
                    width: 55,
                    height: 55,
                }}
                customStylesBtn={{
                    backgroundColor: 'white'
                }}
                action={() => notesContext?.deselectAll()}
            />
            <BtnFloat 
                iconName='add-circle-outline'
                sizeIcon={40}
                iconColor='white'
                action={() => navigation.navigate('Create')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white'
    },
    boxTitle: {
        marginHorizontal: 20
    },
    title: {
        position: 'absolute', 
        bottom: 20, 
        fontSize: 30
    }
})