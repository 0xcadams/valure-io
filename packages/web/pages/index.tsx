import * as React from 'react';

import {
  Button,
  createStyles,
  Grid,
  Theme,
  Typography,
  WithStyles,
  withStyles
} from '@material-ui/core';

import Link from '@components/Link';
import MainAnimation from '@components/MainAnimation';

import { default as asuLogo } from '@assets/images/asu_logo.png';
import { default as hcpLogo } from '@assets/images/hcp_logo.png';
import { default as impactiLogo } from '@assets/images/impacti_logo.png';

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

    trusted: {
      maxWidth: 520,
      marginTop: theme.spacing(3)
    },
    trustedText: {
      fontSize: '14px'
    },
    trustedImages: {
      paddingTop: theme.spacing(1),
      opacity: 0.85
    },
    trustedImage: {
      height: 50,

      [theme.breakpoints.down(750)]: {
        height: 35
      }
    },

    svgContainer: {
      overflowX: 'hidden',
      marginTop: theme.spacing(4),

      [theme.breakpoints.down(350)]: {
        marginTop: theme.spacing(62)
      },
      [theme.breakpoints.between(350, 400)]: {
        marginTop: theme.spacing(50)
      },
      [theme.breakpoints.between(400, 500)]: {
        marginTop: theme.spacing(30)
      },
      [theme.breakpoints.between(500, 600)]: {
        marginTop: theme.spacing(14)
      },
      [theme.breakpoints.between(600, 700)]: {
        marginTop: theme.spacing(24)
      },
      [theme.breakpoints.between(700, 900)]: {
        marginTop: theme.spacing(16)
      },
      [theme.breakpoints.between(900, 1200)]: {
        marginTop: theme.spacing(2)
      },
      [theme.breakpoints.up(1200)]: {
        marginTop: -theme.spacing(22)
      }
    }
  });

type IProps = WithStyles<typeof styles>;

const images: { image: string; href: string }[] = [
  {
    image: impactiLogo,
    href: 'https://impacti.solutions'
  },
  {
    image: asuLogo,
    href: 'https://decisioncenter.asu.edu'
  },
  {
    image: hcpLogo,
    href: 'https://homecareplusllc.com'
  }
];

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

          <div className={classes.trusted}>
            <Typography
              className={classes.trustedText}
              variant="overline"
              display="block"
              align="left"
            >
              Trusted by
            </Typography>

            <Grid
              className={classes.trustedImages}
              container
              justify="flex-start"
              spacing={4}
            >
              {images.map((value) => (
                <Grid key={value.href} item>
                  <a target="_blank" href={value.href}>
                    <img className={classes.trustedImage} src={value.image} />
                  </a>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </div>

      <div className={classes.svgContainer}>
        <MainAnimation />
      </div>
    </>
  );
};

export default withStyles(styles)(HomePage);
