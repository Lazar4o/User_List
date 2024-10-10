import React, { FC, memo } from 'react';
import { Modal } from 'react-native';
import { View, Text, TouchableOpacity } from 'react-native-ui-lib';

type ConfirmDeleteModalProps = {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  postTitle: string;
};

const ConfirmDeleteModal: FC<ConfirmDeleteModalProps> = ({
  isVisible,
  onConfirm,
  onCancel,
  postTitle,
}) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onCancel}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
        <View
          style={{
            width: '80%',
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            alignItems: 'center',
          }}>
          <View marginB-20>
            <Text center text70>
              Are you sure you want to delete the post?
            </Text>
            <Text>Post Title: {postTitle ? `"${postTitle}"` : ''}?</Text>
          </View>

          <View row>
            {/* @TODO: Touchable opacities are repeating - extract */}
            <TouchableOpacity
              style={{
                backgroundColor: 'green',
                padding: 10,
                borderRadius: 8,
                marginRight: 10,
              }}
              onPress={onConfirm}>
              <Text style={{ color: '#fff' }}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: 'red',
                padding: 10,
                borderRadius: 8,
              }}
              onPress={onCancel}>
              <Text style={{ color: '#fff' }}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default memo(ConfirmDeleteModal);
