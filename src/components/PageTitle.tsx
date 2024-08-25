import Head from "next/head";

interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => (
  <Head>
    <title>{`Pexlle | ${title}`}</title>
  </Head>
);

export default PageTitle;
