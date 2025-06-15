import type { User } from "../store";

export const usePermision = () => {
  const allowedRoles = ["admin", "manager"];

  const _hasPermision = (user: User | null) => {
    if (user) {
      return allowedRoles.includes(user.role);
    }

    return false;
  };

  return {
    isAllowed: _hasPermision,
  };
};
