// src/environments/firebase.config.ts
import { initializeApp } from 'firebase/app';
import { getRemoteConfig, fetchAndActivate, getValue } from 'firebase/remote-config';

const firebaseConfig = {
  apiKey: "AIzaSyCQ_BKLxpSTEVzWDTIVzOXB4Yt9sVExPcQ",
  authDomain: "todoappprueba-3f743.firebaseapp.com",
  projectId: "todoappprueba-3f743",
  storageBucket: "todoappprueba-3f743.firebasestorage.app",
  messagingSenderId: "41287305034",
  appId: "1:41287305034:web:ea6e4c40cd90f4f8f223b3"
};

const app = initializeApp(firebaseConfig);
const remoteConfig = getRemoteConfig(app);
remoteConfig.settings.minimumFetchIntervalMillis = 1000;

export async function getFeatureFlag(flagName: string): Promise<boolean> {
  await fetchAndActivate(remoteConfig);
  return getValue(remoteConfig, flagName).asBoolean();
}
