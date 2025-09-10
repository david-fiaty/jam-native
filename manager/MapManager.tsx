import { Marker } from "react-native-maps";
import { Layout } from "@/constants/Layout";
import Store from "@/redux/Store";
import i18n from "@/translation/i18n";
import UserManager from "./UserManager";
import JamMarkerView from "@/components/view/marker-view/JamMarkerView";
import ProfileMarkerView from "@/components/view/marker-view/ProfileMarkerView";
import DataManager from "./DataManager";

class MapManager {
  appState: any;

  constructor() {
    this.appState = Store.getState().app;
  }

  renderMarker = (item: any) => {
    if (item?.geolocation_longitude && item?.geolocation_latitude) {
      if (this.isJamMarker(item)) {
        return (
          <Marker
            key={item.id}
            coordinate={this.getMarkerCoordinate(item)}
          >
            <JamMarkerView
              title={this.getMarkerTitle(item)}
              titleColor={this.getMarkerTitleColor(item)}
              description={this.getMarkerDescription(item)}
              backgroundColor={this.getMarkerColor(item)}
            />
          </Marker>
        );
      }
      else if (this.isProfileMarker(item)) {
        return (
          <Marker
            key={item.id}
            coordinate={this.getMarkerCoordinate(item)}
          >
            <ProfileMarkerView
              iconName={this.getMarkerIcon(item)}
              title={this.getMarkerTitle(item)}
              description={this.getMarkerDescription(item)}
              innerColor={this.getMarkerColor(item)}
            />
          </Marker>
        );
      }
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
  }

  getMarkerDescription = (item: any) => {
    return item?.caption || '';
  }

  getMarkerIcon = (item: any) => {
    if (item?.profile_type == 'personal') {
      return 'profile';
    }
    else if (item?.profile_type == 'venue') {
      return 'pin';
    }
    else if (item?.profile_type == 'organization') {
      return 'building';
    }

    return 'question';
  }

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
      if (DataManager.dateStatus(item?.period?.start_datetime, item?.period?.end_datetime) == 'past') {
        return Layout.colors.gray;
      }
      else if (DataManager.dateStatus(item?.period?.start_datetime, item?.period?.end_datetime) == 'live') {
        return Layout.colors.primary;
      }
      else if (DataManager.dateStatus(item?.period?.start_datetime, item?.period?.end_datetime) == 'coming') {
        return Layout.colors.tertiary;
      }
    }
  }

  getMarkerTitleColor(item: any) {
    if (this.isJamMarker(item)) {
      if (DataManager.dateStatus(item?.period?.start_datetime, item?.period?.end_datetime) == 'past') {
        return Layout.colors.white;
      }
      else if (DataManager.dateStatus(item?.period?.start_datetime, item?.period?.end_datetime) == 'live') {
        return Layout.colors.white;
      }
      else if (DataManager.dateStatus(item?.period?.start_datetime, item?.period?.end_datetime) == 'coming') {
        return Layout.colors.primary;
      }
    }

    return Layout.colors.primary;
  }
}

export default (new MapManager());