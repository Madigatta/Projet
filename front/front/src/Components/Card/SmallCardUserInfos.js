import React from 'react'
import Card from './Card'
import { Link } from 'react-router-dom';
import { FiShoppingCart } from "react-icons/fi";

import styles from './Card.Module.css'

import dayjs from "dayjs";
require("dayjs/locale/fr");

function SmallCardUserInfos(props) {
    console.log(props);
    return (
        <aside>
          
            {props.isLogged && (
				<Card cardStyle={styles.aside}>
					<p>Bonjour {props.userInfos.FirstName} </p>
					<p>Dernière déconnexion {dayjs(props.userInfos.connexionTimestamp).locale("fr").format("DD-MM-YYYY HH:mm:ss")}</p>
                    <Link to={"/cart"} className="link-btn">
                    <FiShoppingCart/>

                    </Link>
				</Card>
			)}
        </aside>
    )
}

export default SmallCardUserInfos
