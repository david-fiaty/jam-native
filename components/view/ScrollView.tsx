import { Pressable, ScrollView } from 'react-native';
import { BaseProps } from '@/constants/Types';

const ScrollBoxView = ({style, children}: BaseProps) => {
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