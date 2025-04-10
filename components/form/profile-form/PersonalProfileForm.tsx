import { StyleSheet, View } from 'react-native';
import { BaseProps } from '@/constants/Types';
import { useSelector, useDispatch } from "react-redux";
import { setFormData } from "@/redux/slices/FormSlice";
import { Layout } from '@/constants/Layout';
import i18n from '@/translation/i18n';
import InputTextField from '@/components/field/InputTextField';
import TextView from '@/components/view/TextView';
import ExperienceLevelField from '@/components/field/ExperienceLevelField';

type Props = BaseProps & {
  resource?: any;
  item?: any;
  data?: any;
  params?: any;
  parentKey?: any;
};

const PersonalProfileForm = ({ resource, item, data, params, parentKey }: Props) => {
  const dispatch = useDispatch();
  const formData: any = useSelector((state: any) => state.form[resource]);

  const fields: any = [
    {
      signup: true,
      profile: true,
      enabled: true,
      required: false,
      key: 'first_name',
      label: i18n.t('First name'),
      render: (item: any, data: any, params?: any) => {
        return (
          <InputTextField
            value={data?.[parentKey]?.[item.key] || ''}
            placeholder={i18n.t('Enter your first name')}
            onChangeText={(value: string) => updateField(parentKey, item.key, value)}
          />
        );
      },
    },
    {
      signup: true,
      profile: true,
      enabled: true,
      required: false,
      key: 'last_name',
      label: i18n.t('Last name'),
      render: (item: any, data: any, params?: any) => {
        return (
          <InputTextField
            value={data?.[parentKey]?.[item.key] || ''}
            placeholder={i18n.t('Enter your last name')}
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
      key: 'experience_in_field',
      label: i18n.t('Experience level'),
      render: (item: any, data: any, params?: any) => {
        return (
          <ExperienceLevelField 
            value={data?.[parentKey]?.[item.key] || ''}
            //onChangeValue={(option: any) => this.setFormData(item, option.value)}
          />
        );
      },
    },
  ];

  const updateField = (parentKey: any, key: string, value: any) => {
    dispatch(setFormData<any>({
      resource: 'profile',
      key: key,
      value: value,
    }));
  };
  
  const renderField = (item: any) => {
    return (
      <View key={item.key}>
        <TextView style={styles.label}>
          {i18n.t(item.label)} {item?.required === true ? '*' : ''}
        </TextView>
        {item.render(item, formData, params)}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {fields.map((o: any) => {
        if (o?.enabled === true) {
          return renderField(o);
        }
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Layout.space.base,
  },
  label: {
    marginBottom: Layout.space.base / 2,
  },
});

export default PersonalProfileForm;