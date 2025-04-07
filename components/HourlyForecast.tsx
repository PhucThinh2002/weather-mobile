import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

interface HourlyForecastProps {
  hours: Array<{
    time: string;
    temp: number;
    condition?: string;
  }>;
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hours }) => {
  const navigation = useNavigation();
  const getWeatherIcon = (condition?: string) => {
    if (!condition) return 'partly-sunny';
    const cond = condition.toLowerCase();
    if (cond.includes('rain')) return 'rainy';
    if (cond.includes('cloud')) return 'cloudy';
    if (cond.includes('sun') || cond.includes('clear')) return 'sunny';
    return 'partly-sunny';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Today</Text>
        <TouchableOpacity 
          style={styles.nextButtonContainer}
          onPress={() => navigation.navigate('(tabs)/weekly-forecast')}
        >
          <Text style={styles.nextButtonText}>Next 7 day</Text>
          <Ionicons name="chevron-forward" size={16} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {hours?.map((hour, index) => (
          <View key={index} style={styles.hourItem}>
            <Text style={styles.time}>{hour.time}</Text>
            <Ionicons 
              name={getWeatherIcon(hour.condition)} 
              size={24} 
              color="white" 
              style={styles.weatherIcon}
            />
            <Text style={styles.temp}>{hour.temp}°C</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  nextButton: {
    fontSize: 14,
    color: 'white',
  },
  hourItem: {
    alignItems: 'center',
    marginRight: 24,
  },
  time: {
    fontSize: 14,
    marginBottom: 4,
    color: 'white',
  },
  weatherIcon: {
    marginVertical: 4,
  },
  temp: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  nextButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 14,
    color: 'white',
    marginRight: 4,
  },
});

export default HourlyForecast;