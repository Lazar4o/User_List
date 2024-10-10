import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UsersList from '../pages/UsersList/UsersList';
import UserPostsList from '../pages/UserPosts/UserPostsList';

const MainStack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Home"
        component={UsersList}
        options={{ headerShown: false }}
      />
      <MainStack.Screen name="UserPosts" component={UserPostsList} />
    </MainStack.Navigator>
  );
};

export default AppStack;
