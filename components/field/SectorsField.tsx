import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { BaseProps } from '@/constants/Types';
import i18n from '@/translation/i18n';
import BoxView from '../view/BoxView';
import SelectListBase from '../base/SelectListBase';
import SpinnerView from '../view/SpinnerView';
import EntityManager from '@/manager/EntityManager';

type Props = BaseProps & {
  value?: any,
  onChangeListValue?: (option: any) => void,
  onChangeSublistValue?: (option: any) => void,
};

const SectorsField = ({value, onChangeListValue, onChangeSublistValue}: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [rawData, setRawData] = useState<any>([]);
  const [listData, setListData] = useState<any>([]);
  const [sublistData, setSublistData] = useState<any>([]);
  const [selectedSublistOption, setSelectedSublistOption] = useState<any>({});
  
  const buildOptions = (optionsData: any) => {    
    return [...(optionsData || [])].map((item: any) => {
      return {
        value: item?.id,
        label: item?.name,
        children: item?.sub_sectors?.length ? buildOptions(item?.sub_sectors) : [],
      }
    });
  };

  const onChangeList = (option: any) => {

    //console.log(JSON.stringify(listData, 0, 2));
   console.log(option);

    //setSublistData(buildOptions(listData.find((item: any) => item?.value == option?.value)?.sub_sectors));

    /*
    let x = listData.filter((item: any) => item?.id == option?.value)?.sub_sectors;
    console.log(x);
    */

    //if (onChangeListValue) onChangeListValue(option);
  };

  const onChangeSublist = (option: any) => {
    setSelectedSublistOption(option);
    if (onChangeSublistValue) onChangeSublistValue(option);
  };

  if (!rawData?.length) {
    EntityManager.getSectors().then((data: any) => {
      setListData(buildOptions(data));
      setSublistData([]);
      setIsLoaded(true);
    });
  }

  if (!isLoaded) return <SpinnerView size="small" />;

  return (
    <BoxView direction="column" align="center" style={styles.container}>
      <SelectListBase 
        value={selectedSublistOption}
        data={listData} 
        placeholder={i18n.t('Industries')} 
        onChangeValue={onChangeList}
      />
      <SelectListBase 
        value={value}
        data={sublistData} 
        placeholder={i18n.t('Sub industries')} 
        onChangeValue={onChangeSublist}
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default SectorsField;