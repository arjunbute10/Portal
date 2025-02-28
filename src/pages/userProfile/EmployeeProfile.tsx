import { Card, Container, Grid, IconButton, Skeleton, Typography } from '@mui/material';
import moment from 'moment';
import { HiLink, HiMiniEnvelopeOpen, HiOutlineBookOpen, HiOutlineBriefcase, HiOutlineCake, HiOutlineEnvelope, HiOutlineEnvelopeOpen, HiOutlineHome, HiOutlineMapPin, HiOutlinePhone, HiOutlineShieldCheck, HiOutlineUser, HiPhone } from 'react-icons/hi2';
import { useParams } from 'react-router-dom';
import Banner, { withBannerSupport } from '../../controls/Banner';
import ColorAvatar from '../../controls/ColorAvatar';
import EmptyState from '../../controls/EmptyState';
import PrimaryHeader from '../../layout/PrimaryHeader';
import { useUser } from '../../util/auth/UserInfoProvider';
import withAuthentication from '../../util/auth/useAuthentication';
import { useEmployeeProfile } from './EmployeeProfile.Util';
import { generateCardSkeletons } from '../../util/commonUtility';
import { NO_DATA } from '../../util/string';

const EmployeeProfile = () => {
    const { eid } = useParams();
    const { userInfo } = useUser();

    const employeeProfile = useEmployeeProfile(eid ? eid : userInfo?.employeeId);
    const employeeData = employeeProfile.query.isSuccess && employeeProfile.query.data.listEmp ? employeeProfile.query.data?.listEmp[0] : null;

    return (
        <Container maxWidth='xl'>
            <Grid>
                <Grid container sx={{ my: 1 }}>
                    <PrimaryHeader label="Profile" />
                </Grid>
                <Banner />
                <Grid container >
                    {employeeData &&
                        <>
                            <Grid container sx={{ my: 1 }}>
                                <Card className="w-full pt-40 bg-[url('/assets/images/overlay.png')] bg-no-repeat bg-cover bg-center">
                                    <Grid container className='px-5 space-x-4 items-center'>
                                        <Grid item className='relative bottom-[-35px]'>
                                            <ColorAvatar {...(employeeData?.profileImageUrl
                                                ? {
                                                    imageUrl: employeeData?.profileImageUrl
                                                }
                                                : {
                                                    name: employeeData?.personalInfo?.firstName + ' ' + employeeData?.personalInfo?.lastName,
                                                    type: "full"
                                                }
                                            )} size={100} style={{ fontWeight: 600, fontSize: '30px', border: '2px solid #fff' }} />
                                        </Grid>
                                        <Grid item className='space-y-1'>
                                            <Typography sx={{ color: 'white', textTransform: 'capitalize' }} variant='h2'>{employeeData?.personalInfo?.firstName} {employeeData?.personalInfo?.lastName}</Typography>
                                            <Typography variant="h4">{employeeData?.professionalInfo.designation}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container className='justify-between items-center pl-[130px] py-2 pr-10 bg-[#212B36] color-[#fff]'>
                                        <Grid item className='space-x-5'>
                                            <a href={`tel:${employeeData?.personalInfo?.phoneNo}`} >
                                                <IconButton sx={{ color: 'white' }} aria-label="Contact" className='hover:text-primary'>
                                                    <HiPhone />
                                                </IconButton>
                                            </a>
                                            {/* <IconButton sx={{ color: 'white' }} aria-label="Chat" className='hover:text-primary'>
                                                <HiChatBubbleLeftRight />
                                            </IconButton> */}
                                            <a href={`mailto: ${employeeData?.workInfo?.emailId}`}>
                                                <IconButton sx={{ color: 'white' }} aria-label="Mail" className='hover:text-primary'>
                                                    <HiMiniEnvelopeOpen />
                                                </IconButton>
                                            </a>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h4">Reports To : {employeeData?.workInfo?.reportingManager}</Typography>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                            <Grid container className='pt-5 pb-10' spacing={3}>
                                <Grid item xs={12} md={4}>
                                    <Card className='p-5'>
                                        <Grid>
                                            <Grid>
                                                <Typography variant='h5'>About</Typography>
                                            </Grid>
                                            <Grid sx={{ pb: 2, pt: 3 }}>
                                                <Typography sx={{ fontWeight: 600 }} variant="caption">{employeeData?.personalInfo?.about}</Typography>
                                            </Grid>
                                            <Grid container spacing={2}>
                                                <Grid xs={12} item className='flex space-x-5 items-center'>
                                                    <HiOutlineMapPin size={22} />
                                                    <Typography variant="caption">{employeeData?.workInfo?.location}</Typography>
                                                </Grid>
                                                <Grid xs={12} item>
                                                    <a href={`mailto: ${employeeData?.workInfo?.emailId}`} className='flex space-x-5 items-center hover:text-primary'>
                                                        <HiOutlineEnvelopeOpen size={22} />
                                                        <Typography variant="caption">{employeeData?.workInfo?.emailId}</Typography>
                                                    </a>
                                                </Grid>
                                                <Grid xs={12} item>
                                                    <a href={`tel: ${employeeData?.personalInfo?.phoneNo}`} className='flex space-x-5 items-center hover:text-primary'>
                                                        <HiOutlinePhone size={22} />
                                                        <Typography variant="caption">{employeeData?.personalInfo.phoneNo}</Typography>
                                                    </a>
                                                </Grid>
                                                <Grid xs={12} item className='flex space-x-5 items-center'>
                                                    <HiOutlineBriefcase size={22} />
                                                    <Grid>
                                                        <Typography sx={{ fontWeight: 700 }} variant="caption">Role: </Typography>
                                                        <Typography variant="caption">{employeeData?.professionalInfo?.designation}</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Card className='p-5'>
                                        <Grid>
                                            <Grid>
                                                <Typography variant='h5'>Employee Details</Typography>
                                            </Grid>
                                            <Grid sx={{ pb: 2, pt: 3 }}>
                                                <Typography sx={{ fontWeight: 600 }} variant="caption">Skills:</Typography>
                                            </Grid>
                                            <Grid container spacing={2}>
                                                <Grid xs={12} item className='flex space-x-5 items-center'>
                                                    <HiOutlineUser size={22} />
                                                    <Grid>
                                                        <Typography sx={{ fontWeight: 700 }} variant="caption">Employee Code: </Typography>
                                                        <Typography variant="caption">{employeeData?.workInfo.employeeId}</Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid xs={12} item className='flex space-x-5 items-center'>
                                                    <HiOutlineShieldCheck size={22} />
                                                    <Grid>
                                                        <Typography sx={{ fontWeight: 700 }} variant="caption">HR: </Typography>
                                                        <Typography variant="caption">{employeeData?.workInfo.hr}</Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid xs={12} item className='flex space-x-5 items-start'>
                                                    <HiOutlineBriefcase size={22} />
                                                    <Grid>
                                                        <Grid>
                                                            <Typography sx={{ fontWeight: 700 }} variant="caption">BU: </Typography>
                                                            <Typography variant="caption">{employeeData?.workInfo.businessUnit}</Typography>
                                                        </Grid>
                                                        <Grid>
                                                            <Typography sx={{ fontWeight: 700 }} variant="caption">Project: </Typography>
                                                            <Typography variant="caption">{employeeData?.projectDetails.map(detail => detail.projectName).join(', ')}</Typography>
                                                        </Grid>
                                                        <Grid>
                                                            <Typography sx={{ fontWeight: 700 }} variant="caption">Joined: </Typography>
                                                            <Typography variant="caption">{moment(employeeData?.workInfo.dateOfJoining).format("DD MMMM YYYY")}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Card className='p-5'>
                                        <Grid>
                                            <Grid>
                                                <Typography variant='h5'>Personal Details</Typography>
                                            </Grid>
                                            <Grid container spacing={2} sx={{ pb: 2, pt: 3 }}>
                                                <Grid xs={12} item className='flex space-x-5 items-center'>
                                                    <HiOutlineCake size={22} />
                                                    <Grid>
                                                        <Typography sx={{ fontWeight: 700 }} variant="caption">Birthday: </Typography>
                                                        <Typography variant="caption">{moment(employeeData?.personalInfo.dateOfBirth).format("DD MMMM YYYY")}</Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid xs={12} item>
                                                    <a href={`mailto: ${employeeData?.personalInfo?.emailAddress}`} className='flex space-x-5 items-center hover:text-primary'>
                                                        <HiOutlineEnvelope size={22} />
                                                        <Typography variant="caption">{employeeData?.personalInfo.emailAddress}</Typography>
                                                    </a>
                                                </Grid>
                                                <Grid xs={12} item className='flex space-x-5 items-center'>
                                                    <HiOutlineBookOpen size={22} />
                                                    <Grid>
                                                        <Typography sx={{ fontWeight: 700 }} variant="caption">Qualification: </Typography>
                                                        <Typography variant="caption">{employeeData?.educationInfo[0].degreeName} ({employeeData?.educationInfo[0].stream})</Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid xs={12} item >
                                                    <a href={`https://${employeeData?.personalInfo?.linkedInAddress}`} className='flex space-x-5 items-center hover:text-primary' target="_blank" >
                                                        <HiLink size={22} />
                                                        <Typography variant="caption">{employeeData?.personalInfo.linkedInAddress}</Typography>
                                                    </a>
                                                </Grid>
                                                <Grid xs={12} item className='flex space-x-5 items-center'>
                                                    <HiOutlineHome size={22} />
                                                    <Grid>
                                                        <Typography sx={{ fontWeight: 700 }} variant="caption">Home Town: </Typography>
                                                        <Typography variant="caption">{ }</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                            </Grid>
                        </>
                    }
                    {employeeProfile.query.isSuccess && !employeeProfile.query.data.listEmp &&
                        <EmptyState title={NO_DATA} subTitle={'There are no Employees with given Employee Id!'} iconName='HiOutlineUser' />
                    }
                    {!employeeProfile.query.isSuccess &&
                        <>
                            <Grid container sx={{ my: 1 }}>
                                <Skeleton data-test-id="item-skeleton" className='item-skeleton' />
                            </Grid>
                            <Grid container className='pb-10' spacing={3}>
                                {generateCardSkeletons(3, true)}
                            </Grid>
                         </>
                    }
                </Grid>

            </Grid>
        </Container>
    );
}

export default withAuthentication(withBannerSupport(EmployeeProfile));