import { useEffect, useRef, useState } from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import PinIcon from "../assets/pin.png";
import * as Location from "expo-location";
import { ScreenHeight, ScreenWidth } from "../components/shared";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { colors } from "../components/colors";
import { useNavigation } from "@react-navigation/native";
import { initialRegion } from "../static/map";
import { MainStackParamList } from "../App";

type CreateStackParams = {
  SelectLocation: undefined;
  DetailLocation: undefined;
};

const CreateLocationStack = createNativeStackNavigator<CreateStackParams>();

const SelectLocation = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<CreateStackParams>>();

  const refMap = useRef<MapView>(null);

  const [margin, setMargin] = useState(1);
  const [mapRegion, setMapRegion] = useState(initialRegion);

  const onChangeValue = (region: any) => {
    setTimeout(() => {
      // alert(JSON.stringify(region));
      setMapRegion(region);
    }, 2000);
  };

  const handleSelectLocation = () => {
    console.log("select location");
    navigation.navigate("DetailLocation");
  };

  useEffect(() => {
    const handleUserLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
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

    handleUserLocation();
    setTimeout(() => setMargin(0), 1000);
  }, []);

  return (
    <View style={{ flex: 1, marginTop: 25, padding: 20 }}>
      <MapView
        style={{ flex: 1, marginBottom: margin }}
        initialRegion={mapRegion}
        onRegionChangeComplete={onChangeValue}
        ref={refMap}
        showsMyLocationButton
        showsUserLocation
      ></MapView>
      <View
        style={{
          // backgroundColor: "#000000",
          // width: ScreenWidth,
          // height: ScreenHeight,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          top: "50%",
          left: "50%",
          marginLeft: 5,
          marginTop: -55,
          position: "absolute",
        }}
      >
        <Image style={{ height: 40, width: 30 }} source={PinIcon} />
      </View>
      <View style={styles.bottomPanal}>
        <TouchableOpacity
          style={styles.btnSelect}
          onPress={handleSelectLocation}
        >
          <Text style={styles.text}>เลือกตำแหน่ง</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const DetailLocation = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  return (
    <View>
      <Text>Detail</Text>
      <TouchableOpacity
        style={{ backgroundColor: colors.primary, padding: 10 }}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={{ textAlign: "center" }}>
          Success and go to home screen
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const CreateLocationScreenStack = () => {
  return (
    <CreateLocationStack.Navigator>
      <CreateLocationStack.Screen
        name="SelectLocation"
        component={SelectLocation}
      />
      <CreateLocationStack.Screen
        name="DetailLocation"
        component={DetailLocation}
      />
    </CreateLocationStack.Navigator>
  );
};

export default CreateLocationScreenStack;

const styles = StyleSheet.create({
  bottomPanal: {
    width: "100%",
    paddingVertical: 10,
  },
  btnSelect: {
    backgroundColor: colors.primary,
    padding: 15,
  },
  text: {
    color: "white",
    textAlign: "center",
  },
});
