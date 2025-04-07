interface WeatherAPIError {
    error: {
      code: number;
      message: string;
    };
  }
  
  interface WeatherData {
    location: {
      name: string;
      country: string;
      lat: number;
      lon: number;
      localtime: string;
    };
    current: {
      temp_c: number;
      feelslike_c: number;
      condition: {
        text: string;
        icon: string;
        code: number;
      };
      wind_kph: number;
      humidity: number;
      cloud: number;
      uv: number;
      vis_km?: number; // Thêm dấu ? để biến thành optional
      pressure_mb?: number; // Thêm dấu ? để biến thành optional
      air_quality?: {
        pm2_5?: number;
        pm10?: number;
        us_epa_index?: number;
      };
      location?: {
        country: string;
      }
    };
    forecast: {
      forecastday: Array<{
        date: string;
        day: {
          maxtemp_c: number;
          mintemp_c: number;
          avgtemp_c: number;
          maxwind_kph: number;
          totalprecip_mm: number;
          avgvis_km: number;
          avghumidity: number;
          daily_chance_of_rain: number;
          condition: {
            text: string;
            icon: string;
          };
          air_quality?: {
            pm2_5?: number;
            pm10?: number;
            us_epa_index?: number;
          };
        };
        hour: Array<{
          time: string;
          temp_c: number;
          condition: {
            text: string;
            icon: string;
          };
          chance_of_rain: number;
        }>;
      }>;
    };
  }
  
  interface WeatherState {
    current: WeatherData['current'] | null;
    forecast: WeatherData['forecast'] | null;
    locations: string[];
    loading: boolean;
    error: string | null;
  }
  
  interface CityItemProps {
    city: {
      id: string;
      name: string;
      country: string;
      currentTemp: string;
      maxTemp: string;
      minTemp: string;
      aqi?: number; // Thêm dấu ? để biến aqi thành optional
    };
    onRemove: (id: string) => void;
    onSetCurrent: (name: string) => void;
  }

  interface SectionHeaderProps {
    title: string;
  }

  export type {
    WeatherAPIError,
    WeatherData,
    WeatherState,
    CityItemProps,
    SectionHeaderProps
  };