import React from 'react';
import { useRouter } from 'expo-router';

export default () => {
  const router = useRouter();

  router.push('/welcome');

  return <></>;
}
