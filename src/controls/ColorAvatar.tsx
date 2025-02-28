import React from 'react';
import Avatar from '@mui/material/Avatar';
import { green, blue, red, orange, pink, purple, indigo, amber, blueGrey, brown, cyan, deepOrange, deepPurple, grey, lightBlue, lightGreen, lime, teal, yellow } from '@mui/material/colors';

interface ColorAvatarProps {
  name?: string;
  type?: string;
  size?: number;
  imageUrl?: string;
  style?: React.CSSProperties;
}

const getColorFromInitial = (initial: string) => {
  const colorMap: { [key: string]: string } = {
    A: red[500],
    B: pink[500],
    C: purple[500],
    D: deepPurple[500],
    E: indigo[500],
    F: blue[500],
    G: lightBlue[500],
    H: cyan[500],
    I: teal[500],
    J: green[500],
    K: lightGreen[500],
    L: lime[500],
    M: yellow[500],
    N: amber[500],
    O: orange[500],
    P: deepOrange[500],
    Q: brown[500],
    R: grey[500],
    S: blueGrey[500],
    T: teal[500],
    U: cyan[500],
    V: indigo[500],
    W: blue[500],
    X: lightBlue[500],
    Y: green[500],
    Z: lightGreen[500],
    default: deepPurple[500],
  };

  const firstLetter = initial?.toUpperCase();
  return colorMap[firstLetter] || colorMap.default;
};

const ColorAvatar: React.FC<ColorAvatarProps> = ({ name = 'User', size = 40, type = 'initial', imageUrl, style }) => {
  const initial = name?.charAt(0);
  const initials = name.split(' ').map(word => word[0]);

  const color = getColorFromInitial(initial);

  return (
    <>
      { imageUrl ?
        <Avatar alt={type == 'initial' ? initial : initials.join('')} sx={{ width: size, height: size }} src={imageUrl} /> : 
        <Avatar src={imageUrl} style={style} sx={{ textTransform: 'uppercase', backgroundColor: color, width: size, height: size, ...(type != 'initial' && { fontSize: '22px' }) }}>{type == 'initial' ? initial : initials.join('')}</Avatar>
      }
    </>
  );
};

export default ColorAvatar;
