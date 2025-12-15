import React, { ReactNode } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { UserRole } from '../../types/models';

interface RoleGuardProps {
  children: ReactNode;
  allow: UserRole[];
  fallback?: ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  allow,
  fallback = null,
}) => {
  const user = useAuthStore((state) => state.user);

  if (!user || !allow.includes(user.role)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
