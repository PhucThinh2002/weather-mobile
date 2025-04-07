import React, { useState, useEffect } from "react";
import {View,StyleSheet,FlatList,TextInput,TouchableOpacity,ActivityIndicator,Text,} from "react-native";
import SectionHeader from "@/components/SectionHeader";
import CityItem from "@/components/CityItem";
import AddLocationButton from "@/components/AddLocationButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import {removeCity,setCurrentCity,addCity,} from "@/redux/slices/citiesSlice";
import { fetchCurrentWeather } from "@/services/weatherService";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useNavigation } from "expo-router";

interface City {
  id: string;
  name: string;
  country: string;
  currentTemp: string;
  maxTemp: string;
  minTemp: string;
  aqi: number;
  isCurrent?: boolean;
}

export default function ManageLocationsScreen() {

  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const { cities, currentCity } = useSelector(
    (state: RootState) => state.cities
  );
  const dispatch = useDispatch<AppDispatch>();

  // Define handleSetCurrent first to avoid TS2448 error
  const handleSetCurrent = (name: string) => {
    dispatch(setCurrentCity(name));
  };

  const handleAddCity = async () => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      try {
        const resultAction = await dispatch(fetchCurrentWeather(searchQuery));
        if (fetchCurrentWeather.fulfilled.match(resultAction)) {
          const weatherData = resultAction.payload;

          const newCity: City = {
            id: `${Date.now()}`,
            name: weatherData.location.name,
            country: weatherData.location.country,
            currentTemp: `${weatherData.current.temp_c}°C`,
            maxTemp: `${weatherData.forecast.forecastday[0].day.maxtemp_c}°C`,
            minTemp: `${weatherData.forecast.forecastday[0].day.mintemp_c}°C`,
            aqi: weatherData.current.air_quality?.pm2_5 || 0,
            isCurrent: false,
          };

          dispatch(addCity(newCity)); // Make sure addCity accepts City object
          setSearchQuery("");
        }
      } catch (error) {
        console.error("Failed to add city:", error);
      } finally {
        setIsSearching(false);
      }
    }
  };

  const handleRemoveCity = (id: string) => {
    dispatch(removeCity(id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage cities</Text>
        <SectionHeader title=" " />
      </View>

      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.locationButton}>
          <Ionicons name="location" size={24} color="white" />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Search for a city"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#fff"
        />

        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleAddCity}
          disabled={isSearching}
        >
          {isSearching ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Ionicons name="search" size={20} color="white" />
          )}
        </TouchableOpacity>
      </View>

      <FlatList
        data={cities}
        keyExtractor={(item: City) => item.id}
        renderItem={({ item }: { item: City }) => (
          <CityItem
            city={item}
            onRemove={handleRemoveCity}
            onSetCurrent={handleSetCurrent}
          />
        )}
        ListFooterComponent={<AddLocationButton onPress={() => {}} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#63b3ed",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  locationButton: {
    marginRight: 8,
    padding: 8,
  },
  input: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 8,
    padding: 12,
    color: "white",
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: "#4299e1",
    borderRadius: 8,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(241, 237, 237, 0.1)',
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
