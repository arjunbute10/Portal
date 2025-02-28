import { Grid, Skeleton } from "@mui/material";
import clsx from "clsx";
import moment from "moment";
import React from "react";
import * as hi2Icons from "react-icons/hi2";

type IconProps = {
    iconName?: string,
    size?: number,
    classes?: string,
}

export default function IconElement({ classes, iconName = 'HiOutlineHome', size = 30 }: IconProps) {
    const IconComponent = (hi2Icons as any)[iconName];
    return IconComponent ? <IconComponent className={classes} size={size} /> : null;
}

export function isWeekend(date: any) {
    const day = date.day();
    return day === 0 || day === 6;
};

export function toCapitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}


export const getLeaveTypeName = (leaveType: string) => {
    switch (leaveType) {
        case 'CASUAL_LEAVE':
            return "Casual Leave";
        case 'WORK_FROM_HOME':
            return "Work From Home";
        case 'SICK_LEAVE':
            return "Sick Leave";
        case 'MATERNITY_LEAVE':
            return "Maternity Leave";
        default:
            return leaveType;
    }
};

export const formatDate = (date: any, dateFormat: string = "YYYY-MM-DD") =>
    date ? moment(date).format(dateFormat) : null;
export const cleanNestedData = (data: any) => {
    // Recursive function to check if an object or array contains only null/undefined/empty values
    const checkNullUndefinedEmpty = (obj: any): boolean => {
      if (obj instanceof Date) {
        return false; // Dates should not be considered empty
      }
  
      if (Array.isArray(obj)) {
        // Check if all elements in the array are empty
        return obj.every((item) => checkNullUndefinedEmpty(item));
      } else if (typeof obj === "object" && obj !== null) {
        // Check if all properties of the object are empty
        return Object.values(obj).every((value) => checkNullUndefinedEmpty(value));
      }
      // Base case: return true if primitive is null/undefined/empty string
      return obj === null || obj === undefined || obj === "";
    };
  
    // Recursive function to clean nested objects and arrays
    const cleanRecursive = (obj: any): any => {
      if (obj instanceof Date) {
        return obj; // Do not clean Date objects
      }
  
      if (Array.isArray(obj)) {
        // Filter array to remove null/undefined/empty items, then recursively clean its items
        return obj.filter((item) => !checkNullUndefinedEmpty(item)).map(cleanRecursive);
      } else if (typeof obj === "object" && obj !== null) {
        // Recursively clean each property of the object
        Object.keys(obj).forEach((key) => {
          obj[key] = cleanRecursive(obj[key]);
        });
        // Return undefined if the entire object is empty
        return checkNullUndefinedEmpty(obj) ? undefined : obj;
      }
      return obj; // Return primitive values as is
    };
  
    // Start cleaning the root data object
    return cleanRecursive(data);
  };

export const generateCardSkeletons = (amount: number, large: boolean = false) => {
    const skeletons: JSX.Element[] = [];
    let i: number = 0;

    while (i < amount) {
        skeletons.push(
            <Grid item key={i} xs={12} md={4} lg={4}>
                <Skeleton data-test-id="item-skeleton" key={i} className={clsx('item-skeleton', {"item-skeleton-large": large})} />
            </Grid>
        );
        i++;
    }
    return (
        <React.Fragment>
            {skeletons}
        </React.Fragment>
    );
};

//  const getEmployeeId = () => {
//     const { userInfo } = useUser();
//     // const [empId, setEmpId] = useState(userInfo.employeeId);
  
//     // useEffect(() => {
//     //   if (userInfo) {
//     //     setEmpId(userInfo.employeeId);
//     //   }
//     // }, [useUser]);
  
//     // return empId;
//   };

//   export default getEmployeeId;


// export function getEmployeeId() {
//     const { userInfo } = useUser();

//     if (userInfo) {
//         return userInfo.employeeId;
//     }

//     return '';
// };

// export function Transition({ direction= 'left' }: Slid , ...props }) {
//     return <Slide {...props} direction={direction} />;
// }




// export function convertCamelToSentence(inputString: string, capitalizeFirst = false) {
//     let result = inputString
//         .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space before capital letters
//         .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2') // Handle consecutive capital letters
//         .replace(/^./, (str) => (capitalizeFirst ? str.toUpperCase() : str.toLowerCase())); // Capitalize first letter if specified

//     return result;
// }