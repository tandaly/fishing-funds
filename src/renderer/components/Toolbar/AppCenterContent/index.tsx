import React, { useState, useMemo, useCallback } from 'react';
import ColorHash from 'color-hash';
import { useBoolean } from 'ahooks';
import { Input } from 'antd';
import { useDispatch } from 'react-redux';

import WalletIcon from '@/static/icon/wallet.svg';
import NewsIcon from '@/static/icon/news.svg';
import ExchangeIcon from '@/static/icon/exchange.svg';
import BubbleIcon from '@/static/icon/bubble.svg';
import OrderIcon from '@/static/icon/order.svg';
import PieIcon from '@/static/icon/pie.svg';
import WeiboIcon from '@/static/icon/weibo.svg';
import NeteaseIcon from '@/static/icon/netease.svg';
import FundsIcon from '@/static/icon/funds.svg';
import TelegramIcon from '@/static/icon/telegram.svg';
import GithubIcon from '@/static/icon/github.svg';
import BilibiliIcon from '@/static/icon/bilibili.svg';
import TaobaoIcon from '@/static/icon/taobao.svg';
import YoutubeIcon from '@/static/icon/youtube.svg';
import FundsBoxIcon from '@/static/icon/funds-box.svg';
import BarChartIcon from '@/static/icon/bar-chart.svg';
import StockIcon from '@/static/icon/stock.svg';
import CoinIcon from '@/static/icon/coin.svg';
import CalendarCheckIcon from '@/static/icon/calendar-check.svg';
import LayoutIcon from '@/static/icon/layout.svg';

import CustomDrawer from '@/components/CustomDrawer';
import CustomDrawerContent from '@/components/CustomDrawer/Content';
import StandCard from '@/components/Card/StandCard';
import ManageFundContent from '@/components/Home/FundList/ManageFundContent';
import ManageZindexContent from '@/components/Home/ZindexView/ManageZindexContent';
import ManageStockContent from '@/components/Home/StockList/ManageStockContent';
import ManageCoinContent from '@/components/Home/CoinList/ManageCoinContent';
import ManageWalletContent from '@/components/Wallet/ManageWalletContent';
import FundStatisticsContent from '@/components/Home/FundList/FundStatisticsContent';
import NewsContent from '@/components/Home/NewsList/NewsContent';
import HoldingContent from '@/components/Home/QuotationView/HoldingContent';
import FundFlowContent from '@/components/Home/QuotationView/FundFlowContent';
import ExchangeContent from '@/components/Home/ZindexView/ExchangeContent';
import QuoteCenterContent from '@/components/Home/QuotationView/QuoteCenterContent';
import EconomicDataContent from '@/components/Home/ZindexView/EconomicDataContent';
import FundRankingContent from '@/components/Home/FundList/FundRankingContent';
import StockRankingContent from '@/components/Home/StockList/StockRankingContent';
import CoinRankingContent from '@/components/Home/CoinList/CoinRankingContent';
import EconomicCalendarContent from '@/components/Home/StockList/EconomicCalendarContent';
import { openWebAction } from '@/actions/web';

import styles from './index.module.scss';
import { GetValueColor } from '@/utils';

const { Search } = Input;
const iconSize = { height: 18, width: 18 };
const colorHash = new ColorHash();

interface AppCenterContentProps {
  onClose: () => void;
  onEnter: () => void;
}
interface AppConfig {
  name: string;
  click: () => void;
  icon: React.ReactElement;
  color?: string;
  borderColor?: string;
}

function constructApps(appConfigs: AppConfig[]) {
  return (
    <div className={styles.apps}>
      {appConfigs.map((config, index) => {
        const color = config.color || colorHash.hex(config.name);
        return (
          <div className={styles.appContent} key={config.name}>
            <div
              className={styles.app}
              style={{
                background: color,
                boxShadow: `0 2px 5px ${color}`,
                border: config.borderColor && `1px solid ${config.borderColor}`,
              }}
              onClick={config.click}
            >
              {config.icon}
            </div>
            <div className={styles.name}>{config.name}</div>
          </div>
        );
      })}
    </div>
  );
}

function renderApps(groups: { name: string; config: AppConfig[] }[], keyword: string) {
  return groups.map((group) => (
    <StandCard key={group.name} title={group.name}>
      {constructApps(group.config.filter(({ name }) => name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())))}
    </StandCard>
  ));
}

