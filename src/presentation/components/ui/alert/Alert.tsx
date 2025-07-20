import { Modal, StyleSheet, Text, useWindowDimensions, View } from "react-native"
import { Button } from "../button/Button";

interface Props {
    title: string;
    message: string;
    visible: boolean;
    icon?: React.ReactNode;
    children?: React.ReactNode;
    closeAlert?: () => void; 
}

export const Alert = ({title, message, visible, icon, children, closeAlert}:Props) => {
    const width = useWindowDimensions().width;

    return (
        <Modal 
            visible={visible} 
            transparent 
            style={{flex:1, position: 'relative'}}
        >
            <View style={{...styles.content, width: width-40}}>
                {icon}
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.message} numberOfLines={2}>{message}</Text>
                <View style={styles.boxBtns}>
                    {children 
                        ?   children
                        :   <Button
                                onPress={() => {
                                    closeAlert && closeAlert();
                                }}
                                text="Cerrar"
                                customStyle={{
                                    height: 40,
                                    width: 200,
                                    backgroundColor: '#291d49'
                                }}
                                customTextStyles={{
                                    color:'white',
                                    fontSize: 16,
                                }}
                            />
                        
                    }
                </View>
            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    content: {
        position: 'absolute',
        marginHorizontal: 20,
        padding: 20,
        bottom: 20,
        height: 300,
        borderRadius: 20,
        backgroundColor:'#44317e',
        alignItems: 'center',
        shadowColor:'#0000000',
        shadowOffset: {
            width: 0.2,
            height: 0.2
        },
        shadowOpacity: 0.4,
        shadowRadius: 0.4,
        elevation: 5
    },
    title: {
        color: 'white',
        fontSize: 40
    },
    message: {
        color: 'white',
        textAlign: 'center',
        fontSize: 14
    },
    boxBtns: {
        position: 'absolute',
        bottom: 20
    }
})