import React, { useState, useEffect } from "react";
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
import IconView from "../view/IconView";
import ButtonView from "../view/ButtonView";
import EntityManager from "@/manager/EntityManager";

const ProfileForm = () => {
  const resource: string = 'profile';
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [profileId, setProfileId] = useState<number>(0);
  const formData = useSelector((state: any) => state.form[resource]);

  const updateField = (key: string, value: any) => {
    dispatch(setFormData<any>({ 
      resource: resource,
      key: key, 
      value: value, 
    }));
  };

  const submitForm = async () => {
    let result: any = await EntityManager.addJam(formData);
    let message: any = {
      title: i18n.t('Update profile'),
      content: i18n.t('The profile data was successfully updated.'),
    };

    if (result?.error) message.content = i18n.t(result.error);
    ScreenManager.showMessage(message);
    setIsProcessing(false);
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setProfileId(await UserManager.getProfileId());

        dispatch(setFormData<any>({ 
          resource: resource,
          key: null, 
          value: { ...(await UserManager.getProfileData()), ...formData }, 
        }));
        
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, formData, resource]);

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

        <TextView style={styles.title}>{i18n.t('Details')}</TextView>
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

        <TextView style={styles.title}>{i18n.t('Activities')}</TextView>
        <SectorsField
          resource={resource}
          field="sectors_ids"
          label={
            <>
              <IconView name="plus" theme="secondary" radius="round" />
              <TextView>{i18n.t('Add industries')}</TextView>
            </>
          }
          onPressEvent={() => ScreenManager.toggleScreen('SectorsList', {
            resource: resource,
            field: 'sectors_ids',
          })}
          onDeleteEvent={(item: any) => {
            const sectorsIds = [...formData?.sectors_ids || []];
            const index = sectorsIds.findIndex((v) => v === item.id);
            if (index !== -1) sectorsIds.splice(index, 1);
            updateField('sectors_ids', sectorsIds.filter(Boolean));
          }}
        />

        <TextView style={styles.title}>{i18n.t('Address')}</TextView>
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
        <TextView style={styles.title}>{i18n.t('Social')}</TextView>
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

        <DividerView />
        <ButtonView
          label={i18n.t('Update')}
          isProcessing={isProcessing}
          onPress={() => {
            setIsProcessing(true);
            submitForm();
          }}
        />
        <DividerView theme="secondary" />

        <ProfileProjectsList
          title={i18n.t("Your Projects")} 
          addButton={true}
          profileId={profileId}
          allButton={formData?.profile_projects?.length > 0}
          idArray={formData?.profile_projects}
        />

        {formData?.saved_projects?.length > 0 && (
          <>
            <DividerView />
            <ProfileProjectsList
              title={i18n.t("Saved Projects")} 
              allButton={formData?.saved_projects?.length > 0}
              idArray={formData?.saved_projects}
            />
          </>
        )}

        {formData?.liked_projects?.length > 0 && (
          <>
            <DividerView />
            <ProfileProjectsList
              title={i18n.t("Liked Projects")} 
              allButton={formData?.liked_projects?.length > 0}
              idArray={formData?.liked_projects}
            />
          </>
        )}

        <DividerView />
        <ProfileJamsList 
          title={i18n.t("Your Jams")} 
          allButton={formData?.profile_jams?.length > 0}
          addButton={true}
          idArray={formData?.profile_jams} 
          onAddButtonPress={() => ScreenManager.toggleScreen("AddJamForm")}
        />   

        {formData?.saved_jams?.length > 0 && (
          <>
            <DividerView />
            <ProfileJamsList 
              title={i18n.t("Saved Jams")} 
              allButton={formData?.saved_jams?.length > 0}
              idArray={formData?.saved_jams} 
            />
          </>
        )}

        {formData?.liked_jams?.length > 0 && (
          <>
            <DividerView />
            <ProfileJamsList 
              title={i18n.t("Liked Jams")} 
              allButton={formData?.liked_jams?.length > 0}
              idArray={formData?.liked_jams} 
            />
          </>
        )}

        <DividerView />
      </View>
    </BoxView>
  );
};


const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    marginTop: Layout.space.base,
    marginBottom: Layout.space.base/2,
    flex: 1,
  },
});


export default ProfileForm;
