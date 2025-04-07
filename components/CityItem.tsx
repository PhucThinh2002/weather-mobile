import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CityItemProps {
  city: {
    id: string;
    name: string;
    country?: string;
    currentTemp?: string;
    maxTemp?: string;
    minTemp?: string;
    aqi?: number;
    isCurrent?: boolean;
  };
  onRemove: (id: string) => void;
  onSetCurrent: (name: string) => void;
}

const CityItem: React.FC<CityItemProps> = ({ city, onRemove, onSetCurrent }) => {
  const getAqiQuality = (aqi?: number) => {
    if (!aqi) return 'N/A';
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive';
    if (aqi <= 200) return 'Unhealthy';
    return 'Very Unhealthy';
  };

  return (
    <TouchableOpacity 
      style={[styles.container, city.isCurrent && styles.currentCityContainer]}
      onPress={() => onSetCurrent(city.name)}
    >
      <View style={styles.cityDetails}>
        <Text style={styles.cityName}>
          {city.name}{city.country && `, ${city.country}`}
        </Text>
        <Text style={styles.weatherText}>
          AQI {city.aqi || 'N/A'} • {city.minTemp || '--'}/{city.maxTemp || '--'}
        </Text>
      </View>

      <View style={styles.tempContainer}>
        <Text style={styles.temperature}>{city.currentTemp || '--°C'}</Text>
        <TouchableOpacity 
          onPress={() => onRemove(city.id)}
          style={styles.deleteButton}
        >
          <Ionicons name="trash-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  currentCityContainer: {
    backgroundColor: 'rgba(66, 153, 225, 0.3)',
    borderLeftWidth: 3,
    borderLeftColor: '#4299e1',
  },
  cityDetails: {
    flex: 1,
  },
  cityName: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
    marginBottom: 4,
  },
  weatherText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  tempContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  temperature: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginRight: 16,
    minWidth: 60,
    textAlign: 'right',
  },
  deleteButton: {
    padding: 8,
  },
});

export default CityItem;