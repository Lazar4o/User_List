import { Colors } from 'react-native-ui-lib';

export const loadAppColors = () => {
  Colors.loadColors({
    primaryColor: '#2364AA',
    lightGold: '#F5C242',
    darkGold: '#B58622',
    secondaryColor: '#81C3D7',
    textColor: '#221D23',
    errorColor: '#E63B2E',
  });
};
