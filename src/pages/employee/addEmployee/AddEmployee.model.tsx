export interface AddEmployee {
    createdBy?: string;
    requestType?: number 
    personalInfo: PersonalInfo;
    educationInfo?: EducationInfo[]; // Optional field
    professionalInfo: ProfessionalInfo;
    bankInfo: BankInfo;
    documentInfo?: DocumentInfo[];
    workInfo: WorkInfo;
    projectDetails?: ProjectDetails[];
  }
  
  export interface PersonalInfo {
    firstName: string;
    middleName?: string;
    lastName: string;
    gender: string;
    dateOfBirth: Date; // Use Date type for dates
    age: string;
    marritalStatus: string;
    permanentAddress: string;
    currentAddress: string;
    phoneNo: number ;
    emergengyContactNo: number 
    bloodGroup: string;
    panId: number 
    emailAddress: string;
    linkedInAddress: string;
    aadharNo: number 
    about: string;
    employeeId: string; // To be removed
  }
  
  export interface EducationInfo {
    degreeName: string;
    collegeName: string;
    stream: string;
    graduationDate?: string; // Allow both Date and string
    percentage: number ;
  }
  
  export interface ProfessionalInfo {
    companyName: string;
    designation: string;
    dateOfJoining: string; // Use string for date in a specific format (e.g., ISO)
    lastDate: string; // Use string for date in a specific format (e.g., ISO)
  }
  
  export interface BankInfo {
    bankName: string;
    accountNo: string;
    branchName: string;
    branchCity: string;
    ifsc: string;
  }
  
  export interface DocumentInfo {
    documentType: string;
    documentValue: string;
    reason: string;
  }
  
  export interface WorkInfo {
    employementType: string;
    location: string;
    sourceOfHire: string;
    dateOfJoining: string; // Use Date type for dates
    dateOfExit: string; // Use Date type for dates
    skills: number 
    emailId: string;
    totalExperience: number 
    department: string;
    businessUnit: string;
    practice: string;
    reportingManager: string;
    hr: string;
    employeeId: string; // To be removed
  }
  
  export interface ProjectDetails {
    projectName: string;
    projectCode: string;
    roleId?: number ;
    startDate: string; // Use string for date in a specific format (e.g., ISO)
    endDate: string; // Use string for date in a specific format (e.g., ISO)
  }



 export const defaultEmployeeForm: AddEmployee = {
    personalInfo: {
      firstName: "",
      middleName: "",
      lastName: "",
      gender: "",
      dateOfBirth: new Date(), // Default to current date or a specific date
      age: "",
      marritalStatus: "",
      permanentAddress: "",
      currentAddress: "",
      phoneNo: 0,
      emergengyContactNo: 0,
      bloodGroup: "",
      panId: 0,
      emailAddress: "",
      linkedInAddress: "",
      aadharNo: 0,
      about: "",
      employeeId: "", // To be removed
    },
    educationInfo: [],
    professionalInfo: {
      companyName: "",
      designation: "",
      dateOfJoining: "",
      lastDate: "",
    },
    bankInfo: {
      bankName: "",
      accountNo: "",
      branchName: "",
      branchCity: "",
      ifsc: "",
    },
    documentInfo: [],
    workInfo: {
      employementType: "",
      location: "",
      sourceOfHire: "",
      dateOfJoining: "", // Default to current date or a specific date
      dateOfExit: "", // Default to current date or a specific date
      skills: 0,
      emailId: "",
      totalExperience: 0,
      department: "",
      businessUnit: "",
      practice: "",
      reportingManager: "",
      hr: "",
      employeeId: "", // To be removed
    },
    projectDetails: [],
  };