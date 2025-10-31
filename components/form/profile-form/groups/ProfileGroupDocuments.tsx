import React from "react";
import { Layout } from "@/constants/Layout";
import i18n from "@/translation/i18n";
import TextView from "@/components/view/TextView";
import FormManager from "@/manager/FormManager";
import DocumentPickerField from "@/components/field/DocumentPickerField";
import GroupTitleView from "@/components/view/GroupTitleView";

type Props = {
  resource: any;
  formData: any;
};

const ProfileGroupDocuments = ({ resource, formData }: Props) => {
  return (
    <>
      <GroupTitleView label={i18n.t("Documents")} />

      <TextView>
        {i18n.t('Technical sheet')}
      </TextView>
      <DocumentPickerField
        value={formData?.profile_organization?.upload_technical_sheet}
        placeholder={i18n.t('Upload a technical sheet')}
        //onChangeText={(value: any) => console.log(value) }
          
        /*
        onChangeText={(value: string) => FormManager.updateField(resource, 'profile_organization', {
          ...(formData?.profile_organization || {}),
          ...{ type_of_management: value },
        }, ['string'])}

        */
      />
      {FormManager.renderError('profile_organization.upload_technical_sheet')}
    </>
  );
}

export default ProfileGroupDocuments;