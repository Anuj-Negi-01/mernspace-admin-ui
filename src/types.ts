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

export interface Attribute {
  name: string;
  widgetType: "switch" | "radio";
  defaultValue: string;
  availableOptions: string[];
}

export type Category = {
  _id: string;
  name: string;
  priceConfiguration: priceConfiguration;
  attributes: Attribute[];
};

export type Product = {
  _id: string;
  name: string;
  description: string;
  isPublish: boolean;
  category: Category;
  image: string;
};

export type ImageField = {
  file: File;
};

export type CreateProductData = Product & {
  image: ImageField;
};
