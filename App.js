// App.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image
} from 'react-native';

const API_KEY = '3c699e66d13a667c7c1250f26ac6dfea';

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city) {
      setError('Enter city name');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
      const data = await res.json();
      if (res.ok) {
        setWeather({
          name: data.name,
          temp: data.main.temp,
          description: data.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        });
      } else {
        setError('City not found');
      }
    } catch {
      setError('Error fetching weather');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Weather</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city"
        value={city}
        onChangeText={setCity}
      />
      <TouchableOpacity style={styles.button} onPress={fetchWeather}>
        <Text style={styles.buttonText}>Get Weather</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.error}>{error}</Text>}
      {weather && (
        <View style={styles.weatherContainer}>
          <Text style={styles.city}>{weather.name}</Text>
          <Text style={styles.temp}>{weather.temp}°C</Text>
          <Text style={styles.description}>{weather.description}</Text>
          <Image source={{ uri: weather.icon }} style={styles.icon} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  header: {
    fontSize: 24,
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    width: '80%'
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    marginBottom: 20
  },
  buttonText: {
    color: 'white'
  },
  weatherContainer: {
    alignItems: 'center'
  },
  city: {
    fontSize: 20
  },
  temp: {
    fontSize: 40
  },
  description: {
    fontSize: 16
  },
  icon: {
    width: 100,
    height: 100
  },
  error: {
    color: 'red'
  }
});
