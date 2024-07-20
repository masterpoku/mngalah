import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { API_BASE_URL } from '@env'; // Importing the environment variable
const LoginScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const url = `${API_BASE_URL}/kupon/api/login.php?password=${password}`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        navigation.replace('HomeScreen', { user: data.data[0] });
      } else {
        alert('Login gagal');
      }
    })
    .catch(error => {
      alert('Terjadi kesalahan');
    });
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Login Kupon Makan</Text>
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="Password" 
          secureTextEntry 
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    textAlign: 'center',
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
