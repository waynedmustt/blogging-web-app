import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { coreService } from '../../core/service';

const Navbar = () => {
    const history = useHistory();
    const [menus, setMenus] = useState([
        {
            id: 'list',
            title: 'Blog List',
            isActive: true,
            onClick: (e, menuId) => {
                e.preventDefault()
                setActiveMenu(menuId)
            }
        },
        {
            id: 'manage',
            title: 'Manage Blog',
            isActive: false,
            onClick: (e, menuId) => {
                e.preventDefault()
                setActiveMenu(menuId)
            }
        },
        {
            id: 'logout',
            title: 'Logout',
            isActive: false,
            onClick: (e) => {
                e.preventDefault()
                coreService.removeItem('isLoggedIn')
                coreService.removeItem('accessToken')
                history.push('/auth/login')
            }
        }
    ]);

    useEffect(() => {
        setNewMenus();
        // eslint-disable-next-line
    }, [])

    const setNewMenus = () => {
        const activeMenu = coreService.getItem('activeMenu');
        let selectedMenu = menus.find(menu => menu.id === activeMenu);
        if (typeof selectedMenu === 'undefined') {
            return;
        }

        const newMenus = menus.map((menu) => {
            return {
                ...menu, 
                isActive: coreService.getItem('activeMenu') === menu.id ? true : false
            }
        });
        setMenus(newMenus);
    }

    const setActiveMenu = (menuId) => {
        coreService.setItem('activeMenu', menuId);
        setNewMenus();
        history.push(`/app/blog/${menuId}`)
    }
    return(
        <React.Fragment>
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                {menus.map((menu, i) => (
                    <li className="nav-item" key={i}>
                        <a className={`nav-link ${menu.isActive ? 'active' : ''}`} href="# " 
                        onClick={(e) => menu.onClick(e, menu.id)}
                        >{menu.title}</a>
                    </li>
                ))}
            </ul>
        </React.Fragment>
    );
}

export default Navbar;