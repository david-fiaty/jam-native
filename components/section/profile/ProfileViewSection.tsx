import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "@/constants/Layout";
import { setFormData } from "@/redux/slices/FormSlice";
import BoxView from "@/components/view/BoxView";
import ProfileProjectsList from "@/components/list/ProfileProjectsList";
import i18n from "@/translation/i18n";
import UserManager from "@/manager/UserManager";
import ProfileJamsList from "@/components/list/ProfileJamsList";
import ProfileHeaderView from "@/components/view/ProfileHeaderView";
import DividerView from "@/components/view/DividerView";
import ModalManager from "@/manager/ModalManager";
import SpinnerView from "@/components/view/SpinnerView";
import SectionManager from "@/manager/SectionManager";
import ProfileViewField from "./ProfileViewField";
import InputTextField from "@/components/field/InputTextField";
import TextView from "@/components/view/TextView";
import ImageView from "@/components/view/ImageView";
import MediaManager from "@/manager/MediaManager";
import IconView from "@/components/view/IconView";

const resource: string = 'profile';
const profileImageSize: number = 100;

const ProfileSection = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [profileId, setProfileId] = useState<number>(0);
  const formData = useSelector((state: any) => state.form?.[resource]);
  const userState = useSelector((state: any) => state.user);

  useEffect(() => {
    (async () => {
      if (!Object.keys(formData)?.length) {
        setProfileId(await UserManager.getProfileId());

        dispatch(setFormData<any>({
          resource: resource,
          key: null,
          //value: userState.profileData, // Todo - Enable this
          value: await UserManager.getProfileData(),
        }));
      }
    })();
  }, [userState, formData, resource]);

  //if (!Object.keys(formData)?.length) return <SpinnerView />;

  return (
    <BoxView
      direction="column"
      align="center"
      justify="center"
      style={styles.container}
      scroll={true}
    >
      <ProfileViewField>
        <TextView style={styles.profileTitle}>
          {UserManager.getProfileDisplayName(formData)}
        </TextView>
      </ProfileViewField>

      <BoxView direction="row" align="flex-start" justify="flex-start" style={styles.profileHeader}>
        <BoxView direction="row" align="center" justify="center" style={styles.profileHeaderLeft}>
          {formData?.profile_picture?.url?.length > 0 && (
            <ImageView
              uri={MediaManager.getImageUrl(formData.profile_picture.url)}
              resizeMode="cover"
              width={profileImageSize}
              height={profileImageSize}
              style={styles.profileImage}
            />
          )}

          {!formData?.profile_picture?.url?.length && (
            <IconView
              name="user"
              theme="secondary"
              size={26}
              padding={28}
            />
          )}
        </BoxView>

        <View style={styles.profileHeaderRight}>
          <ProfileViewField label={i18n.t('Profile ID (Username)')}>
            <TextView>
              {formData?.profile_name}
            </TextView>
          </ProfileViewField>

          <ProfileViewField>
            <TextView>
              {formData?.email || i18n.t('Email unavailable')}
            </TextView>
          </ProfileViewField>
        </View>
      </BoxView>

      <ProfileViewField label={i18n.t('Industries')}>
        <TextView>
          {false || i18n.t('Unavailable')}
        </TextView>
      </ProfileViewField>

      <ProfileViewField label={i18n.t('Sub-industries')}>
        <TextView>
          {false || i18n.t('Unavailable')}
        </TextView>
      </ProfileViewField>


      <DividerView />

      <ProfileProjectsList
        title={i18n.t("Your Projects")}
        addButton={true}
        allButton={formData?.profile_projects?.length > 0}
        idArray={formData?.profile_projects || []}
        onAddButtonPress={() => SectionManager.push(router, 'add-project', { profileId: profileId, profileJams: formData?.profile_jams || [] })}
      />
      <DividerView />

      <ProfileJamsList
        title={i18n.t("Your Jams")}
        allButton={formData?.profile_jams?.length > 0}
        addButton={true}
        idArray={formData?.profile_jams || []}
        onAddButtonPress={() => ModalManager.toggleModal('JamForm', { resource: 'jam' })}
      />
      <DividerView />

      <ProfileJamsList
        title={i18n.t("Saved Jams")}
        allButton={formData?.saved_jams?.length > 0}
        idArray={formData?.saved_jams || []}
        emptyMessage={i18n.t('No data available.')}
      />

    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    paddingBottom: Layout.space.base * 2,
  },
  profileHeader: {
    width: '100%',
    gap: Layout.space.base,
    marginVertical: Layout.space.base / 1.5,
  },
  profileHeaderLeft: {
    width: profileImageSize,
    height: '100%',
    backgroundColor: 'red',
  },
  profileHeaderRight: {
    flex: 1,
    height: '100%',
    gap: Layout.space.base,
  },
  profileImage: {
    width: profileImageSize,
    height: profileImageSize,
    borderRadius: profileImageSize,
  },
  profileTitle: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default ProfileSection;