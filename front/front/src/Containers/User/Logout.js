import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { updateConnectionTimestamp } from "../../api/user";
import { logoutUser } from "../../redux/actions/userAction";


const Logout = (props) => {
	const [redirect, setRedirect] = useState(false);

	const dispatch = useDispatch()

	useEffect(() => {
		localStorage.removeItem("user_auth");
		updateConnectionTimestamp(props.userInfos.id, props.userInfos.token)
		.then(res=>{
			dispatch(logoutUser());
			console.log(res);
			setRedirect(true);
		})
		
	},[]);

	return <>{redirect && <Navigate to="/" />}</>;
};

export default Logout;
