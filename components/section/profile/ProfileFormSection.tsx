import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Layout } from "@/constants/Layout";
import BoxView from "@/components/view/BoxView";
import ProfileForm from "@/components/form/ProfileForm";

const resource: string = 'profile';

type Props = {
  profileId: any;
};

const ProfileFormSection = ({ profileId }: Props) => {
  return (
    <BoxView
      direction="column"
      align="center"
      justify="flex-start"
      style={Layout.screenContent}
      scroll={true}
    >
      <ProfileForm />
    </BoxView>
  );
}

export default ProfileFormSection;