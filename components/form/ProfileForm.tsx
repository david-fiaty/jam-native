import { useState } from "react";
import { StyleSheet } from "react-native";
import { Layout } from "@/constants/Layout";
import { Config } from "@/constants/Config";
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
import UserJamsList from "../list/UserJamsList";
import UserProjectsList from "../list/UserProjectsList";
import SpinnerView from "../view/SpinnerView";
import InputTextareaField from "../field/InputTextareaField";
import UserManager from "@/manager/UserManager";
import ScreenManager from "@/manager/ScreenManager";
import MediaPickerBase from "../base/MediaPickerBase";
import ImageView from "../view/ImageView";
import IconView from "../view/IconView";

const ProfileForm = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null);
  const [profileData, setProfileData] = useState<any>(null);

  const updateField = (key: string, value: any) => {
    setProfileData({ ...profileData, ...{ [key]: value } });
  };

  UserManager.getUserData().then((data: any) => {
    if (!userData) setUserData(Object.assign({}, data));
    if (!profileData)
      setProfileData(Object.assign({}, data?.account?.profiles?.[0]));

    setIsLoaded(true);
  });

  if (!isLoaded) return <SpinnerView />;

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

      <MediaPickerBase
        label={
          <BoxView
            direction="row"
            align="center"
            style={styles.profileImageContainer}
          >
            {!profileData?.profile_picture?.url?.length && (
              <BoxView direction="row" align="center" justify="space-between">
                <IconView
                  name="user"
                  theme="primary"
                  size={60}
                  radius="circle"
                />
                <TextView>
                  {i18n.t("Add a profile image.")}
                </TextView>
                <IconView name="next" theme="clear" size={60} />
              </BoxView>
            )}

            {profileData?.profile_picture?.url?.length > 0 && (
              <BoxView
                direction="row"
                align="center"
                justify="space-between"
                style={styles.profileImageContainer}
              >
                <ImageView
                  uri={Config.imageUrl + profileData?.profile_picture?.url}
                  width={96.7}
                  height={96.7}
                  resizeMode="cover"
                />
                <TextView>
                  {i18n.t("Change your profile image.")}
                </TextView>
                <IconView name="next" theme="clear" size={60} />
              </BoxView>
            )}
          </BoxView>
        }
      />

      <DividerView />

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
        onChangeText={(value: string) =>
          updateField("profile_description", value)
        }
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

      <UserProjectsList data={userData?.projects} />

      <DividerView />
      <UserJamsList data={userData?.jams} />

      <DividerView />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  profileImageContainer: {
    paddingHorizontal: Layout.space.base,
    width: 200,
  },
});

export default ProfileForm;
