import React from "react";
import i18n from "@/translation/i18n";
import TextView from "@/components/view/TextView";
import InputTextField from "@/components/field/InputTextField";
import GroupTitleView from "@/components/view/GroupTitleView";

type Props = {
  resource: any;
  formData: any;
  parentKey?: any;
};

const ProfileGroupNetworks = ({ resource, formData, parentKey }: Props) => {
  return (
    <>
      <GroupTitleView label={i18n.t("Social networks")} />

      <InputTextField
        resource={resource}
        fieldKey="linkedin_link"
        rules={['string', 'url']}
        value={formData?.linkedin_link || ''}
        label={i18n.t('Linkedin page')}
        placeholder={i18n.t('Enter your page link')}
      />

      <InputTextField
        resource={resource}
        fieldKey="facebook_link"
        rules={['string', 'url']}
        value={formData?.facebook_link || ''}
        label={i18n.t('Facebook page')}
        placeholder={i18n.t('Enter your page link')}
      />

      <InputTextField
        resource={resource}
        fieldKey="instagram_username"
        rules={['string']}
        value={formData?.instagram_username || ''}
        label={i18n.t('Instagram user name')}
        placeholder={i18n.t('Enter your user name')}
      />

      <InputTextField
        resource={resource}
        fieldKey="website_link"
        rules={['string', 'url']}
        value={formData?.website_link || ''}
        label={i18n.t('Website link')}
        placeholder={i18n.t('Enter your website link')}
      />
    </>
  );
}

export default ProfileGroupNetworks;