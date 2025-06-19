export type Credentials = {
  email: string;
  password: string;
};

export type User = {
  id: number;
  firstname: string;
  lastname: string;
  role: string;
  email: string;
};

export type createUserData = {
  firstname: string;
  lastname: string;
  password: string;
  role: string;
  email: string;
  tenant: number;
};

export type Tenant = {
  id: number;
  name: string;
  address: string;
};

export type CreateTenantData = {
  name: string;
  address: string;
}
