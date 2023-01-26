import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "../components/colors";
import { BottomTabParamList } from "./type";

//icon
import HomeIcon from "../icons/HomeIcon";

//screen
import HomeScreen from "../screens/HomeScreen";
import CreatePinStack from "./CreatePinStack";
import ProfileStack from "./ProfileStack";

const BottomTabStack = () => {
  const MainStack = createBottomTabNavigator<BottomTabParamList>();

  return (
    <MainStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,
        tabBarStyle: {
          height: 65,
          paddingBottom: 5,
        },
      }}
    >
      <MainStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <HomeIcon color={color} size={30} focused={focused} />
          ),
          tabBarLabel: "หน้าแรก",
          tabBarLabelStyle: {
            fontSize: 15,
          },
        }}
      />
      <MainStack.Screen name="CreatePin" component={CreatePinStack} />
      <MainStack.Screen name="Profile" component={ProfileStack} />
    </MainStack.Navigator>
  );
};

export default BottomTabStack;
