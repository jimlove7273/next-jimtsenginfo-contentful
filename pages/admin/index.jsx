//import withPrivateRoute from '../../components/withPrivateRoute';
import Login from '../login'
import AdminLayout from './home'


const Admin = () => {

	let loggedin
  try {
    loggedin = document.cookie
    .split('; ')
    .find(row => row.startsWith('log'))
    .split('=')[1]
	} catch(err) { loggedin = "" }


	return (
		<div className="height100p">
		{ loggedin === ""
			?
				<div suppressHydrationWarning={true}>
					{ process.browser && <Login /> }
				</div>
			: 
				<div suppressHydrationWarning={true}>
					{ process.browser && <AdminLayout /> }
				</div>
		}
		</div>
	)

}

export default Admin

