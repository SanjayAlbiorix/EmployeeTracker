import { create } from 'zustand';
import { Employee } from '../types/models';
import { mockEmployees } from '../data/mockData';

interface EmployeeState {
  employees: Employee[];
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, employee: Partial<Employee>) => void;
  removeEmployee: (id: string) => void;
  getEmployeeById: (id: string) => Employee | undefined;
}

export const useEmployeeStore = create<EmployeeState>((set, get) => ({
  employees: mockEmployees,
  addEmployee: (employeeData) => {
    const newEmployee: Employee = {
      ...employeeData,
      id: Date.now().toString(),
    };
    set((state) => ({
      employees: [...state.employees, newEmployee],
    }));
  },
  updateEmployee: (id, employeeData) => {
    set((state) => ({
      employees: state.employees.map((emp) =>
        emp.id === id ? { ...emp, ...employeeData } : emp
      ),
    }));
  },
  removeEmployee: (id) => {
    set((state) => ({
      employees: state.employees.filter((emp) => emp.id !== id),
    }));
  },
  getEmployeeById: (id) => {
    return get().employees.find((emp) => emp.id === id);
  },
}));

