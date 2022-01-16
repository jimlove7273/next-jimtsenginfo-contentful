import AdminLayout from './home'
import styles from './home.module.css'
import { useRouter } from 'next/router'
import { useState } from 'react'

const BlogAdd = () => {

	const router = useRouter()
	//blog = blog[0]

	const [title, setTitle] = useState('')
	const [imgurl, setImgurl] = useState('')
	const [category, setCategory] = useState('')
	const [documentdate, setDocumentdate] = useState('')
	const [author, setAuthor] = useState('')
	const [content, setContent] = useState()


	const formSubmit = (e) => {
		e.preventDefault()

		const data = {
			title,
			imgUrl: imgurl,
			category, documentdate, author, content
		}

		//let updquery = "UPDATE Blogs (title, document, imgUrl, category, documentdate, author) VALUES"
		const updentry = fetch('http://localhost:3000/api/blogs/', {
			method: 'POST',
      headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		})
		.then( res => res.json())
		.then( data => console.log(data) )
		.catch(error => console.log("Error: " + error))
		
		debugger
		router.push("http://localhost:3000/admin/blogs/")
	}


	return (
		<AdminLayout>
			<div id="blogeditpage">
				<div className="pgheading">Add a New Blog</div>
				<div className="formarea">
					<form onSubmit={formSubmit}>
						<label htmlFor="id">ID</label>
						<input type="text" name="id" id="id" disabled value={''} /><br />
						<label htmlFor="title">Blog Title</label>
						<input type="text" name="title" id="title" value={title} onChange={(e)=>setTitle(e.target.value)} /><br />
						<label htmlFor="imgUrl">Image URL</label>
						<input type="text" name="imgUrl" id="imgUrl" value={imgurl} onChange={(e)=>setImgurl(e.target.value)} /><br />
						<label htmlFor="category">Category</label>
						<input type="text" name="category" id="category" value={category} onChange={(e)=>setCategory(e.target.value)} /><br />
						<label htmlFor="documentdate">Document Date</label>
						<input type="text" name="documentdate" id="documentdate" value={documentdate} onChange={(e)=>setDocumentdate(e.target.value)} /><br />
						<label htmlFor="author">Author</label>
						<input type="text" name="author" id="author" value={author} onChange={(e)=>setAuthor(e.target.value)} /><br />
						<label htmlFor="content">Content</label>
						<textarea name="content" id="content" defaultValue={content}></textarea><br />
						<button className="btn" type="submit">Add This Post</button>
					</form>
				</div>
			</div>
		</AdminLayout>
	)
}

export default BlogAdd

