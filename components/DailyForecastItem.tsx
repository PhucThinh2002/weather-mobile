import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DailyForecastItemProps {
  day: string;
  temp: number;
  chanceOfRain: number;
  condition?: string;
}

const DailyForecastItem: React.FC<DailyForecastItemProps> = ({
  day,
  temp,
  chanceOfRain,
  condition,
}) => {
  const getWeatherIcon = () => {
    if (!condition) return 'partly-sunny';
    const cond = condition.toLowerCase();
    if (cond.includes('rain')) return 'rainy';
    if (cond.includes('cloud')) return 'cloudy';
    if (cond.includes('sun') || cond.includes('clear')) return 'sunny';
    if (cond.includes('snow')) return 'snow';
    return 'partly-sunny';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.day}>{day}</Text>
      <Ionicons 
        name={getWeatherIcon()} 
        size={24} 
        color="white" 
        style={styles.weatherIcon}
      />
      <Text style={styles.temp}>{temp}°C</Text>
      <Text style={styles.chanceOfRain}>{chanceOfRain}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.2)',
        backgroundColor: 'transparent', // Thêm dòng này
      },
  day: {
    fontSize: 16,
    color: 'white',
    width: 100,
  },
  weatherIcon: {
    width: 40,
    textAlign: 'center',
  },
  temp: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    width: 50,
    textAlign: 'right',
  },
  chanceOfRain: {
    fontSize: 14,
    color: 'white',
    width: 40,
    textAlign: 'right',
  },
});

export default DailyForecastItem;