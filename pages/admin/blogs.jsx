import { useRouter } from 'next/router'
import AdminLayout from './home'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'

import styles from './home.module.css'

const Blogs = ({blogs}) => {

	const router = useRouter()

	const delblog = async (blogid) => {
		const del = confirm("Are you sure you want to delete "+blogid)
		if (del) {
			try {
        let response = await fetch("http://localhost:3000/api/blogs", {
            method: "DELETE",
            body: JSON.stringify({
              id: blogid
            }),
            headers: {
              "Content-Type": "application/json",
            },
				});
				router.push('http://localhost:3000/admin/blogs')
			} catch (err) {
				console.log("Some Error Occurred")
			}
		}
	}

	return (
		<AdminLayout>
			<div className={styles.adminpgheading}>
				Blogs
				<Link href="./blogadd"><a className="addnewbutton">Add New</a></Link>
			</div>
			<div className="listcount">All ({blogs.length})</div>
			<div className="table">
				<div className="table-row"></div>
				<div className="table-row">
					<div className="table-header">Title</div>
					<div className="table-header">Author</div>
					<div className="table-header">Category</div>
					<div className="table-header">Date</div>
				</div>
			{
				blogs.map( blog => (
					<div className="table-row" key={blog.ID}>
						<div className="table-cell">
							<div className="listtitle">{blog.title}</div>
							<div className="listaction">
								<Link href={`/admin/blogedit/${blog.ID}`}><a className={styles.cursorpointer}>Edit</a></Link>
								&nbsp;|&nbsp; 
								<span className={styles.cursorpointer} onClick={()=>delblog(`${blog.ID}`)}>Delete</span>
							</div>
						</div>
						<div className="table-cell">{blog.author}</div>
						<div className="table-cell">{blog.category}</div>
						<div className="table-cell">{blog.documentdate}</div>
					</div>
				))
			}
			</div>
		</AdminLayout>
	)
}

export default Blogs


export async function getBlogData() {

	const res = await fetch('http://localhost:3000/api/blogs')
	const blogs = await res.json()

	return blogs
	
}
export async function getServerSideProps() {

	const blogs = await getBlogData()

	return {
    props: {
      blogs
    }
  }
	
}