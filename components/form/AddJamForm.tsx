import { useState } from 'react';
import { Layout } from '@/constants/Layout';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import BackButton from "../button/BackButton";
import AddMediaField from "../field/AddMediaField";
import AddCollaboratorsField from "../field/AddCollaboratorsField";
import LocationPickerField from "../field/LocationPickerField";
import CountryField from '../field/CountryField';
import SectorsField from "../field/SectorsField";
import DividerView from "../view/DividerView";
import SpinnerView from '../view/SpinnerView';
import ScreenManager from '@/manager/ScreenManager';
import ButtonView from '../view/ButtonView';
import IconView from '../view/IconView';
import TextView from '../view/TextView';
import ListView from '../view/ListView';
import InputTextField from "../field/InputTextField";
import InputTextareaField from "../field/InputTextareaField";
import UserManager from '@/manager/UserManager';
import StaticData from '@/constants/StaticData';
import DatePickerField from '../field/DatePickerField';
import DataManager from '@/manager/DataManager';
import LocationTypeField from '../field/LocationTypeField';
import JamTypeField from '../field/JamTypeField';

const AddJamForm = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [jamData, setJamData] = useState<any>({});
  const [profileId, setProfileId] = useState<number>(0);
  const jamCategoriesData = StaticData.jamCategories;

  const updateField = (key: string, value: any) => {
    setJamData({...jamData, ...{ [key]: value }, ...{ profile_id: profileId }});
  };

  const submitForm = async () => {    
    let result = await DataManager.post('jams', jamData);

    console.log(result);
    setIsProcessing(false);

    //setTimeout(() => setIsProcessing(false), 3000);
  }  

  UserManager.getProfileId().then((id: number)  => {
    if (!profileId) setProfileId(id);
    setIsLoaded(true);
  });

  if (!isLoaded) return <SpinnerView />;

  console.log(jamData);

  return (    
    <BoxView align="flex-start" justify="flex-start" scroll={true} style={Layout.screenContent}>
      <BackButton
        title={i18n.t('Create a Jam')}
        onPress={() => ScreenManager.toggleModal({name: 'AddJamForm'})}
      />

      <TextView>{i18n.t('What kind of Jam is it?')}</TextView>
      
      <ListView 
        data={jamCategoriesData} 
        numColumns={4}
        horizontal={false}
        scrollEnabled={false}
        contentContainerStyle={Layout.listContainer}
        columnWrapperStyle={Layout.listColumnWrapper}
        renderItem={(row: any) => (
          <TouchableOpacity onPress={() => updateField('type', row.item.id)}>
            <View style={styles.categoryContainer}>
              <View style={[styles.categoryItem, jamData?.type == row.item.id ? styles.categoryItemSelected : {}]}>
                <IconView name={row.item.icon} theme="secondary" />
              </View>
              <TextView>{row.item.label}</TextView>   
            </View>
          </TouchableOpacity>
        )}
      />

      <DividerView />
      <InputTextField
        placeholder={i18n.t('Title')}
        value={jamData?.title}
        onChangeText={(value: string) => updateField('title', value)}
      />

      <InputTextareaField
        placeholder={i18n.t('Description')}
        value={jamData?.caption}
        onChangeText={(value: string) => updateField('caption', value)}
      />

      <JamTypeField 
        value={jamData?.jam_type}
        onChangeValue={(option: any) => updateField('jam_type', option.value)} 
      />

      <LocationTypeField 
        value={jamData?.location_type}
        onChangeValue={(option: any) => updateField('location_type', option.value)} 
      />

      <DatePickerField 
        value={'start value'}
        placeholder={i18n.t('Start date')}
        onChangeValue={ (value: any) => updateField('period', {...jamData?.period || {}, ...{ start_datetime: value }}) } 
      />
      
      <DatePickerField 
        value={'end value'}
        placeholder={i18n.t('End date')}
        onChangeValue={ (value: any) => updateField('period', {...jamData?.period || {}, ...{ end_datetime: value }}) } 
      />

      { /* <LocationPickerField /> */}

      <CountryField 
        value={jamData?.scope_countries_codes}
        onChangeValue={(option: any) => updateField('scope_countries_codes', [option.value])} 
      />

      <SectorsField 
        value={jamData?.sectors_ids}
        onChangeListValue={(option: any) => {
          updateField('sectors_ids', [option.value]);
        }}
        onChangeSublistValue={(option: any) => {
          let sectorsIds = [...jamData?.sectors_ids || []];
          sectorsIds[1] = option.value;
          updateField('sectors_ids', sectorsIds); 
        }}
      />

      <DividerView />
      <AddMediaField />
      <AddCollaboratorsField />

      <DividerView />
      <ButtonView 
        label={i18n.t('Save')} 
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
