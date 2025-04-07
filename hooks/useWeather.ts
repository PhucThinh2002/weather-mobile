import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store'; // 🟡 Đảm bảo AppDispatch được export từ store
import { fetchCurrentWeather } from '../services/weatherService';
import { clearError } from '../redux/slices/weatherSlice';

export const useWeather = (location: string) => {
  const dispatch = useDispatch<AppDispatch>(); // ✅ ép kiểu dispatch

  const { current, forecast, loading, error } = useSelector(
    (state: RootState) => state.weather
  );

  useEffect(() => {
    if (location) {
      dispatch(fetchCurrentWeather(location)); // ✅ Không còn lỗi TS ở đây
    }
  }, [dispatch, location]);

  const clearWeatherError = () => {
    dispatch(clearError());
  };

  return {
    current,
    forecast,
    loading,
    error,
    clearWeatherError,
  };
};
