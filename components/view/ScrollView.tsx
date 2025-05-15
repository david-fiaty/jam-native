import { Pressable, ScrollView } from 'react-native';

type Props = {
  style?: any;
  children?: any;
};

const ScrollBoxView = ({style, children}: Props) => {
  return (
    <ScrollView 
      style={style}
      nestedScrollEnabled={true}
    >
      <Pressable>{children}</Pressable>
    </ScrollView>
  );
};

export default ScrollBoxView; 