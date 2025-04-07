import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

interface CitiesState {
  cities: City[];
  currentCity: string | null;
}

// redux/slices/citiesSlice.ts
const initialState: CitiesState = {
  cities: [
    {
      id: '1',
      name: 'Hanoi',
      country: 'Vietnam',
      currentTemp: '23.1°C',
      maxTemp: '25.3°C',
      minTemp: '20.4°C',
      aqi: 159,
    },
    {
      id: '2',
      name: 'Ho Chi Minh',
      country: 'Vietnam',
      currentTemp: '28.5°C',
      maxTemp: '32.1°C',
      minTemp: '26.7°C',
      aqi: 120,
    },
    {
      id: '3',
      name: 'Tokyo',
      country: 'Japan',
      currentTemp: '18.2°C',
      maxTemp: '22.0°C',
      minTemp: '15.5°C',
      aqi: 45,
    },
    {
      id: '4',
      name: 'Seoul',
      country: 'South Korea',
      currentTemp: '15.8°C',
      maxTemp: '19.3°C',
      minTemp: '12.4°C',
      aqi: 78,
    },
    // {
    //   id: '5',
    //   name: 'Bangkok',
    //   country: 'Thailand',
    //   currentTemp: '30.2°C',
    //   maxTemp: '34.5°C',
    //   minTemp: '27.8°C',
    //   aqi: 135,
    // }
  ],
  currentCity: 'Hanoi',
};

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    addCity: (state, action: PayloadAction<City>) => {
      state.cities.push(action.payload);
    },
    removeCity: (state, action: PayloadAction<string>) => {
      state.cities = state.cities.filter(city => city.id !== action.payload);
    },
    setCurrentCity: (state, action: PayloadAction<string>) => {
      state.currentCity = action.payload;
      // Update isCurrent flag for all cities
      state.cities.forEach(city => {
        city.isCurrent = city.name === action.payload;
      });
    },
  },
});

export const { addCity, removeCity, setCurrentCity } = citiesSlice.actions;
export default citiesSlice.reducer;