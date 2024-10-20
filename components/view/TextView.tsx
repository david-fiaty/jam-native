import { ReactNode } from 'react';
import TextBase from '../base/TextBase';

type Props = {
  style?: object,
  children?: ReactNode,
};

export default ({style, children}: Props) => {
  return (
    <TextBase style={style}>
      {children}
    </TextBase>
  );
};
