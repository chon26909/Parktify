import axios from "axios";

export const getLocations = async () => {
  console.log("get locations");

  const { data } = await axios.get("http://192.168.1.152:4000/location");
  return data;
};
