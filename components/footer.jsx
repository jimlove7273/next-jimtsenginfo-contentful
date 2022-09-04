const Footer = () => {

	return (
		<div id="footer">
			<div id="footer-navs">
				<div className="container">
					<div className="grid">
						<div>
							<div className="footerheading">ABOUT JIM TSENG</div>
							<div className="footertext">
							Thank you for visiting my site.  This is the place where I post what I worked on and projects I did in the past.  I hope you like them, and maybe I can help your future projects, too.
							</div>
						</div>
						<div>
							<div className="footerheading">MY PRIMARY SKILLSET</div>
							<div className="footertext">
								✓ HTML(5)/CSS(3)<br />
								✓ JavaScript<br />
								✓ ReactJS/NextJS<br />
								✓ WordPress Design/Development<br />
							</div>
						</div>
						<div>
							<div className="footerheading">SUBSCRIBE NEWSLETTER</div>
							<div className="footertext">&nbsp;</div>
						</div>
						<div>
							<div className="footerheading">CONTACT ME</div>
							<div className="footertext">
								<a href="mailto:jimlove@myehouse.com">jimlove@myehouse.com</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div id="copyrightline">
				&copy; {new Date().getFullYear()} Jim Tseng, All Rights Reserved
			</div>
		</div>
	)

}

export default Footer