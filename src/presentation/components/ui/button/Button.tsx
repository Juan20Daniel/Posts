
import { Pressable, StyleProp, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';

interface Props {
    text?: string;
    customStyle?:StyleProp<ViewStyle>;
    customTextStyles?: StyleProp<TextStyle>;
    icon?: React.ReactNode;
    onPress?: () => void;
}

export const Button = ({text, customStyle, customTextStyles, icon, onPress}:Props) => {
    return (
        <Pressable
            style={({pressed}) => ([
                {
                    ...styles.container,
                    opacity: pressed ? 0.5 : 1
                },
                customStyle,
            ])}
            onPress={() => {
                onPress && onPress();
            }}
        >
            {icon 
                ?   icon
                :   <Text 
                        style={[
                            styles.text,
                            customTextStyles,
                        ]}
                    >
                        {text}
                    </Text>
            }
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center'
    },
    text: {
        fontSize: 20,
    }
})
