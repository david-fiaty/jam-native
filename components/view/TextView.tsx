import TextBase from '../base/TextBase';
import Props from '@/constants/Interfaces';

export default ({style, children}: Props) => {
  return (
    <TextBase style={style}>
      {children}
    </TextBase>
  );
};
