import React from "react";
import "./Sidebar.css";
import amazonIcon from "../assets/icon.svg";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";
import BookmarksRoundedIcon from "@material-ui/icons/BookmarksRounded";
import WatchLaterRoundedIcon from "@material-ui/icons/WatchLaterRounded";
import { NavLink, useHistory } from "react-router-dom";
import defaultImage from "../assets/default.jpg";
import ReactTooltip from "react-tooltip";
import { useStateValue } from "../StateProvider";

const iconStyle = (fontsize) => {
  return {
    fill: "transparent",
    stroke: "#1a1a2c",
    strokeWidth: 1,
    fontSize: fontsize,
  };
};

function Sidebar() {
  const history = useHistory();
  const [{ user, cart, bookmarks }] = useStateValue();

  const handleClick = () => {
    if (user) {
      history.push("/profile");
    } else {
      history.push("/login");
    }
  };

  return (
    <div className="sidebar">
      <img src={amazonIcon} className="sidebar__icon" />
      <div className="sidebar__menu">
        <NavLink
          to="/"
          exact
          className="sidebar__menuItem"
          activeClassName="active"
          data-tip="Home"
          data-for="sidebarTooltip"
        >
          <HomeRoundedIcon
            className="sidebar__menuIcon"
            style={iconStyle(36)}
          />
        </NavLink>
        <NavLink
          to="/cart"
          className="sidebar__menuItem"
          activeClassName="active"
          data-tip="Cart"
          data-for="sidebarTooltip"
        >
          <ShoppingCartRoundedIcon
            className="sidebar__menuIcon"
            style={iconStyle(34)}
          />
          <span className="sidebar__itemValue">{cart?.length || 0}</span>
        </NavLink>
        <NavLink
          to="/bookmarks"
          className="sidebar__menuItem"
          activeClassName="active"
          data-tip="Bookmarks"
          data-for="sidebarTooltip"
        >
          <BookmarksRoundedIcon
            className="sidebar__menuIcon"
            style={iconStyle(30)}
          />
          <span className="sidebar__itemValue">{bookmarks?.length || 0}</span>
        </NavLink>
        <NavLink
          to="/orders"
          className="sidebar__menuItem"
          activeClassName="active"
          data-tip="Orders"
          data-for="sidebarTooltip"
        >
          <WatchLaterRoundedIcon
            className="sidebar__menuIcon"
            style={iconStyle(32)}
          />
        </NavLink>
      </div>
      <img
        src={user?.photoURL || defaultImage}
        onClick={handleClick}
        data-tip={user ? "Profile" : "Login / Register"}
        data-for="sidebarTooltip"
        className="sidebar__avatar"
      />
      <ReactTooltip
        place="right"
        className="app__toolTip"
        id="sidebarTooltip"
        backgroundColor="#1a1a2cee"
        effect="solid"
      />
    </div>
  );
}
export default Sidebar;
