import React from 'react';
import { SearchOutlined, GlobalOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import {} from 'antd';
import ColorHash from 'color-hash';
import * as Utils from '@/utils';
import { useOpenWebView } from '@/utils/hooks';
import styles from './index.module.scss';

interface QuickSearchProps {
  value: string;
}

const colorHash = new ColorHash();

const QuickSearch: React.FC<QuickSearchProps> = (props) => {
  const { value } = props;
  const { valid, url } = Utils.CheckUrlValid(value);

  const openWebView = useOpenWebView({ phone: true });

  const searchWebsites = [
    {
      name: '访问',
      url: url,
      hidden: !valid,
    },
    {
      name: 'Google',
      url: `https://www.google.com/search?q=${value}`,
      hidden: !value,
    },
    {
      name: 'Bing',
      url: `https://cn.bing.com/search?q=${value}`,
      hidden: !value,
    },
    {
      name: 'Yandex',
      url: `https://yandex.com/search/?text=${value}`,
      hidden: !value,
    },
    {
      name: '百度',
      url: `https://www.baidu.com/s?wd=${value}`,
      hidden: !value,
    },
  ].filter(({ hidden }) => !hidden);

  return searchWebsites.length ? (
    <div className={styles.content}>
      {searchWebsites.map((site) => {
        const color = colorHash.hex(site.name);
        return (
          <div
            key={site.name}
            className={clsx(styles.item, 'brightness')}
            style={{
              background: color,
              boxShadow: `0 2px 5px ${color}`,
            }}
            onClick={() => openWebView(site.url)}
          >
            <span>{site.name}</span>
            {site.name === '访问' ? <GlobalOutlined /> : <SearchOutlined />}
          </div>
        );
      })}
    </div>
  ) : (
    <></>
  );
};

export default QuickSearch;
