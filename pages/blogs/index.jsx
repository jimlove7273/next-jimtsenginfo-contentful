import Layout from '../../components/layout'
import { createClient } from 'contentful'
import Image from 'next/image'
import Link from 'next/link'

export default function indexBlogs({blogs}) {

	return (
		<Layout>
			<div className="container">
				<div className="pgcontent">
				<div className="pgheading">My Blog</div>
					<div className="grid grid-4columns grid-gap10">
						{
							blogs.map( blog => (
								<Link href={`/blogs/${blog.fields.slug}`} key={blog.ID}><a>
									<div className="gridcard" key={blog.ID}>
									<Image
                    src={'https:' + blog.fields.imageUrl.fields.file.url}
                    alt={blog.fields.title}
                    width={blog.fields.imageUrl.fields.file.details.image.width}
                    height={blog.fields.imageUrl.fields.file.details.image.height}
                  />
										<div className="gridbottomtitle">{blog.fields.title}</div>
									</div>
								</a></Link>
							))
						}
					</div>
				</div>
			</div>
		</Layout>
	)
}


export async function getStaticProps() {

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY
  })

  const resblogs = await client.getEntries({ content_type: 'jtiBlogs'})

  return {
    props: {
      blogs: resblogs.items
    }
  }
  
}