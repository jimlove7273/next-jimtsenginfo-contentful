import Layout from '../components/layout'

export default function Skeleton() {
	return (
		<div>
			<Layout>
			<div className="container">
        <div className="pgcontent">
					<div className="block404">
						<div className="b404number">404</div>
						<div className="b404line1">OOPS, SORRY I CANNOT FIND THAT PAGE!</div>
						<div className="b404line2">Please check your entry in the URL and try again..</div>
					</div>
				</div>
				<style jsx>{`
					.block404 {
						display: flex;
						flex-direction: column;
						padding: 100px 0;
						align-items: center;
					}
					.b404number {
						color: #179153;
						font-size: 60px;
					}
					.b404line1 {
						color: #2a4c6e;
						font-size: 14px;
						padding: 20px 0;
					}
					.b404line2 {
						color: #778593;
						font-size: 16px;
					}
				`}</style>
			</div>
			</Layout>
		</div>
	)
}
