import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "@/constants/Layout";
import { setFormData } from "@/redux/slices/FormSlice";
import BoxView from "../view/BoxView";
import ProfileProjectsList from "../list/ProfileProjectsList";
import i18n from "@/translation/i18n";
import UserManager from "@/manager/UserManager";
import ProfileJamsList from "../list/ProfileJamsList";
import ProfileHeaderView from "../view/ProfileHeaderView";
import DividerView from "../view/DividerView";
import ModalManager from "@/manager/ModalManager";
import SpinnerView from "../view/SpinnerView";
import SectionManager from "@/manager/SectionManager";

const resource: string = 'profile';

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
          value: await UserManager.getProfileData(),
        }));
      }
    })();
  }, [formData, resource]);

  if (!Object.keys(formData)?.length) return <SpinnerView />;

  return (
    <BoxView
      direction="column"
      align="center"
      justify="center"
      style={styles.container}
      scroll={true}
    >
      <ProfileHeaderView profileItem={formData} />
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
});

export default ProfileSection;