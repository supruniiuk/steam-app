export interface User {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface FirebaseToken {
  idToken: string;
  expiresIn: string;
  localId?: string;
}
