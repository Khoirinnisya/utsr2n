import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const API_URL = "https://fakestoreapi.com/products";

const App = () => {
  const [produk, setProduk] = useState([]);
  const [keranjang, setKeranjang] = useState([]);
  const [memuat, setMemuat] = useState(false);

  // Fungsi mengambil daftar produk dari API
  const ambilProduk = async () => {
    setMemuat(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setProduk(data);
    } catch (error) {
      console.error("Gagal mengambil produk:", error);
    } finally {
      setMemuat(false);
    }
  };

  useEffect(() => {
    ambilProduk();
  }, []);

  // Fungsi menambahkan produk ke keranjang
  const tambahKeKeranjang = (item) => {
    setKeranjang([...keranjang, item]);
  };

  // Menampilkan produk
  const tampilkanProduk = ({ item }) => (
    <View style={gaya.kartu}>
      <Image source={{ uri: item.image }} style={gaya.gambar} />
      <Text style={gaya.namaProduk}>{item.title}</Text>
      <Text style={gaya.harga}>Rp {item.price.toFixed(2)}</Text>
      <Button
        title="Tambah ke Keranjang"
        onPress={() => tambahKeKeranjang(item)}
      />
    </View>
  );

  return (
    <SafeAreaView style={gaya.layar}>
      <Text style={gaya.judul}>Toko Online</Text>

      {/* Daftar Produk */}
      <FlatList
        data={produk}
        keyExtractor={(item) => item.id.toString()}
        renderItem={tampilkanProduk}
        contentContainerStyle={gaya.daftarProduk}
      />

      {/* Keranjang Belanja */}
      <View style={gaya.keranjang}>
        <Text style={gaya.judulKeranjang}>
          Keranjang Belanja ({keranjang.length})
        </Text>
        <ScrollView>
          {keranjang.map((item, index) => (
            <View key={index} style={gaya.itemKeranjang}>
              <Text style={{ flex: 1 }}>{item.title}</Text>
              <Text>Rp {item.price.toFixed(2)}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const gaya = StyleSheet.create({
  layar: { flex: 1, backgroundColor: "#f8f8f8" },
  judul: {
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  daftarProduk: { paddingHorizontal: 10 },
  kartu: {
    backgroundColor: "white",
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    elevation: 3,
  },
  gambar: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    marginBottom: 10,
  },
  namaProduk: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  harga: { fontSize: 14, color: "green", marginBottom: 10 },
  keranjang: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  judulKeranjang: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  itemKeranjang: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
});

export default App;
