/* --- STATE --- */
export interface AccountPageState {
  email: string;
  loading: boolean;
}

export type UpdateProfileInput = {
  name?: string;
  dateOfBirth?: string;
  gender?: string;
  relationship?: string;
  job?: string;
};

export type ContainerState = AccountPageState;
