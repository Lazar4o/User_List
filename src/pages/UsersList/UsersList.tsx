import {
  ExpandableSection,
  Text,
  TouchableOpacity,
  View,
} from 'react-native-ui-lib';
import { ActivityIndicator, StatusBar } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, selectAllUsers } from '../../store/store';
import { FC, useCallback, useEffect, useState } from 'react';
import { fetchUsers, updateUser } from '../../store/slices/userSlice';
import { useForm } from 'react-hook-form';
import ControlledTextField from '../../components/controlled/ControlledTextField';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../utils/types/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';

// @TODO: ADD USECALLBACKS - WHERE NECESARY
const UsersList: FC = () => {
  const [expandedUser, setExpandedUser] = useState<number | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const usersById = useSelector((state: RootState) => state.users.byId);
  const usersToMap = useSelector(selectAllUsers);
  const error = useSelector((state: RootState) => state.users.error);
  const loading = useSelector((state: RootState) => state.users.loading);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    setValue,
    reset,
  } = useForm({
    // @TODO: Uncomment and wire yup validation
    // resolver: yupResolver(userValidationSchema),
    // defaultValues: usersById,
  });

  // @TODO: Type the data - extract in interface / type
  const onSubmit = (
    // data: { users: { [key: number]: User } },
    data: any,
    userId: number,
  ) => {
    const specificUserData = data.users[userId];
    console.log('Specific user data:', specificUserData);

    // @TODO: Debounce this
    dispatch(updateUser({ id: userId, data: specificUserData }));
  };

  // @TODO: Debounce this
  const handleCancel = (userId: number) => {
    const user = usersById[userId];

    // @TODO: Reset does not work correctly - so just left a TODO for now
    if (user) {
      setValue(`users.${userId}.username`, user.username);
      setValue(`users.${userId}.email`, user.email);
      setValue(`users.${userId}.address.street`, user.address.street);
      setValue(`users.${userId}.address.suite`, user.address.suite);
      setValue(`users.${userId}.address.city`, user.address.city);

      // @TODO: Reset has some cache - leave it like that for now
      // reset({
      //   [`users.${userId}.username`]: user.username,
      //   [`users.${userId}.email`]: user.email,
      //   [`users.${userId}.address.street`]: user.address.street,
      //   [`users.${userId}.address.suite`]: user.address.suite,
      //   [`users.${userId}.address.city`]: user.address.city,
      // });
    }
    toggleExpand(userId);
  };

  const handleSeePosts = (userId: number) => {
    console.log('See posts for user:', userId);

    navigation.navigate('UserPosts', {
      userId,
    });
  };

  // @TODO: Debounce this
  const toggleExpand = (userId: number) => {
    setExpandedUser(prevUserId => (prevUserId === userId ? null : userId));
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: StatusBar.currentHeight,
        marginHorizontal: 10,
      }}>
      {/* @TODO: Add some Text like Users Listing */}
      <View>
        <Text text60BO>Users Listing</Text>
      </View>

      <FlatList
        data={usersToMap}
        keyExtractor={field => field?.id?.toString()}
        style={{
          flex: 1,
        }}
        enabled={true}
        extraData={expandedUser}
        renderItem={({ item }) => {
          return (
            <View
              key={item.id}
              style={{
                // @TODO: Exxtract into style
                marginVertical: 5,
                padding: 10,
                borderStyle: 'solid',
                borderColor: 'black',
                borderWidth: 1,
                borderRadius: 10,
              }}>
              <Text>Index: {item.id}</Text>
              <ExpandableSection
                sectionHeader={
                  // @TODO: Extract into reusable component - UserList has the same
                  <View row spread centerV>
                    <Text color={'black'} text60>
                      {item.name}
                    </Text>
                    <View>
                      <Text text40>{expandedUser === item.id ? '-' : '+'}</Text>
                    </View>
                  </View>
                }
                expanded={expandedUser === item.id}
                onPress={() => toggleExpand(item.id)}>
                <View style={{ padding: 10 }}>
                  <ControlledTextField
                    name={`users.${item.id}.username`}
                    control={control}
                    defaultValue={item.username}
                    label="Username"
                    rules={{ required: 'Username is required' }} // Validation rule
                    errorMessage={errors[`users.${item.id}.username`]?.message}
                  />
                  <ControlledTextField
                    name={`users.${item.id}.email`}
                    control={control}
                    defaultValue={item.email}
                    label="Email"
                  />
                  <ControlledTextField
                    name={`users.${item.id}.address.street`}
                    control={control}
                    defaultValue={item.address.street}
                    label="Street"
                  />
                  <ControlledTextField
                    name={`users.${item.id}.address.suite`}
                    control={control}
                    defaultValue={item.address.suite}
                    label="Suite"
                  />
                  <ControlledTextField
                    name={`users.${item.id}.address.city`}
                    control={control}
                    defaultValue={item.address.city}
                    label="City"
                  />
                  {/* @TODO: EXTRACT INTO REUSABLE COMPONENT */}
                  <View row spread>
                    <View>
                      <TouchableOpacity
                        style={{
                          backgroundColor: 'lightgreen',
                          padding: 10,
                          borderRadius: 10,
                        }}
                        onPress={() => handleSeePosts(item.id)}>
                        <Text>See Posts</Text>
                      </TouchableOpacity>
                    </View>
                    <View row style={{ gap: 12 }}>
                      <TouchableOpacity
                        style={{
                          backgroundColor: !isDirty ? 'grey' : 'orange',
                          padding: 10,
                          borderRadius: 10,
                        }}
                        onPress={() => handleCancel(item.id)}
                        disabled={!isDirty}>
                        <Text>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          backgroundColor:
                            !isDirty || !isValid ? 'grey' : 'yellow',
                          padding: 10,
                          borderRadius: 10,
                        }}
                        onPress={handleSubmit(data => onSubmit(data, item.id))}
                        disabled={!isDirty}>
                        <Text>Submit</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </ExpandableSection>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default UsersList;
