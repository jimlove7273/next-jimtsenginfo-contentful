import Layout from '../layout';
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

const client = createClient({
	space: process.env.CONTENTFUL_SPACE_ID,
	accessToken: process.env.CONTENTFUL_ACCESS_KEY
})

const Blog = ({blog}) => {

	console.log("blog", blog)
	
	return (
		<Layout>

			<div id="blogsinglepage">
				<div className="pgcontent">
					<div className="container">

						{/* {JSON.stringify(blog)} */}

						<div className="blogtop">
						<div className="image-block">
						<Image
								src={'https:' + blog.fields.imageUrl.fields.file.url}
								alt={blog.fields.title}
								width={500}
								height={269}
								// width={blog.fields.imageUrl.fields.file.details.image.width}
								// height={blog.fields.imageUrl.fields.file.details.image.height}
							/>
							</div>
							<div className="blogtitle">{blog.fields.title}</div>
						</div>
						<div className="blogmeta">
							<div>Date: {blog.fields.documentDate}</div>
							<div>Category: {blog.fields.category}</div>
						</div>
						<div className="content">
						{documentToReactComponents(blog.fields.content)}
						</div>

					</div>
				</div>
			</div>

		</Layout>
	)
}

export default Blog


export const getStaticProps = async ({params}) => {

	const { items } = await client.getEntries({
		content_type: 'jtiBlogs',
		'fields.slug': params.slug
	})

	return {
		props: {
			blog: items[0]
		}
	}

}


export const getStaticPaths = async () => {

	const res = await client.getEntries({ content_type: 'jtiBlogs'})
	const paths = res.items.map(item => {
		return {
			params: { slug: item.fields.slug }
		}
	})

	return {
		paths,
		fallback: false
	}

}

