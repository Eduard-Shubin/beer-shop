import { Outlet } from 'react-router-dom'

import Navigation from '../Navigation/Navigation'

const Layout = () => (
    <>
        <Navigation />
        <Outlet />
    </>
)

export default Layout
