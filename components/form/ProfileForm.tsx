import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "@/redux/slices/FormSlice";
import ProfileManager from "@/manager/ProfileManager";
import ProfileTypeField from "../field/ProfileTypeField";

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
    <>
      <ProfileTypeField
        value={formData?.profile_type}
        onChangeValue={(option: any) => updateField('profile_type', option.value)}
      />

      {formData?.profile_type?.length > 0 && profileFields.map((item: any) => {
        return ProfileManager.renderField('signup', item, formData);
      })}
    </>
  );
};

export default ProfileForm;
