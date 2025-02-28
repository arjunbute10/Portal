
export interface EmployeeRecord {
    listEmp: EmployeeData[];
}

export interface EmployeeData {
    personalInfo: PersonalInfo;
    professionalInfo: ProfessionalInfo;
    workInfo: WorkInfo;
    projectDetails: ProjectDetails[];
    educationInfo: EducationInfo[],
    documentInfo: DocumentInfo[],
    employeeStatus: string,
    profileImageUrl: string,
};

export interface PersonalInfo {
    firstName: string,
    lastName: string,
    phoneNo: number,
    emailAddress: string,
    dateOfBirth: string,
    linkedInAddress: string,
    permanentAddress: string,
    about: string,
}

export interface ProfessionalInfo {
    companyName: string,
    designation: string,
    dateOfJoining: string,
    lastDate: string,
}

export interface WorkInfo {
    location: string,
    sourceOfHire: string,
    emailId: string,
    businessUnit: string,
    hr: string,
    dateOfJoining: string,
    dateOfExit: string,
    reportingManager: string,
    skills: string,
    employeeId: string,
}

export interface ProjectDetails {
    projectName: string,
    startDate: string,
}

export interface EducationInfo {
    degreeName: string,
    stream: string,
}

export interface DocumentInfo {
    documentId: number,
    documentType: string,
    documentValue: string,
    documentKey: string,
    reason: string,
}