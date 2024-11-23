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
  const [selectedListOption, setSelectedListOption] = useState<any>(null);
  const [selectedSublistValue, setSelectedSublistValue] = useState<any>(null);
  const [rawData, setRawData] = useState<any>([]);
  const [listData, setListData] = useState<any>([]);
  const [sublistData, setSublistData] = useState<any>([]);
  
  const buildOptions = (optionsData: any) => {
    return optionsData.map((item: any) => {
      return {
        value: item?.id,
        label: item?.name,
      }
    });
  };

  const filterSublist = () => {
    //console.log('---', selectedListOption, selectedSublistValue);

    console.log('selectedListOption', selectedListOption);
    console.log('listData', listData);
    const filteredData = listData.find((item: any) => {
      
      /*
      if (item?.value == selectedListOption?.value) {
        return item?.sub_sectors;
      }
        */
    });

    //console.log(filteredData);


  };

  const onChangeList = (option: any) => {
    setSelectedListOption(option);
    filterSublist();
    if (onChangeListValue) onChangeListValue(option);
  };

  const onChangeSubList = (option: any) => {
    setSelectedSublistValue(option);
    if (onChangeSublistValue) onChangeSublistValue(option);
  };

  if (!listData?.length) {
    EntityManager.getSectors().then((data: any) => {
      setRawData(data);
      setListData(buildOptions(data));
      setIsLoaded(true);
    });
  }

  if (!isLoaded) return <SpinnerView size="small" />;

  return (
    <BoxView direction="column" align="center" style={styles.container}>
      <SelectListBase 
        value={value}
        data={listData} 
        placeholder={i18n.t('Industries')} 
        onChangeValue={onChangeList}
      />
      <SelectListBase 
        value={value}
        data={sublistData} 
        placeholder={i18n.t('Sub industries')} 
        onChangeValue={onChangeSubList}
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