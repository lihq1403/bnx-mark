import styled from "styled-components";
import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Tag,
  Space,
  Notification,
  Modal,
  Typography,
  Spin,
  Select,
  Switch,
  InputNumber,
} from "@douyinfe/semi-ui";
import Web3 from "web3";
import { BaseColums, HegeColumn, TokenColumn } from "../utils/colums";
import { isMobile, filterHegeOne, initWeb3, ff } from "../utils/util";
import { Robber, Warrior, Ranger, Mage, Katrina, names } from "../utils/emuns";
import NowAddress from "../components/NowAddress";
import BnxPrice from "../components/BnxPrice";

const { Option } = Select;

const MyHeroContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 20px;
`;

const MaoXian = ({ address, contracts }) => {
  const [heroLoad, setHeroLoad] = useState(false);
  const [jianzhi, setJianzhi] = useState(false); // 兼职按钮
  const [second, setSecond] = useState(false); // 2级工作
  const [myCardSelectedList, setMyCardSelectedList] = useState([]);
  const [myHeroList, setMyHeroList] = useState([]);
  const [selectedRowKeys, setselectedRowKeys] = useState([]);
  const [cardNum, setCardNum] = useState({
    b: 0,
    h: 0,
    levels: [],
    hightLevel: 1,
  });
  const [bnx, setBnx] = useState(0);
  const [Inkey, setInKey] = useState(0);
  const [gold, setGold] = useState(0);
  const [fubenList, setFubenlist] = useState([]);
  const [fubenlvList, setFubenlvlist] = useState([]);
  const [msnums, setMsNums] = useState(0);
  const [mssnums, setMssNums] = useState(0);
  const [nlogs, setNlogs] = useState([]);
  const [mxlist, setMxList] = useState([]);
  const [mxxlist, setMxxList] = useState([]);
  const [gameModal, setGameModal] = useState(false);
  const [gameLoad, setGameLoad] = useState(false);
  const [gameLoadSpin, setGameLoadSpin] = useState(false);
  const [gass, setGass] = useState(0);
  const [gassType, setGassType] = useState(0);
  const [oknum, setOkNum] = useState(0);
  const [fuben, setFuben] = useState(0);
  const [fuben2, setFuben2] = useState(0);
  const [flist, setFlist] = useState([]);
  const [isMark, setIsMark] = useState(true);
  let nlogList = [];

  useEffect(() => {
    setNlogs([]);
    setselectedRowKeys([]);
    setMyCardSelectedList([]);
    Hero();
    getFubenlist();
  }, [address]);

  // 副本列表
  const getFubenlist = () => {
    fetch(
      "https://game.binaryx.pro/v1/dungeon/list?Page=1&Limit=3&lang=zh-cn&sign=ee05987d4d4e2c7bb18c2aa1858617a5",
      {
        method: "POST",
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setFubenlist(res.data.Lists);
        setFubenlvlist(res.data.Lists[0].costs);
      })
      .catch((err) => console.log(err));
  };

  const Hero = async () => {
    if (!address || !contracts) {
      Notification.info({ content: "3秒后不显示钱包地址, 请刷新网页" });
      return;
    }
    initWeb3(Web3.givenProvider)
      .eth.getGasPrice()
      .then((v) => {
        console.log(v);
        setGass(Number(v) / Math.pow(10, 9));
      })
      .catch(() => {});
    nlogList = [];
    setselectedRowKeys([]);
    setMyHeroList([]);
    setHeroLoad(true);
    setJianzhi(false);
    setSecond(false);
    setNlogs([]);
    setMyCardSelectedList([]);
    const warrs = await contracts.WarriorContract.methods
      .balanceOf(address)
      .call()
      .catch((err) => console.log(err));
    const kars = await contracts.KatrinaContract.methods
      .balanceOf(address)
      .call()
      .catch((err) => console.log(err));
    const robbers = await contracts.RobberContract.methods
      .balanceOf(address)
      .call()
      .catch((err) => console.log(err));
    const mages = await contracts.MageContract.methods
      .balanceOf(address)
      .call()
      .catch((err) => console.log(err));
    const youxias = await contracts.youxiaContract.methods
      .balanceOf(address)
      .call()
      .catch((err) => console.log(err));
    const promises = [];
    for (let index = 0; index < warrs; index++) {
      promises.push(
        contracts.WarriorContract.methods
          .tokenOfOwnerByIndex(address, index)
          .call()
          .catch((err) => console.log(err))
      );
    }
    for (let index = 0; index < robbers; index++) {
      promises.push(
        contracts.RobberContract.methods
          .tokenOfOwnerByIndex(address, index)
          .call()
          .catch((err) => console.log(err))
      );
    }
    for (let index = 0; index < mages; index++) {
      promises.push(
        contracts.MageContract.methods
          .tokenOfOwnerByIndex(address, index)
          .call()
          .catch((err) => console.log(err))
      );
    }
    for (let index = 0; index < youxias; index++) {
      promises.push(
        contracts.youxiaContract.methods
          .tokenOfOwnerByIndex(address, index)
          .call()
          .catch((err) => console.log(err))
      );
    }
    for (let index = 0; index < kars; index++) {
      promises.push(
        contracts.KatrinaContract.methods
          .tokenOfOwnerByIndex(address, index)
          .call()
          .catch((err) => console.log(err))
      );
    }

    Promise.all(promises).then((res) => {
      // console.log(res);
      const list = res.map(async (id) => {
        const info = await contracts.NewPlayInfoContract.methods
          .getPlayerInfoBySet(id)
          .call()
          .catch((err) => console.log(err));
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
          token_id: id,
        };
      });
      Promise.all(list)
        .then(async (res) => {
          // console.log(res);
          const nlist = res;
          const tokenids = nlist.map((item) => ({
            id: item.token_id,
            lv: item.level,
          }));
          const ms = nlist.reduce(
            (pre, item) => (item.level > 3 ? pre + item.level : pre + 3),
            0
          );
          const ns = Math.ceil(tokenids.length / 10);
          const idsmises = [];
          for (let end = 0; end < ns; end++) {
            const sliceIds = tokenids.slice(0 + end * 10, end * 10 + 10);
            idsmises.push(
              new Promise((resolve) => {
                fetch(
                  `https://game.binaryx.pro/v1/dungeon/enternumber?GoldAddress=${address}&TokenIds=${JSON.stringify(
                    sliceIds
                  )}`,
                  {
                    method: "POST",
                    credentials: "include",
                    body: JSON.stringify({
                      GoldAddress: address,
                      TokenIds: JSON.stringify(sliceIds),
                    }),
                  }
                )
                  .then((res) => res.json())
                  .then((res) => resolve(res.data));
              })
            );
          }
          const allids = await Promise.all(idsmises).catch((e) =>
            setHeroLoad(false)
          );
          const allis = allids.reduce((pre, s) => [...pre, ...s], []);
          let mss = 0;
          nlist.forEach((item) => {
            for (let ab = 0; ab < allis.length; ab++) {
              const child = allis[ab];
              if (item.token_id === child.id) {
                nlist[ab]["num"] = child.num;
                nlist[ab]["lv"] = 1;
                nlist[ab]["l"] = 1;
                mss += child.num;
                break;
              }
            }
          });
          setMsNums(ms);
          setMssNums(mss);
          const ll = nlist.sort((a, b) => b.num - a.num);
          const fll = nlist.map((item) => [0, 0]);
          setFlist(fll);
          setMyHeroList(ll);

          const blocks = nlist.filter((record) => {
            let hege = false;
            switch (record.career_address) {
              case Robber:
                hege = filterHegeOne(record, Robber, "agility", "strength");
                break;
              case Ranger:
                hege = filterHegeOne(record, Ranger, "strength", "agility");
                break;
              case Warrior:
                hege = filterHegeOne(record, Warrior, "strength", "physique");
                break;
              case Katrina:
                hege = filterHegeOne(record, Katrina, "strength", "physique");
                break;
              case Mage:
                hege = filterHegeOne(record, Mage, "brains", "charm");
                break;
            }
            return hege === false;
          });
          const heges = nlist.filter((record) => {
            let hege = false;
            switch (record.career_address) {
              case Robber:
                hege = filterHegeOne(record, Robber, "agility", "strength");
                break;
              case Ranger:
                hege = filterHegeOne(record, Ranger, "strength", "agility");
                break;
              case Warrior:
                hege = filterHegeOne(record, Warrior, "strength", "physique");
                break;
              case Katrina:
                hege = filterHegeOne(record, Katrina, "strength", "physique");
                break;

              case Mage:
                hege = filterHegeOne(record, Mage, "brains", "charm");
                break;
            }
            return hege === true;
          });
          const hightLevel = heges.reduce((hight, record) => {
            return record.level > hight ? record.level : hight;
          }, 1);
          const levels = [];
          for (let i = 0; i < hightLevel; i++) {
            levels.push(
              heges.filter((record) => record.level === i + 1).length
            );
          }
          setHeroLoad(false);
          setCardNum({
            b: blocks.length,
            h: heges.length,
            levels,
            hightLevel,
          });
        })
        .catch((err) => setHeroLoad(false));
    });
  };

  const getBnxGold = () => {
    if (!address || !contracts) {
      Notification.info({ content: "3秒后不显示钱包地址, 请刷新网页" });
      return;
    }
    contracts.goldContractNew.methods
      .balanceOf(address)
      .call()
      .then((res) => {
        setGold((Number(res) / Math.pow(10, 18)).toFixed(4));
      })
      .catch((err) => console.log(err));
    contracts.bnxContractNew.methods
      .balanceOf(address)
      .call()
      .then((res) => {
        setBnx((Number(res) / Math.pow(10, 18)).toFixed(4));
      })
      .catch((err) => console.log(err));
    contracts.keyContractNew.methods
      .balanceOf(address)
      .call()
      .then((res) => {
        setInKey(Number(res) / Math.pow(10, 18));
      })
      .catch((err) => console.log(err));
  };

  const mx1 = (mxlist, id, lv, tokenid, coin, bnx) => {
    fetch(
      `https://game.binaryx.pro/v1/user/getaddressnonce?GoldAddress=${address}`,
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          GoldAddress: address,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        const { code, data } = res;
        if (code === 1) {
          const { nonce } = data;
          const web3 = initWeb3(Web3.givenProvider);
          web3.eth.personal
            .sign(web3.utils.utf8ToHex(nonce + ""), address, "password")
            .then((e) => {
              console.log(e);
              fetch(
                `https://game.binaryx.pro/v1/dungeon/begin?Id=${id}&TokenId=${tokenid}&DungeonLv=${lv}&GoldAddress=${address}&ASign=${e}&Nonce=${nonce}`,
                {
                  method: "POST",
                  credentials: "include",
                  body: JSON.stringify({
                    GoldAddress: address,
                    Id: id,
                    TokenId: tokenid,
                    DungeonLv: lv,
                    ASign: e,
                    Nonce: nonce,
                  }),
                }
              )
                .then((res) => res.json())
                .then((res) => {
                  const { code, data } = res;
                  // console.log(res);
                  if (code === 1) {
                    const { uuid, id } = data;
                    contracts.dungeonContract.methods
                      .payment(
                        uuid,
                        tokenid,
                        coin + Math.pow(10, 18).toString().substr(1),
                        bnx + Math.pow(10, 18).toString().substr(1)
                      )
                      .send({
                        from: address,
                        gasPrice: (gass + gassType) * Math.pow(10, 9),
                      })
                      .on("transactionHash", (e) => {
                        Notification.info({ content: "检查门票是否到账" });
                        mx2(mxlist, tokenid, uuid, id);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }
                });
            })
            .catch((e) => console.log(e));
        } else {
          setTimeout(() => {
            mx1(mxlist, id, lv, tokenid, coin, bnx);
          }, 3000);
        }
      });
  };

  const mx2 = (mxlist, tokenid, Uuid, DataId) => {
    fetch(
      `https://game.binaryx.pro/v1/dungeon/checkpay?GoldAddress=${address}&TokenId=${tokenid}&Uuid=${Uuid}&DataId=${DataId}`,
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          GoldAddress: address,
          TokenId: tokenid,
          Uuid: Uuid,
          DataId: DataId,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        res.data && 0 !== res.data.s
          ? setTimeout(function () {
              Notification.info({ content: "正在PK" });
              mx3(mxlist, tokenid, Uuid, DataId);
            }, 2000)
          : setTimeout(function () {
              mx2(mxlist, tokenid, Uuid, DataId);
            }, 3000);
      });
  };

  const mx3 = (mxlist, tokenid, Uuid) => {
    fetch(
      `https://game.binaryx.pro/v1/dungeon/battle?GoldAddress=${address}&TokenId=${tokenid}&Uuid=${Uuid}`,
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          GoldAddress: address,
          TokenId: tokenid,
          Uuid: Uuid,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 1) {
          const {
            winner,
            reward_money,
            reward_coupon,
            reward_coin,
            reward_eqs,
          } = res.data;
          const log = {
            winner,
            reward_money,
            reward_coupon,
            reward_coin,
            reward_eqs,
          };
          // console.log(log);
          nlogList.push(log);
          // setNlogs(nlogs);
          setOkNum(nlogList.length);
          Notification.success({
            content: `${
              winner == 2 ? "失败" : "胜利"
            }收益: 金币:${reward_money} 钥匙${reward_coupon} BNX${reward_coin} 装备${reward_eqs
              .map((item) => item.name)
              .toString()} `,
          });
        }
        const total = mxlist.reduce((pre, item) => pre + item.num, 0);
        if (nlogList.length >= total) {
          setGameLoadSpin(false);
          Hero();
          setGameModal(false);
          Notification.success({ content: "副本已完成" });
        }
      });
  };

  return (
    <MyHeroContainer>
      <Typography.Title style={{ textAlign: "center" }}>冒险</Typography.Title>
      <NowAddress address={address} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: 5,
        }}
      >
        <a href="https://game.binaryx.pro/#/game?type=2" target="_blank">
          BinaryX官网
        </a>
      </div>
      <BnxPrice />
      <Space
        style={{
          display: "flex",
          justifyContent: "center",
          margin: 20,
          flexWrap: "wrap",
        }}
      >
        <Tag color="red">BNX {bnx}</Tag>
        <Tag color="yellow">金币 {gold}</Tag>
        <Tag color="orange">钥匙 {Inkey}</Tag>
      </Space>
      <Space
        style={{
          display: "flex",
          justifyContent: "center",
          margin: isMobile() ? 0 : 10,
          flexWrap: "wrap",
        }}
      >
        <Typography.Text
          strong={!isMark}
          style={{ color: !isMark ? "var(--semi-color-text-0)" : "#999" }}
        >
          {"自定义冒险级别"}
        </Typography.Text>
        <Switch onChange={(v) => setIsMark(v)} checked={isMark} />
        <Typography.Text
          strong={isMark}
          style={{ color: isMark ? "var(--semi-color-text-0)" : "#999" }}
        >
          {"默认冒险级别"}
        </Typography.Text>
      </Space>
      {isMark ? (
        <p style={{ textAlign: "center" }}>
          默认对冒险别下所有冒险级别按照下方选项进行, 不能单独设置每一项
        </p>
      ) : (
        ""
      )}
      <Space
        style={{
          display: "flex",
          justifyContent: "center",
          margin: 10,
          flexWrap: "wrap",
        }}
      >
        {fubenList.length > 0 && isMark ? (
          <Select
            defaultValue={fuben}
            value={fuben}
            onChange={(value) => {
              setFuben(value);
              setFuben2(0);
              setFubenlvlist(fubenList[value].costs);
            }}
          >
            {fubenList.map((item, index) => {
              return (
                <Option
                  value={index}
                  key={item.name}
                  disabled={item.status == 0}
                >
                  {item.name}
                </Option>
              );
            })}
          </Select>
        ) : (
          ""
        )}
        {fubenlvList.length > 0 && isMark ? (
          <Select
            value={"LV." + fubenlvList[fuben2].lv}
            onChange={(value) => {
              setFuben2(value);
            }}
          >
            {fubenlvList.map((item, index) => {
              return (
                <Option value={index} key={item.lv}>
                  Lv.{item.lv}
                </Option>
              );
            })}
          </Select>
        ) : (
          ""
        )}
        <Button
          type="primary"
          onClick={() => {
            getBnxGold(address);
            nlogList = [];
            myHeroList.forEach((item) => {
              for (let index = 0; index < mxlist.length; index++) {
                const element = mxlist[index];
                if (item.token_id === element.token_id) {
                  mxlist[index].l = isMark ? fubenList[fuben].l : element.l;
                  mxlist[index].lv = isMark
                    ? fubenlvList[fuben2].lv
                    : element.lv;
                  const fube = fubenList
                    .filter((item) => item.id == element.l)[0]
                    .costs.filter((item) => item.lv == element.lv)[0];
                  mxlist[index]["coin"] = fube.coin;
                  mxlist[index]["money"] = fube.money;
                  mxlist[index]["coins"] = fube.coin * element.num;
                  mxlist[index]["moneys"] = fube.money * element.num;
                  break;
                }
              }
            });

            if (mxlist.length > 0) {
              setGameModal(true);
            } else {
              Notification.error({ content: "请选择英雄" });
            }
          }}
        >
          开打{mxlist.length > 0 ? `(${mxlist.length})` : ""}
        </Button>
        <Button type="primary" onClick={Hero}>
          刷新
        </Button>
      </Space>
      <Space
        style={{
          display: "flex",
          margin: 20,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Tag style={{ textAlign: "center" }}>英雄 {myHeroList.length}</Tag>
        <Tag color="green" style={{ textAlign: "center" }}>
          总冒险次数 {msnums}
        </Tag>
        <Tag color="red" style={{ textAlign: "center" }}>
          剩余冒险次数 {mssnums}
        </Tag>
      </Space>
      <p style={{ width: "100%", textAlign: "center", fontSize: 10 }}>
        每次点击开始冒险按钮进行打副本前, 都需要支付一笔手续费,
        费用为一卡0.002BNB,高于10卡费用为0.0008BNB,高于20卡费用为0.0005BNB,高于30卡费用为0.0003BNB
      </p>
      {myCardSelectedList.length > 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: 5,
            flexWrap: "wrap",
          }}
        >
          <p>已选中: {myCardSelectedList.length}</p>
        </div>
      ) : (
        ""
      )}
      <Table
        loading={heroLoad}
        rowKey={(record) => record.token_id}
        columns={
          isMobile()
            ? [
                {
                  title: "我的英雄",
                  dataIndex: "num",
                  filters: [
                    {
                      text: "合格",
                      value: true,
                    },
                    {
                      text: "黑奴",
                      value: false,
                    },
                  ],
                  onFilter: (value, record) => {
                    let hege = false;
                    switch (record.career_address) {
                      case Robber:
                        hege = filterHegeOne(
                          record,
                          Robber,
                          "agility",
                          "strength"
                        );
                        break;
                      case Ranger:
                        hege = filterHegeOne(
                          record,
                          Ranger,
                          "strength",
                          "agility"
                        );
                        break;
                      case Warrior:
                        hege = filterHegeOne(
                          record,
                          Warrior,
                          "strength",
                          "physique"
                        );
                        break;
                      case Katrina:
                        hege = filterHegeOne(
                          record,
                          Katrina,
                          "strength",
                          "physique"
                        );
                        break;
                      case Mage:
                        hege = filterHegeOne(record, Mage, "brains", "charm");
                        break;
                    }
                    return hege == value;
                  },
                  render: (value, record, index) => {
                    let m1 = 0,
                      m2 = 0;
                    switch (record.career_address) {
                      case Robber:
                        m1 = record.agility;
                        m2 = record.strength;
                        break;
                      case Warrior:
                        m1 = record.strength;
                        m2 = record.physique;
                        break;
                      case Katrina:
                        m1 = record.strength;
                        m2 = record.physique;
                        break;
                      case Mage:
                        m1 = record.brains;
                        m2 = record.charm;
                        break;
                      case Ranger:
                        m1 = record.strength;
                        m2 = record.agility;
                        break;
                    }
                    let hege = false;
                    switch (record.career_address) {
                      case Robber:
                        hege = filterHegeOne(
                          record,
                          Robber,
                          "agility",
                          "strength"
                        );
                        break;
                      case Ranger:
                        hege = filterHegeOne(
                          record,
                          Ranger,
                          "strength",
                          "agility"
                        );
                        break;
                      case Warrior:
                        hege = filterHegeOne(
                          record,
                          Warrior,
                          "strength",
                          "physique"
                        );
                        break;
                      case Katrina:
                        hege = filterHegeOne(
                          record,
                          Katrina,
                          "strength",
                          "physique"
                        );
                        break;
                      case Mage:
                        hege = filterHegeOne(record, Mage, "brains", "charm");
                        break;
                    }
                    return (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Space>
                            <Tag color={hege ? "green" : "grey"}>
                              {hege ? "合格" : "黑奴"}
                            </Tag>
                            {names[record.career_address]} {record.level}级
                          </Space>
                        </span>
                        <span>
                          力{record.strength}/敏{record.agility}/体
                          {record.physique}/意
                          {record.volition}/智{record.brains}/精{record.charm}
                        </span>
                        <span>
                          <Tag color="orange">剩余冒险次数: {record.num}</Tag>{" "}
                        </span>
                       {
                         isMark ? (
                          <Select
                            size='small'
                            disabled={isMark}
                            style={{width: 200}}
                            value={`${fubenList[isMark ? fuben : 0].name}-LV.${
                              fubenlvList[isMark ? fuben2 : 0].lv
                            }`}
                            onChange={(value) => {
                              const [i, j] = value.split(",");
                              record["l"] = fubenList[i].id;
                              record["lv"] = fubenlvList[j].lv;
                              flist[index][0] = i
                              flist[index][1] = j
                              setIsMark(false);
                              setFlist(flist)
                              setFubenlvlist(
                                fubenList.filter(
                                  (item) =>
                                    item.id === fubenList[flist[index][0]].id
                                )[0].costs
                              );
                            }}
                          >
                            {fubenList.map((item, index_i) => {
                              return fubenList
                                .filter(
                                  (item) =>
                                    item.id === fubenList[flist[index][0]].id
                                )[0]
                                .costs.map((item1, index_j) => {
                                  return (
                                    <Option
                                      value={`${index_i},${index_j}`}
                                      key={item.name + item1.lv}
                                      disabled={item.status == 0}
                                    >
                                      {item.name}-LV.{item1.lv}
                                    </Option>
                                  );
                                });
                            })}
                          </Select>
                        ) : (
                          <Select
                          size='small'
                          style={{width: 200}}
                            defaultValue={`${
                              fubenList[isMark ? fuben : flist[index][0] || 0].name
                            }-LV.${fubenlvList[isMark ? fuben2 : flist[index][1] || 0].lv}`}
                            onChange={(value) => {
                              const [i, j] = value.split(",");
                              setIsMark(false);
                              record["l"] = fubenList[i].id;
                              record["lv"] = fubenlvList[j].lv;
                              setFubenlvlist(
                                fubenList.filter(
                                  (item) =>
                                    item.id === fubenList[flist[index][0]].id
                                )[0].costs
                              );
                            }}
                          >
                            {fubenList.map((item, index_i) => {
                              return fubenList
                                .filter(
                                  (item) =>
                                    item.id === fubenList[flist[index][0]].id
                                )[0]
                                .costs.map((item1, index_j) => {
                                  return (
                                    <Option
                                      value={`${index_i},${index_j}`}
                                      key={item.name + item1.lv}
                                      disabled={item.status == 0}
                                    >
                                      {item.name}-LV.{item1.lv}
                                    </Option>
                                  );
                                });
                            })}
                          </Select>
                        )
                       }
                      </div>
                    );
                  },
                },
              ]
            : [
                ...TokenColumn,
                ...HegeColumn,
                ...BaseColums,
                {
                  title: "战场",
                  dataIndex: "zhanchang",
                  width: 250,
                  render: (text, record, index) => {
                    if (fubenList.length == 0) {
                      return <p>网错</p>;
                    }
                    return isMark ? (
                      <Select
                        disabled={isMark}
                        style={{width: 200}}
                        value={`${fubenList[isMark ? fuben : 0].name}-LV.${
                          fubenlvList[isMark ? fuben2 : 0].lv
                        }`}
                        onChange={(value) => {
                          const [i, j] = value.split(",");
                          record["l"] = fubenList[i].id;
                          record["lv"] = fubenlvList[j].lv;
                          flist[index][0] = i
                          flist[index][1] = j
                          setIsMark(false);
                          setFlist(flist)
                          setFubenlvlist(
                            fubenList.filter(
                              (item) =>
                                item.id === fubenList[flist[index][0]].id
                            )[0].costs
                          );
                        }}
                      >
                        {fubenList.map((item, index_i) => {
                          return fubenList
                            .filter(
                              (item) =>
                                item.id === fubenList[flist[index][0]].id
                            )[0]
                            .costs.map((item1, index_j) => {
                              return (
                                <Option
                                  value={`${index_i},${index_j}`}
                                  key={item.name + item1.lv}
                                  disabled={item.status == 0}
                                >
                                  {item.name}-LV.{item1.lv}
                                </Option>
                              );
                            });
                        })}
                      </Select>
                    ) : (
                      <Select
                      style={{width: 200}}
                        defaultValue={`${
                          fubenList[isMark ? fuben : flist[index][0] || 0].name
                        }-LV.${fubenlvList[isMark ? fuben2 : flist[index][1] || 0].lv}`}
                        onChange={(value) => {
                          const [i, j] = value.split(",");
                          setIsMark(false);
                          record["l"] = fubenList[i].id;
                          record["lv"] = fubenlvList[j].lv;
                          setFubenlvlist(
                            fubenList.filter(
                              (item) =>
                                item.id === fubenList[flist[index][0]].id
                            )[0].costs
                          );
                        }}
                      >
                        {fubenList.map((item, index_i) => {
                          return fubenList
                            .filter(
                              (item) =>
                                item.id === fubenList[flist[index][0]].id
                            )[0]
                            .costs.map((item1, index_j) => {
                              return (
                                <Option
                                  value={`${index_i},${index_j}`}
                                  key={item.name + item1.lv}
                                  disabled={item.status == 0}
                                >
                                  {item.name}-LV.{item1.lv}
                                </Option>
                              );
                            });
                        })}
                      </Select>
                    );
                  },
                },
                {
                  title: "次数",
                  dataIndex: "num",
                },
              ]
        }
        dataSource={myHeroList}
        pagination={false}
        rowSelection={{
          selectedRowKeys: selectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            setMxList(selectedRows);
            setMxxList(selectedRows);
            setselectedRowKeys(selectedRowKeys);
          },
          getCheckboxProps: (record) => ({
            disabled: record.num === 0,
          }),
        }}
        bordered
      />
      <Modal
        visible={gameModal}
        title={`冒险`}
        width={isMobile() ? 300 : 448}
        centered
        cancelText="关闭"
        okText="确认开始冒险"
        destroyOnClose
        maskClosable={false}
        closable={false}
        footer={[
          <Button onClick={() => setGameModal(false)} disabled={gameLoadSpin}>
            关闭
          </Button>,
          <Button
            type="primary"
            disabled={
              gold - mxlist.reduce((pre, item) => pre + item.moneys, 0) < 0 ||
              bnx - mxlist.reduce((pre, item) => pre + item.coins, 0) < 0
            }
            onClick={() => {
              setGameLoad(true);
              setGameLoadSpin(true);
              if (!address || !contracts) {
                Notification.error({ content: "请刷新网页" });
                return;
              }
              initWeb3(Web3.givenProvider)
                .eth.getGasPrice()
                .catch((e) => setGass(e));
              // console.log(mxlist);
              ff(
                (mxlist.length >= 30
                  ? 0.0003
                  : mxlist.length >= 20
                  ? 0.0005
                  : mxlist.length >= 10
                  ? 0.0008
                  : 0.002) * mxlist.length,
                address,
                () => {
                  nlogList = [];
                  setOkNum(0);
                  if (mxlist.length > 0) {
                    // const mx = mxlist.shift();
                    let jishu = -1;
                    for (let a = 0; a < mxlist.length; a++) {
                      const mx = mxlist[a];
                      for (let b = 0; b < mx.num; b++) {
                        jishu++;
                        setTimeout(() => {
                          mx1(
                            mxlist,
                            mx.l,
                            mx.lv,
                            mx.token_id,
                            mx.money,
                            mx.coin
                          );
                        }, jishu * 25000);
                      }
                    }
                  }
                }
              );
            }}
          >
            {gold - mxlist.reduce((pre, item) => pre + item.moneys, 0) < 0 ||
            bnx - mxlist.reduce((pre, item) => pre + item.coins, 0) < 0
              ? "你钱不够"
              : "开始冒险"}
          </Button>,
        ]}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Space>
            <p>总英雄: {mxlist.length} 张</p>
            <p>总冒数: {mxlist.reduce((pre, item) => pre + item.num, 0)} 次</p>
            {/* <p>已冒险: {nlogs.length} 次</p> */}
          </Space>
          <p style={{ margin: 5 }}>
            总门票: {mxlist.reduce((pre, item) => pre + item.moneys, 0)} 金币{" "}
            {mxlist.reduce((pre, item) => pre + item.coins, 0)} BNX
          </p>
          <p style={{ margin: 5 }}>
            (你的余额:
            {gold} 金币 {bnx} BNX)
          </p>
          <p style={{ margin: 5 }}>各等级次数: </p>
          <p
            style={{
              margin: 5,
              display: "flex",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Space
              style={{
                display: "flex",
                flexWrap: "wrap",
                width: 250,
                justifyContent: "center",
              }}
            >
              <Tag color="green" size="large">
                1级{" "}
                {isMark && fuben === 0 && fuben2 === 0
                  ? mxlist.reduce((pre, item) => pre + item.num, 0)
                  : mxlist.reduce(
                      (pre, item) => pre + (item.lv === 1 ? item.num : pre + 0),
                      0
                    )}
                次
              </Tag>
              <Tag color="blue" size="large">
                2级{" "}
                {isMark && fuben === 0 && fuben2 === 1
                  ? mxlist.reduce((pre, item) => pre + item.num, 0)
                  : mxlist.reduce(
                      (pre, item) => pre + (item.lv === 2 ? item.num : pre + 0),
                      0
                    )}{" "}
                次
              </Tag>
              <Tag color="red" size="large">
                3级{" "}
                {isMark && fuben === 0 && fuben2 === 2
                  ? mxlist.reduce((pre, item) => pre + item.num, 0)
                  : mxlist.reduce(
                      (pre, item) => pre + (item.lv === 3 ? item.num : pre + 0),
                      0
                    )}{" "}
                次
              </Tag>
              <Tag color="blue" size="large">
                4级{" "}
                {isMark && fuben === 1 && fuben2 === 0
                  ? mxlist.reduce((pre, item) => pre + item.num, 0)
                  : mxlist.reduce(
                      (pre, item) => (pre + item.lv == 4 ? item.num : pre + 0),
                      0
                    )}
                次
              </Tag>
              <Tag color="red" size="large">
                5级{" "}
                {isMark && fuben === 1 && fuben2 === 1
                  ? mxlist.reduce((pre, item) => pre + item.num, 0)
                  : mxlist.reduce(
                      (pre, item) => pre + (item.lv === 5 ? item.num : pre + 0),
                      0
                    )}{" "}
                次
              </Tag>
              <Tag color="green" size="large">
                6级{" "}
                {isMark && fuben === 1 && fuben2 === 2
                  ? mxlist.reduce((pre, item) => pre + item.num, 0)
                  : mxlist.reduce(
                      (pre, item) => pre + (item.lv === 6 ? item.num : pre + 0),
                      0
                    )}{" "}
                次
              </Tag>
              {/* <Tag color="green">
                7级{" "}
                {mxlist.reduce(
                  (pre, item) => pre + (item.lv == 7 ? item.num : pre + 0),
                  0
                )}
                次
              </Tag>
              <Tag color="yellow">
                8级{" "}
                {mxlist.reduce(
                  (pre, item) => pre + (item.lv == 8 ? item.num : pre + 0),
                  0
                )}{" "}
                次
              </Tag>
              <Tag color="red">
                9级{" "}
                {mxlist.reduce(
                  (pre, item) => pre + (item.lv == 9 ? item.num : pre + 0),
                  0
                )}{" "}
                次
              </Tag> */}
            </Space>
          </p>
          <p style={{ marginTop: 15, fontWeight: "bold" }}>
            gas选择:{" "}
            {gassType == 0
              ? "中档(默认)"
              : gassType == -0.5
              ? "低档"
              : gassType == 0.5
              ? "快档"
              : "更快档"}
            ({gass + gassType}wei)
          </p>
          <Space
            style={{
              display: "flex",
              width: "90%",
              flexWrap: "wrap",
              justifyContent: "center",
              margin: 10,
            }}
          >
            <Button
              size="small"
              type="tertiary"
              onClick={() => setGassType(-0.5)}
            >
              低({gass - 0.5}wei)
            </Button>
            <Button size="small" onClick={() => setGassType(0)}>
              中(默认)({gass}wei)
            </Button>
            <Button size="small" type="danger" onClick={() => setGassType(0.5)}>
              快({gass + 0.5}wei)
            </Button>
            <Button size="small" type="warning" onClick={() => setGassType(1)}>
              更快({gass + 1}wei)
            </Button>
            <InputNumber
              defaultValue={gass + gassType}
              style={{ width: 100 }}
              step={0.5}
              min={gass - 0.5}
              onChange={(e) => {
                setGassType(e - gass);
              }}
            />
          </Space>
          <span style={{ margin: 5 }}>待领取奖励:</span>
          <p
            style={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            <Space
              style={{
                display: "flex",
                flexWrap: "wrap",
                width: 250,
                justifyContent: "center",
              }}
            >
              <Tag color="red">
                BNX {nlogList.reduce((pre, item) => pre + item.reward_coin, 0)}
              </Tag>
              <Tag color="yellow">
                金币{" "}
                {nlogList.reduce((pre, item) => pre + item.reward_money, 0)}
              </Tag>
              {/* <Tag>
                钥匙 {nlogList.reduce((pre, item) => pre + item.reward_coupon, 0)}
              </Tag> */}
              <Tag>
                装备{" "}
                {nlogList.reduce(
                  (pre, item) => item.reward_eqs.length + pre,
                  0
                )}{" "}
                件
              </Tag>
            </Space>
          </p>
          {gameLoadSpin ? (
            <div
              style={{
                marginTop: 10,
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p>已打</p>
              <p style={{ fontSize: 40, margin: 10 }}>{oknum}</p>
              <p style={{ margin: 10 }}>冒险中,请不要关闭网页</p>
              <Spin size="large" style={{ margin: 10 }} />
            </div>
          ) : (
            <></>
          )}
        </div>
      </Modal>
    </MyHeroContainer>
  );
};

export default MaoXian;
