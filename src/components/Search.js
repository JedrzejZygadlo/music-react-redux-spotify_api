import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Select from 'react-select';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Styles

const StyledForm = styled.form`
    width: 100%;
    padding: 2em;
    display: flex;
    flex-direction: row;
    justify-content: center;

`;
const StyledInput = styled.input`
    width: 100%;
    height: 36px;
    padding: 0px;
    border-radius: 2px;
    border-color: hsl(0,0%,80%);
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
`;
const StyledError = styled.p`
    color: red;
    font-size: 1em;
`;
const StyledSelect = styled(Select)`
    
`;  
const StyledButton = styled.button`
    background-color: transparent;
    border: none;
    margin-left: 0.4em;
    height: 38px;
`;
const StyledBox = styled.div`
    display: flex;
    flex-direction: column;
`;
const StyledSelectBox = styled.div`
    width: 10%;
    margin-left:0.2em;
`;
const StyledInputBox = styled.div`
    width:30%;
`;

// Helper variables
const optionsValues = [
    {
        label: 'artist',
        value: 'artist'
    },
    {
        label: 'album',
        value: 'album'
    },
    {
        label: 'playlist',
        value: 'playlist'
    }
]

//Component

class Search extends React.Component {
    renderError({error, touched}){
        if(touched && error){
            return (
                <StyledError>{error}</StyledError>
            )
        }
    }
    renderSelect = ({ input, options, meta}) => {
        return(
            <StyledSelectBox>
                <StyledSelect
                {...input}
                options={options}
                onChange={value => input.onChange(value)}
                onBlur={() => input.onBlur(input.value)}
                placeholder="Wybierz"
                />
                {this.renderError(meta)}
            </StyledSelectBox>
        )
    }
    renderInput = ({ input, meta }) => {
        console.log(meta);
        return(
            <StyledInputBox>
                <StyledInput {...input} placeholder="Szukaj...."/>
                {this.renderError(meta)}
            </StyledInputBox>
        )
    }
    onSubmit = (formValues) => {
        console.log(formValues);
        this.props.onSubmit(formValues);
    }
    render(){  
        return(
                <StyledForm onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field name="search" component={this.renderInput} />
                    <Field name="category" component={this.renderSelect} options={optionsValues}/>                  
                    <StyledButton>
                        <FontAwesomeIcon icon={['fas','search']} size="2x" color="green"/>
                    </StyledButton>
                    
                </StyledForm>
        )
    }
}
const validate = (formValues) => {
    console.log(formValues);
    const errors = {};
    if(!formValues.search) {
        errors.search = 'Musisz wpisać wyszukiwaną frazę';
    }
    if(!formValues.category) {
        errors.category = 'Musisz wybrać kategorie wyszukiwania'
    }
    return errors;
}
export default reduxForm({ form: 'search', validate })(Search);