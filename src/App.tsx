import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from "./presentation/navigators/StackNavigator";

function App() {
  //const isDarkMode = useColorScheme() === 'dark';
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
}

export default App;
