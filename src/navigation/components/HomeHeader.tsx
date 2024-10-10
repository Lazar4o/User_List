import { useNavigation } from '@react-navigation/native';
import { Colors, Text, TouchableOpacity } from 'react-native-ui-lib';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../utils/types/navigation';
import { FC } from 'react';

const HomeHeader: FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleNavigation = () => {
    navigation.navigate('Tasks', {});
  };

  return (
    <TouchableOpacity marginH-30 right onPress={handleNavigation}>
      <Text color={Colors.primary} text60>
        {'Tasks >'}
      </Text>
    </TouchableOpacity>
  );
};

export default HomeHeader;
