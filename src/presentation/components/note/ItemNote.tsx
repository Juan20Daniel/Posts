import { useContext, useEffect } from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View, Vibration } from 'react-native';
import { Note } from '../../../infrestructure/interfaces/Notes';
import { NotesContext } from '../../context/NotesContext';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigators/StackNavigator';

interface Props {
    note:Note;
}

export const ItemNote = ({ note }:Props) => {
    const { id, title, description, isNew, isSelected } = note;
    const noteContext = useContext(NotesContext);
    const width = useWindowDimensions().width;
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const handleOnLongPress = () => {
        Vibration.vibrate(50);
        noteContext?.selectNote(id);
    }
    return (
        <Pressable 
            onLongPress={() => handleOnLongPress()}
            onPress={() => navigation.navigate('Details', {idNote:id})}
        >
            <View style={{
                ...styles.container,
                width:width-40,
                backgroundColor: isNew ? '#21174f' : '#8a93d0',
                opacity: isSelected ? 0.6 : 1
            }}>
                {isNew && 
                    <View style={styles.boxNotification}>
                        <Text style={styles.textNotification}>Nueva</Text>
                    </View>
                }
                <View style={{
                    ...styles.verticalLine, 
                    backgroundColor:isSelected
                        ? isNew 
                            ? 'white'
                            : '#21174f' 
                        : isNew 
                            ? '#21174f'
                            : '#8a93d0'
                    }} 
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
        position: 'relative',
        flexDirection: 'row',
        height: 100,
        marginHorizontal: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#21174f',
        marginBottom: 20,
        paddingVertical: 20,
        paddingLeft: 0,
        paddingRight: 20,
        alignItems: 'center',
    },
    boxNotification: {
        position: 'absolute',
        backgroundColor: '#1A66AC',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 15,
        top: -15,
        right: 20
    },
    textNotification: {
        color: 'white',
        fontSize: 12
    },
    verticalLine: {
        width: 5,
        height: '80%',
        marginRight: 10,
        marginLeft: 3,
        borderRadius: 5,
    },
});
