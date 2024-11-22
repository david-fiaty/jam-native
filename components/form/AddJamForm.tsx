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
import StatusField from "../field/StatusField";
import IndustryField from "../field/IndustryField";
import DividerView from "../view/DividerView";
import SpinnerView from '../view/SpinnerView';
import ScreenManager from '@/classes/ScreenManager';
import ButtonView from '../view/ButtonView';
import IconView from '../view/IconView';
import TextView from '../view/TextView';
import ListView from '../view/ListView';
import InputTextField from "../field/InputTextField";
import InputTextareaField from "../field/InputTextareaField";
import UserManager from '@/classes/UserManager';
import Data from '@/constants/StaticData';
import DatePickerField from '../field/DatePickerField';
import DataManager from '@/classes/DataManager';

const AddJamForm = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [jamData, setJamData] = useState<any>({});
  const [profileId, setProfileId] = useState<number>(0);
  const jamCategoriesData = Data.jamCategories;

  const updateField = (key: string, value: any) => {
    setJamData({...jamData, ...{ [key]: value }, ...{ profile_id: profileId }});
  };

  const updateCategory = (value: string) => {
    setJamData({...jamData, ...{ type: value }, ...{ profile_id: profileId }});
  };

  const submitForm = async () => {    
    let result = await DataManager.post('jams', jamData);
    setIsProcessing(false);
    console.log(result);

    //setTimeout(() => setIsProcessing(false), 3000);
  }  

  UserManager.getProfileId().then((id: number)  => {
    if (!profileId) setProfileId(id);
    setIsLoaded(true);
  });

  if (!isLoaded) return <SpinnerView />;

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
          <TouchableOpacity onPress={() => updateCategory(row.item.id)}>
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

      <DatePickerField />

      <DividerView />
      <AddMediaField />
      <AddCollaboratorsField />

      <DividerView />

      <LocationPickerField />
      <StatusField />
      <IndustryField />

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
