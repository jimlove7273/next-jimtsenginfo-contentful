import Layout from '../../components/layout'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Skeleton from '../../components/Skeleton'

const client = createClient({
	space: process.env.CONTENTFUL_SPACE_ID,
	accessToken: process.env.CONTENTFUL_ACCESS_KEY
})

const Portfolios = ({portfolio}) => {

	if ( !portfolio ) return <Skeleton />

	const { title, imageUrl, content, webUrl, siteOwner, completed, technology, deprecated } = portfolio.fields
	
	return (
		<Layout>

			<div id="portfoliosinglepage">
				<div className="pgcontent">
					<div className="container">

						<div className="pgheading">{title}</div>
						<div className="grid grid-2col grid-gap30">
							<div className="image-block">
								<Image
										src={'https:' + imageUrl.fields.file.url}
										alt={title}
										width={500}
										height={369}
									/>
							</div>
						<div className="content">
								{documentToReactComponents(content)}<br /><br />
								<b>URL:</b><br />{webUrl}<br /><br />
								<b>Owner:</b><br />{siteOwner}<br /><br />
								<b>Completed:</b><br />{completed}<br /><br />
								<b>Technology:</b><br />
									{
										technology.map(tech => (
											<span key={tech}>{tech}, </span>
										))
									}
								<br /><br />
								{
									deprecated
										? <div className="deprecated">Deprecated</div>
										: <Link href={webUrl}>
												<a className="jumpbutton" target="_blank">Go To This Site</a>
											</Link>
								}
							</div>
						</div>

					</div>
				</div>
			</div>

		</Layout>
	)
}

export default Portfolios


export const getStaticProps = async ({params}) => {

	const { items } = await client.getEntries({
		content_type: 'jtiPortfolios',
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
			portfolio: items[0]
		},
		revalidate: 6
	}

}


export const getStaticPaths = async () => {

	const res = await client.getEntries({ content_type: 'jtiPortfolios'})
	const paths = res.items.map(item => ({
			params: { slug: item.fields.slug }
	}))

	return {
		paths,
		fallback: true
	}

}