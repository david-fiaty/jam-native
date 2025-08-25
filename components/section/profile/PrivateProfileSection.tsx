import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProfileView from "@/components/view/ProfileView";
import UserManager from "@/manager/UserManager";

const PrivateProfileSection = () => {

  return (
    <ProfileView 
      isOwner={UserManager.isLoggedIn()}
      isPublic={false}
    />
  );
};

export default PrivateProfileSection;