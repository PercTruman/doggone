import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import FullNavbar from './FullNavbar';
import SmallNavbar from './SmallNavbar';

const Navbar = () => {
	const { loggedIn } = useContext(UserContext);

	return loggedIn ? <FullNavbar /> : <SmallNavbar />;
};

export default Navbar;
