import { UserModel } from 'app/types';

export interface JWT {
  token: string;
  expiry: number;
}
export interface refreshTokenPayload {
  refreshToken: {
    token: string;
    user: UserModel;
  };
}
