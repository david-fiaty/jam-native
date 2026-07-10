import React from "react";
import i18n from "@/translation/i18n";
import DocumentPickerField from "@/components/field/DocumentPickerField";
import GroupTitleView from "@/components/view/GroupTitleView";

type Props = {
  resource: any;
  formData: any;
  parentKey?: any;
};

const ProfileGroupDocuments = ({ resource, formData, parentKey }: Props) => {
  return (
    <>
      <GroupTitleView label={i18n.t("Documents")} />

      <DocumentPickerField
        resource={resource}
        fieldKey="upload_technical_sheet"
        parentKey={parentKey}
        preview={true}
        multiple={false}
        value={formData?.[parentKey]?.upload_technical_sheet || null}
        label={i18n.t('Technical sheet')}
        placeholder={i18n.t('Upload a technical sheet')}
      />

      <DocumentPickerField
        resource={resource}
        fieldKey="upload_other_docs"
        parentKey={parentKey}
        preview={true}
        multiple={true}
        value={formData?.[parentKey]?.upload_other_docs || null}
        label={i18n.t('Other documents')}
        placeholder={i18n.t('Upload other documents')}
      />
    </>
  );
}

export default ProfileGroupDocuments;