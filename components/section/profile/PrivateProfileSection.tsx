import { StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProfileView from "@/components/view/ProfileView";
import UserManager from "@/manager/UserManager";
import BoxView from "@/components/view/BoxView";

const PrivateProfileSection = () => {
  return (
    <BoxView
      direction="column"
      align="center"
      justify="flex-start"
      style={styles.container}
      scroll={true}
    >
      <ProfileView
        isOwner={UserManager.isLoggedIn()}
        isPublic={false}
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
});

export default PrivateProfileSection;