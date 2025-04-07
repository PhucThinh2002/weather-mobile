import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AddLocationButton: React.FC<{ onPress: () => void }> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons name="add" size={24} color="#fff" />
      <Text style={styles.text}>Add location</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
    },
    text: {
      marginLeft: 8,
      color: '#fff', // Đổi thành màu trắng
      fontSize: 16,
    },
  });

export default AddLocationButton;