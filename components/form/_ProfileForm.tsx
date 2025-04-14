import React, { useState, useEffect } from "react";
import { useRouter } from 'expo-router';
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "@/redux/slices/FormSlice";
import { Layout } from "@/constants/Layout";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
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
import BackButton from "../button/BackButton";

const modalSize: any = ScreenManager.getModalSize();

const ProfileForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const resource: string = 'profile';
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
    setIsProcessing(true);

    //let media: any = MediaManager.prepareUpload(formData?.[mediasFieldName]);
    // Todo - Find profile media field

    let result: any = await EntityManager.updateProfile(formData);
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
          value: await UserManager.getProfileData(), 
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
      style={[Layout.screenContent, styles.container]}
    >
      <BackButton
        title={i18n.t('Your profile')}
        onPress={() => ScreenManager.popScreen(router)}
      />

      <View style={Layout.formContainer}>
        <ProfileImageField 
          value={formData?.profile_picture?.url}
          onChangeValue={(mediaList: any) => updateField("profile_picture", {url: mediaList[0]?.uri})}
        />
        <DividerView theme="secondary" />

        <TextView>{i18n.t('Email address')}</TextView>
        <InputTextField
          value={formData?.email}
          onChangeText={(value: string) => updateField("email", value)}
        />

        <TextView>{i18n.t('Profile name')}</TextView>
        <InputTextField
          value={formData?.profile_name}
          onChangeText={(value: string) => updateField("profile_name", value)}
        />

        <TextView>{i18n.t('Profile type')}</TextView>
        <ProfileTypeField
          value={formData?.profile_type}
          onChangeValue={(option: any) =>
            updateField("profile_type", option.value)
          }
        />

        <TextView>{i18n.t('Description')}</TextView>
        <InputTextareaField
          value={formData?.profile_description}
          onChangeText={(value: string) => updateField("profile_description", value)}
        />

        <DividerView theme="secondary" />
        <SectorsField
          resource={resource}
          field="sectors_ids"
          label={
            <>
              <IconView name="plus" theme="secondary" radius="round" />
              <TextView>{i18n.t('Add industries')}</TextView>
            </>
          }
          onPressEvent={() => ScreenManager.toggleModal('SectorsList', {
            resource: resource,
            field: 'sectors_ids',
          })}
          onDeleteEvent={(item: any) => {
            const sectorsIds = [...formData?.sectors_ids || []];
            const index = sectorsIds.findIndex((v) => v === item.id);
            if (index !== -1) sectorsIds.splice(index, 1);
            updateField('sectors_ids', sectorsIds);
          }}
        />

        <DividerView theme="secondary" />
        
        <TextView>{i18n.t('Location')}</TextView>
        <LocationPickerField 
          latitude={formData?.geolocation_latitude}
          longitude={formData?.geolocation_longitude}
          onPressEvent={() => ScreenManager.toggleModal('LocationMapView', {
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

        <TextView>{i18n.t('Address')}</TextView>
        <InputTextField
          value={formData?.address}
          onChangeText={(value: string) => updateField("address", value)}
        />

        <TextView>{i18n.t('City')}</TextView>
        <InputTextField
          value={formData?.town_or_locality}
          onChangeText={(value: string) => updateField("city", value)}
        />

        <TextView>{i18n.t('Region')}</TextView>
        <InputTextField
          value={formData?.region}
          onChangeText={(value: string) => updateField("region", value)}
        />

        <TextView>{i18n.t('Country')}</TextView>
        <CountryField value={formData?.country} />

        <DividerView theme="secondary" />

        <TextView>{i18n.t('Phone number')}</TextView>
        <InputTextField
          value={formData?.phone_number}
          onChangeText={(value: string) => updateField("phone_number", value)}
        />

        <TextView>{i18n.t('Whatsapp number')}</TextView>
        <InputTextField
          value={formData?.whatsapp_number}
          onChangeText={(value: string) => updateField("whatsapp_number", value)}
        />

        <TextView>{i18n.t('Website link')}</TextView>
        <InputTextField
          value={formData?.website_link}
          onChangeText={(value: string) => updateField("website_link", value)}
        />

        <TextView>{i18n.t('Instagram ID')}</TextView>
        <InputTextField
          value={formData?.instagram_id}
          onChangeText={(value: string) => updateField("instagram_id", value)}
        />

        <TextView>{i18n.t('Facebook ID')}</TextView>
        <InputTextField
          value={formData?.linkedin_id}
          onChangeText={(value: string) => updateField("linkedin_id", value)}
        />

        <DividerView />
        <ButtonView
          label={i18n.t('Update')}
          isProcessing={isProcessing}
          onPress={submitForm}
        />
        <DividerView theme="secondary" />

        <ProfileProjectsList
          title={i18n.t("Your Projects")} 
          addButton={true}
          allButton={formData?.profile_projects?.length > 0}
          idArray={formData?.profile_projects}
          onAddButtonPress={() => {
            ScreenManager.toggleModal("AddProjectForm", {
              profileId: profileId,
              profileJams: formData?.profile_jams || [],
            });
          }}
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
          onAddButtonPress={() => ScreenManager.toggleModal("JamForm")}
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
  container: {
    width: '100%',
    height: modalSize.height,
  },
  title: {
    fontWeight: "bold",
    marginTop: Layout.space.base,
    marginBottom: Layout.space.base/2,
    flex: 1,
  },
});


export default ProfileForm;
