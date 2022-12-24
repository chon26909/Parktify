import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import i from "./assets/favicon.png";

export default function App() {
  const [mapRegion, setmapRegion] = useState({
    latitude: 13.621964154078512,
    longitude: 100.53999614273243,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <View style={styles.container}>
      <MapView
        style={{ width: "100%", height: "100%" }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        region={mapRegion}
      >
        <Marker coordinate={mapRegion} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
