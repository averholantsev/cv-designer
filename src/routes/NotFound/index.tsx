import { Box, Button, makeStyles } from '@material-ui/core';
import { routerConfig } from 'config/router';
import Wrapper from 'hoc/Wrapper';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(({ spacing }) => ({
  img: {
    maxWidth: 400,
    width: '100%'
  },
  btn: {
    marginTop: spacing(2),
    width: 'fit-content'
  }
}));

const NotFound: FC = () => {
  const classes = useStyles();
  return (
    <Wrapper routerConfig={routerConfig.NOT_FOUND} noHeader>
      <Box display="flex" flexDirection="column" alignItems="center">
        <img src="/imgs/404-page-not-found.png" className={classes.img} />
        <Button
          component={Link}
          to={routerConfig.CV.path()}
          variant="contained"
          color="primary"
          className={classes.btn}
        >
          На главную
        </Button>
      </Box>
    </Wrapper>
  );
};

export default NotFound;
