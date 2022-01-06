import React from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

// import { auth } from '../../firebase/firebase.utils';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

import './sign-in.styles.scss';

class SingIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }
    
    handleSubmit = async e => {
        e.preventDefault();

        const { emailSignInStart } = this.props;
        const { email,password } = this.state;

        emailSignInStart( email, password );
    }

    handleChange = event => {
        const { name,value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        const { googleSignInStart } = this.props;
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
                        <CustomButton type='button' onClick={googleSignInStart} isGoogleSingin> Sign in with Google </CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email,password) => dispatch(emailSignInStart({ email, password }))
})

export default connect(null,mapDispatchToProps)(SingIn);