import React from 'react';
import {Text} from 'react-native';
import {useAppSelector} from '../hooks';

const EmptyScreen: React.FC<{}> = () => {
  const address = useAppSelector(state => state.address);

  return <Text>{JSON.stringify(address)}</Text>;
};

export default EmptyScreen;
