import { createSlice } from '@reduxjs/toolkit';
import type { WeatherData, WeatherAPIError, WeatherState } from '../../types/weather';
import { fetchCurrentWeather } from '@/services/weatherService';

// redux/slices/weatherSlice.ts
const initialState: WeatherState = {
  current: null,
  forecast: null,
  locations: ['Hanoi'],
  loading: false,
  error: null
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    addLocation: (state, action: { payload: string }) => {
      if (!state.locations.includes(action.payload)) {
        state.locations.push(action.payload);
      }
    },
    removeLocation: (state, action: { payload: string }) => {
      state.locations = state.locations.filter(loc => loc !== action.payload);
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.current;
        state.forecast = action.payload.forecast;
      })
      .addCase(fetchCurrentWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error.message || 'Failed to fetch weather data';
      });
  }  
});

export const { addLocation, removeLocation, clearError } = weatherSlice.actions;
export default weatherSlice.reducer;