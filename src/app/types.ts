/* --- STATE --- */
export interface GlobalState {
  isAuthenticated: boolean;
  user: {
    name: string;
    avatar: string;
    verified: boolean;
    review: string;
    gender: string;
    role: string;
  };
  loading: boolean;
}

export interface UserModel {
  name: string;
  verified: boolean;
  review: string;
  gender: string;
  role: string;
  avatar: string;
  _id?: string;
  email?: string;
  dateOfBirth?: string;
}

export type ContainerState = GlobalState;
