// app/(tabs)/weekly-forecast.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DailyForecastItem from '@/components/DailyForecastItem';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const DAY_NAMES = ['Yesterday', 'Today', 'Tomorrow', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export default function WeeklyForecastScreen() {
  const navigation = useNavigation();
  const { forecast } = useSelector((state: RootState) => state.weather);

  if (!forecast) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>7 day forecast</Text>
      </View>
      
      {forecast.forecastday.map((day, index) => (
        <DailyForecastItem 
          key={day.date}
          day={DAY_NAMES[index] || new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}
          temp={day.day.avgtemp_c}
          chanceOfRain={day.day.daily_chance_of_rain}
          condition={day.day.condition.text}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#63b3ed',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
  },
});