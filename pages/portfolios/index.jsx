import Layout from "../../components/layout";
import { createClient } from "contentful";
import Image from "next/image";
import Link from "next/link";

export default function indexBlogs({ portfolios }) {
  return (
    <Layout>
      <div className="container">
        <div className="pgcontent">
          <div className="pgheading">My Portfolios</div>
          <div className="grid grid-4columns grid-gap10">
            {portfolios.map((portfolio) => (
              <Link
                href={`/portfolios/${portfolio.fields.slug}`}
                key={portfolio.ID}
              >
                <a>
                  <div className="gridcard" key={portfolio.sys.id}>
                    <Image
                      src={"https:" + portfolio.fields.imageUrl.fields.file.url}
                      alt={portfolio.fields.title}
                      width={
                        portfolio.fields.imageUrl.fields.file.details.image
                          .width
                      }
                      height={
                        portfolio.fields.imageUrl.fields.file.details.image
                          .height
                      }
                    />
                    <div className="gridbottomtitle">
                      {portfolio.fields.title}
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const resportfolios = await client.getEntries({
    content_type: "jtiPortfolios",
  });

  return {
    props: {
      portfolios: resportfolios.items,
    },
    revalidate: 6,
  };
}
