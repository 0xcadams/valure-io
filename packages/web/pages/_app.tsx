import * as React from 'react';

import nextReduxWrapper from 'next-redux-wrapper';
import { default as App } from 'next/app';

import * as Sentry from '@sentry/node';

import { Provider } from 'react-redux';
import { Store } from 'redux';
import { Persistor, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import mobileDetect from 'mobile-detect';

import CssBaseline from '@material-ui/core/CssBaseline';

import Layout from '@components/Layout';
import ThemeProvider from '@components/ThemeProvider';
import TopLoading from '@components/TopLoading';
import store from '@redux/store';

Sentry.init({
  dsn: process.env.SENTRY_DSN_WEB,
  release: `@valure/web`
});

interface IProps extends React.Props<{}> {
  isMobileFromSSR: boolean;
  store: Store;
}

interface IState {
  persistor: Persistor;
}

class GlobalApp extends App<IProps, {}, IState> {
  constructor(props) {
    super(props);
    this.state = { persistor: persistStore(props.store) };
  }

  public static async getInitialProps({ ctx }) {
    const md: MobileDetect = new mobileDetect(
      (ctx.req && ctx.req.headers['user-agent']) || ''
    );
    const isMobileFromSSR: boolean = Boolean(md.mobile() && !md.tablet());

    return {
      isMobileFromSSR,
      pageProps: {},
      deviceInfo: {
        mobile: md.mobile(),
        os: md.os(),
        tablet: md.tablet(),
        userAgent: md.userAgent()
      }
    };
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  public render(): JSX.Element {
    const { Component, pageProps, store, isMobileFromSSR } = this.props;
    const { persistor } = this.state;

    return (
      <>
        <Provider store={store}>
          {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
          <ThemeProvider>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {/* Loading bar at top to indicate router events. */}
            <TopLoading />

            {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server-side. */}

            <Layout isMobile={isMobileFromSSR}>
              <PersistGate
                loading={<Component {...pageProps} />}
                persistor={persistor}
              >
                <Component {...pageProps} />
              </PersistGate>
            </Layout>
          </ThemeProvider>
        </Provider>
      </>
    );
  }
}

export default nextReduxWrapper(store)(GlobalApp);
