import Head from 'next/head'
import Link from 'next/link'
import { createClient } from 'contentful'
import Image from 'next/image'
import { FaCloud, FaUser, FaCode, FaBolt } from 'react-icons/fa'

import Layout from './layout'

export default function Home({ blogs, portfolios }) {

  console.log("blogs", blogs)
  console.log("portfolios", portfolios)
  
  return (
    <Layout>

      <div className="pgcontent">

        <div className="heroimagerow">
          <div className="heroimagerow_img">&nbsp;</div>
          <div className="textblock">
          Coding? Designing? SEO Marketing?<br />
          <div className="heavy">I DO THEM ALL</div>
          </div>
        </div>

        <div className="container">


        <section id="homeblock">
          <div className="grid-4columns grid-gap10">
            <div>
              <FaCloud className="svg-inline--fa" />
              <div className="homeblockheading">LATEST TECHNOLOGY</div>
              <p>HTML5/CSS3, Responsive CSS Design, JavaScript, JQuery, ReactJS, and WordPress​</p>
            </div>
            <div>
              <FaUser className="svg-inline--fa" />
              <div className="homeblockheading">CUSTOMERS FIRST</div>
              <p>I write applications that people CAN use without changing their way of running their business. I always put Customers First.</p>
            </div>
            <div>
              <FaCode className="svg-inline--fa" />
              <div className="homeblockheading">QUALITY CODE</div>
              <p>I write clean and documented code so they are easy to read or maintain later.​</p>
            </div>
            <div>
              <FaBolt className="svg-inline--fa" />
              <div className="homeblockheading">AVAILABILITY</div>
              <p>I am available for any kind of work of any length. I always look for different opportunities to challenge myself.​</p>
            </div>
          </div>
        </section>


        {/* ------ List of Portfolios ------ */}
        <section id="myportfolios">
          <div className="sectiontitle">My Portfolios</div>
          <div className="grid-4columns grid-gap10">
          {
            portfolios.slice(0, 4).map( portfolio => (
              <Link href={`/portfolios/${portfolio.fields.slug}`} key={portfolio.sys.id}><a>
              <div className="gridcard" key={portfolio.sys.id}>
                <Image
                  src={'https:' + portfolio.fields.imageUrl.fields.file.url}
                  alt={portfolio.fields.title}
                  width={portfolio.fields.imageUrl.fields.file.details.image.width}
                  height={portfolio.fields.imageUrl.fields.file.details.image.height}
                />
                <div className="gridbottomtitle">{portfolio.fields.title}</div>
              </div>
              </a></Link>
            ))
          }
          </div>
        </section>


        {/* ------ List of Blogs ------ */}
        <section id="myblogs">
          <div className="sectiontitle">My Blogs</div>
          <div className="grid-4columns grid-gap10">
          {
            blogs.map( blog => (
              <Link href={`/blogs/${blog.fields.slug}`} key={blog.sys.id}><a>
              <div className="gridcard" key={blog.sys.id}>
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
        </section>


        </div>
      </div>{/* Page Content */ }

    </Layout>
  )
}


export async function getStaticProps() {

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY
  })

  const resblogs = await client.getEntries({ content_type: 'jtiBlogs'})
  const resportfolios = await client.getEntries({ content_type: 'jtiPortfolios'})

  return {
    props: {
      blogs: resblogs.items,
      portfolios: resportfolios.items
    }
  }
  
}