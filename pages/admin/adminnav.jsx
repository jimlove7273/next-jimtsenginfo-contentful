import Link from 'next/link'
import { useRouter } from 'next/router'

import './home.module.css'

const AdminNav = () => {

	const router = useRouter()
	let curpath = router.pathname

	return (
		<div className="adminnavs height100p">
			<div className="menudashboard"><a>Dashboard</a></div>
			<div><Link href="/admin/myaccount">
				<a className={curpath.includes('/admin/myaccount') ? 'active' : ''}> My Account</a></Link></div>
			<div><Link href="/admin/blogs"><a className={curpath.includes('/admin/blog') ? 'active' : ''}> Posts</a></Link></div>
			<div><Link href="/admin/portfolios"><a className={curpath.includes('/admin/portfolio') ? 'active' : ''}> Portfolios</a></Link></div>

			<style jsx>{`

				.adminnavs {
					background-color: #000;
					height: 100%;
					width: 160px;
					font-size: 15px;
					color: #fff;
				}

				.adminnavs a {
					display: block;
					color: #fff;
					padding: 8px 5px 8px 12px;
				}

				.adminnavs a:hover, .adminnavs a.active {
					background-color: #369;
				}

				.adminnavs .menudashboard {
					padding: 10px 0;
				}
			
			`}</style>

	</div>
	)
}

export default AdminNav