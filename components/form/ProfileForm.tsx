import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import TextView from "../view/TextView";
import ProfileManager from "@/manager/ProfileManager";

const ProfileForm = () => {
  const formData: any = useSelector((state: any) => state.signup);
  const profileFields: any = ProfileManager.getFields();

  return (
    <>
      {profileFields.map((item: any) => {
        return ProfileManager.renderField('signup', item, {});
      })}
    </>
  );
};

export default ProfileForm;
