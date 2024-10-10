import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UsersList from '../pages/UsersList/UsersList';
import UserPostsList from '../pages/UserPosts/UserPostsList';
import TasksList from '../pages/TasksList/TasksList';
import { FC } from 'react';
import HomeHeader from './components/HomeHeader';

const MainStack = createNativeStackNavigator();

const AppStack: FC = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Home"
        component={UsersList}
        options={{
          header: HomeHeader,
        }}
      />
      <MainStack.Screen name="UserPosts" component={UserPostsList} />
      <MainStack.Screen name="Tasks" component={TasksList} />
    </MainStack.Navigator>
  );
};

export default AppStack;
