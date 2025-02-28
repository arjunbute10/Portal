import { object, string, number, date, array, boolean } from "yup";

export const saveEmployeeSchema = object().shape({
    personalInfo: object().shape({
        firstName: string().required(),
        middleName: string().nullable(),
        lastName: string().required(),
        phoneNo: number().required(),
        panId: number().required(),
        dateOfBirth: date().required(),
        age: string().required(),
        marritalStatus: string().required(),
        emergengyContactNo: number().required(),
        employeeId: string().required(),
        emailAddress: string().email().required(),
        linkedInAddress: string().url().nullable(),
        aadharNo: number().required(),
        gender: string().required(),
        bloodGroup: string().required(),
        permanentAddress: string().nullable(),
        currentAddress: string().nullable(),
        about: string().nullable()
    }),
    educationInfo: array().of(
        object().shape({
            degreeName: string().required(),
            collegeName: string().required(),
            stream: string().required(),
            graduationDate: string().nullable(),
            percentage: number().required()
        })
    ),
    professionalInfo: object().shape({
        companyName: string().required(),
        designation: string().required(),
        dateOfJoining: string().nullable(),
        lastDate: string().nullable()
    }),
    bankInfo: object().shape({
        bankName: string().required(),
        accountNo: string().required(),
        branchName: string().required(),
        branchCity: string().required(),
        ifsc: string().required()
    }),
    documentInfo: array().of(
        object().shape({
            documentType: string().required(),
            documentValue: string().required(),
            reason: string().nullable()
        })
    ),
    workInfo: object().shape({
        employementType: string().required(),
        location: string().required(),
        sourceOfHire: string().required(),
        dateOfJoining: string().required(),
        dateOfExit: string().nullable(),
        skills: number().required(),
        employeeId: string().required(),
        emailId: string().email().required(),
        totalExperience: number().required(),
        department: string().nullable(),
        businessUnit: string().required(),
        practice: string().nullable(),
        reportingManager: string().required(),
        hr: string().required()
    }),
    projectDetails: array().of(
        object().shape({
            projectName: string().required(),
            projectCode: string().required(),
            roleId: number().required(),
            startDate: string().required(),
            endDate: string().required()
        })
    )
});