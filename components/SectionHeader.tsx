import { SectionHeaderProps } from '@/types/weather';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: 'rgba(255,255,255,0.1)',
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white', // Đảm bảo có dòng này
    },
  });

export default SectionHeader;