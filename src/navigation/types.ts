import type { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Auth: undefined;
  Main: NavigatorScreenParams<TabParamList>;
  EmployeeDetail: { employeeId: string };
  AddEditEmployee: { employeeId?: string };
};

export type TabParamList = {
  Dashboard: undefined;
  Employees: undefined;
  Attendance: undefined;
  Leave: undefined;
  Profile: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

