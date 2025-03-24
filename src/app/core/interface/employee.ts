export type Role = 'Super Admin' | 'Admin' | 'Department Manager' | 'Employee'

export interface Employee {
    id: string,
    name: string,
    role: Role
    department: string,
}
