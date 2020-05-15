import * as React from 'react';

import {
  Button,
  // Paper,
  createStyles,
  Theme,
  Typography,
  WithStyles,
  withStyles
} from '@material-ui/core';

import Link from '@components/Link';
import MainAnimation from '@components/MainAnimation';
// import SearchAutocomplete from '@components/SearchAutocomplete';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',

      top: theme.spacing(22),
      [theme.breakpoints.down('xs')]: {
        top: theme.spacing(14)
      },

      left: 0,
      right: 0
    },
    landingContainer: {
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      maxWidth: theme.breakpoints.values.md
    },
    title: {
      fontFamily: 'campaign, sans-serif'
    },
    subtitle: {
      maxWidth: 520,
      marginBottom: theme.spacing(4)
    },
    searchPaper: {
      position: 'relative',
      marginTop: theme.spacing(7),
      maxWidth: 550,
      [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(5)
      }
    },

    svgContainer: {
      overflowX: 'hidden',
      marginTop: theme.spacing(4),

      [theme.breakpoints.down(500)]: {
        marginTop: theme.spacing(20)
      },
      [theme.breakpoints.between(500, 700)]: {
        marginTop: theme.spacing(2)
      },
      [theme.breakpoints.between(700, 900)]: {
        marginTop: 0
      },
      [theme.breakpoints.between(900, 1200)]: {
        marginTop: -theme.spacing(10)
      },
      [theme.breakpoints.up(1200)]: {
        marginTop: -theme.spacing(28)
      }
    }
  });

type IProps = WithStyles<typeof styles>;

const HomePage: React.FC<IProps> = ({ classes }) => {
  return (
    <>
      <div className={classes.root}>
        <div className={classes.landingContainer}>
          <Typography variant="h3" gutterBottom className={classes.title}>
            Beautiful software,
            <br />
            for everyone
          </Typography>
          <Typography variant="h5" className={classes.subtitle}>
            Valure is comprised of a group of highly talented software
            engineers, designers, and project managers with years of industry
            experience. Receive an instant quote and avoid the hassle of finding
            amazing talent.
          </Typography>

          <Link href="/contact">
            <Button color="secondary" variant="contained">
              Get a quote
            </Button>
          </Link>
        </div>
      </div>

      <div className={classes.svgContainer}>
        <MainAnimation />
      </div>
    </>
  );
};

export default withStyles(styles)(HomePage);
