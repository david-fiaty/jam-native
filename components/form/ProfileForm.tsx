import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Layout } from "@/constants/Layout";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import BackButton from "../button/BackButton";
import LocationPickerField from "../field/LocationPickerField";
import SectorsField from "../field/SectorsField";
import DividerView from "../view/DividerView";
import TextView from "../view/TextView";
import InputTextField from "../field/InputTextField";
import CountryField from "../field/CountryField";
import ProfileTypeField from "../field/ProfileTypeField";
import ProfileJamsList from "../list/ProfileJamsList";
import ProfileProjectsList from "../list/ProfileProjectsList";
import SpinnerView from "../view/SpinnerView";
import InputTextareaField from "../field/InputTextareaField";
import UserManager from "@/manager/UserManager";
import ScreenManager from "@/manager/ScreenManager";
import ProfileImageField from "../field/ProfileImageField";

const ProfileForm = () => {
  const [userData, setUserData] = useState<any>(null);
  const [profileData, setProfileData] = useState<any>(null);

  const updateField = (key: string, value: any) => {
    let data = { ...profileData, ...{ [key]: value } };
    setProfileData(data);
  };

  UserManager.getUserData().then((data: any) => {
     setUserData(data);
  });

  UserManager.getProfileData().then((data: any) => {
    if (!profileData) setProfileData(data);
  });

  if (!userData || !profileData) return <SpinnerView />;

  return (
    <BoxView
      align="flex-start"
      justify="flex-start"
      scroll={true}
      style={Layout.screenContent}
    >
      <BackButton
        title={i18n.t("Your profile")}
        onPress={() => ScreenManager.toggleModal("ProfileForm")}
      />

      <View style={Layout.formContainer}>
        <ProfileImageField 
          value={profileData?.profile_picture?.url}
          onChangeValue={(mediaList: any) => updateField("profile_picture", {url: mediaList[0]?.uri})}
        />
        <DividerView theme="secondary" />

        <InputTextField
          placeholder={i18n.t("Email address")}
          value={profileData?.email}
          onChangeText={(value: string) => updateField("email", value)}
        />

        <InputTextField
          placeholder={i18n.t("Profile name")}
          value={profileData?.profile_name}
          onChangeText={(value: string) => updateField("profile_name", value)}
        />

        <ProfileTypeField
          value={profileData?.profile_type}
          onChangeValue={(option: any) =>
            updateField("profile_type", option.value)
          }
        />

        <InputTextareaField
          placeholder={i18n.t("Description")}
          value={profileData?.profile_description}
          onChangeText={(value: string) => updateField("profile_description", value)}
        />

        <LocationPickerField
          latitude={profileData?.geolocation_latitude}
          longitude={profileData?.geolocation_longitude}
        />

        <InputTextField
          placeholder={i18n.t("Address")}
          value={profileData?.address}
          onChangeText={(value: string) => updateField("address", value)}
        />

        <InputTextField
          placeholder={i18n.t("City")}
          value={profileData?.town_or_locality}
          onChangeText={(value: string) => updateField("city", value)}
        />

        <InputTextField
          placeholder={i18n.t("Region")}
          value={profileData?.region}
          onChangeText={(value: string) => updateField("region", value)}
        />

        <CountryField value={profileData?.country} />

        <DividerView theme="secondary" />
        <SectorsField
          label={<TextView>{i18n.t("Industries")}</TextView>}
          onPressEvent={() => ScreenManager.toggleModal("SectorsList")}
        />

        <DividerView theme="secondary" />

        <InputTextField
          placeholder={i18n.t("Phone number")}
          value={profileData?.phone_number}
          onChangeText={(value: string) => updateField("phone_number", value)}
        />

        <InputTextField
          placeholder={i18n.t("Whatsapp number")}
          value={profileData?.whatsapp_number}
          onChangeText={(value: string) => updateField("whatsapp_number", value)}
        />

        <InputTextField
          placeholder={i18n.t("Website link")}
          value={profileData?.website_link}
          onChangeText={(value: string) => updateField("website_link", value)}
        />

        <InputTextField
          placeholder={i18n.t("Instagram ID")}
          value={profileData?.instagram_id}
          onChangeText={(value: string) => updateField("instagram_id", value)}
        />

        <InputTextField
          placeholder={i18n.t("Facebook ID")}
          value={profileData?.linkedin_id}
          onChangeText={(value: string) => updateField("linkedin_id", value)}
        />

        <DividerView theme="secondary" />

        <ProfileProjectsList
          title={i18n.t("Your Projects")} 
          addButton={true}
          //idArray={profileData?.saved_projects}
          idArray={[14, 16, 17]}
        />

        <DividerView />
        <ProfileProjectsList
          title={i18n.t("Saved Projects")} 
          //idArray={profileData?.saved_projects}
          allButton={true}
          idArray={[14, 16, 17]}
        />

        <DividerView />
        <ProfileProjectsList
          title={i18n.t("Liked Projects")} 
          //idArray={profileData?.liked_projects}
          allButton={true}
          idArray={[14, 16, 17]}
        />

        <DividerView />
        <ProfileJamsList 
          title={i18n.t("Your Jams")} 
          allButton={true}
          addButton={true}
          idArray={profileData?.saved_jams} 
        />

        <DividerView />
        <ProfileJamsList 
          title={i18n.t("Saved Jams")} 
          allButton={true}
          idArray={profileData?.saved_jams} 
        />

        <DividerView />
        <ProfileJamsList 
          title={i18n.t("Liked Jams")} 
          allButton={true}
          idArray={profileData?.liked_jams} 
        />

        <DividerView />
      </View>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  profileImageContainer: {
    paddingHorizontal: Layout.space.base,
  },
});

export default ProfileForm;
