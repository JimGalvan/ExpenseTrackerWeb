import React from 'react';
import {Container} from '@mantine/core';
import Header from './Header';

const Layout = ({children}: { children: React.ReactNode }) => {
    return (
        <>
            <Header/>
            <Container>
                {children}
            </Container>
        </>
    );
};

export default Layout;