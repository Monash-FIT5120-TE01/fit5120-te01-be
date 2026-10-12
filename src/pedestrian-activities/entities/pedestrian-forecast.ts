export interface Weather {
  temperature_2m: number;
  precipitation: number;
  wind_speed_10m: number;
}

export type ActivityLevel = 'quiet' | 'moderate' | 'busy';

export interface HourlyForecast {
  time: string;
  movements_per_hour: number;
  activity: ActivityLevel;
  weather: Weather;
}

export interface ActivityThresholds {
  quiet_max: number;
  busy_min: number;
}

export interface Sensor {
  id: number;
  name: string;
  lat: number;
  lon: number;
  status: string;
  type: string;
  note: string;
  latest: string;
}

export interface AvailableSensorForecast {
  status: 'available';
  sensor: Sensor;
  model: string;
  selected_model: string;
  neural_model_used: boolean;
  seasonal_fallback: boolean;
  fallback_reason: string;
  source_age_hours: number;
  trained_at: string;
  timezone: string;
  last_observed_at: string;
  forecast_origin: string;
  weather_source: string;
  weather_fetched_at: string;
  weather_available_hours: number;
  trained_horizon_hours: number;
  forecast_hours: number;
  activity_thresholds: ActivityThresholds;
  events_used_in_model: boolean;
  warnings: string[];
  hourly: HourlyForecast[];
}

export interface UnavailableSensorForecast {
  status: 'unavailable';
  sensor: Sensor;
  code: string;
  reason: string;
  hourly: HourlyForecast[];
}

export type SensorForecast =
  AvailableSensorForecast | UnavailableSensorForecast;

export interface ForecastResponse {
  schema_version: number;
  generated_at: string;
  timezone: string;
  selected_sensors: number;
  available_sensors: number;
  unavailable_sensors: number;
  forecasts: SensorForecast[];
}
