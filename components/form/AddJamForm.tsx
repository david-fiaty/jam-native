import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "@/constants/Colors";
import { setFormData } from "@/redux/slices/FormSlice";
import { Layout } from "@/constants/Layout";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import BackButton from "../button/BackButton";
import MediaPickerBase from "../base/MediaPickerBase";
import LocationPickerField from "../field/LocationPickerField";
import CountryField from "../field/CountryField";
import SectorsField from "../field/SectorsField";
import DividerView from "../view/DividerView";
import SpinnerView from "../view/SpinnerView";
import ScreenManager from "@/manager/ScreenManager";
import ButtonView from "../view/ButtonView";
import IconView from "../view/IconView";
import TextView from "../view/TextView";
import ListView from "../view/ListView";
import InputTextField from "../field/InputTextField";
import InputTextareaField from "../field/InputTextareaField";
import UserManager from "@/manager/UserManager";
import StaticData from "@/constants/StaticData";
import DatePickerField from "../field/DatePickerField";
import LocationTypeField from "../field/LocationTypeField";
import EntityManager from "@/manager/EntityManager";
import CollaboratorsField from "../field/CollaboratorsField";

const AddJamForm = () => {
  const resource: string = 'jam';
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [profileId, setProfileId] = useState<number>(0);
  const formData = useSelector((state: any) => state.form[resource]);
  const jamCategoriesData = StaticData.jamCategories;

  const updateField = (key: string, value: any) => {
    dispatch(setFormData<any>({ 
      resource: resource,
      key: key, 
      value: value, 
      profile_id: profileId,
    }));
  };

  const submitForm = async () => {
    EntityManager.addJam(formData).then((success: boolean) => {
      setIsProcessing(false);
      //success === true
      false
        ? router.replace('/jams')
        : ScreenManager.showMessage(
            i18n.t('The Jam data is invalid. Please check and trya gain.')
          );
    });
  };

  const renderJamCategory = (row: any) => (
    <TouchableOpacity onPress={() => updateField('type', row.item.id)}>
      <View style={styles.categoryContainer}>
        <View
          style={[
            styles.categoryItem,
            formData?.type == row.item.id ? styles.categoryItemSelected : {},
          ]}
        >
          <IconView name={row.item.icon} theme="secondary" />
        </View>
        <TextView>{row.item.label}</TextView>
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        let profileId: number =  await UserManager.getProfileId();
        setProfileId(profileId);
        dispatch(setFormData<any>({ 
          resource: resource,
          key: null, 
          value: {
            ...formData,
            ...{ profile_id: profileId },
          }, 
        }));

        setIsLoaded(true);
      }
    })();
  }, [isLoaded, profileId]);

  if (!isLoaded) return <SpinnerView />;

  console.log('addJamForm', formData);

  return (
    <BoxView
      align="flex-start"
      justify="flex-start"
      scroll={true}
      style={Layout.screenContent}
    >
      <BackButton
        title={i18n.t('Create a Jam')}
        onPress={() => ScreenManager.toggleScreen('AddJamForm')}
      />

      <TextView>{i18n.t('What kind of Jam is it?')}</TextView>
      <ListView
        data={jamCategoriesData}
        numColumns={4}
        horizontal={false}
        scrollEnabled={false}
        contentContainerStyle={Layout.listContainer}
        columnWrapperStyle={Layout.listColumnWrapper}
        renderItem={(row: any) => renderJamCategory(row)}
      />

      <DividerView />

      <TextView>{i18n.t('Title')}</TextView>
      <InputTextField
        value={formData?.title}
        onChangeText={(value: string) => updateField('title', value)}
      />

      <TextView>{i18n.t('Description')}</TextView>
      <InputTextareaField
        value={formData?.caption}
        onChangeText={(value: string) => updateField('caption', value)}
      />

      <TextView>{i18n.t('Location type')}</TextView>
      <LocationTypeField
        value={formData?.location_type}
        onChangeValue={(option: any) =>
          updateField('location_type', option.value)
        }
      />

      <TextView>{i18n.t('Start date')}</TextView>
      <DatePickerField
        value={'start value'}
        onChangeValue={(value: any) =>
          updateField('period', {
            ...(formData?.period || {}),
            ...{ start_datetime: value.toISOString() },
          })
        }
      />

      <TextView>{i18n.t('End date')}</TextView>
      <DatePickerField
        value={"end value"}
        onChangeValue={(value: any) =>
          updateField('period', {
            ...(formData?.period || {}),
            ...{ end_datetime: value.toISOString() },
          })
        }
      />

      <TextView>{i18n.t('Location')}</TextView>
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

      <TextView>{i18n.t('Country')}</TextView>
      <CountryField
        value={formData?.countries}
        onChangeValue={(option: any) =>
          updateField('country', option.value)
        }
      />

      <DividerView theme="secondary" />
      <SectorsField
        selectedIds={formData?.sectors_ids}
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
      />
      
      <DividerView theme="secondary" />
      <CollaboratorsField
        selectedIds={formData?.collaborators_ids}
        onPressEvent={() => ScreenManager.toggleScreen('CollaboratorsList', {
          resource: resource,
          field: 'collaborators_ids',
        })}
      />

      <DividerView theme="secondary" />
      <MediaPickerBase
        preview={true}
        value={formData?.upload_medias}
        onSelectItem={(data: any) => updateField('upload_medias', data)}
        onDeleteItem={(data: any) => updateField('upload_medias', data)}
        label={
          <BoxView direction="row" align="center">
            <IconView name="plus" theme="secondary" radius="round" />
            <TextView>{i18n.t('Add media')}</TextView>
          </BoxView>
        }
      />
      
      <DividerView theme="secondary" />

      <DividerView />
      <ButtonView
        label={i18n.t('Post')}
        isProcessing={isProcessing}
        onPress={() => {
          setIsProcessing(true);
          submitForm();
        }}
      />

      <DividerView />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'column',
    gap: Layout.space.small,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary,
    padding: Layout.space.base,
    borderWidth: 1,
    borderRadius: Layout.radius.round,
    borderColor: Colors.secondary,
    width: Layout.space.base*7,
    height: Layout.space.base*7,
  },
  categoryItemSelected: {
    borderColor: Colors.primary,
  },
});

export default AddJamForm;
