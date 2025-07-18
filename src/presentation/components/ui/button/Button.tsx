
import { KeyboardTypeOptions, StyleProp, StyleSheet, TextInput, ViewStyle } from 'react-native';

interface Props {
    placeholder: string;
    keyboardType: KeyboardTypeOptions;
    customStyles?: StyleProp<ViewStyle>;

}

export const Input = ({placeholder, keyboardType='default', customStyles}:Props) => {
    return (
        <TextInput
            placeholder={placeholder}
            keyboardType={keyboardType}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        width:'80%',
        height: 35
    }
})
