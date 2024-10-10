import React, { FC, useEffect, useState } from 'react';
import { TextInput, FlatList, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFilteredTasks,
  selectTaskPagination,
  selectTaskFilters,
  RootState,
} from '../../store/store';
import { AppDispatch } from '../../store/store';
import {
  fetchTasks,
  resetFilters,
  updateFilters,
  updatePagination,
  updateTaskStatus,
} from '../../store/slices/tasksSlice';
import {
  RadioButton,
  RadioGroup,
  Text,
  TouchableOpacity,
  View,
} from 'react-native-ui-lib';

const TaskList: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector(selectFilteredTasks);
  const loading = useSelector((state: RootState) => state.tasks.loading);
  const pagination = useSelector(selectTaskPagination);
  const filters = useSelector(selectTaskFilters);

  const [selectedStatus, setSelectedStatus] = useState<string>(filters.status);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    setSelectedStatus(filters.status);
  }, [filters.status]);

  const handleFilterChange = (field: string, value: string | number | null) => {
    dispatch(updateFilters({ [field]: value }));
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    handleFilterChange('status', value);
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  const handlePageChange = (newPage: number) => {
    dispatch(updatePagination(newPage));
  };

  const paginatedTasks = tasks.slice(
    (pagination.currentPage - 1) * pagination.pageSize,
    pagination.currentPage * pagination.pageSize,
  );

  return (
    <View padding-10>
      <Text center marginV-5>HINT: Initially To re-render flat list - Change some filter</Text>
      {/* Loading indicator */}
      {loading ? (
        <ActivityIndicator/>
      ) : (
        <>
          {/* Radio Group for Status Filter */}
          <RadioGroup
            initialValue={selectedStatus}
            onValueChange={handleStatusChange}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <RadioButton value="all" label="All" />
            <RadioButton value="completed" label="Completed" />
            <RadioButton value="notCompleted" label="Incomplete" />
          </RadioGroup>

          {/* Filter by Title */}
          <TextInput
            style={{
              padding: 10,
              backgroundColor: 'white',
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 10,
              marginBottom: 10,
            }}
            placeholder="Filter by title"
            value={filters.title}
            onChangeText={(text: string) => handleFilterChange('title', text)}
          />

          {/* Filter by User ID */}
          <TextInput
            style={{
              padding: 10,
              backgroundColor: 'white',
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 10,
              marginBottom: 10,
            }}
            placeholder="Filter by User ID"
            keyboardType="numeric"
            value={filters.userId ? filters.userId.toString() : ''}
            onChangeText={(text: string) =>
              handleFilterChange('userId', text ? parseInt(text, 10) : null)
            }
          />

          {/* Reset Filters */}
          <TouchableOpacity
            bg-blue40
            style={{
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 5,
              padding: 5,
              margin: 5,
            }}
            onPress={handleResetFilters}>
            <Text center white>
              Reset Filters
            </Text>
          </TouchableOpacity>

          {/* Tasks List */}
          <FlatList
            data={paginatedTasks}
            extraData={[tasks, filters, pagination]}
            keyExtractor={item => item.id.toString()}
            style={{
              maxHeight: 350,
            }}
            renderItem={({ item }) => (
              <View>
                <Text>TODO: {item.title}</Text>
                <Text>Owner ID: {item.userId}</Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: item.completed ? 'green' : 'red',
                  }}
                  onPress={() =>
                    dispatch(
                      updateTaskStatus({
                        id: item.id,
                        status: !item.completed,
                      }),
                    )
                  }>
                  <Text>
                    {item.completed ? 'Mark Incomplete' : 'Mark Complete'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />

          {/* Pagination Controls */}
          <View>
            <TouchableOpacity
              style={{
                borderColor: 'black',
                borderWidth: 1,
                borderRadius: 5,
                padding: 5,
                margin: 5,
              }}
              disabled={pagination.currentPage === 1}
              onPress={() => handlePageChange(pagination.currentPage - 1)}>
              <Text center>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderColor: 'black',
                borderWidth: 1,
                borderRadius: 5,
                padding: 5,
                margin: 5,
              }}
              disabled={paginatedTasks.length < pagination.pageSize}
              onPress={() => handlePageChange(pagination.currentPage + 1)}>
              <Text center>Next</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default TaskList;
