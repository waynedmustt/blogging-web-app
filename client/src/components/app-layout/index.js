import React from 'react';
import Header from './header';
import Footer from './footer';

const AppLayout = (props) => {
    const { children } = props;
    return (
        <React.Fragment>
            <Header />
                {children}
            <Footer />
        </React.Fragment>
    );
}

export default AppLayout;