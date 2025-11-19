import InputTextElement from "../element/InputTextElement";
import { InlineFieldProps } from "@/phone-field/types/field";
import { Text, View, StyleSheet } from "react-native";

const InlineField = (props: InlineFieldProps) => {
  return (
    <View>
      <Text>Inline phone widget</Text>
      <InputTextElement {...props} />
    </View>
  );
};

const styles = StyleSheet.create({

});

export default InlineField;