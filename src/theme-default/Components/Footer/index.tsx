import { usePageData } from '@runtime';
import { SwitchAppearance } from '../SwitchAppearance';

const Footer = () => {
  const { siteData } = usePageData();
  console.log(siteData);
  return (
    <footer className="w-full relative bg-white dark:bg-black border-t-1 border-gray-100 dark:border-gray-900 border-t-solid h-16 z-50 px-24 flex justify-between items-center">
      <div className="w-max text-gray-300 font-sans">
        {siteData.footer?.message}
      </div>
      <div className="w-max flex justify-center items-center">
        {siteData.footer?.media?.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noreferrer"
            title={item.name}
            className="text-gray-300 hover:text-gray-400 mx-2"
          >
            <img src={item.icon} alt="icon" className="w-6 h-6" />
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
