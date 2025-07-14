import type { CreateTenantData, createUserData, Credentials } from "../types";
import { api } from "./client";

export const AUTH_SERVICE = "/api/auth";
const CATALOG_SERVICE = "/api/catalog";

export const login = (credentials: Credentials) =>
  api.post(`${AUTH_SERVICE}/auth/login`, credentials);

export const self = () => api.get(`${AUTH_SERVICE}/auth/self`);

export const logout = () => api.post(`${AUTH_SERVICE}/auth/logout`);

export const getUsers = (queryString: string) =>
  api.get(`${AUTH_SERVICE}/users?${queryString}`);

export const getTenants = (queryString: string) =>
  api.get(`${AUTH_SERVICE}/tenants?${queryString}`);

export const createUser = (user: createUserData) =>
  api.post(`${AUTH_SERVICE}/users`, user);

export const createTenant = (tenant: CreateTenantData) =>
  api.post(`${AUTH_SERVICE}/tenants`, tenant);

export const updateUser = (user: createUserData, id: string) =>
  api.patch(`${AUTH_SERVICE}/users/${id}`, user);

export const updateTenant = (tenant: CreateTenantData, id: number) =>
  api.patch(`${AUTH_SERVICE}/tenants/${id}`, tenant);

export const getCategories = () => api.get(`${CATALOG_SERVICE}/categories`);

export const getProducts = (queryString: string) =>
  api.get(`${CATALOG_SERVICE}/products?${queryString}`);

export const getCategory = (categoryId: string) =>
  api.get(`${CATALOG_SERVICE}/categories/${categoryId}`);

export const createProduct = (data: FormData) =>
  api.post(`${CATALOG_SERVICE}/products`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
