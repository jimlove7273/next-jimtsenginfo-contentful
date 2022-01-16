import AdminLayout from './home'
import styles from './home.module.css'
import { useRouter } from 'next/router'
import { useState } from 'react'

const PortfolioAdd = () => {

	const router = useRouter()
	//blog = blog[0]

	const [title, setTitle] = useState('')
	const [siteowner, setSiteowner] = useState('')
	const [imgurl, setImgurl] = useState('')
	const [weburl, setWeburl] = useState('')
	const [content, setContent] = useState('')
	const [completed, setCompleted] = useState('')
	const [technology, setTechnology] = useState('')
	const [deprecated, setDeprecated] = useState('')


	const formSubmit = (e) => {
		e.preventDefault()

		const data = {
			title, siteowner,
			imageUrl: imgurl, webUrl: weburl,
			content, completed, technology, deprecated
		}

		debugger
		console.log("data", data)

		const updentry = fetch('/api/portfolios/', {
			method: 'POST',
      headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		})
		.then( res => res.json())
		.then( data => console.log(data) )
		.catch(error => console.log("Error: " + error))
		
		router.push("/admin/portfolios/")
	}


	return (
		<AdminLayout>
			<div id="blogeditpage">
				<div className="pgheading">Portfolio Edit</div>
				<div className="formarea">
					<form onSubmit={formSubmit}>
						<label htmlFor="id">ID</label>
						<input type="text" name="id" id="id" disabled value={''} /><br />
						<label htmlFor="title">Title</label>
						<input type="text" name="title" id="title" value={title} onChange={(e)=>setTitle(e.target.value)} /><br />
						<label htmlFor="siteowner">Site Owner</label>
						<input type="text" name="siteowner" id="siteowner" value={siteowner} onChange={(e)=>setSiteowner(e.target.value)} /><br />
						<label htmlFor="imgurl">Image URL</label>
						<input type="text" name="imgurl" id="imgurl" value={imgurl} onChange={(e)=>setImgurl(e.target.value)} /><br />
						<label htmlFor="webUrl">Web URL</label>
						<input type="text" name="webUrl" id="webUrl" value={weburl} onChange={(e)=>setWeburl(e.target.value)} /><br />
						<label htmlFor="content">Content</label>
						<textarea name="content" id="content" defaultValue={content} onChange={(e)=>setContent(e.target.value)}></textarea><br />
						<label htmlFor="completed">Completed</label>
						<input type="text" name="completed" id="completed" value={completed} onChange={(e)=>setCompleted(e.target.value)} /><br />
						<label htmlFor="technology">Technology</label>
						<input type="text" name="technology" id="technology" value={technology} onChange={(e)=>setTechnology(e.target.value)} /><br />
						<label htmlFor="deprecated">Deprecated</label>
						<select name="deprecated" onChange={(e)=>setDeprecated(e.target.value)}>
							<option value="No">No</option><option value="Yes">Yes</option>
						</select><br /><br />
						<button className="btn" type="submit">Add New Portfolio</button>
					</form>
				</div>
			</div>
		</AdminLayout>
	)
}

export default PortfolioAdd

