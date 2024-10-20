import TextBase from '../base/TextBase';
import { BaseProps } from '@/constants/Types';

export default ({style, children}: BaseProps) => {
  return (
    <TextBase style={style}>
      {children}
    </TextBase>
  );
};
