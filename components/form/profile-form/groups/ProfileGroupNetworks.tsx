import React from "react";
import { Layout } from "@/constants/Layout";
import i18n from "@/translation/i18n";
import TextView from "@/components/view/TextView";
import InputTextField from "@/components/field/InputTextField";
import FormManager from "@/manager/FormManager";
import GroupTitleView from "@/components/view/GroupTitleView";

type Props = {
  resource: any;
  formData: any;
};

const ProfileGroupNetworks = ({ resource, formData }: Props) => {
  return (
    <>
      <GroupTitleView label={i18n.t("Social networks")} />

      <TextView>
        {i18n.t('Linkedin page')}
      </TextView>
      <InputTextField
        value={formData?.linkedin_link || ''}
        placeholder={i18n.t('Enter your page link')}
        onChangeText={(value: string) => FormManager.updateField(resource, 'linkedin_link', value, ['string', 'url'])}
      />
      {FormManager.renderError('linkedin_link')}

      <TextView>
        {i18n.t('Facebook page')}
      </TextView>
      <InputTextField
        value={formData?.facebook_link || ''}
        placeholder={i18n.t('Enter your page link')}
        onChangeText={(value: string) => FormManager.updateField(resource, 'facebook_link', value, ['string', 'url'])}
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
        onChangeText={(value: string) => FormManager.updateField(resource, 'website_link', value, ['string', 'url'])}
      />
      {FormManager.renderError('website_link')}
    </>
  );
}

export default ProfileGroupNetworks;