import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
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
import TextView from "../view/TextView";

const resource: string = 'profile';

const ProfileSection = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [profileId, setProfileId] = useState<number>(0);
  const formData = useSelector((state: any) => state.form?.[resource]);

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setProfileId(await UserManager.getProfileId());

        dispatch(setFormData<any>({
          resource: resource,
          key: null,
          value: await UserManager.getProfileData(),
        }));

        setIsLoaded(true);
      }
    })();
  }, [isLoaded]);

  if (!isLoaded) return <SpinnerView />;

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
        allButton={(formData?.profile_jams?.map((o: any) => o.id))?.length > 0} // Todo - API should send ids, not full objects
        //allButton={formData?.profile_jams?.length > 0}
        addButton={true}
        //idArray={formData?.profile_jams}
        idArray={formData?.profile_jams?.map((o: any) => o.id)} // Todo - API should send ids, not full objects
        onAddButtonPress={() => ModalManager.toggleModal('JamForm', { resource: 'jam' })}

        // Todo - API should send ids, not full objects
        onListItemPress={(row: any) => SectionManager.push(router, 'jam-item', { jamId: JSON.stringify(formData?.profile_jams?.map((o: any) => o.id)), title: row?.item?.title })}
      />
      <DividerView />

      <ProfileProjectsList
        title={i18n.t("Saved Projects")}
        allButton={formData?.saved_projects?.length > 0}
        emptyMessage={i18n.t('You have no saved projects.')}
        idArray={formData?.saved_projects || []}
      />
      <DividerView />

      <ProfileProjectsList
        title={i18n.t("Liked Projects")}
        allButton={formData?.liked_projects?.length > 0}
        emptyMessage={i18n.t('You have no liked proects.')}
        idArray={formData?.liked_projects || []}
      />
      <DividerView />

      <ProfileJamsList
        title={i18n.t("Saved Jams")}
        allButton={formData?.saved_jams?.length > 0}
        idArray={formData?.saved_jams || []}
        emptyMessage={i18n.t('You have no saved Jams.')}
      />
      <DividerView />

      <ProfileJamsList
        title={i18n.t("Liked Jams")}
        allButton={formData?.liked_jams?.length > 0}
        idArray={formData?.liked_jams || []}
        emptyMessage={i18n.t('You have no liked Jams.')}
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