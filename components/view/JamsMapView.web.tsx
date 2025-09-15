import React, { useState } from "react";
import { GoogleMap, useJsApiLoader, OverlayView, InfoWindow, OverlayViewF } from "@react-google-maps/api";
import { Config } from "@/constants/Config";
import SpinnerView from "./SpinnerView";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 37.7749,
  lng: -122.4194,
};

const places = [
  { id: 1, name: "Marker One", position: { lat: 37.7749, lng: -122.4194 } },
  { id: 2, name: "Marker Two", position: { lat: 37.7849, lng: -122.4094 } },
];

export default function JamsMapView() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: Config.mapApiKey,
  });

  const [selectedPlace, setSelectedPlace] = useState<any>(null);

  if (!isLoaded) return <SpinnerView />;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
      {places.map((place) => (
        <React.Fragment key={place.id}>
          <OverlayViewF
            position={place.position}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div
              onClick={() => setSelectedPlace(place)}
              style={{
                background: "white",
                border: "2px solid #333",
                borderRadius: "50%",
                width: "24px",
                height: "24px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              📍
            </div>
          </OverlayViewF>

          {/* Callout / InfoWindow */}
          {selectedPlace?.id === place.id && (
            <InfoWindow
              position={place.position}
              onCloseClick={() => setSelectedPlace(null)}
            >
              <div>
                <h4>{place.name}</h4>
                <p>Custom info here</p>
              </div>
            </InfoWindow>
          )}
        </React.Fragment>
      ))}
    </GoogleMap>
  );
}
