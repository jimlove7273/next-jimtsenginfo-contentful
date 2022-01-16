import Admin from '.'
import AdminLayout from './home'

import styles from './home.module.css'

const MyAccount = () => {


	return (
		<AdminLayout>
			<div className={styles.adminpgheading}>My Account</div>
			<div className={styles.profiledetails}>
				<b>Login:</b> jim<br />
				<b>Password:</b> pass<br />
				<p className={styles.p}>
					This is some paragraph text regarding the admin main page.  You might
					want to put in something more useful in the future.
				</p>
			</div>
		</AdminLayout>
	)
}

export default MyAccount