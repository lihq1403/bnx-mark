import { useEffect, useState } from "react";
import { Banner } from "@douyinfe/semi-ui";
import { Space, Typography } from "antd";
const { Text } = Typography;
const PriceBanner = () => {
  const [bnx, setBnx] = useState(0);
  const [bnxp, setBnxp] = useState(0);
  const [gold, setGold] = useState(0);
  const [goldp, setGoldp] = useState(0);

  useEffect(() => {
    getPrice();
    setTimeout(() => {
      getPrice();
    }, 10000);
  }, []);

  const getPrice = () => {
    const bnxid = "9891";
    const goldid = "12082";
    fetch(
      `https://3rdparty-apis.coinmarketcap.com/v1/cryptocurrency/widget?id=${bnxid}&convert_id=1,2781,2781`
    )
      .then((res) => res.json())
      .then((res) => {
        setBnx(res.data[bnxid].quote["2781"].price || 0);
        setBnxp(res.data[bnxid].quote["2781"].percent_change_24h || 0);
      });

    fetch(
      `https://3rdparty-apis.coinmarketcap.com/v1/cryptocurrency/widget?id=${goldid}&convert_id=1,2781,2781`
    )
      .then((res) => res.json())
      .then((res) => {
        setGold(res.data[goldid].quote["2781"].price || 0);
        setGoldp(res.data[goldid].quote["2781"].percent_change_24h || 0);
      });
  };

  return (
    <Banner
      icon={null}
      description={
        <Space>
          <Space>
            <Text size="small" type='warning'>BNX:</Text>
            <Text size="small" type={bnxp < 0 ? "danger" : "success"}>
              ${bnx.toFixed(2)}
            </Text>
          </Space>
          <Space>
            <Text size="small" type='warning'>GOLD:</Text>
            <Text size="small" type={goldp < 0 ? "danger" : "success"}>
              ${gold.toFixed(6)}
            </Text>
          </Space>
        </Space>
      }
    ></Banner>
  );
};

export default PriceBanner;
