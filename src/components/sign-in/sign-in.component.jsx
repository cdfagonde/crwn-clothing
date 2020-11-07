import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

class SingIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }
    
    handleSubmit = e => {
        e.preventDefault();

        this.setState({ email: '', password: '' });
    }

    handleChange = event => {
        const { name,value } = event.target;

        this.setState({ [name]: value });
    }

    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your e-mail and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        name='email' 
                        type='email' 
                        handleChange={this.handleChange}
                        value={this.state.email} 
                        label='email'
                        required />
                    <FormInput
                        name='password' 
                        type='password' 
                        handleChange={this.handleChange}
                        value={this.state.password} 
                        label='password' />

                    <div className='buttons'>
                        <CustomButton type='submit' > Sign in </CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSingin> Sign in with Google </CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SingIn;