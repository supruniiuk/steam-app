import { Environment } from './interface';

export const environment: Environment = {
  production: false,
  apiKey: 'AIzaSyAgx3jKoHJqB4G5unaFMib4Hj6FOyWMKss',
  dbURL:
    'https://steam-app-d5fe4-default-rtdb.europe-west1.firebasedatabase.app',
  loginURL:
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
  registrationURL:
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=',
};
