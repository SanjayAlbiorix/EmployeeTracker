export type PayrollStatus = "draft" | "processed" | "paid";

export type Payslip = {
  id: string;
  employeeName: string;
  month: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netPay: number;
  status: PayrollStatus;
  userId: string; // To link to mock user
};
