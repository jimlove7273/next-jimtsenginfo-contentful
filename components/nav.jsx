import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaBars } from 'react-icons/fa'

const Nav = () => {

	const router = useRouter()
	let curpath = router.pathname

	const [opensidenav, setOpensidenav] = useState(false)

	const Opennav = () => {
		setOpensidenav(!opensidenav)
	}

	return (
		<div id={curpath=="/" ? "homenav" : "nav"}>
			<div className={`${opensidenav ? 'bodycover on' : 'bodycover off'}`} onClick={()=>{setOpensidenav(false)}}>&nbsp;</div>
			<div className="container">
				<div className="flex">
					<div className="logo">Jim Tseng</div>
					<div className="opennav" onClick={Opennav}>
						<FaBars />
					</div>
					<div className={`${opensidenav ? 'navlinks open' : 'navlinks'}`}>
						<div className="closenav" onClick={Opennav}>CLOSE MENU</div>
						<ul>
							<li><Link href="/"><a>Home</a></Link></li>
							<li><Link href="/portfolios"><a className={curpath.includes('/portfolios') ? 'active' : ''}>My Portfolio</a></Link></li>
							<li><Link href="/blogs"><a className={curpath.includes('/blogs') ? 'active' : ''}>Blog</a></Link></li>
							<li><Link href="/about"><a className={curpath==='/about' ? 'active' : ''}>About Me</a></Link></li>
							<li><Link href="/contact"><a className={curpath==='/contact' ? 'active' : ''}>Contact Me</a></Link></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Nav