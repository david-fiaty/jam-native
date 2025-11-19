import InlineWidget from "./widget/InlineWidget";
import SplitWidget from "./widget/SplitWidget";
import { PhoneFieldProps } from "../types/field";

const PhoneField = ( props: PhoneFieldProps ) => {
  const layout: string = props?.layout || 'inline';

  if (layout == 'inline') {
    return (
      <InlineWidget {...props} />
    );
  }
  else if (layout == 'split') {
    return (
      <SplitWidget {...props} />
    );
  }
};

export default PhoneField;