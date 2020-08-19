import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const Loading = (props) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator {...props} />
    </View>
  );
};

export default Loading;
