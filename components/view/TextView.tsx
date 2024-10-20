import { ReactNode } from 'react';
import TextBase from '../base/TextBase';

type Props = {
  children?: ReactNode,
  style?: object,
};

export default ({children, style}: Props) => {
  return (
    <TextBase style={style}>
      {children}
    </TextBase>
  );
};
