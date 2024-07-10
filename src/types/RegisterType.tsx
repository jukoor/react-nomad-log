export interface RegisterType extends LoginType {
  firstName: string;
  lastName: string;
}

export type LoginType = {
  email: string;
  password: string;
};
