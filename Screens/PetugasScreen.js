import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { API_BASE_URL } from '@env'; // Importing the environment variable
const PetugasScreen = () => {
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/login.php?password=${password}&table=petugas`);
      const data = await response.json();
      if (data.status === 'success') {
        setIsLoggedIn(true);
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      } else {
        alert('Password salah');
      }
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan');
    }
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setScannedData(data);
    try {
      const response = await fetch(`${API_BASE_URL}/kupon/api/ambil.php?id=${data}`);
      const json = await response.json();
      if (json.status === 'success') {
        alert(`Vocher Berhasil Diambil`);
      } else {
        alert('Barcode tidak valid');
      }
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan');
    }
  };

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Login Petugas</Text>
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
  }

  if (hasPermission === null) {
    return <Text>Meminta izin untuk menggunakan kamera</Text>;
  }
  if (hasPermission === false) {
    return <Text>Tidak ada akses ke kamera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <TouchableOpacity style={styles.scanButton} onPress={() => setScanned(false)}>
          <Text style={styles.buttonText}>Tap untuk scan lagi</Text>
        </TouchableOpacity>
      )}
      {scannedData && <Text style={styles.scannedText}>Data yang discan: {scannedData}</Text>}
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
  scanButton: {
    position: 'absolute',
    bottom: 20,
    width: '90%',
    height: 50,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  scannedText: {
    position: 'absolute',
    bottom: 80,
    fontSize: 16,
    color: '#333',
  },
});

export default PetugasScreen;
