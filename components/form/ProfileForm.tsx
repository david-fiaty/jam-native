import React, { useState, useEffect } from "react";
import TextView from "../view/TextView";
import ProfileManager from "@/manager/ProfileManager";

const ProfileForm = () => {
  const profileFields: any = ProfileManager.getFields();

  return profileFields.map((item: any) => {
    return ProfileManager.renderField('signup', item, {});
  });
};

export default ProfileForm;
