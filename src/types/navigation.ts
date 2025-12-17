import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  Verify: undefined;
};

export type OrgStackParamList = {
  OrgSelect: undefined;
  CreateOrg: undefined;
  RoleSelect: undefined;
};

export type DashboardStackParamList = {
  AdminDashboard: undefined;
  EmployeeDashboard: undefined;
  Employees: undefined;
};

export type EmployeeStackParamList = {
  EmployeeList: { newEmployee?: boolean } | undefined;
  EmployeeProfile: { employeeId: string };
  AddEmployee: undefined;
};

/* Screen prop helpers */
export type AuthScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

export type OrgScreenProps<T extends keyof OrgStackParamList> =
  NativeStackScreenProps<OrgStackParamList, T>;

export type DashboardScreenProps<T extends keyof DashboardStackParamList> =
  NativeStackScreenProps<DashboardStackParamList, T>;

export type EmployeeScreenProps<T extends keyof EmployeeStackParamList> =
  NativeStackScreenProps<EmployeeStackParamList, T>;
