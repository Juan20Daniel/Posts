import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';

export const CreateScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Nuevo</Text>
            <Text>Agregar cualquier cosa a la lista</Text>
            
            
            <Icons name='accessibility-outline' size={20} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'white'
    }
})