import { Layout } from "@/constants/Layout";
import Store from "@/redux/Store";
import i18n from "@/translation/i18n";
import UserManager from "./UserManager";
import JamMarkerView from "@/components/view/marker-view/JamMarkerView";
import ProfileMarkerView from "@/components/view/marker-view/ProfileMarkerView";
import DataManager from "./DataManager";
import ScreenManager from "./ScreenManager";
import JamCalloutView from "@/components/view/marker-view/JamCalloutView";
import ProfileCalloutView from "@/components/view/marker-view/ProfileCalloutView";
import SearchManager from "./SearchManager";

class MapManager {
  async getMapData(currentPage: number, pageSize: number) {    
    let searchState: any = Store.getState().search;
    
    const [jam, profile, project] = await Promise.all([
      SearchManager.loadResults('jam', currentPage, searchState.currentTab, pageSize),
      SearchManager.loadResults('profile', currentPage, searchState.currentTab, pageSize),
      SearchManager.loadResults('project', currentPage, searchState.currentTab, pageSize),
    ]);

    return {
      jam: jam,
      jammer: profile,
      project: project,
      looking: jam.filter((o: any) => o.type == 'looking'),
      call: jam.filter((o: any) => o.type == 'call'),
      event: jam.filter((o: any) => o.type == 'event'),
      personal: profile.filter((o: any) => o.profile_type == 'personal'),
      organization: profile.filter((o: any) => o.profile_type == 'organization'),
      venue: profile.filter((o: any) => o.profile_type == 'venue'),
    };
  }

  renderMarker = (item: any, zoomLevel?: any) => {
    return (
      <>
        {this.isJamMarker(item) && (
          <JamMarkerView
            title={this.getMarkerTitle(item)}
            titleColor={this.getJamMarkerTitleColor(item)}
            description={this.getMarkerDescription(item)}
            backgroundColor={this.getJamMarkerBackgroundColor(item)}
            zoomLevel={zoomLevel}
          />
        )}

        {this.isProfileMarker(item) && (
          <ProfileMarkerView
            iconName={this.getProfileMarkerIcon(item)}
            title={this.getMarkerTitle(item)}
            description={this.getMarkerDescription(item)}
            innerColor={this.getProfileMarkerInnerColor(item)}
            zoomLevel={zoomLevel}
          />
        )}
      </>
    );
  }

  renderMarkerCallout(item: any) {
    return (
      <>
        {this.isJamMarker(item) && <JamCalloutView item={item} />}

        {this.isProfileMarker(item) && <ProfileCalloutView item={item} />}
      </>
    );
  }

  isProfileMarker(item: any) {
    return ['organization', 'venue', 'personal'].includes(item?.profile_type);
  }

  isJamMarker(item: any) {
    return ['call', 'looking', 'event', 'random'].includes(item?.type);
  }

  getMarkerTitle(item: any) {
    let title: string = '';

    if (this.isProfileMarker(item)) {
      title = UserManager.getProfileDisplayName(item);
      if (!ScreenManager.isWeb()) {
        title = DataManager.truncateText(title, 10);
        title = String(title).charAt(0).toUpperCase() + String(title).slice(1).toLowerCase();
      }
    }
    else if (this.isJamMarker(item)) {
      title = item?.title;
    }

    return title;
  }

  getMarkerDescription = (item: any) => {
    let description: any = '';

    if (this.isProfileMarker(item)) {
      description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore';
    }
    else if (this.isJamMarker(item)) {
      description = item?.caption || '';
    }

    return description;
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
        backgroundColor: Layout.colors.darkGray,
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