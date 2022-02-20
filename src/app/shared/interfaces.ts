export interface LoginInfo {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface FirebaseToken {
  idToken: string;
  expiresIn: string;
  localId?: string;
  email: string;
}

export interface User {
  id?: string;
  email: string;
  username: string;
  age: number | null;
  friendsList: Friend[];
  gamesList: string[];
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