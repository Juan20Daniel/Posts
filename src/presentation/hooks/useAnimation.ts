import { useRef } from "react";
import { Easing, Animated } from "react-native";

export const useAnumation = () => {
    const animateMove = useRef(new Animated.Value(0)).current;
    
    const animationMove = ({initialValue=0, toValue=0, duration=300, easing = Easing.bounce, callback = () => {}}) => {
        animateMove.setValue(initialValue);
        
        Animated.timing(animateMove, {
            toValue:toValue,
            duration: duration,
            useNativeDriver: true,
            easing: easing
        }).start(callback);
    }
    return {
        animateMove,
        animationMove,
    }
}