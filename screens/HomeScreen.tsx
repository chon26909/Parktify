import {
  View,
  TextInput,
  TouchableHighlight,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { colors } from "../components/colors";
import MapView, { Marker, PROVIDER_GOOGLE, MapMarker } from "react-native-maps";
import * as Location from "expo-location";
import { initialRegion, mockData } from "../static/map";
import { ScreenWidth } from "../components/shared";
import MyLocationIcon from "../icons/MyLocationIcon";
import ParkIcon from "../icons/ParkIcon";
import BottomSheet from "@gorhom/bottom-sheet";
import Bottom from "../components/Bottom";
import { getLocations } from "../services/location";

import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "../context/AuthContext";
import { RootStackList } from "../App";

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackList>>();

  const { isLoggedIn, setLoggedIn } = useContext(AuthContext);

  const refMap = useRef<MapView>(null);

  const [mapRegion, setMapRegion] = useState(initialRegion);

  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("token");
      console.log("\ntoken in HomeScreen => ", token);
    };

    fetchData();
  }, []);

  useEffect(() => {
    handleUserLocation();
  }, []);

  // const onChangeValue = (region: any) => {
  //   setTimeout(() => {
  //     // alert(JSON.stringify(region));
  //     setMapRegion(region);
  //   }, 2000);
  // };

  const handleUserLocation = async () => {
    await Location.requestForegroundPermissionsAsync();
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

  const RenderLocation = () => {
    return (
      <>
        {markers.map((item: any, index) => {
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
              onPress={handleViewLocation}
              title={item.title}
            >
              <View>
                <ParkIcon />
              </View>
            </Marker>
          );
        })}
      </>
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

  const GotoMyLocation = () => {
    return (
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
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        key={"map"}
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        initialRegion={mapRegion}
        ref={refMap}
        showsMyLocationButton={false}
        showsUserLocation
      >
        <RenderLocation />
      </MapView>

      <InputSesrch />
      <GotoMyLocation />

      <TouchableOpacity
        style={{
          backgroundColor: colors.primary,
          padding: 10,
        }}
        onPress={() =>
          navigation.navigate("MainStack", {
            screen: "CreatePin",
            params: { screen: "DetailLocation" },
          })
        }
      >
        <Text style={{ textAlign: "center" }}>go to detail create pin</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: colors.accent,
          padding: 10,
        }}
        onPress={() => setLoggedIn(false)}
      >
        <Text style={{ textAlign: "center" }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
