import React from 'react'
import { MenuList } from './MenuList'
import { NavLink } from 'react-router-dom';
const Navbar = () => {
    console.log("Navbar");
    const menuList = MenuList.map(({ url, title }, index) => {
        return (
            <NavLink to={url} exact key={index} className="item" activeClassName="active" style={{ float: "left" }}>{title}</NavLink>
        );
    });
    return (
        <div style={{ marginBottom: "100px" }}>
            <div className="ui fixed top menu">
                <div className="item">
                    <i class="address card icon yellow" style={{ fontSize: "50px", margin: "-10px 25px" }}></i>
                </div>
                {menuList}
            </div>
        </div>
    );
}
export { Navbar };