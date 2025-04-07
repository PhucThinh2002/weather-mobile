import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface WeatherCardProps {
  currentTemp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  city: string;
  country: string;
  aqi?: number;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  currentTemp,
  feelsLike,
  humidity,
  windSpeed,
  condition,
  city,
  country,
  aqi,
}) => {
  const getWeatherIcon = () => {
    if (!condition) return 'partly-sunny';
    const cond = condition.toLowerCase();
    if (cond.includes('rain')) return 'rainy';
    if (cond.includes('cloud')) return 'cloudy';
    if (cond.includes('sun') || cond.includes('clear')) return 'sunny';
    if (cond.includes('snow')) return 'snow';
    if (cond.includes('thunder') || cond.includes('storm')) return 'thunderstorm';
    if (cond.includes('fog') || cond.includes('mist')) return 'cloudy';
    return 'partly-sunny';
  };

  const getAqiQuality = (aqi?: number) => {
    if (!aqi) return 'N/A';
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  return (
    <View style={styles.container}>
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>{city}, {country}</Text>
        {aqi && (
          <Text style={styles.aqiText}>Air Quality: {getAqiQuality(aqi)} ({aqi})</Text>
        )}
      </View>
      
      <View style={styles.weatherContainer}>
        <Text style={styles.temperatureText}>{Math.round(currentTemp)}°</Text>
        <Ionicons 
          name={getWeatherIcon()} 
          size={48} 
          color="white" 
          style={styles.weatherIcon}
        />
      </View>

      <Text style={styles.conditionText}>{condition}</Text>

      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Ionicons name="thermometer" size={20} color="white" />
          <Text style={styles.detailText}>Feels like {Math.round(feelsLike)}°</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="water" size={20} color="white" />
          <Text style={styles.detailText}>{humidity}%</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="speedometer" size={20} color="white" />
          <Text style={styles.detailText}>{windSpeed} km/h</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  locationContainer: {
    marginBottom: 8,
    alignItems: 'center',
  },
  locationText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  aqiText: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
  },
  weatherContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  temperatureText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 16,
  },
  weatherIcon: {
    marginLeft: 8,
  },
  conditionText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 12,
    textTransform: 'capitalize',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  detailItem: {
    alignItems: 'center',
  },
  detailText: {
    color: 'white',
    marginTop: 4,
    fontSize: 14,
  },
});

export default WeatherCard;