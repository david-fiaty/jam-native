import { View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { setActiveScreen } from "@/redux/slices/ScreenSlice";
import { Layout } from "@/constants/Layout";
import TextView from "../view/TextView";
import BackButton from "../button/BackButton";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import IconView from "../view/IconView";
import ListView from "../view/ListView";
import ScreenManager from "@/classes/ScreenManager";

const JammersList = () => {
  //const data = DataManager.get('jammers');
  const data: any = [];
  const dispatch = useDispatch();
  const screenState = useSelector((state: any) => state.screen);

  console.log('-----');
  console.log(screenState);

  const renderItem = (item: any, index: number) => (
    <TouchableOpacity onPress={() => console.log('clicked')}>
      <BoxView direction="row" align="center" justify="flex-start" style={Layout.listItem}>
        <IconView name="user" theme="tertiary" />
        <TextView>{item.name}</TextView>
      </BoxView>
    </TouchableOpacity>
  );

  return (
    <BoxView align="flex-start" justify="flex-start" style={Layout.screenContent}>
      <BackButton
        title={i18n.t('Jammers')}
        onPress={() => ScreenManager.toggleModal({
          name: 'JammersList',
        })}
      />
      
      <View style={Layout.borderedListContainer}>
        {data?.length > 0 &&
          <ListView
            data={data}
            renderItem={(item: any, index: number) => renderItem(item, index)}
          />
        }

        {!data?.length && 
          <TextView>{i18n.t('There are no jammers available for this Jam.')}</TextView>
        }
      </View>
    </BoxView>
  );
};

export default JammersList;
