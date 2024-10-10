import { ParamListBase, RouteProp, useRoute } from '@react-navigation/native';
import React, { FC, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ExpandableSection,
} from 'react-native-ui-lib';
import { AppDispatch, RootState } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import ControlledTextField from '../../../components/controlled/ControlledTextField';
import { User } from '../../../utils/interfaces/users';
import { updateUser } from '../../../store/slices/userSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { userValidationSchema } from '../../../utils/schemas/userValidationSchema';

type UserPostsListProps = {
  params: {
    userId: number;
  };
} & RouteProp<ParamListBase>;

const UserCardDetails: FC = () => {
  const {
    params: { userId },
  } = useRoute<UserPostsListProps>();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const usersById = useSelector((state: RootState) => state.users.byId);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userValidationSchema),
    defaultValues: {
      username: usersById[userId]?.username || '',
      email: usersById[userId]?.email || '',
      address: {
        city: usersById[userId]?.address.city || '',
        street: usersById[userId]?.address.street || '',
        suite: usersById[userId]?.address.suite || '',
      },
    },
  });

  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  const handleCancel = () => {
    // reset(usersById[userId]);
    // There is workaround again with setValues - but that is really bad practice
  };

  const onSubmit = (data: Partial<User>) => {
    dispatch(updateUser({ id: userId, data }));
    console.log(data);
  };

  return (
    <View
      style={{
        marginVertical: 5,
        padding: 10,
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        gap: 10,
      }}>
      <ExpandableSection
        sectionHeader={
          <View row spread>
            <Text text70>User: {usersById[userId]?.email}</Text>
            <Text text70>{isExpanded ? 'Hide - ' : 'Show More + '}</Text>
          </View>
        }
        onPress={toggleExpand}
        expanded={isExpanded}>
        <ControlledTextField
          control={control}
          name="username"
          label="Username"
          errorMessage={errors.username ? errors.username?.message : ''}
        />
        <ControlledTextField
          control={control}
          name="email"
          label="Email"
          errorMessage={errors?.email ? errors.email?.message : ''}
        />
        <ControlledTextField
          control={control}
          name="address.city"
          label="City"
          errorMessage={
            errors.address?.city ? errors.address.city?.message : ''
          }
        />
        <ControlledTextField
          control={control}
          name="address.street"
          label="Street"
          errorMessage={
            errors.address?.street ? errors.address.street?.message : ''
          }
        />
        <ControlledTextField
          control={control}
          name="address.suite"
          label="Suite"
          errorMessage={
            errors.address?.suite ? errors.address?.suite?.message : ''
          }
        />
        <View row gap-12>
          <TouchableOpacity
            style={{ backgroundColor: 'green', padding: 10 }}
            onPress={handleCancel}>
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: 'yellow', padding: 10 }}
            onPress={handleSubmit(onSubmit)}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      </ExpandableSection>
    </View>
  );
};

export default UserCardDetails;
