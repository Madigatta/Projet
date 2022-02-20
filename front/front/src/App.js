import "./App.css";
import {Routes, Route} from 'react-router-dom'
import Header from './Components/Header/Header'
import Home from './Containers/Home'
import Shop from './Containers/Shop'
import DetailProductPage from './Containers/DetailProductPage'
import Cart from './Containers/Cart'
import Payment from "./Containers/Payment";
import Register from './Containers/User/Register'
import Login from './Containers/User/Login'
import Logout from './Containers/User/Logout'
import RequireDataAuth from "./helpers/require-data-auth";
import SmallCardUserInfos from "./Components/Card/SmallCardUserInfos";

function App() {
	return ( <div className="App">

		<RequireDataAuth child={Header} />

		<RequireDataAuth child={SmallCardUserInfos} />
		
		<Routes>

			<Route path="/" element = {<RequireDataAuth child={Home} />}/> 
			<Route path="/shop" element = {<RequireDataAuth child={Shop} />}/>
			<Route path="/detailProductPage/:id" element = {<RequireDataAuth child={DetailProductPage} auth={true}/>}/>
			<Route path="/payment/:orderId" element = {<RequireDataAuth child={Payment} auth={true}/>}/>
			<Route path="/register" element = {<RequireDataAuth child={Register} />}/>
			<Route path="/login" element = {<RequireDataAuth child={Login} />}/>
			<Route path="/logout" element = {<RequireDataAuth child={Logout} />}/>
			<Route path="/cart" element = {<RequireDataAuth child={Cart} auth={true}/>}/>
			

		</Routes>


	</div>
	)
}

export default App;
