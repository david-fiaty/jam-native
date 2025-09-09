import { Marker } from "react-native-maps";
import { Layout } from "@/constants/Layout";
import Store from "@/redux/Store";
import i18n from "@/translation/i18n";
import UserManager from "./UserManager";
import JamMarkerView from "@/components/view/marker-view/JamMarkerView";
import ProfileMarkerView from "@/components/view/marker-view/ProfileMarkerView";

class MapManager {
  appState: any;

  constructor() {
    this.appState = Store.getState().app;
  }

  renderMarker = (item: any) => {
    if (item?.geolocation_longitude && item?.geolocation_latitude) {
      return (
        <Marker
          key={item.id}
          coordinate={this.getMarkerCoordinate(item)}
        >
          {this.isJamMarker(item) && (
            <JamMarkerView
              iconName={this.getMarkerIcon(item)}
              title={this.getMarkerTitle(item)}
              description={this.getMarkerDescription(item)}
              backgroundColor={this.getMarkerColor(item)}
            />
          )}

          {this.isProfileMarker(item) && (
            <ProfileMarkerView
              iconName={this.getMarkerIcon(item)}
              title={this.getMarkerTitle(item)}
              description={this.getMarkerDescription(item)}
              innerColor={this.getMarkerColor(item)}
            />
          )}
        </Marker>
      );
    }

    return null;
  }

  isProfileMarker(item: any) {
    return ['organization', 'venue', 'personal'].includes(item?.profile_type);
  }

  isJamMarker(item: any) {
    return ['call', 'looking', 'event', 'random'].includes(item?.type);
  }

  getMarkerCoordinate(item: any) {
    return {
      latitude: parseFloat(item?.geolocation_latitude),
      longitude: parseFloat(item?.geolocation_longitude),
    };
  }

  getMarkerTitle(item: any) {
    let title: string = i18n.t('No title available');

    if (this.isProfileMarker(item)) {
      title = UserManager.getProfileDisplayName(item);
    }
    else if (this.isJamMarker(item)) {
      title = item?.title;
    }

    return title;
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
    if (this.isProfileMarker(item)) {
      let sectorsData: any[] = this.appState.sectorsData;
      let sectorIds: any[] = sectorsData.map((o: any) => o.id);
      let itemSectors: any[] = item?.sectors || [];
      let intersection: any[] = sectorIds.filter((id: number) => itemSectors.includes(id));
      let firstSectorId: any = intersection?.[0];

      if (firstSectorId) {
        return (sectorsData.find((o: any) => o.id == firstSectorId))?.color;
      }

      return Layout.colors.primary;
    }
    else if (this.isJamMarker(item)) {
      return 'orange';
    }
  };
}

export default (new MapManager());