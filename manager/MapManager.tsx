import { Marker } from "react-native-maps";
import MarkerView from "@/components/view/MarkerView";
import i18n from "@/translation/i18n";

class MapManager {
  renderMarker = (item: any) => {
    if (item?.geolocation_longitude && item?.geolocation_latitude) {
      return (
        <Marker
          key={item.id}
          coordinate={this.getMarkerCoordinate(item)}
        >
          <MarkerView
            iconName="user"
            title={this.getMarkerTitle(item)}
            description={this.getMarkerDescription(item)}
          />
        </Marker>
      );
    }

    return null;
  }
  
  getMarkerCoordinate(item: any) {
    return {
      latitude: parseFloat(item?.geolocation_latitude),
      longitude: parseFloat(item?.geolocation_longitude),
    };
  }

  getMarkerTitle(item: any) {
    return item?.title || i18n.t('No title available');
  };

  getMarkerDescription = (item: any) => {
    return item?.caption || '';
  };
}

export default (new MapManager());