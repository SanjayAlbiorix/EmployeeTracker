export type UserRole = 'admin' | 'manager' | 'employee';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  status: 'active' | 'inactive' | 'on_leave';
  avatar?: string;
  joinDate: string;
}

export interface Attendance {
  id: string;
  employeeId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'half_day';
  checkIn?: string;
  checkOut?: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'sick' | 'vacation' | 'personal' | 'other';
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
}

