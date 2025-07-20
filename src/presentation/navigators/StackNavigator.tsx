import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/home/HomeScreen';
import { CreateScreen } from '../screens/create/CreateScreen';

export type RootStackParamList = {
    Home:undefined;
    Create:undefined;
}

const Stack = createStackNavigator<RootStackParamList>();

function StackNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown:false        
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen 
        name="Create" 
        component={CreateScreen} 
        options={{animation:'slide_from_left'}}
      />
    </Stack.Navigator>
  );
}

export default StackNavigation;