import Box, { BoxProps } from '@material-ui/core/Box';
import React, { Children, FC, ReactNode } from 'react';

interface ISpacerProps extends BoxProps {
  children: ReactNode;
  fullWidth?: boolean;
  spacing?: number;
  flexDirection?: 'row' | 'column';
}

export const Spacer: FC<ISpacerProps> = ({
  children,
  fullWidth = false,
  spacing = 1,
  flexDirection = 'row',
  ...props
}: ISpacerProps) => {
  const childrenLength = Children.toArray(children).length;

  return (
    <Box
      display="flex"
      flexDirection={flexDirection}
      width={fullWidth ? '100%' : 'fit-content'}
      {...props}
    >
      {children
        ? Children.toArray(children).map((item, index) => (
            <Box
              key={index}
              {...(flexDirection === 'row' && childrenLength !== index + 1
                ? { mr: spacing }
                : null)}
              {...(flexDirection === 'column' && childrenLength !== index + 1
                ? { mb: spacing }
                : null)}
            >
              {item}
            </Box>
          ))
        : null}
    </Box>
  );
};
