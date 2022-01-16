import Login from '../login'
import AdminNav from './adminnav'

import styles from './home.module.css'

const AdminLayout = (props) => {


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
					{ process.browser && <div className={styles.adminhome}>
						<div className={styles.toprow}>
							<div className="admincontainer">
								<div>jimtseng.info</div>
							</div>
						</div>
						<div className="flex">
							<div><AdminNav /></div>
							<div className={styles.content}>
								{props.children}
							</div>
						</div>
					</div>
					}
				</div>
		}
		</div>

	)
}

export default AdminLayout