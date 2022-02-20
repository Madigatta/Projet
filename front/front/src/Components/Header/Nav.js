import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Nav.Module.css";
import { AiOutlineHome } from "react-icons/ai";
import { RiMailSendLine, RiArticleLine } from "react-icons/ri";
import { IconContext } from "react-icons/lib";

function Nav(props) {
	//console.log(props);
	const [toggle, setToggle] = useState(false);
	const [windowSize, setWindowSize] = useState(window.innerWidth);

	const toggleNavbar = () => {
		setToggle(!toggle);
	};

	useEffect(() => {
		const changeWidth = () => {
			setWindowSize(window.innerWidth);
		};


		window.addEventListener("resize", changeWidth);

		
		return () => {
			window.removeEventListener("resize", changeWidth);
		};
	}, []);
	
	return (
		<nav>

			{console.log(windowSize)}
			{(toggle || windowSize > 500) && (
				
				<div className={styles.list}>
					<IconContext.Provider value={{className: "icon",}} >
						<Link onClick={toggleNavbar} to={"/"} className={props.location.pathname === "/" }>
							<AiOutlineHome />
							Home
						</Link>
		
						<Link onClick={toggleNavbar} to="/shop" state={{infos: "shop !!",}} className={props.location.pathname === "/shop" }>
							<RiArticleLine />
							E-Shop
						</Link>

						{props.isLogged ? 
							<>
								
								<Link onClick={toggleNavbar} to={"/logout"} className={props.location.pathname === "/logout" } >
									<RiMailSendLine />
									Logout
								</Link>
							</>
							:
							<Link onClick={toggleNavbar} to={"/login"} className={props.location.pathname === "/login" } >
								<RiMailSendLine />
								Login/Register
							</Link>
						}
					</IconContext.Provider>
				</div>
			)}
		
		</nav>
	);
}

export default Nav;
