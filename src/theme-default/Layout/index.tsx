import { usePageData } from '../../runtime';
import { Nav } from '../components/Nav';
import '../styles/base.css';
import '../styles/vars.css';
import '../styles/doc.css';
import 'uno.css';
import { HomeLayout } from './HomeLayout/index';
import { DocLayout } from './DocLayout';
import Footer from '../Components/Footer';

export function Layout() {
  const pageData = usePageData();
  const { pageType } = pageData;
  const getContent = () => {
    if (pageType === 'home') {
      return <HomeLayout />;
    } else if (pageType === 'doc') {
      return <DocLayout />;
    } else {
      return <div>404 页面</div>;
    }
  };
  return (
    <div className="bg-white dark:bg-black w-full">
      <Nav />
      <section
        style={{
          paddingTop: 'var(--zdocu-nav-height)'
        }}
      >
        {getContent()}
      </section>
      <Footer />
    </div>
  );
}
