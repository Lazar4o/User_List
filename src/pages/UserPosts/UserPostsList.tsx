import {
  ExpandableSection,
  Text,
  TouchableOpacity,
  View,
} from 'react-native-ui-lib';
import { ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppDispatch,
  RootState,
  selectAllPosts,
  selectHasPostsForUserId,
} from '../../store/store';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  deletePost,
  fetchPosts,
  updatePost,
} from '../../store/slices/postSlice';
import UserCardDetails from './components/UserCardDetails';
import ControlledTextField from '../../components/controlled/ControlledTextField';
import ConfirmDeleteModal from './components/PostDeleteDialog';

type UserPostsListProps = {
  route?: {
    params: {
      userId: number;
    };
  };
};

// @TODO: ADD USECALLBACKS - WHERE NECESARY
const UserPostsList: FC<UserPostsListProps> = ({ route }) => {
  const { userId } = route?.params || {};
  const [expandedPost, setExpandedPost] = useState<number | null>(null);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [postToDelete, setPostToDelete] = useState<{
    id: number;
    title: string;
  } | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector(selectAllPosts);
  const hasPostsForUserId = useSelector((state: RootState) =>
    selectHasPostsForUserId(state, userId),
  );
  const error = useSelector((state: RootState) => state.posts.error);
  const loading = useSelector((state: RootState) => state.posts.loading);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { isDirty, isValid },
  } = useForm({
    defaultValues: {
      title: '',
      body: '',
    },
  });

  // Handle expanding post and setting form values
  const toggleExpand = (post: any) => {
    setExpandedPost(prevPostId => (prevPostId === post.id ? null : post.id));
    if (expandedPost !== post.id) {
      setValue('title', post.title);
      setValue('body', post.body);
    }
  };

  const onSubmit = (data: any, postId: number) => {
    dispatch(updatePost({ id: postId, data }));
  };

  const handleCancel = (post: any) => {
    reset({
      title: post.title,
      body: post.body,
    });
  };

  const handleDeletePress = ({
    postId,
    postTitle,
  }: {
    postId: number;
    postTitle: string;
  }) => {
    setPostToDelete({ id: postId, title: postTitle });
    setIsModalVisible(true);
  };

  const handleConfirmDelete = () => {
    if (postToDelete) {
      dispatch(deletePost(postToDelete.id));
    }
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setPostToDelete(null);
  };

  useEffect(() => {
    if (!userId) {
      return;
    }

    // @TODO: If posts for a user become zero - they are refetched instead of showing - No Posts Found!
    // Continue: Add in the store a flag for zero posts
    if (!hasPostsForUserId) {
      dispatch(fetchPosts(userId));
    }
  }, [dispatch, userId, hasPostsForUserId, posts]);

  return (
    <SafeAreaView style={{ flex: 1, margin: 10 }}>
      <View>
        <Text text60>User Info: </Text>
        <UserCardDetails />
      </View>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && (
        <Text style={{ textAlign: 'center' }}>Posts Error: {error}</Text>
      )}
      {!loading && !error && (
        <View marginT-10>
          <Text text60 marginT-10>
            User Posts:
          </Text>

          <FlatList
            data={posts}
            // extraData={posts}
            getItemLayout={(data, index) => ({
              length: 100,
              offset: 100 * index,
              index,
            })}
            ListEmptyComponent={
              <Text style={{ textAlign: 'center' }}>No posts found</Text>
            }
            keyExtractor={item => item.id.toString()}
            style={{
              maxHeight: 500,
              borderColor: '#ccc',
              borderWidth: 1,
              padding: 10,
            }}
            renderItem={({ item }) => (
              <View
                key={item.id}
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 10,
                  padding: 10,
                  marginBottom: 10,
                }}>
                <ExpandableSection
                  sectionHeader={
                    <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>
                      {item.title}
                    </Text>
                  }
                  expanded={expandedPost === item.id}
                  onPress={() => toggleExpand(item)}>
                  <View>
                    <ControlledTextField
                      control={control}
                      name={'title'}
                      label="Title"
                      multiline
                    />

                    <ControlledTextField
                      control={control}
                      name={'body'}
                      label="Description"
                      multiline
                    />

                    <View row spread marginT-10>
                      {/* @TODO: This component can be reusable - it is found as well in the UsersList */}
                      <View gap-12 row>
                        <TouchableOpacity
                          bg-white
                          padding-10
                          br30
                          style={{
                            borderWidth: 1,
                            borderColor: '#ccc',
                          }}
                          onPress={() => handleCancel(item)}>
                          <Text>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          bg-green10
                          padding-10
                          br30
                          style={{
                            borderWidth: 1,
                            borderColor: '#ccc',
                          }}
                          onPress={handleSubmit(data =>
                            onSubmit(data, item.id),
                          )}
                          disabled={!isDirty || !isValid}>
                          <Text style={{ color: '#fff' }}>Submit</Text>
                        </TouchableOpacity>
                      </View>

                      <View>
                        <TouchableOpacity
                          bg-red10
                          padding-10
                          br30
                          style={{
                            borderWidth: 1,
                            borderColor: '#ccc',
                          }}
                          onPress={() =>
                            handleDeletePress({
                              postId: item.id,
                              postTitle: item.title,
                            })
                          }>
                          <Text style={{ color: '#fff' }}>Delete</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </ExpandableSection>
              </View>
            )}
          />
        </View>
      )}
      <ConfirmDeleteModal
        isVisible={isModalVisible}
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseModal}
        postTitle={postToDelete?.title || ''}
      />
    </SafeAreaView>
  );
};

export default UserPostsList;
