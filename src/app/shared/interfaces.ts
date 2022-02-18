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
      friendsList: string[];
      gamesList: string[];
  }
  
  export interface ResponseName {
      name: string;
  }