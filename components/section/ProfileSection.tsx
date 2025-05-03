import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Layout } from "@/constants/Layout";
import ProfileForm from "../form/ProfileForm";
import BoxView from "../view/BoxView";
import ProfileProjectsList from "../list/ProfileProjectsList";
import i18n from "@/translation/i18n";
import UserManager from "@/manager/UserManager";

const resource: string = 'profile';

const ProfileSection = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [profileId, setProfileId] = useState<number>(0);
  const formData = useSelector((state: any) => state.form?.[resource]);

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setProfileId(await UserManager.getProfileId());
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, formData]);

  return (
    <BoxView
      direction="column"
      align="center"
      justify="center"
      style={Layout.screenContent}
      scroll={true}
    >

      <ProfileProjectsList
        title={i18n.t("Your Projects")}
        addButton={true}
        allButton={formData?.profile_projects?.length > 0}
        idArray={formData?.profile_projects}
      /*
      onAddButtonPress={() => {
        ScreenManager.toggleModal("AddProjectForm", {
          profileId: profileId,
          profileJams: formData?.profile_jams || [],
        });
      }}
      */
      />

      {formData?.saved_projects?.length > 0 && (
        <ProfileProjectsList
          title={i18n.t("Saved Projects")}
          allButton={formData?.saved_projects?.length > 0}
          idArray={formData?.saved_projects}
        />
      )}

      {formData?.liked_projects?.length > 0 && (
        <ProfileProjectsList
          title={i18n.t("Liked Projects")}
          allButton={formData?.liked_projects?.length > 0}
          idArray={formData?.liked_projects}
        />
      )}
    </BoxView>
  );
};

export default ProfileSection;