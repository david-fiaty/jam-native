import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import { Config } from "@/constants/Config";
import { useDispatch } from 'react-redux';
import { setFormData } from "@/redux/slices/FormSlice";

const containerStyle = { width: "100%", height: "100%" };
const center = { lat: 37.7749, lng: -122.4194 };

type Props = {
  resource: string,
  latitude?: any;
  longitude?: any;
};

const LocationMapView = ({ resource, latitude, longitude }: Props) => {
  const dispatch = useDispatch();
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  const onMapPress = async (event: any) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedLocation({ lat, lng });

    dispatch(setFormData<any>({ 
      resource: resource,
      key: latitude.field, 
      value: lat, 
    }));

    dispatch(setFormData<any>({ 
      resource: resource,
      key: longitude.field, 
      value: lng, 
    }));
  };

  return (
    <LoadScript googleMapsApiKey={Config.mapApiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onClick={(e: any) => onMapPress(e)}
      >
        {selectedLocation && (
          <Marker position={selectedLocation} />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default LocationMapView;
