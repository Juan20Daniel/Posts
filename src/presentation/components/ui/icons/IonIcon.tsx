import Icons from 'react-native-vector-icons/Ionicons';

interface Props {
    name: string;
    size?: number;
    color?: string;
}

export const IonIcon = ({name, size=20, color='black'}:Props) => {
  return (
    <Icons 
      name={name} 
      size={size} 
      color={color}
    />
  )
}
