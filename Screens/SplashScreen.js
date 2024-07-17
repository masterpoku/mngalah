import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const SplashScreen = ({ navigation }) => {

  const handleLogin = () => {
    navigation.navigate('LoginScreen');
  };

  const handlePetugasLogin = () => {
    navigation.navigate('PetugasScreen');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')} // Ganti dengan path logo atau gambar splash screen
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.text}>Aplikasi Kupon Makan</Text>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login Walisantri</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handlePetugasLogin}>
        <Text style={styles.buttonText}>Login Petugas</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#28E00F', // Ubah warna background sesuai preferensi
  },
  logo: {
    width: 200, // Sesuaikan ukuran logo sesuai kebutuhan
    height: 200, // Sesuaikan ukuran logo sesuai kebutuhan
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    // color: '#fff', // Ubah warna teks sesuai preferensi
  },
  loginButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SplashScreen;

