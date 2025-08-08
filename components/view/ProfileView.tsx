import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "@/constants/Layout";
import { setFormData } from "@/redux/slices/FormSlice";
import BoxView from "@/components/view/BoxView";
import i18n from "@/translation/i18n";
import UserManager from "@/manager/UserManager";
import SectionManager from "@/manager/SectionManager";
import ProfileViewField from "../field/ProfileViewField";
import TextView from "@/components/view/TextView";
import ImageView from "@/components/view/ImageView";
import MediaManager from "@/manager/MediaManager";
import IconView from "@/components/view/IconView";
import CollapsibleView from "@/components/view/CollapsibleView";
import ProfileJamsField from "../field/ProfileJamsField";
import ProfileProjectsField from "../field/ProfileProjectsField";

const resource: string = 'profile';
const profileImageSize: number = 111;

type Props = {
  profileId?: any;
  profileData?: any;
  isOwner?: boolean;
  isPublic?: boolean;
};

const ProfileView = ({ profileId, profileData, isOwner, isPublic }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [sectorsData, setSectorsData] = useState<any[]>([]);
  const [profileItem, setProfileItem] = useState<any>({});
  const appState = useSelector((state: any) => state.app);
  const formData = useSelector((state: any) => state.form?.[resource]);

  const renderHeader = () => {
    return (
      <>
        <BoxView direction="row" align="center" justify="center" style={styles.profileHeaderLeft}>
          {profileItem?.profile_picture?.url?.length > 0 && (
            <ImageView
              uri={MediaManager.getImageUrl(profileItem.profile_picture.url)}
              resizeMode="cover"
              width={profileImageSize}
              height={profileImageSize}
              style={styles.profileImage}
            />
          )}

          {!profileItem?.profile_picture?.url?.length && (
            <IconView
              name="user"
              theme="secondary"
              size={26}
              padding={28}
            />
          )}
        </BoxView>

        <View style={styles.profileHeaderRight}>
          <ProfileViewField>
            <TextView>
              {profileItem?.profile_name}
            </TextView>
          </ProfileViewField>

          <ProfileViewField>
            <BoxView direction="row" align="center" justify="flex-start">
              <IconView
                name="instagram"
                theme="transparent"
                size={19}
                padding={0}
                color="black"
                disabled={!profileItem?.instagram_username?.length}
                onPress={() => {
                  if (!!profileItem?.instagram_username?.length) {
                    MediaManager.openUrl(profileItem.instagram_username);
                  }
                }}
              />

              <IconView
                name="facebook"
                theme="transparent"
                color="black"
                size={19}
                padding={0}
                disabled={!profileItem?.facebook_link?.length}
                onPress={() => {
                  if (!!profileItem?.facebook_link?.length) {
                    MediaManager.openUrl(profileItem.facebook_link);
                  }
                }}
              />

              <IconView
                name="linkedin"
                theme="transparent"
                color="black"
                size={19}
                padding={0}
                disabled={!profileItem?.linkedin_link?.length}
                onPress={() => {
                  if (!!profileItem?.linkedin_link?.length) {
                    MediaManager.openUrl(profileItem.linkedin_link)
                  }
                }}
              />
            </BoxView>
          </ProfileViewField>

          <ProfileViewField>
            <TextView>
              {profileItem?.email || i18n.t('Email unavailable')}
            </TextView>
          </ProfileViewField>
        </View>
      </>
    );
  };

  const renderSectors = () => {
    if (!profileItem?.sectors?.length) {
      return <TextView>{i18n.t('Unavailable')}</TextView>
    }

    let profileSectors: any[] = sectorsData.filter((o: any) => profileItem.sectors.includes(o.id));

    return (
      <TextView>
        {profileSectors.map((sector: any, i: number) => {
          return (
            <TextView key={sector.id}>
              {sector.name}
              {(i < profileSectors.length - 1) && (<TextView>, </TextView>)}
            </TextView>
          );
        })}
      </TextView>
    );
  };

  const renderSubSectors = () => {
    if (!profileItem?.sectors?.length) {
      return <TextView>{i18n.t('Unavailable')}</TextView>
    }

    let profileSectors: any[] = sectorsData.filter((o: any) => profileItem.sectors.includes(o.id));

    return (
      <TextView>
        {profileSectors.map((sector: any, i: number) => {
          let profileSubSectors: any[] = sector.sub_sectors.filter((o: any) => profileItem.sectors.includes(o.id));

          return profileSubSectors.map((subSector: any, i: number) => {
            return (
              <TextView key={subSector.id}>
                {subSector.name}
                {(i < profileSubSectors.length - 1) && (<TextView>, </TextView>)}
              </TextView>
            );
          })
        })}
      </TextView>
    );
  };

  const renderCollapsibleFields = () => {
    if (profileItem?.profile_organization) {
      return (
        <BoxView direction="column">
          <ProfileViewField label={i18n.t('Organization name')}>
            <TextView>
              {profileItem?.profile_organization?.organization_name}
            </TextView>
          </ProfileViewField>

          <ProfileViewField label={i18n.t('Creation year')}>
            <TextView>
              {profileItem?.profile_organization?.creation_year || i18n.t('Unavailable')}
            </TextView>
          </ProfileViewField>

          <ProfileViewField label={i18n.t('Address')}>
            <TextView>
              {profileItem?.address || i18n.t('Unavailable')}
            </TextView>
          </ProfileViewField>
        </BoxView>
      );
    }
    else if (profileItem?.profile_venue) {
      return (
        <BoxView direction="column">
          <ProfileViewField label={i18n.t('Venue name')}>
            <TextView>
              {profileItem?.profile_venue?.venue_name}
            </TextView>
          </ProfileViewField>

          <ProfileViewField label={i18n.t('Venue types')}>
            <TextView>
              Venue types
            </TextView>
          </ProfileViewField>

          <ProfileViewField label={i18n.t('Creation year')}>
            <TextView>
              {profileItem?.profile_venue?.creation_year || i18n.t('Unavailable')}
            </TextView>
          </ProfileViewField>

          <ProfileViewField label={i18n.t('Address')}>
            <TextView>
              {profileItem?.address || i18n.t('Unavailable')}
            </TextView>
          </ProfileViewField>
        </BoxView>
      );
    }
    else if (profileItem?.profile_personal) {
      return (
        <BoxView direction="column">
          <ProfileViewField label={i18n.t('First name')}>
            <TextView>
              {profileItem?.profile_personal?.first_name || i18n.t('Unavailable')}
            </TextView>
          </ProfileViewField>

          <ProfileViewField label={i18n.t('Last name')}>
            <TextView>
              {profileItem?.profile_personal?.last_name || i18n.t('Unavailable')}
            </TextView>
          </ProfileViewField>

          <ProfileViewField label={i18n.t('Address')}>
            <TextView>
              {profileItem?.address || i18n.t('Unavailable')}
            </TextView>
          </ProfileViewField>
        </BoxView>
      );
    }
  };

  const renderProfileProjects = () => {
    return (
      <>
        <BoxView direction="row" align="center" justify="space-between" style={styles.groupTitleContainer}>
          <TextView style={styles.groupTitle}>
            {i18n.t("{{ name }}' s projects", { name: UserManager.getProfileDisplayName(profileItem) })}
          </TextView>
        </BoxView>

        <ProfileProjectsField
          idArray={profileItem?.profile_projects || []}
          emptyMessage={i18n.t('No data available.')}
          isPublic={isPublic}
          addable={true}
        />
      </>
    );
  };

  const renderProfileJams = () => {
    let groupTitle: string = i18n.t("{{ name }}' s jams", { name: UserManager.getProfileDisplayName(profileItem) });

    return (
      <>
        <BoxView direction="row" align="center" justify="space-between" style={styles.groupTitleContainer}>
          <TextView style={styles.groupTitle}>
            {groupTitle}
          </TextView>

          <TouchableOpacity onPress={() => {
            SectionManager.push(router, 'profile-jams', {
              jamId: JSON.stringify(profileItem?.profile_jams || []),
              title: groupTitle,
              disableInfiniteScroll: true,
            });
          }}>
            <TextView underline={true}>{i18n.t("View all")}</TextView>
          </TouchableOpacity>
        </BoxView>

        <ProfileJamsField
          idArray={profileItem?.profile_jams || []}
          emptyMessage={i18n.t('No data available.')}
          addable={true}
          isPublic={isPublic}
        />
      </>
    );
  };

  const renderSavedJams = () => {
    let groupTitle: string = i18n.t('Saved jams');

    return (
      <>
        <BoxView direction="row" align="center" justify="space-between" style={styles.groupTitleContainer}>
          <TextView style={styles.groupTitle}>
            {groupTitle}
          </TextView>

          <TouchableOpacity onPress={() => {
            SectionManager.push(router, 'profile-jams', {
              jamId: JSON.stringify(profileItem?.saved_jams || []),
              title: groupTitle,
              disableInfiniteScroll: true,
            });
          }}>
            <TextView underline={true}>{i18n.t("View all")}</TextView>
          </TouchableOpacity>
        </BoxView>

        <ProfileJamsField
          idArray={profileItem?.saved_jams || []}
          emptyMessage={i18n.t('No data available.')}
          isPublic={isPublic}
        />
      </>
    );
  };

  useEffect(() => {
    setProfileItem(profileData);
    setSectorsData(appState.sectorsData);
  }, [profileData, appState]);

  return (
    <BoxView
      direction="column"
      align="flex-start"
      justify="center"
      style={styles.container}
      scroll={true}
    >
      <ProfileViewField>
        <TextView style={styles.profileTitle}>
          {UserManager.getProfileDisplayName(profileItem)}
        </TextView>
      </ProfileViewField>

      <BoxView direction="row" align="flex-start" justify="flex-start" style={styles.profileHeader}>
        {renderHeader()}
      </BoxView>

      <ProfileViewField label={i18n.t('Industries')}>
        {renderSectors()}
      </ProfileViewField>

      <ProfileViewField label={i18n.t('Sub-industries')}>
        {renderSubSectors()}
      </ProfileViewField>

      <ProfileViewField label={i18n.t('Description')}>
        <TextView>
          {profileItem?.profile_description || i18n.t('Unavailable')}
        </TextView>
      </ProfileViewField>

      <ProfileViewField label={i18n.t('Main activities')}>
        <TextView>
          Activities list
        </TextView>
      </ProfileViewField>

      <CollapsibleView
        label={(
          <BoxView direction="row" align="center" justify="space-between" style={styles.collapsibleHeaderClosed}>
            <TextView style={styles.collapsibleLabelClosed}>
              {i18n.t('View more')} ({isOwner ? UserManager.getProfileDisplayName(profileItem) : UserManager.getProfileTypeLabel(profileItem?.profile_type)})
            </TextView>
            <IconView name="collapsed" theme="transparent" padding={0} />
          </BoxView>
        )}
        openedLabel={
          <BoxView direction="row" align="center" justify="space-between" style={styles.collapsibleHeaderOpened}>
            <TextView style={styles.collapsibleLabelOpened}>
              {i18n.t('View more')} ({isOwner ? UserManager.getProfileDisplayName(profileItem) : UserManager.getProfileTypeLabel(profileItem?.profile_type)})
            </TextView>
            <IconView name="expanded" theme="white" padding={0} />
          </BoxView>
        }
        content={renderCollapsibleFields()}
      />

      {renderProfileProjects()}
      {renderProfileJams()}
      {!isPublic && renderSavedJams()}
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    paddingBottom: Layout.space.base * 2,
  },
  groupTitleContainer: {
    width: '100%',
  },
  groupTitle: {
    fontWeight: 'bold',
  },
  profileHeader: {
    width: '100%',
    gap: Layout.space.base,
  },
  profileHeaderLeft: {
    width: profileImageSize,
    height: profileImageSize,
    borderColor: Layout.colors.secondary,
    borderWidth: Layout.borderWidth.base,
    borderRadius: Layout.radius.round,
    padding: 0,
  },
  profileHeaderRight: {
    flex: 1,
    height: '100%',
    gap: Layout.space.base,
    padding: 0,
  },
  profileImage: {
    width: profileImageSize,
    height: profileImageSize,
    borderRadius: Layout.radius.round,
  },
  profileTitle: {
    fontWeight: 'bold',
    fontSize: 13.5,
  },
  collapsibleHeaderClosed: {
    backgroundColor: Layout.colors.secondary,
    borderColor: Layout.colors.secondary,
    borderWidth: Layout.borderWidth.base,
    borderRadius: Layout.radius.round,
    padding: Layout.space.base / 1.5,
  },
  collapsibleHeaderOpened: {
    backgroundColor: Layout.colors.primary,
    borderColor: Layout.colors.primary,
    borderWidth: Layout.borderWidth.base,
    borderRadius: Layout.radius.round,
    padding: Layout.space.base / 1.5,
  },
  collapsibleLabelClosed: {
    color: Layout.colors.primary,
  },
  collapsibleLabelOpened: {
    color: Layout.colors.white,
  },
});

export default ProfileView;