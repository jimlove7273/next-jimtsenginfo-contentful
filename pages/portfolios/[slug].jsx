import Layout from '../layout'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

const client = createClient({
	space: process.env.CONTENTFUL_SPACE_ID,
	accessToken: process.env.CONTENTFUL_ACCESS_KEY
})

const Portfolios = ({portfolio}) => {

	console.log("portfolio", portfolio)
	
	return (
		<Layout>

			<div id="portfoliosinglepage">
				<div className="pgcontent">
					<div className="container">

						<div className="pgheading">{portfolio.fields.title}</div>
						<div className="grid grid-2col grid-gap30">
						<Image
								src={'https:' + portfolio.fields.imageUrl.fields.file.url}
								alt={portfolio.fields.title}
								width={500}
								height={269}
								// width={portfolio.fields.imageUrl.fields.file.details.image.width}
								// height={portfolio.fields.imageUrl.fields.file.details.image.height}
							/>
						<div className="content">
								{documentToReactComponents(portfolio.fields.content)}<br /><br />
								<b>URL:</b><br />{portfolio.fields.webUrl}<br /><br />
								<b>Owner:</b><br />{portfolio.fields.siteOwner}<br /><br />
								<b>Completed:</b><br />{portfolio.fields.completed}<br /><br />
								<b>Technology:</b><br />
									{
										portfolio.fields.technology.map(tech => (
											<span key="tech">{tech}, </span>
										))
									}
								<br /><br />
								{
									portfolio.fields.deprecated
										? <div className="deprecated">Deprecated</div>
										: <Link href={portfolio.fields.webUrl}>
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

	return {
		props: {
			portfolio: items[0]
		}
	}

}


export const getStaticPaths = async () => {

	const res = await client.getEntries({ content_type: 'jtiPortfolios'})
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