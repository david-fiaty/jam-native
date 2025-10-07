import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useRouter } from 'expo-router';
import { useSelector, shallowEqual } from "react-redux";
import { Layout } from "@/constants/Layout";
import BoxView from "@/components/view/BoxView";
import i18n from "@/translation/i18n";
import UserManager from "@/manager/UserManager";
import ProfileViewField from "../field/ProfileViewField";
import TextView from "@/components/view/TextView";
import ImageView from "@/components/view/ImageView";
import MediaManager from "@/manager/MediaManager";
import IconView from "@/components/view/IconView";
import CollapsibleView from "@/components/view/CollapsibleView";
import ProfileJamsField from "../field/ProfileJamsField";
import ProfileProjectsField from "../field/ProfileProjectsField";
import SectorsViewField from "../field/SectorsViewField";
import SubSectorsViewField from "../field/SubSectorsViewField";
import CulturalActivitiesViewField from "../field/CulturalActivitiesViewField";
import SpinnerView from "./SpinnerView";
import ModalManager from "@/manager/ModalManager";

const profileImageSize: number = 111;

type Props = {
  profileId?: any;
  itemData?: any;
  isOwner?: boolean;
  isPublic?: boolean;
};

const ProfileView = ({ profileId, itemData, isOwner, isPublic }: Props) => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<any>({});
  const userState = useSelector((state: any) => state.user, shallowEqual);
  const appState = useSelector((state: any) => state.app, shallowEqual);

  const getCountryLabel = (code: any) => {
    return appState.countriesData.find((o: any) => o.code == code)?.name;
  };

  const renderHeader = () => {
    return (
      <>
        <BoxView direction="row" align="center" justify="center" style={styles.profileHeaderLeft}>
          {profileData?.profile_picture?.url?.length > 0 && (
            <ImageView
              uri={MediaManager.getImageUrl(profileData.profile_picture.url)}
              resizeMode="cover"
              width={profileImageSize}
              height={profileImageSize}
              style={styles.profileImage}
            />
          )}

          {!profileData?.profile_picture?.url?.length && (
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
              {profileData?.profile_name}
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
                disabled={!profileData?.instagram_username?.length}
                onPress={() => {
                  if (!!profileData?.instagram_username?.length) {
                    MediaManager.openUrl(profileData.instagram_username);
                  }
                }}
              />

              <IconView
                name="facebook"
                theme="transparent"
                color="black"
                size={19}
                padding={0}
                disabled={!profileData?.facebook_link?.length}
                onPress={() => {
                  if (!!profileData?.facebook_link?.length) {
                    MediaManager.openUrl(profileData.facebook_link);
                  }
                }}
              />

              <IconView
                name="linkedin"
                theme="transparent"
                color="black"
                size={19}
                padding={0}
                disabled={!profileData?.linkedin_link?.length}
                onPress={() => {
                  if (!!profileData?.linkedin_link?.length) {
                    MediaManager.openUrl(profileData.linkedin_link)
                  }
                }}
              />
            </BoxView>
          </ProfileViewField>

          <ProfileViewField>
            <TextView>
              {profileData?.email || i18n.t('Email unavailable')}
            </TextView>
          </ProfileViewField>
        </View>
      </>
    );
  };

  const renderCollapsibleFields = () => {
    if (profileData?.profile_organization) {
      return (
        <BoxView direction="column">
          <ProfileViewField label={i18n.t('Organization name')}>
            <TextView>
              {profileData?.profile_organization?.organization_name}
            </TextView>
          </ProfileViewField>

          <ProfileViewField label={i18n.t('Creation year')}>
            <TextView>
              {profileData?.profile_organization?.creation_year || i18n.t('Unavailable')}
            </TextView>
          </ProfileViewField>

          <ProfileViewField label={i18n.t('Address')}>
            <TextView>
              {profileData?.address || i18n.t('Unavailable')}
            </TextView>
          </ProfileViewField>

          <ProfileViewField
            label={i18n.t('Country')}
            iconRight="location"
            onIconRightPress={() => ModalManager.toggleModal('ProfileLocationMapView', {
              itemData: profileData,
            })}
          >
            <TextView>
              {profileData?.country ? getCountryLabel(profileData.country) : i18n.t('Unavailable')}
            </TextView>
          </ProfileViewField>
        </BoxView>
      );
    }
    else if (profileData?.profile_venue) {
      return (
        <BoxView direction="column">
          <ProfileViewField label={i18n.t('Venue name')}>
            <TextView>
              {profileData?.profile_venue?.venue_name}
            </TextView>
          </ProfileViewField>

          <ProfileViewField label={i18n.t('Venue types')}>
            <TextView>
              Venue types
            </TextView>
          </ProfileViewField>

          <ProfileViewField label={i18n.t('Creation year')}>
            <TextView>
              {profileData?.profile_venue?.creation_year || i18n.t('Unavailable')}
            </TextView>
          </ProfileViewField>

          <ProfileViewField label={i18n.t('Address')}>
            <TextView>
              {profileData?.address || i18n.t('Unavailable')}
            </TextView>
          </ProfileViewField>

          <ProfileViewField
            label={i18n.t('Country')}
            iconRight="location"
            onIconRightPress={() => ModalManager.toggleModal('ProfileLocationMapView', {
              itemData: profileData,
            })}
          >
            <TextView>
              {profileData?.country ? getCountryLabel(profileData.country) : i18n.t('Unavailable')}
            </TextView>
          </ProfileViewField>
        </BoxView>
      );
    }
    else if (profileData?.profile_personal) {
      return (
        <BoxView direction="column">
          <ProfileViewField label={i18n.t('First name')}>
            <TextView>
              {profileData?.profile_personal?.first_name || i18n.t('Unavailable')}
            </TextView>
          </ProfileViewField>

          <ProfileViewField label={i18n.t('Last name')}>
            <TextView>
              {profileData?.profile_personal?.last_name || i18n.t('Unavailable')}
            </TextView>
          </ProfileViewField>

          <ProfileViewField label={i18n.t('Address')}>
            <TextView>
              {profileData?.address || i18n.t('Unavailable')}
            </TextView>
          </ProfileViewField>

          <ProfileViewField
            label={i18n.t('Country')}
            iconRight="location"
            onIconRightPress={() => ModalManager.toggleModal('ProfileLocationMapView', {
              itemData: profileData,
            })}
          >
            <TextView>
              {profileData?.country ? getCountryLabel(profileData.country) : i18n.t('Unavailable')}
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
            {i18n.t("{{ name }}'s projects", { name: UserManager.getProfileDisplayName(profileData) })}
          </TextView>
        </BoxView>

        <ProfileProjectsField
          idArray={profileData?.profile_projects || []}
          emptyMessage={i18n.t('No data available.')}
          isPublic={isPublic}
          addable={!isPublic}
        />
      </>
    );
  };

  const renderProfileJams = () => {
    let groupTitle: string = i18n.t("{{ name }}'s jams", { name: UserManager.getProfileDisplayName(profileData) });

    return (
      <>
        <BoxView direction="row" align="center" justify="space-between" style={styles.groupTitleContainer}>
          <TextView style={styles.groupTitle}>
            {groupTitle}
          </TextView>

          <TouchableOpacity onPress={() => {
            ModalManager.toggleModal(isPublic ? 'PublicJamSection' : 'PrivateJamSection', {
              idArray: profileData?.profile_jams || [],
              title: groupTitle,
            });
          }}>
            <TextView underline={true}>{i18n.t("View all")}</TextView>
          </TouchableOpacity>
        </BoxView>

        <ProfileJamsField
          idArray={profileData?.profile_jams || []}
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
            ModalManager.toggleModal(isPublic ? 'PublicJamSection' : 'PrivateJamSection', {
              idArray: profileData?.saved_jams || [],
              title: groupTitle,
            });
          }}>
            <TextView underline={true}>{i18n.t("View all")}</TextView>
          </TouchableOpacity>
        </BoxView>

        <ProfileJamsField
          idArray={profileData?.saved_jams || []}
          emptyMessage={i18n.t('No data available.')}
          isPublic={isPublic}
        />
      </>
    );
  };

  const getProfileData = async () => {
    if (isPublic) {
      return await UserManager.getProfileData({ profile_id: profileId || null });
    }
    else {
      return { ...userState.profileData };
    }
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setProfileData(itemData || await getProfileData());
        setIsLoaded(true);
      }
    })();

  }, [isLoaded, itemData]);

  return (
    <BoxView
      direction="column"
      align="center"
      justify="center"
      style={styles.container}
      scroll={true}
    >
      {!isLoaded && <SpinnerView />}
      
      {isLoaded && (
        <>
          <ProfileViewField>
            <TextView style={styles.profileTitle}>
              {UserManager.getProfileDisplayName(profileData)}
            </TextView>
          </ProfileViewField>

          <BoxView direction="row" align="flex-start" justify="flex-start" style={styles.profileHeader}>
            {renderHeader()}
          </BoxView>

          <ProfileViewField label={i18n.t('Industries')}>
            <SectorsViewField idArray={profileData?.sectors || []} />
          </ProfileViewField>

          <ProfileViewField label={i18n.t('Sub-industries')}>
            <SubSectorsViewField idArray={profileData?.sectors || []} />
          </ProfileViewField>

          <ProfileViewField label={i18n.t('Description')}>
            <TextView>
              {profileData?.profile_description || i18n.t('Unavailable')}
            </TextView>
          </ProfileViewField>

          <ProfileViewField label={i18n.t('Main activities')}>
            {!!profileData?.profile_organization && <CulturalActivitiesViewField idArray={profileData?.profile_organization?.main_cultural_activities || []} />}
            {!!profileData?.profile_venue && <CulturalActivitiesViewField idArray={profileData?.profile_venue?.main_cultural_activities || []} />}
            {!!profileData?.profile_personal && <CulturalActivitiesViewField idArray={profileData?.profile_personal?.main_cultural_activities || []} />}
          </ProfileViewField>

          <CollapsibleView
            label={(
              <BoxView direction="row" align="center" justify="space-between" style={styles.collapsibleHeaderClosed}>
                <TextView style={styles.collapsibleLabelClosed}>
                  {i18n.t('View more')} ({isOwner ? UserManager.getProfileDisplayName(profileData) : UserManager.getProfileTypeLabel(profileData?.profile_type)})
                </TextView>
                <IconView name="collapsed" theme="transparent" padding={0} />
              </BoxView>
            )}
            openedLabel={
              <BoxView direction="row" align="center" justify="space-between" style={styles.collapsibleHeaderOpened}>
                <TextView style={styles.collapsibleLabelOpened}>
                  {i18n.t('View more')} ({isOwner ? UserManager.getProfileDisplayName(profileData) : UserManager.getProfileTypeLabel(profileData?.profile_type)})
                </TextView>
                <IconView name="expanded" theme="white" padding={0} />
              </BoxView>
            }
            content={renderCollapsibleFields()}
          />

          {renderProfileProjects()}
          {renderProfileJams()}
          {!isPublic && renderSavedJams()}
        </>
      )}
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    paddingBottom: Layout.space.base * 2,
  },
  groupTitleContainer: {
    width: '100%',
    marginTop: Layout.space.base * 1.5,
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