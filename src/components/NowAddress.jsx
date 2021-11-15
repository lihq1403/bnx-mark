import { Typography, Button } from "@douyinfe/semi-ui";
import icons from "../assets/vip.png";

const NowAddress = ({ address, contractss, nowaddress = "" }) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: 10,
          flexWrap: "wrap",
          color: "var(--semi-color-text-0)",
        }}
      >
        <Typography.Text
          copyable
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            color:
              contractss > Number(String(new Date().getTime()).substr(0, 10))
                ? "red"
                : "var(--semi-color-text-0)",
          }}
        >
          {address}
        </Typography.Text>
      </div>
      {/* <div
        style={{
          transform: "scale(.5)",
          width: 50,
          height: 30,
          position: "fixed",
          top: 80,
          left: 10,
        }}
        class="coinmarketcap-currency-widget"
        data-currencyid="9891"
        data-base="USD"
        data-secondary=""
        data-ticker="true"
        data-rank="false"
        data-marketcap="false"
        data-volume="false"
        data-statsticker="false"
        data-stats="USD"
      ></div>
      <div
       style={{
        transform: "scale(.5)",
        width: 50,
        height: 30,
        position: "fixed",
        top: 150,
        left: 10,
      }}
        class="coinmarketcap-currency-widget"
        data-currencyid="12082"
        data-base="USD"
        data-secondary=""
        data-ticker="true"
        data-rank="false"
        data-marketcap="false"
        data-volume="false"
        data-statsticker="false"
        data-stats="USD"
      ></div> */}
    </div>
  );
};

export default NowAddress;
