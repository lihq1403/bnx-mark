import styled from "styled-components";
import Web3 from "web3";
import {
  Table,
  Button,
  Tag,
  Space,
  InputNumber,
  Dropdown,
  Notification,
  Typography,
  Input,
  Modal,
} from "@douyinfe/semi-ui";
import { GoldColums, GoldMColums } from "../utils/colums";
import { ff, ff2, isMobile, sendTransation } from "../utils/util";
import { useEffect, useState } from "react";
import {
  gongzuo_type1,
  gongzuo_type2,
  gongzuo_type3,
  gongzuo_type4,
  gongzuo_type5,
  gongzuo_type6,
  gongzuo_type7,
  gongzuo_type8,
  gongzuo_type9,
  Robber,
  Warrior,
  Ranger,
  Mage,
  Katrina,
  multiples,
  gongzuo_type_zh,
  prices,
  Addresss,
} from "../utils/emuns";
import { filterHegeOne } from "../utils/util";

const MyHeroContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 20px;
`;

const GoldP = ({ contracts }) => {
  const [filterWorkType, setFilterWorkType] = useState("");
  const [workLoad, setWorkLoad] = useState(false);
  const [tishi, setTishi] = useState(true);
  const [goldTotal, setGoldTotal] = useState(0);
  const [budgetGoldTotal, setBudgetGoldTotal] = useState(0);
  const [gongzuoList, setGongZuoList] = useState([]);
  const [myWorkCardSelectedList, setMyWorkCardSelectedList] = useState([]);
  const [work, setWord] = useState(false); // 收菜, 退出工作
  const [filterGold, setFilterGold] = useState(1000);
  const [selectedRowKeys, setselectedRowKeys] = useState([]);
  const [address, setCopyAddress] = useState("");
  const [gold, setGold] = useState(0);
  const web3 = new Web3("https://bsc-dataseed4.binance.org");
  const [privateKey, setPrivateKey] = useState("");

  const getPrice = () => {
    const goldid = "12082";
    fetch(
      `https://3rdparty-apis.coinmarketcap.com/v1/cryptocurrency/widget?id=${goldid}&convert_id=1,2781,2781`
    )
      .then((res) => res.json())
      .then((res) => {
        setGold(res.data[goldid].quote["2781"].price || 0);
      });
  };

  const parsePrivateKey = async () => {
    if (privateKey.length < 64) {
      Notification.error("请输入正确的私钥");
      return;
    }
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    setCopyAddress(account.address);
    Notification.success({ content: "已导入私钥" });
    getWordCards(account.address);
  };

  // 工作中的卡
  const getWordCards = (address) => {
    getPrice();
    if (!address) {
      Notification.info({ content: "请导入私钥" });
      return;
    }
    const types = [
      gongzuo_type1,
      gongzuo_type2,
      gongzuo_type3,
      gongzuo_type4,
      gongzuo_type5,
      gongzuo_type6,
      gongzuo_type7,
      gongzuo_type8,
      gongzuo_type9,
    ];
    setWorkLoad(true);
    setGongZuoList([]);
    setBudgetGoldTotal(0);
    setGoldTotal(0);
    setselectedRowKeys([]);
    setMyWorkCardSelectedList([]);
    const allFetchPromises = types.map((item) => {
      return fetch(
        `https://game.binaryx.pro/info/getWorks2?address=${address}&work_type=${item}&page=1&page_size=3000&direction=asc`
      )
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (!res.data.result) return [];
          const list = res.data.result.items;
          let nlist = [];
          if (list) {
            nlist = list.map((item) => {
              return {
                ...item,
                name: gongzuo_type_zh(item.work_type),
              };
            });
          }
          return nlist;
        })
        .catch((e) => console.log(e));
    });
    Promise.all(allFetchPromises)
      .then((res) => {
        let list = res
          .filter((item) => item != undefined)
          .reduce((pre, item) => {
            return [...pre, ...item];
          }, []);
        list = list.map(async (item) => {
          const work = await (item.name === "兼职"
            ? contracts.MiningContract
            : contracts.NewMiningContract
          ).methods
            .getPlayerWork(item.token_id)
            .call()
            .catch((err) => console.log(err));
          const info = await contracts.NewPlayInfoContract.methods
            .getPlayerInfoBySet(item.token_id)
            .call()
            .catch((err) => console.log(err));
          const endtime = await web3.eth.getBlockNumber();
          let typeContract;
          switch (item.name) {
            case "兼职":
              typeContract = contracts.LgongContract;
              break;
            case "伐木":
              typeContract = contracts.BlacksmithContract;
              break;
            case "酿酒":
              typeContract = contracts.HunterContract;
              break;
            case "卷轴":
              typeContract = contracts.BookmangerContract;
              break;
            case "打猎":
              typeContract = contracts.RangeworkContract;
              break;
            case "传奇":
              typeContract = contracts.LegendaryContract;
              break;
            case "守卫":
              typeContract = contracts.GaojiAddressContract;
              break;
            case "士兵":
              typeContract = contracts.SixthContract;
              break;
            case "顾问":
              typeContract = contracts.SeventhContract;
              break;
            default:
              typeContract = contracts.LgongContract;
              break;
          }
          const gold = await typeContract.methods
            .getIncome(info[0], work.startTime, endtime + "")
            .call()
            .catch((err) => console.log(err));
          //   console.log(gold)
          return {
            career_address: info[1],
            strength: Number(info[0][0]),
            agility: Number(info[0][1]),
            physique: Number(info[0][2]),
            volition: Number(info[0][3]),
            brains: Number(info[0][4]),
            charm: Number(info[0][5]),
            level: Number(info[0][6]),
            total:
              Number(info[0][0]) +
              Number(info[0][1]) +
              Number(info[0][2]) +
              Number(info[0][3]) +
              Number(info[0][4]) +
              Number(info[0][5]),
            token_id: item.token_id,
            workname: item.name,
            gold: Number(gold / Math.pow(10, 18)).toFixed(2),
          };
        });
        Promise.all(list)
          .then((res) => {
            setGongZuoList(res);
            const total = res.reduce((pre, item) => {
              return Number(pre) + Number(item.gold);
            }, 0);
            const hgtotal = res.reduce((pre, item) => {
              let hege = false;
              switch (item.career_address) {
                case Robber:
                  hege = filterHegeOne(item, Robber, "agility", "strength");
                  break;
                case Ranger:
                  hege = filterHegeOne(item, Ranger, "strength", "agility");
                  break;
                case Warrior:
                  hege = filterHegeOne(item, Warrior, "strength", "physique");
                  break;
                case Katrina:
                  hege = filterHegeOne(item, Katrina, "strength", "physique");
                  break;
                case Mage:
                  hege = filterHegeOne(item, Mage, "brains", "charm");
                  break;
              }
              if (hege && item.level >= 2) {
                let value = 0;
                switch (item.career_address) {
                  case Robber:
                    value = item.agility;
                    break;
                  case Ranger:
                    value = item.strength;
                    break;
                  case Warrior:
                    value = item.strength;
                    break;
                  case Katrina:
                    value = item.strength;
                    break;
                  case Mage:
                    value = item.brains;
                    break;
                }
                const mainValue =
                  Number(prices[value]) * Number(multiples[item.level]);
                return pre + mainValue;
              }
              if (!hege && item.level > 1) {
                return pre + 288 * Number(multiples[item.level]);
              }
              return pre + 288;
            }, 0);
            setBudgetGoldTotal(hgtotal);
            setGoldTotal(total);
            setWorkLoad(false);
          })
          .catch((e) => setWorkLoad(false));
      })
      .catch((e) => setWorkLoad(false));
  };

  const getGold = () => {
    return () => {
      if (!address) {
        Notification.info({ content: "请导入私钥" });
        return;
      }
      ff2(
        0.002 * Math.ceil(myWorkCardSelectedList.length / 10),
        address,
        privateKey,
        0,
        () => {
          Notification.info({
            content: "正在获取收益中,请不要关闭,刷新网页",
            duration: 10,
          });
          getGoldList('getAward', myWorkCardSelectedList, 1, 0);
        }
      );
    };
  };

  const getGoldList = (method, list, time, non) => {
    const item = list[0];
    console.log(item.token_id);
    if (item.workname === "兼职") {
      const data = contracts.MiningContract.methods[method](item.token_id).encodeABI();
      sendTransation(privateKey,address,Addresss.MiningAddress,data,0,non, (nonce) => {
          Notification.success({
            content: `已获取收益${item.gold}金币`,
          });
          if (list.length > 1) {
            setTimeout(() => {
              getGoldList(method, list.slice(1), time + 1, nonce);
            }, time * 1000);
          }
        }
      );
    } else {
      const data = contracts.NewMiningContract.methods[method](item.token_id).encodeABI();
      sendTransation(privateKey,address,Addresss.NewMiningAddress,data,0,non, (nonce) => {
        Notification.success({
          content: `已获取收益${item.gold}金币`,
        });
        if (list.length > 1) {
          setTimeout(() => {
            getGoldList(method, list.slice(1), time + 1, nonce);
          }, time * 1000);
        }
      }
    );
    }
  };

  const getFilterGold = () => {
    if (!address) {
      Notification.info({ content: "请导入私钥" });
      return;
    }
    if (!filterWorkType) {
      Notification.error({ content: "请选择工作类型" });
      return;
    }
    const workname = gongzuo_type_zh(filterWorkType);
    const a = gongzuoList.filter((item) => item.workname === workname);
    if (a.length === 0) {
      Notification.error({ content: `你没有${workname}可收` });
      return;
    }
    const g = a.filter((item) => item.gold >= filterGold);
    if (g.length === 0) {
      Notification.error({ content: `你没有金币满${filterGold}的卡可收` });
      return;
    }

    ff2(
      0.002 * Math.ceil(g.length / 10),
      address,
      privateKey,
      0,
      () => {
        Notification.info({
          content: "正在获取收益中,请不要关闭,刷新网页",
          duration: 10,
        });
        getGoldList('getAward',g, 1, 0);
      }
    );
  };

  const quitWork = () => {
    return () => {
      if (!address) {
        Notification.info({ content: "请导入私钥" });
        return;
      }
      if (myWorkCardSelectedList.length === 0) {
        Notification.error({ content: "你没卡可以退出工作" });
        return;
      }
      
      ff2(
        0.002 * Math.ceil(myWorkCardSelectedList.length / 10),
        address,
        privateKey,
        0,
        () => {
          Notification.info({
            content: "正在炒老板鱿鱼中, 请不要关闭,刷新网页",
            duration: 10,
          });
          getGoldList('quitWork',myWorkCardSelectedList, 1, 0);
        }
      );
    };
  };


  return (
    <MyHeroContainer>
      <Typography.Title style={{ textAlign: "center" }}>
        日常挖矿
      </Typography.Title>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: 20,
          flexWrap: "wrap",
        }}
      >
        <Space>
          <Input
            style={{ width: 200 }}
            placeholder="请输入你的私钥"
            onChange={(v) => setPrivateKey(v)}
          />
          <Button disabled={privateKey.length !== 64} onClick={parsePrivateKey}>
            导入私钥
          </Button>
        </Space>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: 20,
          flexWrap: "wrap",
        }}
      >
        <Button
          type="primary"
          style={{ margin: 3 }}
          disabled={!work}
          onClick={getGold(false)}
        >
          收菜
        </Button>
        <Button
          type="primary"
          style={{ margin: 3 }}
          disabled={!work}
          onClick={quitWork(false)}
        >
          辞职
        </Button>
        <Button
          type="primary"
          style={{ margin: 3 }}
          onClick={() => getWordCards(address)}
        >
          刷新
        </Button>
        <InputNumber
          precision={2}
          defaultValue={filterGold}
          onChange={(value) => setFilterGold(value)}
        />
        <Dropdown
          render={
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setFilterWorkType(gongzuo_type1)}>
                兼职
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilterWorkType(gongzuo_type3)}>
                伐木
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilterWorkType(gongzuo_type2)}>
                酿酒
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilterWorkType(gongzuo_type4)}>
                抄录
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilterWorkType(gongzuo_type5)}>
                打猎
              </Dropdown.Item>
            </Dropdown.Menu>
          }
        >
          <Button type="tertiary" style={{ margin: 3 }}>
            {gongzuo_type_zh(filterWorkType) || "选择工作类型"}
          </Button>
        </Dropdown>
        <Button type="primary" style={{ margin: 3 }} onClick={getFilterGold}>
          过滤收菜
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: 20,
          flexWrap: "wrap",
        }}
      >
        <Space
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Tag>挖矿卡片数量: {gongzuoList.length}</Tag>
          <Tag>
            每日预计收益: {budgetGoldTotal} ={" "}
            {gold === 0
              ? `${budgetGoldTotal} GOLD`
              : `${(budgetGoldTotal * gold).toFixed(2)} USD`}
          </Tag>
          <Tag>
            挖矿总收益: {goldTotal.toFixed(2)} ={" "}
            {gold === 0
              ? `${goldTotal.toFixed(2)} GOLD`
              : `${(goldTotal * gold).toFixed(2)} USD`}
          </Tag>
        </Space>
      </div>
      <p style={{ width: "100%", textAlign: "center", fontSize: 10 }}>
        每次点击相关操作按钮前, 都需要支付每10卡0.002BNB手续费
      </p>
      {myWorkCardSelectedList.length > 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: 5,
            flexWrap: "wrap",
          }}
        >
          <p style={{ color: "var(--semi-color-text-0)" }}>
            已选中: {myWorkCardSelectedList.length}
          </p>
        </div>
      ) : (
        ""
      )}
      <Table
        loading={workLoad}
        rowKey={(record) => record.token_id}
        size="small"
        columns={isMobile() ? GoldMColums : GoldColums}
        rowSelection={{
          selectedRowKeys: selectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            setWord(selectedRows.length > 0);
            setselectedRowKeys(selectedRowKeys);
            setMyWorkCardSelectedList(selectedRows);
          },
        }}
        dataSource={gongzuoList}
        pagination={{
          formatPageText: !isMobile(),
        }}
        bordered
      />
      <Modal
        visible={tishi}
        title="风险提示"
        width={isMobile() ? 300 : 520}
        centered
        closable={false}
        footer={<Button onClick={() => setTishi(false)}>关闭提示</Button>}
      >
        <p>
          私钥代表你的账户,工具猫不会保存你的私钥, 也不建议你保存私钥,
          当你重新刷新网页,再次使用需要重新导入私钥
          <br />
          请注意: 工具猫不负责使用者的私钥安全
        </p>
      </Modal>
    </MyHeroContainer>
  );
};

export default GoldP;
