import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "@/redux/slices/FormSlice";
import ProfileManager from "@/manager/ProfileManager";
import ProfileTypeField from "../field/ProfileTypeField";
import ProfileImageField from "../field/ProfileImageField";
import { Layout } from "@/constants/Layout";
import { View } from "react-native";

const resource: string = 'profile';

const ProfileForm = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state: any) => state.form?.[resource]);
  const profileFields: any = ProfileManager.getFields();

  const updateField = (key: string, value: any) => {
    dispatch(setFormData<any>({ 
      resource: resource,
      key: key, 
      value: value, 
    }));
  };
  
  return (
    <View style={Layout.formContainer}>
      <ProfileImageField
        value={formData?.profile_picture?.url}
        onChangeValue={(mediaList: any) => updateField('profile_picture', { url: mediaList[0]?.uri })}
      />

      <ProfileTypeField
        value={formData?.profile_type}
        onChangeValue={(option: any) => updateField('profile_type', option.value)}
      />

      {formData?.profile_type?.length > 0 && profileFields.map((item: any) => {
        return ProfileManager.renderField('signup', item, formData);
      })}
    </View>
  );
};

export default ProfileForm;
