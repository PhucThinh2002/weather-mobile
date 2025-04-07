import React, { useEffect } from "react";
import {View,StyleSheet,ScrollView,TouchableOpacity,Text,} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import WeatherCard from "@/components/WeatherCard";
import HourlyForecast from "@/components/HourlyForecast";
import SectionHeader from "@/components/SectionHeader";
import DailyForecastItem from "@/components/DailyForecastItem";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchCurrentWeather } from "@/services/weatherService";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useNavigation } from "@react-navigation/native";

export default function WeatherScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { currentCity } = useSelector((state: RootState) => state.cities);
  const { current, forecast } = useSelector(
    (state: RootState) => state.weather
  );

  useEffect(() => {
    // Set default to Hanoi if no current city
    const cityToFetch = currentCity || "Hanoi";
    dispatch(fetchCurrentWeather(cityToFetch));
  }, [currentCity, dispatch]);

  if (!current || !forecast) {
    return <View style={styles.container} />;
  }

  // Chuẩn bị dữ liệu hourly forecast
  const hourlyData = forecast.forecastday[0].hour.map((hour) => ({
    time: hour.time.split(" ")[1],
    temp: hour.temp_c,
    condition: hour.condition.text,
  }));

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate("settings")} // Hoặc router.push('/(tabs)/manage-locations')
      >
        <Ionicons name="ellipsis-vertical" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/(tabs)/manage-locations")}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
      <WeatherCard
        currentTemp={current.temp_c}
        feelsLike={current.feelslike_c}
        humidity={current.humidity}
        windSpeed={current.wind_kph}
        condition={current.condition.text}
        city={currentCity}
        country={current.location?.country || "Viet Nam"}
        aqi={current.air_quality.us_epa_index}
      />
      
      
      {/* <HourlyForecast hours={hourlyData} /> */}
      <HourlyForecast hours={hourlyData.slice(0, 12)} />

      <View style={styles.detailContainer}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Ionicons name="water-outline" size={24} color="white" />
            <Text style={styles.detailText}>Humidity</Text>
            <Text style={styles.detailValue}>{current.humidity}%</Text>
          </View>

          <View style={styles.detailItem}>
            <Ionicons name="speedometer-outline" size={24} color="white" />
            <Text style={styles.detailText}>Wind</Text>
            <Text style={styles.detailValue}>{current.wind_kph} km/h</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Ionicons name="eye-outline" size={24} color="white" />
            <Text style={styles.detailText}>Visibility</Text>
            <Text style={styles.detailValue}>{current.vis_km} km</Text>
          </View>

          <View style={styles.detailItem}>
            <Ionicons name="thermometer-outline" size={24} color="white" />
            <Text style={styles.detailText}>Pressure</Text>
            <Text style={styles.detailValue}>{current.pressure_mb} hPa</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Ionicons name="sunny-outline" size={24} color="white" />
            <Text style={styles.detailText}>UV Index</Text>
            <Text style={styles.detailValue}>{current.uv}</Text>
          </View>

          <View style={styles.detailItem}>
            <Ionicons name="cloud-outline" size={24} color="white" />
            <Text style={styles.detailText}>Cloud Cover</Text>
            <Text style={styles.detailValue}>{current.cloud}%</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#63b3ed",
  },
  addButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    padding: 8,
  },
  settingsButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    padding: 8,
    zIndex: 1,
  },
  detailContainer: {
    margin: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  detailItem: {
    width: "48%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  detailText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    marginVertical: 4,
  },
  detailValue: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
