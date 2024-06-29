import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SectionList, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Totalkupon from './Totalkupon';
import Notifikasi from './Notifikasi';

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
  const handleLogout = () => {
    navigation.replace('LoginScreen'); // Kembali ke halaman login setelah logout
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'green', // Warna header hijau
        },
        headerTintColor: '#fff', // Warna teks header putih
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeContent}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Kupon Makan"
        component={Totalkupon}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'pricetag' : 'pricetag-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifikasi"
        component={Notifikasi}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'notifications' : 'notifications-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const HomeContent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    fetch('https://e262-180-253-164-209.ngrok-free.app/kupon/api/home.php') // Ganti URL ini dengan endpoint API yang sesuai
      .then((response) => response.json())
      .then((data) => {
        setData(data);
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

  const handlePay = (id) => {
    // Fungsi untuk menangani pembayaran tagihan
    console.log(`Bayar tagihan dengan id: ${id}`);
    // Tambahkan logika pembayaran di sini
  };

  const sections = [
    {
      title: 'Data Santri',
      data: [data.data_santri],
      renderItem: ({ item }) => (
        <View style={styles.card}>
          <Text style={styles.cardText}>Nama: {item.nama}</Text>
          <Text style={styles.cardText}>Asrama: {item.asrama}</Text>
          <Text style={styles.cardText}>Alamat: {item.alamat}</Text>
          <Text style={styles.cardText}>Wali Santri: {item.wali_santri}</Text>
        </View>
      ),
    },
    {
      title: `Daftar Tagihan ${currentYear}`,
      data: data.daftar_tagihan,
      renderItem: ({ item }) => (
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>{item.bulan}</Text>
          <Text style={styles.tableCell}>Rp{item.jumlah.toLocaleString()}</Text>
          <View style={styles.radioButtonContainer}>
            <RadioButton selected={item.status === 'lunas'} onPress={() => handlePay(item.id)} />
          </View>
        </View>
      ),
      header: (
        <View style={styles.tableRow}>
          <Text style={[styles.tableHeader, styles.tableCell]}>Bulan</Text>
          <Text style={[styles.tableHeader, styles.tableCell]}>Jumlah</Text>
          <Text style={[styles.tableHeader, styles.tableCell]}>Status</Text>
        </View>
      ),
    },
  ];

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item, index) => item + index}
      renderSectionHeader={({ section: { title, header } }) => (
        <View>
          <Text style={styles.sectionTitle}>{title}</Text>
          {header}
        </View>
      )}
      contentContainerStyle={styles.container}
    />
  );
};

const RadioButton = ({ selected, onPress }) => (
  <TouchableOpacity
    style={[styles.radioButton, selected ? styles.radioButtonSelected : styles.radioButtonNotSelected]}
    onPress={onPress}
    disabled={selected}
  >
    <Text style={styles.buttonText}>{selected ? 'Lunas' : 'Bayar'}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  radioButton: {
    borderRadius: 20,
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    backgroundColor: '#4CAF50', // Ubah warna saat tombol terpilih
  },
  radioButtonNotSelected: {
    backgroundColor: '#FF5722', // Ubah warna saat tombol tidak terpilih
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 6,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
    alignItems: 'center',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
  tableHeader: {
    backgroundColor: '#f1f1f1',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  radioButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
