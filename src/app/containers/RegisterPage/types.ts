/* --- STATE --- */
export interface RegisterPageState {}

export interface RegisterParams {
  name: string;
  email: string;
  password: string;
  dateOfBirth: string;
  gender: string;
}

export type ContainerState = RegisterPageState;
