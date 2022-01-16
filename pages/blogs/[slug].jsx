import Layout from '../layout';
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Skeleton from '../../components/Skeleton'

const client = createClient({
	space: process.env.CONTENTFUL_SPACE_ID,
	accessToken: process.env.CONTENTFUL_ACCESS_KEY
})

const Blog = ({blog}) => {

	if ( !blog ) return <Skeleton />

	const { title, documentDate, category, content, imageUrl } = blog.fields
	
	return (
		<Layout>

			<div id="blogsinglepage">
				<div className="pgcontent">
					<div className="container">

						<div className="blogtop">
						<div className="image-block">
						<Image
								src={'https:' + imageUrl.fields.file.url}
								alt={title}
								width={500}
								height={369}
							/>
							</div>
							<div className="blogtitle">{title}</div>
						</div>
						<div className="blogmeta">
							<div>Date: {documentDate}</div>
							<div>Category: {category}</div>
						</div>
						<div className="content">
						{documentToReactComponents(content)}
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

	if ( !items.length ) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}

	return {
		props: {
			blog: items[0]
		},
		revalidate: 6
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
		fallback: true
	}

}

