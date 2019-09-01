import React, { Component } from 'react';



import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';


import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box'; 
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


import FormControl from '@material-ui/core/FormControl';




import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';




import './App.css';
import TextFiledAutosuggest from './Autosuggest';



const styles = theme => ({
'@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
      container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

 











const items = [
    { label: 'Afghanistan' },
    { label: 'Aland Islands' },
    { label: 'Albania' },
    { label: 'Algeria' },
    { label: 'American Samoa' },
    { label: 'Andorra' },
    { label: 'Angola' },
    { label: 'Anguilla' },
    { label: 'Antarctica' },
    { label: 'Antigua and Barbuda' },
    { label: 'Argentina' },
    { label: 'Armenia' },
    { label: 'Aruba' },
    { label: 'Australia' },
    { label: 'Austria' },
    { label: 'Azerbaijan' },
    { label: 'Bahamas' },
    { label: 'Bahrain' },
    { label: 'Bangladesh' },
    { label: 'Barbados' },
    { label: 'Belarus' },
    { label: 'Belgium' },
    { label: 'Belize' },
    { label: 'Benin' },
    { label: 'Bermuda' },
    { label: 'Bhutan' },
    { label: 'Bolivia, Plurinational State of' },
    { label: 'Bonaire, Sint Eustatius and Saba' },
    { label: 'Bosnia and Herzegovina' },
    { label: 'Botswana' },
    { label: 'Bouvet Island' },
    { label: 'Brazil' },
    { label: 'British Indian Ocean Territory' },
    { label: 'Brunei Darussalam' },
];


 

class App extends Component {

  constructor(props) {
      super(props)

      this.defaultState = {
          name: '',
          email: '',
          location: { label: "", id: 0}
      };

      this.state = { ...this.defaultState }
  }



    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
 
            const update = {};
            update[name] = value; 
 
            this.setState( update );  
         
    }
 render() {


        const { classes } = this.props;

 

          const { name, email, location } = this.state;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
         
          <Typography component="h1" variant="h5">
           material ui form validation with autocomplete
          </Typography>
         







                  <ValidatorForm className={classes.form}

                                onSubmit={ e => alert("good to go")}
                      onError={errors => this.formError(errors)}
                  >


                      <FormControl margin="dense" required fullWidth>


                          <FormControl margin="dense" required fullWidth>

                              <TextValidator
                                  margin="dense"
                                  fullWidth
                                  autoComplete="email"
                                  onChange={this.handleChange}
                                  label="Email Address * "
                                  name="email"
                                  value={email}
                                  id="email"
                                  variant="outlined"
                                  autoFocus
                                  validators={['required', 'isEmail']}
                                  errorMessages={['this field is required', 'email is not valid']}
                              />

                          </FormControl>

                          <TextValidator
                              margin="dense"
                              fullWidth
                              autoComplete="name"
                              onChange={this.handleChange}
                              label="Admin Name *"
                              name="name"
                              value={name}
                              id="name"
                              variant="outlined" 
                              validators={['required', 'minStringLength:2']}
                              errorMessages={['Admin name is required', ' Name must be at least 2 characters']}
                          />

                      </FormControl>


                    

                      <FormControl margin="dense" required fullWidth>

                          <TextFiledAutosuggest
                          
                              margin="dense"
                              fullWidth
                              autoComplete="location"
                              onChange={this.handleChange}
                              label=" Assign Location *"
                              name="location"
                              value={location.label }
                              id="location"
                              items= { items }
                              variant="outlined"
                              validators={['required', 'minStringLength:2']}
                              errorMessages={['Location is required', ' Name must be at least 2 characters']}

                          />
          

                      </FormControl>


                      {/* <FormHelperText error>
                          <span> {error.message}</span>
                      </FormHelperText> */}


                      <Button
                          type="submit"
                          fullWidth
                          color="primary"
                          variant="contained" 
                          mt={2}
                          className={classes.submit}                       >
                         Submit
          </Button>


          

                  </ValidatorForm>



        </div>
         
      </Container>
    );
  }
}
 

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default (withStyles(styles)(App));