import { TouchableOpacity } from "react-native";
import { BaseProps } from "@/constants/Types";
import i18n from "@/translation/i18n";
import InputTextField from "../field/InputTextField";
import BoxView from "../view/BoxView";
import IconView from "../view/IconView";
import ScreenManager from "@/manager/ScreenManager";

type Props = BaseProps & {
  latitude?: any;
  longitude?: any;
};

const LocationPickerField = ({ latitude, longitude }: Props) => {
  return (
    <BoxView direction="row" align="space-between">
      <TouchableOpacity
        onPress={() => ScreenManager.toggleModal("LocationMapView")}
      >
        <InputTextField
          disabled={true}
          placeholder={i18n.t("Location")}
          rightIcon={<IconView name="location" theme="transparent" />}
        />
      </TouchableOpacity>
    </BoxView>
  );
};

export default LocationPickerField;
