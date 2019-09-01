import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';



  
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';

import red from '@material-ui/core/colors/red';
import { ValidatorComponent } from 'react-material-ui-form-validator';

const styles = theme => ({
    root: {
        flexGrow: 1, 
    },
    container: {
        flexGrow: 1,
        position: 'relative',
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0,
    },
    chip: {
        margin: theme.spacing(0.5, 0.25),
    },
    inputRoot: {
        flexWrap: 'wrap',
    },
    inputInput: {
        width: 'auto',
        flexGrow: 1,
    },
    divider: {
        height: theme.spacing(2),
    } 
});
 

 


 
class SelectValidatorElement extends ValidatorComponent {

    constructor ( props ) {
        super( props );
        
        this.state = {
            isValid: true
        }  
 
    }


     errorText() { 
        const { isValid } = this.state;

        if (isValid) {
            return null;
        }

        return (
            <div style={{ fontSize: '12px',  color: red['500'],}}>
                {this.getErrorMessage()}
            </div>
        );
    }

    
    localChangeOn = select => {
        const { name, onChange  } = this.props;
 
        const new_state = {};
        new_state[ "name" ] = name;
        new_state[ "value" ] = select; 
        onChange({ target:new_state });
        
    }
    localChange = (r, localOnChange, onChange) => {
        const { name  } = this.props;
        const value = r.target.value; 
        localOnChange(r);

        const new_state = {};
        new_state[ "name" ] = name;
        new_state[ "value" ] = { label : value, id : null}; 
        onChange({ target:new_state });
    }

    componentDidUpdate ( newProps, newStates) {  
        return this.props.value !== newProps.value;
    }
 
    getTextFiled = ( {getLabelProps, getInputProps} ) => { 
        const localOnChange  = getInputProps().onChange;

        const { errorMessages, validators, requiredError, value, onChange, validatorlistener, validatorListener, classes, ...rest } = this.props;
        const { isValid } = this.state;
  
    return (
        <>
 
            <TextField
                onChange={r => this.localChange(r, localOnChange, onChange)}  
                {...rest} 
                value={ value }
                error= { ! isValid }
            /> 
            {this.errorText()}
        </>
    );
}

 getSuggestions = (suggestions, value, { showEmpty = false } = {}) => {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;
  
    return inputLength === 0 && !showEmpty
      ? []
      : suggestions.filter(suggestion => {
          const keep =
            count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;
  
          if (keep) {
            count += 1;
          }
  
          return keep;
        });
  }
  renderSuggestion = (suggestionProps) => {
    const { suggestion, index, itemProps, highlightedIndex, selectedItem } = suggestionProps;
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;
  
    return (
      <MenuItem
        {...itemProps}
        key={suggestion.label}
        selected={isHighlighted}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {suggestion.label}
      </MenuItem>
    );
  }


 render() {
     const { classes, items  } = this.props;
      
    
     return ( <>

         <Downshift
             onChange={ e => this.localChangeOn( e ) }
             itemToString={item => (item ? item.label : '')}
         >
             {({
                 getInputProps,
                 getItemProps,
                 getLabelProps,
                 getMenuProps,
                 isOpen,
                 inputValue,
                 highlightedIndex,
                 selectedItem,
             }) => (

                <div className={classes.container}>
                     {
                             this.getTextFiled({ getLabelProps, getInputProps})
                         }
                        
              
  
                <div {...getMenuProps()}>


                {isOpen  ?     <Paper   className={classes.paper} square>
                    
                    
                    { items
                                     .filter(item => !inputValue || item.label.includes(inputValue))
                                     .slice(0, 5).map((item, index) =>
                                    
                                     (
                                        <MenuItem
                                        {...getItemProps({
                                            key: item.label,
                                            index,
                                            item,
                                            style: {
                                                backgroundColor:
                                                    highlightedIndex === index ? 'lightgray' : 'white',
                                                fontWeight: selectedItem === item ? 'bold' : 'normal',
                                            },
                                        })}
                                    >
                                        {item.label}
                                      </MenuItem>
                                     )
                                     )
                                    }

</Paper>
                                 : null}

 
                </div>
              </div>

 
                 )}
         </Downshift>


         </>
     );
    }  
   
}


SelectValidatorElement.propTypes = {
    classes: PropTypes.object.isRequired,
};
 
  
export default (withStyles(styles)(SelectValidatorElement));