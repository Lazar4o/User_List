import { NavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  UserPosts: { userId: number } | undefined;
  Home: {};
  Tasks: {};
};

export type RootNavigationProp = NavigationProp<
  NativeStackNavigationProp<RootStackParamList>
>;
