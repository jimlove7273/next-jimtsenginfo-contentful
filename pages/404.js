import Layout from '../pages/layout'

export default function Skeleton() {
	return (
		<div>
			<Layout>
			<div className="container">
        <div className="pgcontent">
					404<br />
					OOPS, SORRY I CANNOT FIND THAT PAGE!<br />
					Please check your entry in the URL and try again..<br />
				</div>
			</div>
			</Layout>
		</div>
	)
}
