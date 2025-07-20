import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

interface Props {
    message: string;
}

export const NotData = ({message}:Props) => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../../assets/undraw_no-data.png')}
                style={styles.ilustrationDrow}
            />
            <Text>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
    },
    ilustrationDrow: {
        width: 250,
        height: 250
    }
})
