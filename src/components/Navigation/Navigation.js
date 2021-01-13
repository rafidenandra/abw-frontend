import React from 'react';

// CSS
import './Navigation.css';

const Navigation = ({onRouteChange, isSignedIn}) => {
    if (isSignedIn) {
        return(
            <nav class="navbar">
                <div class="container-fluid">
                    <a href="#0" class="navbar-brand"><img src="images/FaceDetect.png" alt="" width="40" height="40" />Face Detect</a>
                    <form class="d-flex">
                        <button className="d-flex signout-btn" onClick={() => onRouteChange('signout')}>SIGN OUT</button>
                    </form>
                </div>
            </nav>
        );
    } else {
        return(
            <div></div>
        );
    }
}

export default Navigation;