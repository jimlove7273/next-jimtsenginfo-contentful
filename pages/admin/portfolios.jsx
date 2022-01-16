import { useRouter } from 'next/router'
import AdminLayout from './home'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'

import styles from './home.module.css'

const Portfolios = ({portfolios}) => {

	const router = useRouter()

	const delportfolio = async (portfolioid) => {
		const del = confirm("Are you sure you want to delete "+portfolioid)
		if (del) {
			try {
        let response = await fetch("/api/portfolios", {
            method: "DELETE",
            body: JSON.stringify({
              id: portfolioid
            }),
            headers: {
              "Content-Type": "application/json",
            },
				});
				router.push('/admin/portfolios')
			} catch (err) {
				console.log("Some Error Occurred")
			}
		}
	}

	return (
		<AdminLayout>
			<div className={styles.adminpgheading}>
				Portfolios
				<Link href="./portfolioadd"><a className="addnewbutton">Add New</a></Link>
			</div>
			<div className="listcount">
				All ({portfolios.length})
			</div>
			<div className="table">
				<div className="table-row"></div>
				<div className="table-row">
					<div className="table-header">Title</div>
					<div className="table-header">Owner</div>
					<div className="table-header">Web URL</div>
					<div className="table-header">Completed</div>
					<div className="table-header">Deprecated</div>
				</div>
			{
				portfolios.map( portfolio => (
					<div className="table-row" key={portfolio.ID}>
						<div className="table-cell">
							<div className="listtitle">{portfolio.title}</div>
							<div className="listaction">
							<Link href={`/admin/portfolioedit/${portfolio.ID}`}><a className={styles.cursorpointer}>Edit</a></Link>
								&nbsp;|&nbsp;
								<span className={styles.cursorpointer} onClick={()=>delportfolio(`${portfolio.ID}`)}>Delete</span>
							</div>
						</div>
						<div className="table-cell">{portfolio.siteowner}</div>
						<div className="table-cell">{portfolio.webUrl}</div>
						<div className="table-cell">{portfolio.completed}</div>
						<div className="table-cell">{portfolio.deprecated}</div>
					</div>
				))
			}
			</div>
		</AdminLayout>
	)
}

export default Portfolios


export async function getServerSideProps() {

	const res = await fetch('/api/portfolios')
	const portfolios = await res.json()

	return {
    props: {
      portfolios
    }
  }
	
}