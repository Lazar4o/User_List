import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UsersList from '../pages/UsersList/UsersList';

const MainStack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Home"
        component={UsersList}
        options={{ headerShown: false }}
      />
      {/* <MainStack.Screen name="Posts" component={PostsLists} /> */}
    </MainStack.Navigator>
  );
};

export default AppStack;
