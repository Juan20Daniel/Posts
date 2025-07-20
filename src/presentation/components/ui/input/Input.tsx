import { KeyboardTypeOptions, StyleSheet, TextInput, useWindowDimensions } from 'react-native';

interface Props {
    state: string;
    placeholder: string;
    keyboardType: KeyboardTypeOptions;
    isValid: boolean;
    setState: React.Dispatch<React.SetStateAction<string>>;
}

export const Input = ({placeholder, keyboardType='default', state, isValid, setState}:Props) => {
    const width = useWindowDimensions().width
    return (
        <TextInput
            placeholder={placeholder}
            keyboardType={keyboardType}
            value={state}
            onChangeText={setState}
            style={{
                ...styles.container,
                width: width - 50,
                backgroundColor:isValid ? '#edefff' : '#fff0f0',
                borderBottomColor:isValid ? '#21174f' : '#500000',
            }}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        borderRadius: 5,
        borderBottomWidth: 2,
        paddingHorizontal: 10 
    }
});