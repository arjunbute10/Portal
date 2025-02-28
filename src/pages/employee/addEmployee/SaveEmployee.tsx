import { Avatar, Card, CardContent, Container, FormControlLabel, FormGroup, Grid, IconButton, Switch, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { HiChevronLeft, HiOutlineCamera } from "react-icons/hi2";
import MyTextField from '../../../controls/FormControls/MyTextField';
import PrimaryButton from '../../../controls/FormControls/PrimaryButton';
import PrimaryHeader from '../../../layout/PrimaryHeader';
import AcademicDetails from './profileSections/AcademicDetails';
import { ACTIVE, ADD_EMPLOYEE, BANK_DETAILS, CANCEL, DRAFT, EDIT, INACTIVE, SAVE, SUBMIT, UPDATE_PHOTO, WORK_DETAILS } from '../../../util/string';
import ProfessionalDetails from './profileSections/ProfessionalDetails';
import Documents from './profileSections/Documents';
import ProjectAllocation from './profileSections/ProjectAllocation';
import withAuthentication from '../../../util/auth/useAuthentication';
import { useRazorpayIFSC } from '../Employee.util';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useBanner } from '../../../controls/Banner';
import { date, number, object, string } from 'yup';
import { AddEmployee, defaultEmployeeForm, EducationInfo, PersonalInfo } from './AddEmployee.model';
import { useUser } from '../../../util/auth/UserInfoProvider';
import { useAddEmployee } from './AddEmployee.util';
import { randomId } from '@mui/x-data-grid-generator';
import { yupResolver } from '@hookform/resolvers/yup';
import { saveEmployeeSchema } from './saveEmpSchema';
import { formatDate } from '../../../util/commonUtility';




// const schema = object().shape({
//     // Personal Info 
//     firstName: string().required(),
//     middleName: string().required(),
//     lastName: string().required(),
//     gender: string().required(),
//     dateOfBirth: string().required(),
//     age: string().required(),
//     marritalStatus: string().required(),
//     permanentAddress: string().required(),
//     currentAddress: string().required(),
//     phoneNo: number().required(),
//     bloodGroup: string().required(),
//     // Bank Info 
//     bankName: string().required(),
//     accountNo: string().required(),
//     branchName: string().required(),
//     branchCity: string().required(),
//     ifsc: string().required(),
//     // Work Details 
//     employementType: string().required(),
//     location: string().required(),
//     sourceOfHire: string().required(),
//     dateOfJoining: date().required(),
//     dateOfExit: date().required(),
//     skills: string().required(),
//     emailId: string().required(),
//     totalExperience: number().required(),
//     department: string().required(),
//     businessUnit: string().required(),
//     practice: string().required(),
//     reportingManager: string().required(),
//     hr: string().required(),
// });

// const initialValue = {
//     createdBy: "satyam",
//     requestType: "draft",
//     personalInfo: {
//         employeeId: "sun999", firstName: "", middleName: "", lastName: "", gender: '', dateOfBirth: '', age: '', marritalStatus: '', permanentAddress: '', currentAddress: '', bloodGroup: '', phoneNo: 0,
//     },
//     educationInfo: {
//         degreeName: "", collegeName: "", stream: "", graduationDate: "", percentage: 0,
//     },
//     professionalInfo: {
//         companyName: "", designation: "", dateOfJoining: "", lastDate: "",
//     },
//     bankInfo: {
//         bankName: "", accountNo: "", branchName: "", branchCity: "", ifsc: "",
//     },
//     documentInfo: {
//         documentType: "", documentValue: "", reason: "",
//     },
//     workInfo: {
//         employementType: "", location: "", sourceOfHire: "", dateOfExit: "", skills: 0, emailId: "", totalExperience: 0, department: "", businessUnit: "", practice: "", reportingManager: "", hr: "", employeeId: "sun999"
//     },
//     projectDetails: {
//         projectName: "", projectCode: "", roleId: "", startDate: "", endDate: "",
//     }
// };


const initialValue = {
    createdBy: "sun234",
    requestType: 10,
};

interface AddEmployeeProps {
}


