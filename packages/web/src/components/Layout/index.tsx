import * as React from 'react';

import { NextSeo } from 'next-seo';
import { default as router, useRouter } from 'next/router';

import { initGA, logPageView } from '@api/analytics';

import AuthModal from '@components/AuthModal';
import Authorization from '@components/Authorization';
import Footer from '@components/Footer';
import Header from '@components/Header';
import Snackbar from '@components/Snackbar';
import { fontFamily } from '@components/ThemeProvider';

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    '@global': {
      body: {
        fontFamily,
        margin: 0
      },
      html: {
        height: '100%',
        margin: 0
      },
      a: {
        color: theme.palette.type === 'dark' ? 'white' : 'inherit'
      },
      '#__next': {
        height: '100%',
        width: '100%',
        margin: 0
      }
    }
  });

type IProps = WithStyles<typeof styles> & {
  isMobile: boolean;
};

const getTitle = (pathname: string) => {
  switch (pathname) {
    case '/about':
      return 'About Us';
    case '/contact':
      return 'Contact Us';
    case '/feedback':
      return 'Provide Feedback';
    case '/privacy':
      return 'Privacy Policy';
    case '/profile':
      return 'Your Profile';
    case '/support':
      return 'Support';
    case '/terms':
      return 'Terms of Use';
    case '/verify':
      return 'Verify';
    case '/':
      return 'Home';

    case '/onboarding':
      return 'Onboarding';
    default:
      return 'By Valure';
  }
};

const Layout: React.FC<IProps> = ({ children, isMobile }) => {
  const { pathname } = useRouter();

  React.useEffect(() => {
    initGA();
    logPageView();

    if (router.router) {
      router.router.events.on('routeChangeComplete', logPageView);
    }
    return () => {
      if (router.router) {
        router.router.events.off('routeChangeComplete', logPageView);
      }
    };
  }, []);

  const description =
    'Valure makes vacation rentals simple. Get an instant quote and avoid the hassle of property management.';

  return (
    <>
      <NextSeo
        title={getTitle(pathname)}
        description={description}
        titleTemplate="Valure | %s"
        openGraph={{
          site_name: 'Valure'
        }}
      />
      <AuthModal />
      <Snackbar />
      <Header isMobile={isMobile} />
      <Authorization>{children}</Authorization>
      <Footer />
    </>
  );
};

export default withStyles(styles)(Layout);
