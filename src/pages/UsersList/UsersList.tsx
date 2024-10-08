import {
  ExpandableSection,
  Text,
  TouchableOpacity,
  View,
} from 'react-native-ui-lib';
import { ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, selectAllUsers } from '../../store/store';
import { useEffect, useState } from 'react';
import { fetchUsers, updateUser } from '../../store/slices/userSlice';
import { useForm } from 'react-hook-form';
import ControlledTextField from '../../components/controlled/ControlledTextField';

const UsersList = () => {
  const [expandedUser, setExpandedUser] = useState<number | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const usersById = useSelector((state: RootState) => state.users.byId);
  const usersToMap = useSelector(selectAllUsers);
  const error = useSelector((state: RootState) => state.users.error);
  const loading = useSelector((state: RootState) => state.users.loading);

  useEffect(() => {
    // @TODO: This might not be needed - problem is around useForm - control and name props
    if (Object.keys(usersById).length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch]);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm({
    // @TODO: Uncomment and wire yup validation
    // resolver: yupResolver(userValidationSchema),
    // defaultValues: {
    //   users: users,
    // },
  });

  // @TODO: Type the data
  const onSubmit = (data: any, userId: number) => {
    const specificUserData = data.users[userId];
    console.log('Specific user data:', specificUserData);

    dispatch(updateUser({ id: userId, data: specificUserData }));

    // @TODO: Reset does not work correctly - so just left a TODO for now
    // reset({
    //   [`users.${userId}.username`]: specificUserData.username,
    //   [`users.${userId}.email`]: specificUserData.email,
    //   [`users.${userId}.address.street`]: specificUserData.address.street,
    //   [`users.${userId}.address.suite`]: specificUserData.address.suite,
    //   [`users.${userId}.address.city`]: specificUserData.address.city,
    // });
  };

  const handleCancel = (userId: number) => {
    const user = usersById[userId];

    // @TODO: Reset does not work correctly - so just left a TODO for now
    if (user) {
      reset();
    }
  };

  const toggleExpand = (userId: number) => {
    setExpandedUser(prevUserId => (prevUserId === userId ? null : userId));
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <FlatList
      data={usersToMap}
      keyExtractor={field => field?.id?.toString()}
      style={{
        flex: 1,
        backgroundColor: 'pink',
        maxHeight: 450,
        marginHorizontal: 10,
      }}
      renderItem={({ item }) => (
        <View backgroundColor="red" key={item.id} style={{ marginVertical: 5 }}>
          <Text>Index: {item.id}</Text>
          <ExpandableSection
            sectionHeader={
              <Text color={'black'} text60>
                {item.name}
              </Text>
            }
            expanded={expandedUser === item.id}
            onPress={() => toggleExpand(item.id)}>
            <View style={{ padding: 10 }}>
              <ControlledTextField
                name={`users.${item.id}.username`}
                control={control}
                defaultValue={item.username}
                placeholder="Username"
                // rules={{ required: 'Username is required' }} // Validation rule
                //   errorMessage={errors[`username`]?.message}
              />
              <ControlledTextField
                name={`users.${item.id}.email`}
                control={control}
                defaultValue={item.email}
                placeholder="Email"
                // rules={{
                //   required: 'Email is required',
                //   pattern: {
                //     value: /\S+@\S+\.\S+/,
                //     message: 'Email is invalid',
                //   },
                // }}
                //   errorMessage={errors[`email`]?.message}
              />
              <ControlledTextField
                name={`users.${item.id}.address.street`}
                control={control}
                defaultValue={item.address.street}
                placeholder="Street"
                // rules={{ required: 'Street is required' }}
                //   errorMessage={errors[`address.street`]?.message}
              />
              <ControlledTextField
                name={`users.${item.id}.address.suite`}
                control={control}
                defaultValue={item.address.suite}
                placeholder="Suite"
                //   errorMessage={errors[`address.suite`]?.message}
              />
              <ControlledTextField
                name={`users.${item.id}.address.city`}
                control={control}
                defaultValue={item.address.city}
                placeholder="City"
                // rules={{ required: 'City is required' }}
                //   errorMessage={errors[`address.city`]?.message}
              />

              <TouchableOpacity
                style={{ backgroundColor: 'orange', padding: 10 }}
                onPress={() => handleCancel(item.id)}
                disabled={!isDirty}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ backgroundColor: 'yellow', padding: 10 }}
                onPress={handleSubmit(data => onSubmit(data, item.id))}
                disabled={!isDirty || !isValid}>
                <Text>Submit</Text>
              </TouchableOpacity>
            </View>
          </ExpandableSection>
        </View>
      )}
    />
  );
};

export default UsersList;
