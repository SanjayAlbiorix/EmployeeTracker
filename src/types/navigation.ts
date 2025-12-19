import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigatorScreenParams, CompositeScreenProps } from "@react-navigation/native";

export type AuthStackParamList = {
  Landing: undefined;
  Login: undefined;
  Signup: undefined;
  Verify: { email?: string } | undefined;
};

export type OrgStackParamList = {
  OrgSelect: undefined;
  CreateOrg: undefined;
  JoinOrg: undefined;
};

export type DashboardStackParamList = {
  AdminDashboard: undefined;
  EmployeeDashboard: undefined;
  Employees: {
    screen?: keyof EmployeeStackParamList;
    params?: EmployeeStackParamList[keyof EmployeeStackParamList];
  };
  Attendance: undefined;
  Leaves: undefined;
  RequestLeave: undefined;
  Payroll: undefined;
  PayrollRun: undefined;
  PayrollList: undefined;
  Payslip: undefined;
  PayslipList: undefined;
  OrgSettings: undefined;
  ProfileSettings: undefined;
};

export type EmployeeStackParamList = {
  EmployeeList: undefined;
  EmployeeProfile: { employeeId: string };
};

/* Screen prop helpers */
export type AuthScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

export type OrgScreenProps<T extends keyof OrgStackParamList> =
  NativeStackScreenProps<OrgStackParamList, T>;

export type DashboardScreenProps<T extends keyof DashboardStackParamList> =
  NativeStackScreenProps<DashboardStackParamList, T>;

export type EmployeeScreenProps<T extends keyof EmployeeStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<EmployeeStackParamList, T>,
    NativeStackScreenProps<DashboardStackParamList>
  >;
