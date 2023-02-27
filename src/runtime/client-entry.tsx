import { createRoot } from 'react-dom/client';
import { App, initPageData } from './app';
import { BrowserRouter } from 'react-router-dom';
import siteData from 'zdocu:site-data';
import { DataContext } from './hooks';

async function renderInBrowser() {
  console.log('siteData', siteData); // 客户端将打印 siteData 中解析的数据
  const containerEl = document.getElementById('root');
  if (!containerEl) {
    throw new Error('#root element not found');
  }
  // 初始化 PageData
  const pageData = await initPageData(location.pathname);
  createRoot(containerEl).render(
    <DataContext.Provider value={pageData}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DataContext.Provider>
  );
}

renderInBrowser();
