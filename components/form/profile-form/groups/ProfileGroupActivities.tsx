import React from "react";
import i18n from "@/translation/i18n";
import TextView from "@/components/view/TextView";
import InputTextField from "@/components/field/InputTextField";
import GroupTitleView from "@/components/view/GroupTitleView";

type Props = {
  resource: any;
  formData: any;
};

const ProfileGroupActivities = ({ resource, formData }: Props) => {
  return (
    <>
      <GroupTitleView label={i18n.t("Social networks")} />

      <TextView>
        {i18n.t('Linkedin page')}
      </TextView>
      <InputTextField
        resource={resource}
        fieldKey="linkedin_link"
        rules={['string', 'url']}
        value={formData?.linkedin_link || ''}
        placeholder={i18n.t('Enter your page link')}
      />

      <TextView>
        {i18n.t('Facebook page')}
      </TextView>
      <InputTextField
        resource={resource}
        fieldKey="facebook_link"
        rules={['string', 'url']}
        value={formData?.facebook_link || ''}
        placeholder={i18n.t('Enter your page link')}
      />

      <TextView>
        {i18n.t('Instagram user name')}
      </TextView>
      <InputTextField
        resource={resource}
        fieldKey="instagram_username"
        rules={['string']}
        value={formData?.instagram_username || ''}
        placeholder={i18n.t('Enter your user name')}
      />

      <TextView>
        {i18n.t('Website link')}
      </TextView>
      <InputTextField
        resource={resource}
        fieldKey="website_link"
        rules={['string', 'url']}
        value={formData?.website_link || ''}
        placeholder={i18n.t('Enter your website link')}
      />
    </>
  );
}

export default ProfileGroupActivities;