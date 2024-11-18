import { ReactNode } from 'react';

export type BaseProps = {
  style?: object,
  children?: ReactNode,
};

export type ListItemProps = {
  item: object,
  index: number,
};