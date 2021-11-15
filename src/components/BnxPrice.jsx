import { Tag } from "@douyinfe/semi-ui";
import { Space, Typography } from "antd";
import { useEffect, useState } from "react";

const BnxPrice = () => {
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
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Space>
        <div
          style={{
            display: "flex",
            border: "solid 1px #efefef",
            borderRadius: "5px",
            padding: 5,
            background: "#FFF",
            alignItems: "center",
          }}
        >
          <img
            src={"https://s2.coinmarketcap.com/static/img/coins/64x64/9891.png"}
            style={{ width: 30, height: 30, marginRight: 10, marginLeft: 10 }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              <Typography.Text>
                <a href="https://pancakeswap.finance/swap?outputCurrency=0x8c851d1a123ff703bd1f9dabe631b69902df5f97" 
                  target="_blank">BNX</a>
              </Typography.Text>
              <Typography.Text
                type={goldp < 0 ? "danger" : "success"}
                style={{ fontSize: 13, marginLeft: 5 }}
              >
                {bnxp.toFixed(2)}%
              </Typography.Text>
            </div>
            <div>
              <Typography.Text strong>{bnx.toFixed(2)}</Typography.Text>
              <Typography.Text style={{ fontSize: 10, marginLeft: 5 }}>
                USD
              </Typography.Text>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            border: "solid 1px #efefef",
            borderRadius: "5px",
            padding: 5,
            background: "#FFF",
            alignItems: "center",
          }}
        >
          <img
            src={
              "https://s2.coinmarketcap.com/static/img/coins/64x64/12082.png"
            }
            style={{ width: 40, height: 40 }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              <Typography.Text>
                <a href="https://pancakeswap.finance/swap?outputCurrency=0xb3a6381070b1a15169dea646166ec0699fdaea79" 
                  target="_blank">Gold</a>
              </Typography.Text>
              <Typography.Text
                type={goldp < 0 ? "danger" : "success"}
                style={{ fontSize: 13, marginLeft: 5 }}
              >
                {goldp.toFixed(2)}%
              </Typography.Text>
            </div>
            <div>
              <Typography.Text strong>{gold.toFixed(6)}</Typography.Text>
              <Typography.Text style={{ fontSize: 10, marginLeft: 5 }}>
                USD
              </Typography.Text>
            </div>
          </div>
        </div>
      </Space>
    </div>
  );
};

export default BnxPrice;
