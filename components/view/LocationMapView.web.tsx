import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { Config } from "@/constants/Config";

const containerStyle = { width: "100%", height: "400px" };
const center = { lat: 37.7749, lng: -122.4194 };

const LocationMapView = () => {
  return (
    <LoadScript googleMapsApiKey={Config.mapApiKey}>
      <GoogleMap 
        mapContainerStyle={containerStyle} 
        center={center} 
        zoom={10} 
      />
    </LoadScript>
  );
};

export default LocationMapView;
