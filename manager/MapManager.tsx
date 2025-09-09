import { Marker } from "react-native-maps";
import { Layout } from "@/constants/Layout";
import Store from "@/redux/Store";
import MarkerView from "@/components/view/MarkerView";
import i18n from "@/translation/i18n";
import UserManager from "./UserManager";

class MapManager {
  renderMarker = (item: any) => {
    if (item?.geolocation_longitude && item?.geolocation_latitude) {
      return (
        <Marker
          key={item.id}
          coordinate={this.getMarkerCoordinate(item)}
        >
          <MarkerView
            iconName={this.getMarkerIcon(item)}
            title={this.getMarkerTitle(item)}
            description={this.getMarkerDescription(item)}
            innerColor={this.getMarkerColor(item)}
          />
        </Marker>
      );
    }

    return null;
  }

  isProfileMarker(item: any) {
    return ['organization', 'venue', 'personal'].includes(item?.profile_type);
  }

  getMarkerCoordinate(item: any) {
    return {
      latitude: parseFloat(item?.geolocation_latitude),
      longitude: parseFloat(item?.geolocation_longitude),
    };
  }

  getMarkerTitle(item: any) {
    if (this.isProfileMarker(item)) {
      return UserManager.getProfileDisplayName(item);
    }

    return item?.title || i18n.t('No title available');
  };

  getMarkerDescription = (item: any) => {
    return item?.caption || '';
  };

  getMarkerIcon = (item: any) => {
    if (item?.profile_type == 'personal') {
      return 'user';
    }
    else if (item?.profile_type == 'venue') {
      return 'pin';
    }
    else if (item?.profile_type == 'organization') {
      return 'building';
    }

    return 'question';
  };

  getMarkerColor(item: any) {
    let appState: any = Store.getState().app;
    let sectorsData: any[] = appState.sectorsData;
    let sectorIds: any[] = sectorsData.map((o: any) => o.id);
    let itemSectors: any[] = item?.sectors || [];
    let intersection: any[] = sectorIds.filter((id: number) => itemSectors.includes(id));
    let firstSectorId: any = intersection?.[0];

    if (firstSectorId) {
      return (sectorsData.find((o: any) => o.id == firstSectorId))?.color;
    }

    return Layout.colors.primary;
  };
}

export default (new MapManager());