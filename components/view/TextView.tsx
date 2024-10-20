import TextBase from '../base/TextBase';
import { BaseProps } from '@/constants/Types';

export default ({style, children}: Props) => {
  return (
    <TextBase style={style}>
      {children}
    </TextBase>
  );
};
