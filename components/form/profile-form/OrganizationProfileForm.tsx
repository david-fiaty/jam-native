import { StyleSheet, View } from 'react-native';
import { BaseProps } from '@/constants/Types';
import { useSelector, useDispatch } from "react-redux";
import { setFormData } from "@/redux/slices/FormSlice";
import { Layout } from '@/constants/Layout';
import i18n from '@/translation/i18n';
import InputTextField from '@/components/field/InputTextField';
import TextView from '@/components/view/TextView';
import ExperienceLevelField from '@/components/field/ExperienceLevelField';
import ProfileManager from '@/manager/ProfileManager';

type Props = BaseProps & {
  resource?: any;
  item?: any;
  data?: any;
  params?: any;
  parentKey?: any;
};

const OrganizationProfileForm = ({ resource, item, data, params, parentKey }: Props) => {
  const dispatch = useDispatch();
  const formData: any = useSelector((state: any) => state.form[resource]);

  const fields: any = [
    {
      signup: true,
      profile: true,
      enabled: true,
      required: false,
      key: 'organization_name',
      label: i18n.t('Organization name'),
      profileType: 'organization',
      render: (item: any, data: any, params?: any) => {
        return (
          <InputTextField
            value={data?.[parentKey]?.[item.key] || ''}
            placeholder={i18n.t('Enter your organization name')}
            onChangeText={(value: string) => updateField(parentKey, item.key, value)}
          />
        );
      },
    },
    {
      signup: false,
      profile: true,
      enabled: false,
      required: false,
      key: 'creation_year',
      label: i18n.t('Creation year'),
      profileType: 'organization',
      render: (item: any, data: any, params?: any) => {
        return (
          <InputTextField
            value={data?.[parentKey]?.[item.key] || ''}
            placeholder={i18n.t('Enter the creation year')}
            onChangeText={(value: string) => updateField(parentKey, item.key, value)}
          />
        );
      },
    },
  ];

  const updateField = (parentKey: any, key: string, value: any) => {

    console.log(parentKey, key, value);
    
    /*
    dispatch(setFormData<any>({
      resource: 'profile',
      key: key,
      value: value,
    }));
    */
  };

  return (
    <View style={styles.container}>
      {fields.map((o: any) => {
        if (o?.enabled === true) {
          return ProfileManager.renderSubField(o, formData);
        }
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Layout.space.base,
  },
});

export default OrganizationProfileForm;