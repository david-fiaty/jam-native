import React from "react";
import { StyleSheet } from "react-native";
import { Layout } from "@/constants/Layout";
import i18n from "@/translation/i18n";
import TextView from "@/components/view/TextView";
import InputTextField from "@/components/field/InputTextField";
import FormManager from "@/manager/FormManager";

type Props = {
  resource: any;
  formData: any;
};

const ProfileGroupNetworks = ({ resource, formData }: Props) => {
  return (
    <>
      <TextView style={styles.groupTitle}>
        {i18n.t("Social networks")}
      </TextView>

      <TextView>
        {i18n.t('Linkedin page')}
      </TextView>
      <InputTextField
        value={formData?.linkedin_link || ''}
        placeholder={i18n.t('Enter your page link')}
        onChangeText={(value: string) => FormManager.updateField(resource, 'linkedin_link', value, ['string'])}
      />
      {FormManager.renderError('linkedin_link')}

      <TextView>
        {i18n.t('Facebook page')}
      </TextView>
      <InputTextField
        value={formData?.facebook_link || ''}
        placeholder={i18n.t('Enter your page link')}
        onChangeText={(value: string) => FormManager.updateField(resource, 'facebook_link', value, ['string'])}
      />
      {FormManager.renderError('facebook_link')}

      <TextView>
        {i18n.t('Instagram user name')}
      </TextView>
      <InputTextField
        value={formData?.instagram_username || ''}
        placeholder={i18n.t('Enter your user name')}
        onChangeText={(value: string) => FormManager.updateField(resource, 'instagram_username', value, ['string'])}
      />
      {FormManager.renderError('instagram_username')}

      <TextView>
        {i18n.t('Website link')}
      </TextView>
      <InputTextField
        value={formData?.website_link || ''}
        placeholder={i18n.t('Enter your website link')}
        onChangeText={(value: string) => FormManager.updateField(resource, 'website_link', value, ['string'])}
      />
      {FormManager.renderError('website_link')}
    </>
  );
}

const styles = StyleSheet.create({
  groupTitle: {
    fontWeight: 'bold',
    marginTop: Layout.space.base * 1.5,
  },
});

export default ProfileGroupNetworks;