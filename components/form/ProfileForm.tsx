import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "@/redux/slices/FormSlice";
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
  const resource: string = 'profile';
  const dispatch = useDispatch();
  const [userData, setUserData] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const formData = useSelector((state: any) => state.form[resource]);

  const updateField = (key: string, value: any) => {
    dispatch(setFormData<any>({ 
      resource: resource,
      key: key, 
      value: value, 
    }));
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setUserData(await UserManager.getUserData());
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
      align="flex-start"
      justify="flex-start"
      scroll={true}
      style={Layout.screenContent}
    >
      <BackButton
        title={i18n.t("Your profile")}
        onPress={() => ScreenManager.toggleScreen("ProfileForm")}
      />

      <View style={Layout.formContainer}>
        <ProfileImageField 
          value={formData?.profile_picture?.url}
          onChangeValue={(mediaList: any) => updateField("profile_picture", {url: mediaList[0]?.uri})}
        />
        <DividerView theme="secondary" />

        <InputTextField
          placeholder={i18n.t("Email address")}
          value={formData?.email}
          onChangeText={(value: string) => updateField("email", value)}
        />

        <InputTextField
          placeholder={i18n.t("Profile name")}
          value={formData?.profile_name}
          onChangeText={(value: string) => updateField("profile_name", value)}
        />

        <ProfileTypeField
          value={formData?.profile_type}
          onChangeValue={(option: any) =>
            updateField("profile_type", option.value)
          }
        />

        <InputTextareaField
          placeholder={i18n.t("Description")}
          value={formData?.profile_description}
          onChangeText={(value: string) => updateField("profile_description", value)}
        />

        <LocationPickerField 
          latitude={formData?.geolocation_latitude}
          longitude={formData?.geolocation_longitude}
          onPressEvent={() => ScreenManager.toggleScreen('LocationMapView', {
            resource: resource,
            latitude: {
              key: 'geolocation_latitude',
              value: formData?.geolocation_latitude,
            },
            longitude: {
              key: 'geolocation_longitude',
              value: formData?.geolocation_longitude,
            },
          })}
        />

        <InputTextField
          placeholder={i18n.t("Address")}
          value={formData?.address}
          onChangeText={(value: string) => updateField("address", value)}
        />

        <InputTextField
          placeholder={i18n.t("City")}
          value={formData?.town_or_locality}
          onChangeText={(value: string) => updateField("city", value)}
        />

        <InputTextField
          placeholder={i18n.t("Region")}
          value={formData?.region}
          onChangeText={(value: string) => updateField("region", value)}
        />

        <CountryField value={formData?.country} />

        <DividerView theme="secondary" />
        <SectorsField
          label={<TextView>{i18n.t("Industries")}</TextView>}
          onPressEvent={() => ScreenManager.toggleScreen("SectorsList", {
            resource: 'profile',
            field: 'sectors_ids',
          })}
        />

        <DividerView theme="secondary" />

        <InputTextField
          placeholder={i18n.t("Phone number")}
          value={formData?.phone_number}
          onChangeText={(value: string) => updateField("phone_number", value)}
        />

        <InputTextField
          placeholder={i18n.t("Whatsapp number")}
          value={formData?.whatsapp_number}
          onChangeText={(value: string) => updateField("whatsapp_number", value)}
        />

        <InputTextField
          placeholder={i18n.t("Website link")}
          value={formData?.website_link}
          onChangeText={(value: string) => updateField("website_link", value)}
        />

        <InputTextField
          placeholder={i18n.t("Instagram ID")}
          value={formData?.instagram_id}
          onChangeText={(value: string) => updateField("instagram_id", value)}
        />

        <InputTextField
          placeholder={i18n.t("Facebook ID")}
          value={formData?.linkedin_id}
          onChangeText={(value: string) => updateField("linkedin_id", value)}
        />

        <DividerView theme="secondary" />

        <ProfileProjectsList
          title={i18n.t("Your Projects")} 
          addButton={true}
          idArray={formData?.profile_projects}
          onAddButtonPress={() => ScreenManager.toggleScreen("AddProjectForm")}
        />

        <DividerView />
        <ProfileProjectsList
          title={i18n.t("Saved Projects")} 
          allButton={true}
          idArray={formData?.saved_projects}
        />

        <DividerView />
        <ProfileProjectsList
          title={i18n.t("Liked Projects")} 
          idArray={formData?.liked_projects}
          allButton={true}
        />

        <DividerView />
        <ProfileJamsList 
          title={i18n.t("Your Jams")} 
          allButton={true}
          addButton={true}
          idArray={formData?.profile_jams} 
          onAddButtonPress={() => ScreenManager.toggleScreen("AddJamForm")}
        />

        <DividerView />
        <ProfileJamsList 
          title={i18n.t("Saved Jams")} 
          allButton={true}
          idArray={formData?.saved_jams} 
        />

        <DividerView />
        <ProfileJamsList 
          title={i18n.t("Liked Jams")} 
          allButton={true}
          idArray={formData?.liked_jams} 
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
