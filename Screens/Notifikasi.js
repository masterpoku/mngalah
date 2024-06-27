import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons dari Expo

const Notifikasi = () => {
  const [notifikasi, setNotifikasi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://ca2b-36-71-169-213.ngrok-free.app/kupon/api/notif.php') // Ganti URL ini dengan URL endpoint yang sesuai
      .then((response) => response.json())
      .then((data) => {
        setNotifikasi(data.notifikasi_pembayaran);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Ionicons name="notifications" size={24} color="#333" style={styles.icon} />
      <Text style={styles.itemText}>
        Terakhir pembayaran untuk kupon {item.jenis_kupon} tanggal {item.tanggal_pembayaran}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifikasi}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  flatListContainer: {
    flexGrow: 1,
    paddingBottom: 16,
    paddingTop: 16,
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignSelf: 'stretch',
    flexDirection: 'row', // Agar ikon dan teks berdampingan
    alignItems: 'center', // Tengahkan ikon vertikal dengan teks
  },
  itemText: {
    fontSize: 16,
    marginLeft: 10, // Jarak antara ikon dan teks
  },
  icon: {
    marginRight: 10, // Jarak antara teks dan ikon
  },
});

export default Notifikasi;
