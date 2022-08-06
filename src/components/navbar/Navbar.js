import React, { useState, useEffect } from "react";
import "./Navbar.css";
import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  AddIcon,
  ChevronDownIcon,
  ExternalLinkIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import AboutModal from "../aboutModal/AboutModal";

function Navbar() {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    if (localStorage.getItem("cheat-code-user")) {
      async function fetchData() {
        setCurrentUser(
          await JSON.parse(localStorage.getItem("cheat-code-user"))
        );
      }
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("cheat-code-user")) {
      setCurrentUser(JSON.parse(localStorage.getItem("cheat-code-user")));
    }
  }, [currentUser]);

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        // if scroll down = hide the navbar
        setShow(false);
      } else {
        // if scroll up = show the navbar
        setShow(true);
      }

      // remember current page location to use in the next move
      setLastScrollY(window.scrollY);
    }
  };

  const handleLogout = () => {
    if (currentUser) {
      localStorage.removeItem("cheat-code-user");
      setCurrentUser(undefined);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <nav className={show ? "active" : "hidden"}>
      <div className="container">
        <div className="container-left">
          <div className="menu-pages">
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon fontSize="2xl" />}
                variant="outline"
              />
              <MenuList>
                <MenuItem icon={<AddIcon />}>Explore</MenuItem>
                <MenuItem icon={<ExternalLinkIcon />}>Problems</MenuItem>
              </MenuList>
            </Menu>
          </div>
          <div className="nav-logo">
            <Link to="/">CheatCode</Link>
          </div>
          <div className="nav-about">
            <AboutModal />
          </div>
          <div className="nav-explore">
            <Link to="/explore">Explore</Link>
          </div>
          <div className="nav-problems">
            <Link to="/">Problems</Link>
          </div>
        </div>
        <div className="login-signin">
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon color="white" />}
              colorScheme="teal"
              variant="outline"
            >
              <Avatar name={currentUser?.username} size="sm" />
            </MenuButton>
            <MenuList color="black">
              {!currentUser ? (
                <Link to="/login">
                  <MenuItem>LOGIN</MenuItem>
                </Link>
              ) : (
                <MenuItem onClick={handleLogout}>LOGOUT</MenuItem>
              )}
            </MenuList>
          </Menu>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
