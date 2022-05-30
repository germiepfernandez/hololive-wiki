import React from 'react';
import Header from './Header';
import { Loader } from '../components';

const Layout = ({ children }) => {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <div className="grow relative container mx-auto mb-8 px-10">{children}</div>
        </div>
    );
};

export default Layout;
