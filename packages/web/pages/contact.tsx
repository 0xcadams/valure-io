import * as React from 'react';
import { connect } from 'react-redux';

import {
  Button,
  createStyles,
  Paper,
  TextField,
  Theme,
  InputAdornment,
  Typography,
  WithStyles,
  withStyles
} from '@material-ui/core';

import { EmailRounded } from '@material-ui/icons';

import * as emailValidator from 'email-validator';

import * as SupportRequestActions from '@actions/SupportRequestActions';

import { IStore, ISupportRequestState, IUserState } from '@reducers';
import { ISupportRequest } from '@valure/core';

const mapDispatchToProps = {
  createSupportRequest: SupportRequestActions.createSupportRequest.request
};

const styles = (theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(4),
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: theme.breakpoints.values.md
    },
    intro: {
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: theme.breakpoints.values.sm
    },
    form: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: theme.spacing(6),
      maxWidth: theme.breakpoints.values.sm,
      padding: theme.spacing(4)
    },
    formWrapper: {
      width: '100%',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    textField: {
      marginBottom: theme.spacing(1)
    }
  });

interface IStateProps {
  user: IUserState;
  supportRequest: ISupportRequestState;
}

type IProps = IStateProps &
  typeof mapDispatchToProps &
  WithStyles<typeof styles>;

const ContactUsPage: React.FC<IProps> = ({
  classes,
  createSupportRequest,
  supportRequest,
  user: { isFetching }
}) => {
  const [issue, setIssue] = React.useState('');
  const [email, setEmail] = React.useState({ value: '', error: '' });

  const onFormSubmit = () => {
    const supportRequest: ISupportRequest = {
      issue,
      email: email.value,
      type: 'support'
    };
    createSupportRequest(supportRequest);
  };

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();

    const newEmail = event.target.value;
    const isEmailValid = emailValidator.validate(newEmail);

    setEmail({
      error: !isEmailValid ? 'Email must be valid.' : '',
      value: newEmail
    });
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.intro}>
          <Typography gutterBottom align="center" variant="h4">
            Contact Us
          </Typography>

          <Typography gutterBottom align="center" variant="h6">
            We are available to answer any questions!
          </Typography>
        </div>

        <div className={classes.formWrapper}>
          <Paper className={classes.form}>
            {supportRequest.supportRequest &&
            supportRequest.supportRequest.issue ? (
              <Typography gutterBottom align="center" variant="body1">
                Your request, "{supportRequest.supportRequest.issue}", has been
                submitted! Thank you for taking the time to reach out - our team
                will contact you shortly.
              </Typography>
            ) : (
              <>
                <Typography gutterBottom variant="body1">
                  We have extensive experience with managing projects, providing
                  accurate quotes, and delivering quality products on schedule
                  and on budget. Reach out to us about any of your software
                  consulting needs and we will contact you within 24 hours.
                </Typography>
                <TextField
                  error={Boolean(email.error)}
                  id="contact-email"
                  label="What email can we use to contact you?"
                  className={classes.textField}
                  value={email.value}
                  type="email"
                  fullWidth
                  onChange={onChangeEmail}
                  margin="normal"
                  variant="outlined"
                  disabled={isFetching}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailRounded />
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                  id="contact-issue"
                  label="What request(s) do you have?"
                  className={classes.textField}
                  value={issue}
                  multiline
                  fullWidth
                  onChange={(e) => setIssue(e.target.value)}
                  margin="normal"
                  variant="outlined"
                  disabled={isFetching}
                />
                <Button
                  id="contact-ok-btn"
                  onClick={onFormSubmit}
                  fullWidth
                  size="large"
                  color="primary"
                  variant="contained"
                  disabled={
                    !email.value ||
                    Boolean(email.error) ||
                    !Boolean(issue && issue.length > 10) ||
                    isFetching ||
                    supportRequest.isFetching
                  }
                >
                  Submit
                </Button>
              </>
            )}
          </Paper>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: IStore): IStateProps => ({
  supportRequest: state.supportRequest,
  user: state.user
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ContactUsPage));
