import { createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';
import type { WeatherData, WeatherAPIError } from '../types/weather';

export const fetchCurrentWeather = createAsyncThunk<
  WeatherData,
  string,
  { rejectValue: WeatherAPIError }
>(
  'weather/fetchCurrent', 
  async (city: string, { rejectWithValue }) => {
    try {
      const response = await api.get<WeatherData>('/forecast.json', {
        params: {
          q: city,
          days: 7,
          aqi: 'yes'
        },
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue({
          error: {
            code: error.response.status,
            message: error.response.data.error?.message || 'Unknown error'
          },
        });
      }
      return rejectWithValue({
        error: {
          code: 500,
          message: 'Network error'
        },
      });
    }
  }
);