const SaveEmployee: React.FC<AddEmployeeProps> = () => {
const methods = useForm({
    resolver :yupResolver(saveEmployeeSchema)
})

    const fileRef = React.useRef<HTMLInputElement>(null);
    const [isActive, setIsActive] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [academicData, setAcademicData] = useState<EducationInfo[]>([]);
    const { userInfo } = useUser();
    const { data, isError, error } = useAddEmployee();
    const initialRender = useRef(true);
    // object for Academic Details 
    const academicRowData = {
        degreeName: string,
        collegeName: string,
        stream: string,
        graduationDate: Date,
        percentage: number,
    }

    const handleSwitchChange = () => {
        setIsActive(prev => !prev);
    };

    // const methods = useForm<any>({
    //     defaultValues: initialValue,
    //     // resolver: yupResolver(schema)
    // });

    const triggerClick = () => {
        if (fileRef.current != undefined && fileRef.current.click != undefined)
            fileRef.current.click();
    }

    const onImageChange = async (event: any) => {
        // if (event.target.files && event.target.files[0]) {
        //   var update = await dispatch(uploadProfileImage(event.target.files[0], event.target.files[0].name));
        //   if (update) {
        //     dispatch(getUserById())
        //   }
        // } else {
        //   dispatch(setSnackbar({ open: true, message: 'Something Went Wrong, Please try again later!', severity: 'error' }))
        // }
    }




    const queryClient = useQueryClient();
    const banner = useBanner();

    useEffect(() => {
        if (data && !isError) {
          const formValues: AddEmployee = {
            createdBy: data.createdBy,
            requestType: data.requestType,
            personalInfo: {
              ...data.personalInfo,
            },
            educationInfo: data.educationInfo.map((edu: any) => ({
              ...edu,
            })),
            professionalInfo: {
              ...data.professionalInfo,
            },
            bankInfo: {
              ...data.bankInfo,
            },
            documentInfo: data.documentInfo.map((doc: any) => ({
              ...doc,
            })),
            workInfo: {
              ...data.workInfo,
            },
            projectDetails: data.projectDetails.map((project: any) => ({
              ...project,
            })),
          };
          methods.reset(formValues);
        } else if (error) {
          console.error("API Error:", error);
          // Handle API error (e.g., show a banner or toast message)
        } else {
          methods.reset(defaultEmployeeForm);
        }
    
        setTimeout(() => {
          initialRender.current = false;
        }, 500);
      }, [data, isError, error, methods]);



    const addEmployeeMutationFn = useAddEmployee();

    const addEmployeeMutation = useMutation(addEmployeeMutationFn, {
        onSuccess: async (res: any) => {
            if (res.status === 200) {
                banner.handleApiResponse(res, undefined, 'Employee Added Successfully');
                methods.reset();
                setIsLoading(false);
            } else {
                banner.handleApiResponse(res, undefined, res.message);
                setIsLoading(false);
            }
            queryClient.setQueryData<AddEmployee>(["Company", "Board Meeting"], (old) => {
                return old ? { ...old } : old;
              });
        },
        useErrorBoundary: (error: any) => error.response?.status >= 201,
        onError: (err: any) => {
            banner.handleApiResponse(err);
            setIsLoading(false);
        }
    });

    const onSubmit: SubmitHandler<AddEmployee> = async (data: AddEmployee) => {
        setIsLoading(true);
      
        // Format date fields (if necessary)
        const formattedData = {
          ...data,
          personalInfo: {
            ...data.personalInfo,
            dateOfBirth: data.personalInfo.dateOfBirth ? formatDate(data.personalInfo.dateOfBirth) : null,
          },
          educationInfo: data.educationInfo?.map((edu) => ({
            ...edu,
            graduationDate: edu.graduationDate ? formatDate(edu.graduationDate) : null,
          })),
          workInfo: {
            ...data.workInfo,
            dateOfJoining: data.workInfo.dateOfJoining ? formatDate(data.workInfo.dateOfJoining) : null,
            dateOfExit: data.workInfo.dateOfExit ? formatDate(data.workInfo.dateOfExit) : null,
          },
          projectDetails: data.projectDetails?.map((project) => ({
            ...project,
            startDate: project.startDate ? formatDate(project.startDate) : null,
            endDate: project.endDate ? formatDate(project.endDate) : null,
          })),
        };
      
        // Clean nested data (remove empty fields)
        const cleanedData = cleanNestedData(formattedData);
      
        try {
          // Call the mutation
          await addEmployeeMutation.mutateAsync(cleanedData);
      
          // Handle success
          banner.handleApiResponse(
            { status: 200, message: "Employee added successfully" },
            undefined,
            "Employee Added Successfully"
          );
          methods.reset(defaultEmployeeForm); // Reset the form after successful submission
        } catch (error: any) {
          // Handle error
          banner.handleApiResponse(error);
        } finally {
          setIsLoading(false);
        }
      };

    return (

        <Container maxWidth='xl'>
            <Grid container >
                <Grid container className='flex justify-between items-center'>
                    <Grid item md={6} xs={12} className='flex items-center space-x-2'>
                        <IconButton >
                            <HiChevronLeft size={'22px'} color='text.primary' />
                        </IconButton>
                        <PrimaryHeader label={ADD_EMPLOYEE} />
                        <Typography variant="subtitle2">{DRAFT}</Typography>
                    </Grid>
                    <Grid item md={6} xs={12} className='flex space-x-5'>
                        <PrimaryButton label={EDIT} variant='outlined' color='secondary' size="medium" loading={isLoading} />
                        <PrimaryButton label={CANCEL} variant='outlined' color='error' size="medium" loading={isLoading} />
                        <PrimaryButton label={SAVE} variant='outlined' size="medium" loading={isLoading} onClick={methods.handleSubmit(onSubmit)} />
                        <PrimaryButton label={SUBMIT} size="medium" loading={isLoading} />
                    </Grid>
                </Grid>

                <Grid container className="flex justify-between" sx={{ my: 2 }} spacing={2} >
                    <Grid item md={4} xs={12} spacing={2}>
                        <Card className="py-5 flex items-center flex-col space-y-3" >
                            <Grid item className='relative'>
                                <Avatar src='/assets/images/user.jpg' sx={{ width: 120, height: 120, }} />
                                <Grid className='absolute top-0 bg-black/50 rounded-full' onClick={triggerClick} >
                                    <IconButton
                                        className='flex flex-col h-[120px] w-[120px] '
                                    >
                                        <HiOutlineCamera color="#fff" />
                                        <Typography color='#fff'
                                        >
                                            <small>{UPDATE_PHOTO}</small>
                                        </Typography>
                                    </IconButton>
                                    <input type="file" id='selectImage' ref={fileRef} hidden onChange={onImageChange} accept="image/*" />
                                </Grid>
                            </Grid>
                            <Grid item className='text-center'>
                                <Typography variant='body2'>Allowed *.jpeg, *.jpg, *.png, *.gif</Typography>
                                <Typography variant='body2'>Max size of 3.1 MB</Typography>
                            </Grid>
                            <Grid item className='flex items-center'>
                                <Typography variant='h6'>
                                    Employee Status&nbsp;
                                </Typography>
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Switch checked={isActive} onChange={handleSwitchChange} color="success" />}
                                        label={isActive ? ACTIVE : INACTIVE}
                                    />
                                </FormGroup>
                            </Grid>
                        </Card>
                    </Grid>
                    {/* selfInfo */}
                    <Grid item md={8} xs={12} spacing={2}>
                        <Card className="p-5">
                            <Grid className='space-y-1'>
                                <FormProvider {...methods} >
                                    <Grid container className='flex justify-between ' spacing={2} onSubmit={methods.handleSubmit(onSubmit)} >
                                        <Grid item xs={4}>
                                            <MyTextField
                                                label='First Name'
                                                name='firstName'
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <MyTextField
                                                label='Middle Name'
                                                name='middleName'
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <MyTextField
                                                label='Last Name'
                                                name='lastName'
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container className='flex justify-around' spacing={2}>
                                        <Grid item xs={3}>
                                            <MyTextField
                                                label='Gender '
                                                name='gender'
                                                items={[
                                                    { value: 'option1', label: 'Female' },
                                                    { value: 'option2', label: 'Male' },
                                                    { value: 'option3', label: 'Other' },
                                                ]}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <MyTextField
                                                label=''
                                                name='dateOfBirth'
                                                type='date'
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <MyTextField
                                                label='Age'
                                                name='age'
                                                type='number'
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <MyTextField
                                                label='Maritial Status '
                                                name='marritalStatus'
                                                items={[
                                                    { value: 'option1', label: 'Married' },
                                                    { value: 'option2', label: 'Single' },
                                                ]}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container className='flex justify-around' spacing={2}>
                                        <Grid item xs={6}>
                                            <MyTextField
                                                label='Permanent Address'
                                                name='permanentAddress'
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <MyTextField
                                                label='Current Address'
                                                name='currentAddress'
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container className='flex justify-around' spacing={2}>
                                        <Grid item xs={4}>
                                            <MyTextField
                                                label='Contact'
                                                name='phoneNo'
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <MyTextField
                                                label='Emergency Contact'
                                                name='emergengyContactNo'
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <MyTextField
                                                label='Blood Group '
                                                name='bloodGroup'
                                                items={[
                                                    { value: 'option1', label: 'O+' },
                                                    { value: 'option2', label: 'O-' },
                                                    { value: 'option3', label: 'A+' },
                                                    { value: 'option4', label: 'A-' },
                                                    { value: 'option5', label: 'AB+' },
                                                    { value: 'option6', label: 'AB-' },
                                                    { value: 'option7', label: 'B+' },
                                                    { value: 'option8', label: 'B-' },
                                                ]}
                                            />
                                        </Grid>
                                    </Grid>
                                </FormProvider>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>

                {/* Academic Details */}
                <Grid container className="flex justify-between" spacing={2} sx={{ mb: 2 }}>
                    <Grid item md={12} xs={12}>
                        <Card className="p-3">
                            <CardContent>
                            <AcademicDetails />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Professonal Details */}
                <Grid container className="flex justify-between" spacing={2} sx={{ mb: 2 }}>
                    <Grid item md={12} xs={12}>
                        <Card className="p-3">
                            <CardContent>
                                <ProfessionalDetails />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Bank Details */}
                <Grid item xs={12} md={12} sx={{ mb: 2 }}>
                    <Card className="p-3">
                        <CardContent>
                            <FormProvider {...methods}>
                                <Grid sx={{ mb: 1 }}>
                                    <Typography textTransform='uppercase' color="primary" variant='h6'>
                                        {BANK_DETAILS}
                                    </Typography>
                                </Grid>
                                <Grid container spacing={2} >
                                    <Grid item xs={4}>
                                        <MyTextField label='Bank' name='bankName' />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <MyTextField label='Account Number' name='accountNo' />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <MyTextField label='IFSC' name='ifsc' />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <MyTextField label='Branch Name' name='branchName' />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <MyTextField label='Branch City' name='branchCity' />
                                    </Grid>
                                </Grid>
                            </FormProvider>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Document Details */}
                <Grid container className="flex justify-between" spacing={2} sx={{ mb: 2 }}>
                    <Grid item md={12} xs={12}>
                        <Card className="p-3">
                            <CardContent>
                                <Documents />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Project Allocation */}
                <Grid container className="flex justify-between" spacing={2} sx={{ mb: 2 }}>
                    <Grid item md={12} xs={12}>
                        <Card className="p-3">
                            <CardContent>
                                <ProjectAllocation />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* work details */}
                <Grid item xs={12} md={12} sx={{ mb: 2 }}>
                    <Card className="p-3">
                        <CardContent>
                            <FormProvider {...methods}>
                                <Grid sx={{ mb: 1 }}>
                                    <Typography textTransform='uppercase' color="primary" variant='h6'>
                                        {WORK_DETAILS}
                                    </Typography>
                                </Grid>
                                <Grid className='space-y-1'>
                                    <Grid container className='flex justify-between' spacing={2} >
                                        <Grid item xs={4}>
                                            <MyTextField
                                                label='Employement Type'
                                                name='employementType'
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <MyTextField
                                                label='Employement ID'
                                                name='employeeId'
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <MyTextField
                                                label='Location'
                                                name='location'
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container className='flex justify-between' spacing={2} >
                                        <Grid item xs={4}>
                                            <MyTextField
                                                label='Official Email ID'
                                                name='emailId'
                                            />
                                        </Grid>
                                        <Grid item xs={4} className='flex space-x-3'>
                                            <Grid item>
                                                <MyTextField label='Source of Hire' name='sourceOfHire' />
                                            </Grid>
                                            <Grid item >
                                                <MyTextField label='Experience' name='totalExperience' type='number' />
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4} className='flex space-x-3'>
                                            <Grid item>
                                                <MyTextField label='' name='dateOfJoining' type='date' />
                                            </Grid>
                                            <Grid item >
                                                <MyTextField label='' name='dateOfExit' type='date' />
                                                {/* <LocalizationProvider dateAdapter={AdapterMoment}>
                                                    <DatePicker
                                                        label="Possession/Available Date"
                                                        value={possValue}
                                                        onChange={(newValue) => {
                                                            setValue(newValue);
                                                        }}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </LocalizationProvider> */}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid container className='flex justify-between' spacing={2} >
                                        <Grid item xs={4}>
                                            <MyTextField
                                                label='Skillset'
                                                name='skills'
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <MyTextField
                                                label='Reporting Manager'
                                                name='reportingManager'
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <MyTextField
                                                label='Practice'
                                                name='practice'
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </FormProvider>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}


export default withAuthentication(SaveEmployee);
