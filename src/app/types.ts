/* --- STATE --- */
export interface GlobalState {
  user: {
    name?: string;
    avatar?: string;
    verified?: boolean;
    review?: string;
    gender?: string;
    role?: string;
    job?: string;
    relationship?: string;
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
  job?: string;
  relationship?: string;
}

export type ContainerState = GlobalState;