const AppCenterContent: React.FC<AppCenterContentProps> = (props) => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
  const [showManageFundDrawer, { setTrue: openManageFundDrawer, setFalse: closeManageFundDrawer }] = useBoolean(false);
  const [showManageWalletDrawer, { setTrue: openManageWalletDrawer, setFalse: closeManageWalletDrawer }] = useBoolean(false);
  const [showManageZindexDrawer, { setTrue: openManageZindexDrawer, setFalse: closeManageZindexDrawer }] = useBoolean(false);
  const [showManageStockDrawer, { setTrue: openManageStockDrawer, setFalse: closeManageStockDrawer }] = useBoolean(false);
  const [showManageCoinDrawer, { setTrue: openManageCoinDrawer, setFalse: closeManageCoinDrawer }] = useBoolean(false);
  const [showFundsStatisticsDrawer, { setTrue: openFundStatisticsDrawer, setFalse: closeFundStatisticsDrawer }] = useBoolean(false);
  const [showNewsDrawer, { setTrue: openNewsDrawer, setFalse: closeNewsDrawer }] = useBoolean(false);
  const [showHoldingDrawer, { setTrue: openHoldingDrawer, setFalse: closeHoldingDrawer }] = useBoolean(false);
  const [showFundFlowDrawer, { setTrue: openFundFlowDrawer, setFalse: closeFundFlowDrawer }] = useBoolean(false);
  const [showExchangeDrawer, { setTrue: openExchangeDrawer, setFalse: closeExchangeDrawer }] = useBoolean(false);
  const [showQuoteCenterDrawer, { setTrue: openQuoteCenterDrawer, setFalse: closeQuoteCenterDrawer }] = useBoolean(false);
  const [showEconomicDataDrawer, { setTrue: openEconomicDataDrawer, setFalse: closeEconomicDataDrawer }] = useBoolean(false);
  const [showFundRankingDrawer, { setTrue: openFundRankingDrawer, setFalse: closeFundRankingDrawer }] = useBoolean(false);
  const [showStockRankingDrawer, { setTrue: openStockRankingDrawer, setFalse: closeStockRankingDrawer }] = useBoolean(false);
  const [showCoinRankingDrawer, { setTrue: openCoinRankingDrawer, setFalse: closeCoinRankingDrawer }] = useBoolean(false);
  const [showEconomicCalendarDrawer, { setTrue: openEconomicCalendarDrawer, setFalse: closeEconomicCalendarDrawer }] = useBoolean(false);

  const onViewWeb = useCallback((args) => dispatch(openWebAction(args)), []);

  const onSearch = useCallback((value: string) => {
    if (value.startsWith('http://') || value.startsWith('https://')) {
      onViewWeb({ title: '', url: value });
    }
  }, []);

  const apps = useMemo(
    () =>
      renderApps(
        [
          {
            name: '数据管理',
            config: [
              {
                name: '基金管理',
                icon: <i style={{ ...iconSize }}>基</i>,
                click: openManageFundDrawer,
              },
              {
                name: '指数管理',
                icon: <i style={{ ...iconSize }}>指</i>,
                click: openManageZindexDrawer,
              },
              {
                name: '股票管理',
                icon: <i style={{ ...iconSize }}>股</i>,
                click: openManageStockDrawer,
              },
              {
                name: '货币管理',
                icon: <i style={{ ...iconSize }}>币</i>,
                click: openManageCoinDrawer,
              },
              {
                name: '钱包管理',
                icon: <WalletIcon style={{ ...iconSize }} />,
                click: openManageWalletDrawer,
              },
            ],
          },
          {
            name: '特色功能',
            config: [
              {
                name: '基金统计',
                icon: <PieIcon style={{ ...iconSize }} />,
                click: openFundStatisticsDrawer,
              },
            ],
          },
          {
            name: '拓展功能',
            config: [
              {
                name: '新闻动态',
                icon: <NewsIcon style={{ ...iconSize }} />,
                click: openNewsDrawer,
              },
              {
                name: '沪深港通股',
                icon: <OrderIcon style={{ ...iconSize }} />,
                click: openHoldingDrawer,
              },
              {
                name: '板块资金流',
                icon: <LayoutIcon style={{ ...iconSize }} />,
                click: openFundFlowDrawer,
              },
              {
                name: '外汇债券',
                icon: <ExchangeIcon style={{ ...iconSize }} />,
                click: openExchangeDrawer,
              },
              {
                name: '行情中心',
                icon: <BubbleIcon style={{ ...iconSize }} />,
                click: openQuoteCenterDrawer,
              },
              {
                name: '经济数据',
                icon: <BarChartIcon style={{ ...iconSize }} />,
                click: openEconomicDataDrawer,
              },
              {
                name: '基金榜',
                icon: <FundsBoxIcon style={{ ...iconSize }} />,
                click: openFundRankingDrawer,
              },
              {
                name: '股票榜',
                icon: <StockIcon style={{ ...iconSize }} />,
                click: openStockRankingDrawer,
              },
              {
                name: '货币榜',
                icon: <CoinIcon style={{ ...iconSize }} />,
                click: openCoinRankingDrawer,
              },
              {
                name: '财经日历',
                icon: <CalendarCheckIcon style={{ ...iconSize }} />,
                click: openEconomicCalendarDrawer,
              },
            ],
          },
          {
            name: 'H5专区',
            config: [
              {
                name: '新浪微博',
                icon: <WeiboIcon style={{ ...iconSize }} />,
                color: '#F7C544',
                click: () => onViewWeb({ title: '新浪微博', url: 'https://m.weibo.cn/', phone: false }),
              },
              {
                name: 'Telegram',
                icon: <TelegramIcon style={{ ...iconSize }} />,
                color: '#30A9EE',
                click: () => onViewWeb({ title: 'Telegram', url: 'https://web.telegram.org/', phone: false }),
              },
              {
                name: 'YouTube',
                icon: <YoutubeIcon style={{ ...iconSize }} />,
                color: '#E93223',
                click: () => onViewWeb({ title: 'YouTube', url: 'https://www.youtube.com/', phone: false }),
              },
              {
                name: '东财人气榜',
                icon: <i style={{ ...iconSize }}>榜</i>,
                click: () =>
                  onViewWeb({
                    title: '东财人气榜',
                    url: 'https://vipmoney.eastmoney.com/collect/stockranking/pages/ranking9_3/list.html',
                    phone: true,
                  }),
              },
            ],
          },
        ],
        keyword
      ),
    [keyword]
  );

  return (
    <CustomDrawerContent title="功能中心" enterText="确定" onEnter={props.onEnter} onClose={props.onClose}>
      <div className={styles.content}>
        <div className={styles.search}>
          <Search
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            type="text"
            placeholder="功能名称或者网址"
            enterButton
            size="small"
            onSearch={onSearch}
          />
        </div>
        {apps}
        <CustomDrawer show={showManageFundDrawer}>
          <ManageFundContent onClose={closeManageFundDrawer} onEnter={closeManageFundDrawer} />
        </CustomDrawer>
        <CustomDrawer show={showManageWalletDrawer}>
          <ManageWalletContent onClose={closeManageWalletDrawer} onEnter={closeManageWalletDrawer} />
        </CustomDrawer>
        <CustomDrawer show={showManageZindexDrawer}>
          <ManageZindexContent onClose={closeManageZindexDrawer} onEnter={closeManageZindexDrawer} />
        </CustomDrawer>
        <CustomDrawer show={showManageStockDrawer}>
          <ManageStockContent onClose={closeManageStockDrawer} onEnter={closeManageStockDrawer} />
        </CustomDrawer>
        <CustomDrawer show={showManageCoinDrawer}>
          <ManageCoinContent onClose={closeManageCoinDrawer} onEnter={closeManageCoinDrawer} />
        </CustomDrawer>
        <CustomDrawer show={showFundFlowDrawer}>
          <FundFlowContent onClose={closeFundFlowDrawer} onEnter={closeFundFlowDrawer} />
        </CustomDrawer>
        <CustomDrawer show={showFundsStatisticsDrawer}>
          <FundStatisticsContent onClose={closeFundStatisticsDrawer} onEnter={closeFundStatisticsDrawer} />
        </CustomDrawer>
        <CustomDrawer show={showNewsDrawer}>
          <NewsContent onClose={closeNewsDrawer} onEnter={closeNewsDrawer} />
        </CustomDrawer>
        <CustomDrawer show={showExchangeDrawer}>
          <ExchangeContent onClose={closeExchangeDrawer} onEnter={closeExchangeDrawer} />
        </CustomDrawer>
        <CustomDrawer show={showQuoteCenterDrawer}>
          <QuoteCenterContent onClose={closeQuoteCenterDrawer} onEnter={closeQuoteCenterDrawer} />
        </CustomDrawer>
        <CustomDrawer show={showHoldingDrawer}>
          <HoldingContent onClose={closeHoldingDrawer} onEnter={closeHoldingDrawer} />
        </CustomDrawer>
        <CustomDrawer show={showEconomicDataDrawer}>
          <EconomicDataContent onClose={closeEconomicDataDrawer} onEnter={closeEconomicDataDrawer} />
        </CustomDrawer>
        <CustomDrawer show={showFundRankingDrawer}>
          <FundRankingContent onClose={closeFundRankingDrawer} onEnter={closeFundRankingDrawer} />
        </CustomDrawer>
        <CustomDrawer show={showStockRankingDrawer}>
          <StockRankingContent onClose={closeStockRankingDrawer} onEnter={closeStockRankingDrawer} />
        </CustomDrawer>
        <CustomDrawer show={showCoinRankingDrawer}>
          <CoinRankingContent onClose={closeCoinRankingDrawer} onEnter={closeCoinRankingDrawer} />
        </CustomDrawer>
        <CustomDrawer show={showEconomicCalendarDrawer}>
          <EconomicCalendarContent onClose={closeEconomicCalendarDrawer} onEnter={closeEconomicCalendarDrawer} />
        </CustomDrawer>
      </div>
    </CustomDrawerContent>
  );
};

export default AppCenterContent;
