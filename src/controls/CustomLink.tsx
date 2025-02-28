import React, { forwardRef, ReactNode, Ref } from 'react';
import { Link, LinkProps, useLocation } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import IconElement from '../util/commonUtility';

interface CustomLinkProps extends LinkProps {
  children: ReactNode;
  bgColor?: string;
  txtColor?: string;
  iconName?: string;
  open: boolean;
  name: string;
}

const CustomLink = forwardRef(
  (
    { children, to, bgColor, name, iconName, open, txtColor, ...rest }: CustomLinkProps,
    ref: Ref<HTMLAnchorElement>
  ) => {
    const location = useLocation();

    // Determine if the link is active based on both path and query parameters
    const isActive = location.pathname === to;

    return (
      <Tooltip title={!open ? name : null} enterDelay={500} enterNextDelay={300} arrow>
        <Link
          to={to}
          {...rest}
          className={`${isActive ? `${bgColor} ${txtColor} text-medium` : 'transparent text-bodyColor font-normal'} flex items-center`}
          style={open ? { padding: 10, marginBlock: -5, marginRight: 5, marginLeft: 20, borderRadius: '12px' } : { padding: '8px 5px', width: '100%', justifyContent: 'center', borderRadius: '4px' }}
          ref={ref}
        >
          {iconName && (
            <>
              <IconElement iconName={iconName.toString()} size={22} classes={open ? 'mr-3' : ''} />
            </>
          )}
          {children}
        </Link>
      </Tooltip>
    );
  }
);

export default CustomLink;
