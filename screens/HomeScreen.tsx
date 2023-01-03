import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableHighlight,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { colors } from "../components/colors";
import { RootStackParamList } from "../App";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { initialRegion, mockData } from "../static/map";
import { ScreenWidth } from "../components/shared";
import MyLocationIcon from "../icons/MyLocationIcon";
import ParkIcon from "../icons/ParkIcon";

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const refMap = useRef<MapView>(null);

  const [mapRegion, setMapRegion] = useState(initialRegion);

  const onChangeValue = (region: any) => {
    setTimeout(() => {
      // alert(JSON.stringify(region));
      setMapRegion(region);
    }, 2000);
  };

  const handleUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log("permissions status: ", status);
    let location = await Location.getCurrentPositionAsync({});

    console.log(location.coords);

    refMap.current?.animateToRegion({
      ...mapRegion,
      latitude: Number(location.coords.latitude),
      longitude: Number(location.coords.longitude),
    });

    setMapRegion({
      ...mapRegion,
      latitude: Number(location.coords.latitude),
      longitude: Number(location.coords.longitude),
    });
  };

  const handleViewLocation = (e: any) => {
    console.log("onPress ", e);
  };

  useEffect(() => {
    handleUserLocation();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        initialRegion={mapRegion}
        ref={refMap}
        showsMyLocationButton={false}
        showsUserLocation
      >
        {mockData.map((item, index) => {
          return (
            <Marker key={index} coordinate={item} onPress={handleViewLocation}>
              <ParkIcon />
            </Marker>
          );
        })}
      </MapView>

      <InputSesrch />

      <View style={{ position: "absolute", top: 110, right: 15 }}>
        <TouchableHighlight
          style={{
            backgroundColor: colors.graylight,
            padding: 10,
            borderWidth: 1,
            borderRadius: 15,
            borderColor: colors.gray,
          }}
          onPress={handleUserLocation}
        >
          <MyLocationIcon color={colors.graydark} size={25} />
        </TouchableHighlight>
      </View>
    </View>
  );
};

const InputSesrch = () => {
  return (
    <View
      style={{
        position: "absolute",
        top: 30,
        left: 0,
        width: ScreenWidth,
        padding: 15,
      }}
    >
      <TextInput
        placeholder="ค้นหาสถานที่"
        style={{
          padding: 12,
          borderWidth: 1,
          borderRadius: 15,
          borderColor: colors.gray,
          backgroundColor: colors.graylight,
          fontSize: 16,
        }}
        cursorColor={colors.graydark}
      />
    </View>
  );
};

export default HomeScreen;
