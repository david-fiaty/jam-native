import { Marker as NativeMarker } from "react-native-maps";
import { Marker as WebMarker } from "@react-google-maps/api";
import { Layout } from "@/constants/Layout";
import Store from "@/redux/Store";
import i18n from "@/translation/i18n";
import UserManager from "./UserManager";
import JamMarkerView from "@/components/view/marker-view/JamMarkerView";
import ProfileMarkerView from "@/components/view/marker-view/ProfileMarkerView";
import DataManager from "./DataManager";
import ScreenManager from "./ScreenManager";

class MapManager {
  renderMarker = (item: any) => {
    if (item?.geolocation_longitude && item?.geolocation_latitude) {
      return (
        <NativeMarker
          key={item.id}
          coordinate={this.getMarkerCoordinate(item)}
        >
          {this.isJamMarker(item) && (
            <JamMarkerView
              title={this.getMarkerTitle(item)}
              titleColor={this.getJamMarkerTitleColor(item)}
              description={this.getMarkerDescription(item)}
              backgroundColor={this.getJamMarkerBackgroundColor(item)}
            />
          )}

          {this.isProfileMarker(item) && (
            <ProfileMarkerView
              iconName={this.getProfileMarkerIcon(item)}
              title={this.getMarkerTitle(item)}
              description={this.getMarkerDescription(item)}
              innerColor={this.getProfileMarkerInnerColor(item)}
            />
          )}
        </NativeMarker>
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
    let latitude: number = parseFloat(item?.geolocation_latitude);
    let longitude: number = parseFloat(item?.geolocation_longitude);

    if (ScreenManager.isWeb()) {
      return {
        latitude,
        longitude,
      };
    }
    else {
      return {
        latitude: latitude,
        longitude: longitude,
      };
    }
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

  getProfileMarkerInnerColor(item: any) {
    let sectorsData: any[] = Store.getState().app.sectorsData;
    let sectorIds: any[] = sectorsData.map((o: any) => o.id);
    let itemSectors: any[] = item?.sectors || [];
    let intersection: any[] = sectorIds.filter((id: number) => itemSectors.includes(id));
    let firstSectorId: any = intersection?.[0];

    if (firstSectorId) {
      return (sectorsData.find((o: any) => o.id == firstSectorId))?.color;
    }

    return Layout.colors.primary;
  }

  getJamMarkerTitleColor(item: any) {
    let dateStatus: string = DataManager.dateStatus(item?.period?.start_datetime, item?.period?.end_datetime);
    let titleColor: any = this.getJamMarkersConfig().find((o: any) => o.key == dateStatus)?.titleColor;

    return titleColor;
  }

  getJamMarkerBackgroundColor(item: any) {
    let dateStatus: string = DataManager.dateStatus(item?.period?.start_datetime, item?.period?.end_datetime);
    let backgroundColor: any = this.getJamMarkersConfig().find((o: any) => o.key == dateStatus)?.backgroundColor;

    return backgroundColor;
  }

  getProfileMarkerIcon = (item: any) => {
    return this.getProfileMarkersConfig().find((o: any) => o.key == item?.profile_type)?.icon;
  }

  getJamMarkersConfig() {
    return [
      {
        key: 'past',
        label: i18n.t('Past'),
        titleColor: Layout.colors.white,
        backgroundColor: Layout.colors.gray,
      },
      {
        key: 'live',
        label: i18n.t('Live'),
        titleColor: Layout.colors.white,
        backgroundColor: Layout.colors.primary,
      },
      {
        key: 'coming',
        label: i18n.t('Coming'),
        titleColor: Layout.colors.primary,
        backgroundColor: Layout.colors.tertiary,
      },
    ]
  }

  getProfileMarkersConfig() {
    return [
      {
        key: 'personal',
        label: i18n.t('Artist'),
        icon: 'profile',
      },
      {
        key: 'venue',
        label: i18n.t('Venue'),
        icon: 'pin',
      },
      {
        key: 'organization',
        label: i18n.t('Organization'),
        icon: 'building',
      },
    ];
  }
}

export default (new MapManager());