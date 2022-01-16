import AdminLayout from '../home'
import styles from '../home.module.css'
import { useRouter } from 'next/router'
import { useState } from 'react'

const PortfolioEdit = ({id, portfolio}) => {

	const router = useRouter()
	//blog = blog[0]

	const [title, setTitle] = useState(portfolio.title)
	const [siteowner, setSiteowner] = useState(portfolio.siteowner)
	const [imgurl, setImgurl] = useState(portfolio.imageUrl)
	const [weburl, setWeburl] = useState(portfolio.webUrl)
	const [content, setContent] = useState(portfolio.content)
	const [completed, setCompleted] = useState(portfolio.completed)
	const [technology, setTechnology] = useState(portfolio.technology)
	const [deprecated, setDeprecated] = useState(portfolio.deprecated)


	const formSubmit = (e) => {
		e.preventDefault()

		const data = {
			title, siteowner,
			imageUrl: imgurl, webUrl: weburl,
			content, completed, technology, deprecated
		}

		const updentry = fetch('http://localhost:3000/api/portfolio/'+id, {
			method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		})
		.then( res => res.json())
		.then( data => console.log(data) )
		.catch(error => console.log("Error: " + error))
		
		router.push("http://localhost:3000/admin/portfolios/")
	}


	return (
		<AdminLayout>
			<div id="blogeditpage">
				<div className="pgheading">Portfolio Edit</div>
				<div className="formarea">
					<form onSubmit={formSubmit}>
						<label htmlFor="id">ID</label>
						<input type="text" name="id" id="id" disabled value={portfolio.ID} /><br />
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
							<option selected = {deprecated == "No" ? "selected" : ""}>No</option>
							<option selected = {deprecated == "Yes" ? "selected" : ""}>Yes</option>
						</select><br /><br />
						<button className="btn" type="submit">Update Record</button>
					</form>
				</div>
			</div>
		</AdminLayout>
	)
}

export default PortfolioEdit

export async function getServerSideProps(req, res) {

	const resp = await fetch('http://localhost:3000/api/portfolio/'+req.params.id)
	const portfoliojson = await resp.json()
	const portfolio = portfoliojson[0]

	return {
    props: {
			id: req.params.id,
      portfolio
    }
	}
	
}