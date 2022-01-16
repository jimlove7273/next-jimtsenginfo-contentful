import AdminLayout from '../home'
import styles from '../home.module.css'
import { useRouter } from 'next/router'
import { useState } from 'react'

const BlogEdit = ({id, blog}) => {

	const router = useRouter()
	//blog = blog[0]

	const [title, setTitle] = useState(blog.title)
	const [imgurl, setImgurl] = useState(blog.imgUrl)
	const [category, setCategory] = useState(blog.category)
	const [documentdate, setDocumentdate] = useState(blog.documentdate)
	const [author, setAuthor] = useState(blog.author)
	const [content, setContent] = useState(blog.content)


	const formSubmit = (e) => {
		e.preventDefault()

		const data = {
			title,
			imgUrl: imgurl,
			category, documentdate, author, content
		}

		//let updquery = "UPDATE Blogs (title, document, imgUrl, category, documentdate, author) VALUES"
		const updentry = fetch('http://localhost:3000/api/blog/'+id, {
			method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		})
		.then( res => res.json())
		.then( data => console.log(data) )
		.catch(error => console.log("Error: " + error))
		
		router.push("http://localhost:3000/admin/blogs/")
	}


	return (
		<AdminLayout>
			<div id="blogeditpage">
				<div className="pgheading">Blog Edit</div>
				<div className="formarea">
					<form onSubmit={formSubmit}>
						<label htmlFor="id">ID</label>
						<input type="text" name="id" id="id" disabled value={blog.ID} /><br />
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
						<button className="btn" type="submit">Update Record</button>
					</form>
				</div>
			</div>
		</AdminLayout>
	)
}

export default BlogEdit

export async function getServerSideProps(req, res) {

	const resp = await fetch('http://localhost:3000/api/blog/'+req.params.id)
	const blog = await resp.json()

	return {
    props: {
			id: req.params.id,
      blog
    }
	}
	
}