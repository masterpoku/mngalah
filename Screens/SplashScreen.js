import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('LoginScreen'); // Pindah ke halaman login setelah beberapa detik
    }, 2000); // Durasi tampilan splash screen, contoh: 2000 milidetik
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')} // Ganti dengan path logo atau gambar splash screen
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.text}>Kupon Makan</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#28E00F', // Ubah warna background sesuai preferensi
  },
  logo: {
    width: 200, // Sesuaikan ukuran logo sesuai kebutuhan
    height: 200, // Sesuaikan ukuran logo sesuai kebutuhan
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // Ubah warna teks sesuai preferensi
  },
});

export default SplashScreen;
