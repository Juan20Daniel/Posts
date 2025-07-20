import React from 'react';
import { Animated, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { IonIcon } from '../icons/IonIcon';
import { Button } from '../button/Button';

interface Props {
    iconName: string;
    sizeIcon?: number;
    iconColor?: string; 
    customStylesBox?: StyleProp<ViewStyle>;
    customStylesBtn?: StyleProp<ViewStyle>;
    transform?: Animated.Value;
    action: () => void;
}
export const BtnFloat = ({iconName, sizeIcon=20, iconColor='black', customStylesBox, customStylesBtn, transform, action}:Props) => {
    return (
        <Animated.View style={[
            styles.boxBtnAdd,
            customStylesBox,
            {transform: [{translateY:transform??0}]}
        ]}>
            <Button
                icon={<IonIcon name={iconName} size={sizeIcon} color={iconColor}/>}
                customStyle={[
                    styles.btnAdd,
                    customStylesBtn,
                ]}
                onPress={() => action()}
            />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
     boxBtnAdd:{
        position:'absolute',
        width: 70,
        height: 70,
        bottom: 75,
        right: 20,
    },
    btnAdd: {
        backgroundColor:'#102c5b',
        shadowColor:'#000000',
        shadowOffset: {
            width: 0.5,
            height: 0.5
        },
        shadowOpacity: 0.7,
        shadowRadius: 0.7,
        elevation: 5
    },
})