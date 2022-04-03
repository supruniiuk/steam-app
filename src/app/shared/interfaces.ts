export interface LoginInfo {
  email: string;
  password: string;
}

export interface FirebaseLoginRequest extends LoginInfo {
  returnSecureToken: boolean;
}

export interface FirebaseToken {
  idToken: string;
  expiresIn: string;
  localId: string;
  email: string;
}

export interface User {
  id?: string;
  email: string;
  username?: string; //req
  age?: number | null;
  friendsList?: Friend[];
  gamesList?: Array<string>;
}

export interface ResponseName {
  name: string;
}

export interface Friend {
  email: string;
  id: string;
}

export interface Game {
  id: string;
  title: string;
  price: number;
  description: string;
  tag: string[];
}
