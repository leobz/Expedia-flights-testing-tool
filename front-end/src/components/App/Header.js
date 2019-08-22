import React from 'react';
import {Link} from 'react-router-dom';
import {
    Navbar, NavItem
} from 'react-bootstrap';

const Header = () => {
    return (
        <header>
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <NavItem>
                            <Link to={'/'}>
                                Inicio
                            </Link>
                        </NavItem>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
            </Navbar>
        </header>
    );
};

export default Header;
