import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SectionList, TouchableOpacity, Linking } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Totalkupon from './Totalkupon';
import Notifikasi from './Notifikasi';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const route = useRoute();
  const { user } = route.params;

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'green',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
          ),
        }}
      >
        {props => <HomeContent {...props} user={user} />}
      </Tab.Screen>
      <Tab.Screen
        name="Kupon Makan"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'pricetag' : 'pricetag-outline'} size={size} color={color} />
          ),
        }}
      >
        {props => <Totalkupon {...props} user={user} />}
      </Tab.Screen>
      <Tab.Screen
        name="Notifikasi"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'notifications' : 'notifications-outline'} size={size} color={color} />
          ),
        }}
      >
        {props => <Notifikasi {...props} user={user} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const HomeContent = ({ user }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentYear = new Date().getFullYear();

  const fetchData = async () => {
    try {
      const response = await fetch(`https://3d14-36-71-167-124.ngrok-free.app/kupon/api/home.php?id=${user.id}`);
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 5000); // Fetch API every 5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [user]);

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


  const handlePay = async (id) => {
    const urlpay = `https://3d14-36-71-167-124.ngrok-free.app/kupon/api/home.php?id=${id.santri_id}`;
    console.log(urlpay);
    Linking.openURL(urlpay);
  };

  const sections = [
    {
      title: 'Data Santri',
      data: [data.data_santri],
      renderItem: ({ item }) => (
        <View style={styles.card}>
          <Text style={styles.cardText}>Nama: {item.nama}</Text>
          <Text style={styles.cardText}>Asrama: {item.asrama}</Text>
          <Text style={styles.cardText}>No HP: {item.no_hp}</Text>
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
          <Text style={styles.tableCell}>
            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.jumlah)}
          </Text>
          <View style={styles.radioButtonContainer}>
            <RadioButton selected={item.status === 'Lunas'} onPress={() => handlePay(item)} />
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
    backgroundColor: '#4CAF50',
  },
  radioButtonNotSelected: {
    backgroundColor: '#FF5722',
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
