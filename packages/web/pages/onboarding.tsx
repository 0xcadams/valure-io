import * as React from 'react';
import { connect } from 'react-redux';

import * as emailValidator from 'email-validator';

import {
  createStyles,
  IconButton,
  InputAdornment,
  TextField,
  Theme,
  Typography,
  WithStyles,
  withStyles
} from '@material-ui/core';

import { default as houseModernSvg } from '@assets/svgs/house-modern.svg';

import { createLead } from '@actions/LeadActions';

import { logEvent } from '@api/analytics';
import { SendRounded } from '@material-ui/icons';
import { ILeadState, ISearchState, IStore } from '@reducers';
import { useRouter } from 'next/router';

const styles = (theme: Theme) =>
  createStyles({
    landingContainer: {
      marginTop: theme.spacing(12),
      [theme.breakpoints.down('xs')]: {
        marginTop: theme.spacing(8)
      },

      marginLeft: 'auto',
      marginRight: 'auto',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      maxWidth: theme.breakpoints.values.md,

      textAlign: 'center'
    },
    svg: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(2),
      maxWidth: 500,

      marginLeft: 'auto',
      marginRight: 'auto'
    }
  });

interface IStateProps {
  lead: ILeadState;
  search: ISearchState;
}

const mapDispatchToProps = {
  createLead: createLead.request
};

type IProps = WithStyles<typeof styles> &
  IStateProps &
  typeof mapDispatchToProps;

const OnboardingPage: React.FC<IProps> = ({
  classes,
  search: { autocompletePredictions },
  lead: { isFetching },
  createLead
}) => {
  const { query } = useRouter();
  const [email, setEmail] = React.useState({ value: '', error: '' });

  const prediction = autocompletePredictions.find(
    (e) => e.place_id === query.id
  );

  const locationText =
    prediction &&
    (prediction.structured_formatting.secondary_text &&
    prediction.structured_formatting.secondary_text.includes(', USA')
      ? prediction.structured_formatting.secondary_text.slice(
          0,
          prediction.structured_formatting.secondary_text.lastIndexOf(',')
        )
      : prediction.structured_formatting.secondary_text);

  React.useEffect(() => {
    if (locationText) {
      logEvent({
        category: 'Onboarding',
        action: 'Search',
        label: locationText
      });
    }
  }, [locationText]);

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();

    const newEmail = event.target.value;
    const isEmailValid = emailValidator.validate(newEmail);

    setEmail({
      error: !isEmailValid ? 'Email must be valid.' : '',
      value: newEmail
    });
  };

  const onSubmit = () => {
    createLead({
      email: email.value,
      address: prediction && prediction.description,
      city:
        prediction &&
        prediction.structured_formatting &&
        prediction.structured_formatting.secondary_text
    });
    setEmail({ value: '', error: '' });
  };

  return (
    <div className={classes.landingContainer}>
      <Typography variant="h3" gutterBottom>
        Coming soon!
      </Typography>
      <Typography>
        {'Bummer, '}
        {locationText ? locationText : 'your area'}
        {' is not supported yet.'}
        {' We are expanding every day - please check back soon.'}
      </Typography>
      <img alt="House Modern" className={classes.svg} src={houseModernSvg} />

      <Typography gutterBottom>
        {'Sign up to get updates from Valure on availability in your area!'}
      </Typography>
      <TextField
        error={Boolean(email.error)}
        id="auth-modal-email"
        label="Email Address"
        type="email"
        value={email.value}
        onChange={onChangeEmail}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                disabled={isFetching}
                color="primary"
                aria-label="subscribe to updates"
                onClick={onSubmit}
              >
                <SendRounded />
              </IconButton>
            </InputAdornment>
          )
        }}
        onKeyPress={(ev) => {
          if (ev.key === 'Enter') {
            ev.preventDefault();
            onSubmit();
          }
        }}
        helperText={email.error}
        margin="normal"
        variant="outlined"
        disabled={isFetching}
      />
    </div>
  );
};

export default withStyles(styles)(
  connect(
    (state: IStore): IStateProps => ({
      search: state.search,
      lead: state.lead
    }),
    mapDispatchToProps
  )(OnboardingPage)
);
