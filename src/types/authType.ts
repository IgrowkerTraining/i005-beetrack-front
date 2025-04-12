export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface UserData {
  name: string;
  lastName: string;
  email: string;

  dateOfBirth?: Date;
  storeName?: string;
  storePhone?: number;
  storeAddress?: string;
}

export interface NewUserData extends UserData {
  password: string;
}
