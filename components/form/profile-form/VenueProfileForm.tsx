import { StyleSheet, View } from 'react-native';
import { BaseProps } from '@/constants/Types';
import { useSelector } from "react-redux";
import { Layout } from '@/constants/Layout';
import i18n from '@/translation/i18n';
import InputTextField from '@/components/field/InputTextField';
import TextView from '@/components/view/TextView';

type Props = BaseProps & {
  resource: string;
  mode: string;
  item?: any;
  data?: any;
  params?: any;
  parentKey?: any;
  onChange: ((key: string, value: any) => void);
};

const VenueProfileForm = ({ resource, mode, item, data, params, parentKey, onChange }: Props) => {
  const formData: any = useSelector((state: any) => state.form[resource]);

  const fields: any = [
    {
      signup: true,
      profile: true,
      enabled: true,
      required: false,
      key: 'venue_name',
      label: i18n.t('Venue name'),
      profileType: 'venue',
      render: (item: any) => {
        return (
          <InputTextField
            key={item.key}
            value={data?.[parentKey]?.[item.key] || ''}
            placeholder={i18n.t('Enter the venue name')}
            onChangeText={(value: string) => onChange(parentKey, value)}
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
      profileType: 'venue',
      render: (item: any) => {
        return (
          <InputTextField
            key={item.key}
            value={data?.[parentKey]?.[item.key] || ''}
            placeholder={i18n.t('Enter the creation year')}
            onChangeText={(value: string) => onChange(parentKey, value)}
          />
        );
      },
    },
  ];

  const renderSubField = (item: any) => {
    return (
      <View key={item.key}>
        <TextView style={{marginBottom: Layout.space.base / 2}}>
          {i18n.t(item.label)} {item?.required === true ? '*' : ''}
        </TextView>
        {item.render(item)}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {fields.map((field: any) => renderSubField(field))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Layout.space.base,
  },
});

export default VenueProfileForm;