import { CardActions, IconButton, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { HiOutlineChatBubbleLeftRight, HiOutlineEnvelopeOpen, HiOutlinePhone } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { AllEmployeeRecords } from "../pages/employee/Employee.model";
import ColorAvatar from "./ColorAvatar";

type CardProps = {
  item: AllEmployeeRecords
};

export default function DefaultCard({ item }: CardProps) {
  const navigate = useNavigate();

  return (
    <>
      {item != null &&
        <Card className="px-2 py-5 cursor-pointer" onClick={() => navigate(`/employee-profile/${item.employeeId}`)}>
          <CardContent className='flex items-center'>
            <Box className='w-1/4'>

              <ColorAvatar {...(item?.profileImageUrl
                ? {
                  imageUrl: item?.profileImageUrl,
                  name: item?.name,
                  type: 'full'
                }
                : {
                  name: item?.name,
                  type: 'full'
                }
              )} size={70} />

            </Box>
            <Box className='w-3/4'>
              <Typography variant="h5" sx={{ pb: 0.5, textTransform: 'capitalize' }}>{item.name}</Typography>
              <Typography variant="body1"><b>Role:</b> {item.role}</Typography>
              <Typography variant="body1"><b>Project:</b> {item.projectName.join(', ')}</Typography>
              <Tooltip title={item.email} arrow>
                <Typography variant="body1" className="truncate"><b>Email:</b> <a onClick={(e) => { e.stopPropagation() }} href={`mailto: ${item.email}`} className="hover:text-primary">{item.email}</a></Typography>
              </Tooltip>
            </Box>
          </CardContent>
          <CardActions disableSpacing className='flex justify-center items-center'>
            <IconButton aria-label="Contact" className='hover:text-primary' onClick={(e) => { e.stopPropagation(); }}>
              {/* <a href={`tel:${item.phoneNo}`}> */}
              <HiOutlinePhone />
              {/* </a> */}
            </IconButton>
            <IconButton aria-label="Mail" className='hover:text-primary' onClick={(e) => { e.stopPropagation() }}>
              <a href={`mailto: ${item.email}`}>
                <HiOutlineEnvelopeOpen />
              </a>
            </IconButton>
            {/* <IconButton aria-label="Chat" className='hover:text-primary' onClick={(e) => { e.stopPropagation() }}>
              <HiOutlineChatBubbleLeftRight />
            </IconButton> */}
          </CardActions>
        </Card >
      }
    </>
  )
};