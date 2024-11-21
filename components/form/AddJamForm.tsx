import { useState } from 'react';
import { Layout } from '@/constants/Layout';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import BackButton from "../button/BackButton";
import AddMediaField from "../field/AddMediaField";
import AddCollaboratorsField from "../field/AddCollaboratorsField";
import UserLocationField from "../field/UserLocationField";
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

const AddJamForm = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [jamData, setJamData] = useState<any>({});
  const [profileId, setProfileId] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const jamCategoriesData = Data.jamCategories;


  const submitForm = async () => {
    setTimeout(() => setIsProcessing(false), 3000);
  }  

  const updateField = (key: string, value: any) => {
    setJamData({...jamData, ...{ [key]: value }, ...{ profile_id: profileId }});
  };

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
          <TouchableOpacity onPress={() => setSelectedOption(row.item.id)}>
            <View style={styles.container}>
              <View style={[styles.square, selectedOption == row.item.id ? styles.selected : {}]}>
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



      <DividerView />
      <AddMediaField />
      <AddCollaboratorsField />

      <DividerView />

      <UserLocationField />
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
  container: {
    flexDirection: 'column',
    gap: Layout.space.small,
  },
  square: {
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
  selected: {
    borderColor: Colors.primary,
  },
});

export default AddJamForm;
