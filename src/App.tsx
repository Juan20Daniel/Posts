import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from "./presentation/navigators/StackNavigator";
import { StatusBar, useColorScheme } from "react-native";
import { NotesProvider } from "./presentation/context/NotesContext";

function App() {
  const isDarkMode = useColorScheme();
  return (
    <>
      <StatusBar barStyle={isDarkMode === 'dark' ? 'light-content' : 'dark-content'} />
      <NotesProvider>
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
      </NotesProvider>
    </>
  );
}

export default App;
