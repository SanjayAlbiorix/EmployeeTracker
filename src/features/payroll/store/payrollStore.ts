import { create } from "zustand";
import { Payslip } from "../types";

type PayrollState = {
  payslips: Payslip[];
  runPayroll: () => void;
  markAsPaid: (id: string) => void;
};

// Mock helper to generate random ID
const generateId = () => Math.random().toString(36).substr(2, 9);

export const usePayrollStore = create<PayrollState>((set) => ({
  payslips: [],

  runPayroll: () =>
    set((state) => {
      // Mock: Generate a payslip for the "current user"
      const newPayslip: Payslip = {
        id: generateId(),
        employeeName: "John Doe",
        month: new Date().toLocaleString('default', { month: 'long', year: 'numeric' }),
        basicSalary: 5000,
        allowances: 1000,
        deductions: 500,
        netPay: 5500,
        status: "processed",
        userId: "current-user",
      };
      
      return {
        payslips: [newPayslip, ...state.payslips],
      };
    }),

  markAsPaid: (id) =>
    set((state) => ({
      payslips: state.payslips.map((p) =>
        p.id === id ? { ...p, status: "paid" } : p
      ),
    })),
}));
