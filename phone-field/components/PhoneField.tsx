import { PhoneFieldProps } from "../types/field";
import InlineField from "./field/InlineField";
import SplitField from "./field/SplitField";

const PhoneField = ( props: PhoneFieldProps ) => {
  const layout: string = props?.layout || 'inline';

  // https://stefangabos.github.io/world_countries/

  if (layout == 'inline') {
    return (
      <InlineField {...props} />
    );
  }
  else if (layout == 'split') {
    return (
      <SplitField {...props} />
    );
  }
};

export default PhoneField;