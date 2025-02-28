export interface AllEmployees {
    employees: AllEmployeeRecords[];
}

export interface AllEmployeeRecords {
    name: string,
    role: string,
    profileImageUrl: string,
    employeeId: string,
    projectName: [],
    email: string

}

export interface IfscRecord {
    BRANCH: string,
    CENTRE: string,
    DISTRICT: string,
    STATE: string,
    BANK: string,
    IFSC: string
}
