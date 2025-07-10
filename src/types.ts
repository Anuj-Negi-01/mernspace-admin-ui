export type Credentials = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  firstname: string;
  lastname: string;
  role: string;
  email: string;
  tenant: Tenant | null;
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
};

export type FieldData = {
  name: string[];
  value?: string;
};

export interface priceConfiguration {
  [key: string]: {
    priceType: "base" | "additional";
    availableOptions: string[];
  };
}

export type Category = {
  _id: string;
  name: string;
  priceConfiguration: priceConfiguration;
};

export type Product = {
  _id: string;
  name: string;
  description: string;
  isPublish: boolean;
  category: Category;
  image: string;
};
