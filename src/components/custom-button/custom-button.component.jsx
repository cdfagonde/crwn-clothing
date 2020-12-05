import React from 'react';

/*
  Versão inicial usando scss.
*/
import './custom-button.styles.scss';

const CustomButton = ({ children, isGoogleSingin, inverted, ...otherProps}) => (
    <button 
        className={`${inverted ? 'inverted' : ''} ${isGoogleSingin ? 'google-sign-in' : '' } custom-button`}
        {...otherProps}>
        {children}
    </button>
);

/*
  Versão usando styles-components.
*/

// import { CustomButtonContainer } from './custom-button.styles';

// const CustomButton = ({children, ...props}) => (
//     <CustomButtonContainer {...props}>{children}</CustomButtonContainer>
// );

export default CustomButton;