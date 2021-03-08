import { Menu } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";

const MenuBar = () => {
  const location = useLocation();
  const activeItem = location.pathname.substring(1);

  return (
    <div>
      <Menu pointing secondary color="teal">
        <Menu.Item name="home" active={activeItem === ""} as={Link} to="/" />
        <Menu.Menu position="right">
          <Menu.Item
            name="register"
            active={activeItem === "register"}
            as={Link}
            to="/register"
          />
          <Menu.Item
            name="login"
            active={activeItem === "login"}
            as={Link}
            to="/login"
          />
        </Menu.Menu>
      </Menu>
    </div>
  );
};

export default MenuBar;
