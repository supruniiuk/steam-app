export interface LoginInfo {
  email: string;
  password: string;
}

export interface Token {
  jwt_token: string;
}

export interface RegisterInfo extends LoginInfo {
  username: string;
  role: string;
  birthday: string;
  password: string;
}


export interface User {
  id: string;
  email: string;
  username: string;
  birthday: string;
  role: string;
}

export interface MessageResponse {
  message: string;
}

export interface GameRequest {
  title: string;
  price: number;
  description: string;
  tag: string[];
}

export interface Game extends GameRequest {
  id: string;
  createdAt: string;
}