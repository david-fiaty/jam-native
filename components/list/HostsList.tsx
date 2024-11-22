import { View, TouchableOpacity } from "react-native";
import { Layout } from "@/constants/Layout";
import TextView from "../view/TextView";
import BackButton from "../button/BackButton";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import IconView from "../view/IconView";
import ListView from "../view/ListView";
import DataManager from "@/manager/DataManager";
import ScreenManager from "@/manager/ScreenManager";

const HostsList = () => {
  const data: any = DataManager.get('hosts');

  const renderItem = (row: any) => (
    <TouchableOpacity onPress={() => console.log('clicked')}>
      <BoxView direction="row" align="center" justify="flex-start" style={Layout.listItem}>
        <IconView name="user" theme="tertiary" />
        <TextView>{row.item.name}</TextView>
      </BoxView>
    </TouchableOpacity>
  );

  return (
    <BoxView align="flex-start" justify="flex-start" style={Layout.screenContent}>
      <BackButton
        title={i18n.t('Jam hosts')}
        onPress={() => ScreenManager.toggleModal({
          name: 'HostsList',
        })}
      />
      <View style={Layout.borderedListContainer}>
        {data?.length > 0 &&
          <ListView
            data={data}
            renderItem={(row: any) => renderItem(row)}
          />
        }

        {!data?.length && 
          <TextView>{i18n.t('There are no hosts available for this Jam.')}</TextView>
        }
      </View>
    </BoxView>
  );
};

export default HostsList;
