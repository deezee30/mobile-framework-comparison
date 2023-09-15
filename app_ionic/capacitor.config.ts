import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.quantumcryogenics.app_ionic',
  appName: 'App-Ionic',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
