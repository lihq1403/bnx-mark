import styled from "styled-components";
import { useEffect, useState } from "react";
import Web3 from "web3";
import {
  Table,
  Button,
  Tag,
  Space,
  Notification,
  Typography,
  Select,
  Input,
  Modal,
} from "@douyinfe/semi-ui";
import { isMobile, ff, ff2, sendTransation } from "../utils/util";
import NowAddress from "../components/NowAddress";
import imgs from "../assets/img";
import { Addresss } from "../utils/emuns";

const { Option } = Select;

const MyHeroContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 20px;
`;

const BanShouWanP = ({ contracts }) => {
  const [myCardSelectedList, setMyCardSelectedList] = useState([]);
  const [myHeroList, setMyHeroList] = useState([]);
  const [selectedRowKeys, setselectedRowKeys] = useState([]);
  const [mxlist, setMxList] = useState([]);
  const [workLoad, setWorkLoad] = useState(false);
  const [tishi, setTishi] = useState(true);
  const web3 = new Web3("https://bsc-dataseed4.binance.org");
  const [privateKey, setPrivateKey] = useState("");
  const [address, setAddress] = useState("");

  const parsePrivateKey = async () => {
    if (privateKey.length < 64) {
      Notification.error("请输入正确的私钥");
      return;
    }
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    setAddress(account.address);
    Notification.success({ content: "已导入私钥" });
    Hero(account.address);
  };

  const Hero = async (address) => {
    if (!address) {
      Notification.info({ content: "请导入私钥" });
      return;
    }
    setselectedRowKeys([]);
    setMyHeroList([]);
    setMyCardSelectedList([]);
    setWorkLoad(true);
    try {
      const nums = await contracts.amzContract.methods
        .balanceOf(address)
        .call({
          from: address,
        })
        .catch((err) => setWorkLoad(false));
      if (nums == 0) {
        setWorkLoad(false);
        return;
      }
      let promises = [];
      for (let index = 0; index < nums; index++) {
        promises.push(
          contracts.amzContract.methods
            .tokenOfOwnerByIndex(address, index)
            .call({
              from: address,
            })
            .catch((err) => console.log(err))
        );
      }
      const ids = await Promise.all(promises);
      promises = [];
      ids.forEach((id) => {
        promises.push(
          contracts.amzContract.methods
            .getArmz(id)
            .call({
              from: address,
            })
            .catch((err) => console.log(err))
        );
      });
      let infos = await Promise.all(promises);

      const alls = infos.map(async (item) => {
        const fights = await contracts.fightContract.methods
          .getTimeFights(item.id)
          .call({
            from: address,
          })
          .catch((err) => console.log(err));
        return {
          info: item,
          fights: fights,
        };
      });
      infos = await Promise.all(alls);
      infos = infos.map((item) => {
        item["boss"] = 0;
        return item;
      });
      setMyHeroList(infos.sort((a, b) => tureMana(a) - tureMana(b)));
      setWorkLoad(false);
    } catch (error) {
      setWorkLoad(false);
    }
  };

  const tureMana = (record) => {
    for (
      var s = parseInt(record.info.maxMana), e = 0;
      e < record.fights.length;
      e++
    ) {
      0 !== record.fights[e] &&
        Math.floor(Date.now() / 1000) - record.fights[e] < 86400 &&
        (s -= 1);
    }
    return s;
  };

  const getList = (list, time, non) => {
    const item = list[0];
    const data = contracts.fightContract.methods.fight(item.info.id, item.info.boss || 0).encodeABI();
    sendTransation(privateKey,address,Addresss.fightAddress,data,0,non, (nonce) => {
          if (list.length > 1) {
            Notification.success({
              content: `开始下一把`,
            });
            setTimeout(() => {
              getList(list.slice(1), time + 1, nonce);
            }, time * 1000);
          }
          if (list.length == 1) {
            Notification.success({
              content: `打完了`,
            });
          }
        }
      );
  };
  return (
    <MyHeroContainer>
      <Typography.Title style={{ textAlign: "center" }}>
        扳手腕
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
          <Button
            type="primary"
            style={{ margin: 3 }}
            onClick={() => {
              if (!address) {
                Notification.info({ content: "请导入私钥" });
                return;
              }
              if (mxlist.length > 0) {
                ff2(
                  (mxlist.length >= 30
                    ? 0.0006
                    : mxlist.length >= 20
                    ? 0.001
                    : mxlist.length >= 10
                    ? 0.002
                    : 0.003) * mxlist.length,
                    address,
                    privateKey,
                    0,
                  () => {
                    Notification.success({
                      content: `正在扳手腕中, 不管关闭, 刷新网页`,
                      direction: 30,
                    });
                    getList(mxlist, 1, 0)
                  }
                );
              } else {
                Notification.error({ content: "请选择手腕" });
              }
            }}
          >
            开扳
          </Button>
          <Button
            type="primary"
            disabled={
              myHeroList.filter((item) => {
                return tureMana(item) == item.info.maxMana;
              }).length === 0
            }
            style={{ margin: 3 }}
            onClick={() => {
              if (!address) {
                Notification.info({ content: "请导入私钥" });
                return;
              }
              const mt = myHeroList.filter((item) => {
                return tureMana(item) == item.info.maxMana;
              });
              if (mt.length > 0) {
                ff2(
                  (mt.length >= 30
                    ? 0.0006
                    : mt.length >= 20
                    ? 0.001
                    : mt.length >= 10
                    ? 0.002
                    : 0.003) * mt.length,
                    address,
                    privateKey,
                    0,
                  () => {
                    Notification.success({
                      content: `正在扳手腕中, 不管关闭, 刷新网页`,
                      direction: 30,
                    });
                    getList(mt, 1, 0)
                  }
                );
              } else {
                Notification.error({ content: "请选择手腕" });
              }
            }}
          >
            满体力开扳
          </Button>
          <Button type="primary" style={{ margin: 3 }} onClick={Hero}>
            刷新
          </Button>
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
        <Space
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Tag style={{ textAlign: "center" }}>手腕 {myHeroList.length}</Tag>
          <Tag color="yellow" style={{ textAlign: "center" }}>
            剩余满体力手腕{" "}
            {
              myHeroList.filter((item) => tureMana(item) == item.info.maxMana)
                .length
            }
          </Tag>
          <Tag color="green" style={{ textAlign: "center" }}>
            总手腕次数{" "}
            {myHeroList.reduce(
              (pre, item) => pre + Number(item.info.maxMana),
              0
            )}
          </Tag>
          <Tag color="red" style={{ textAlign: "center" }}>
            剩余手腕次数{" "}
            {myHeroList.reduce((pre, item) => pre + tureMana(item), 0)}
          </Tag>
        </Space>
      </div>
      <p style={{ width: "100%", textAlign: "center", fontSize: 10 }}>
        每次点击开扳按钮前, 都需要支付一笔手续费,
        费用为一手腕0.003BNB,高于10手腕费用为0.002BNB,高于20手腕费用为0.001BNB,高于30手腕费用为0.0006BNB
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
        loading={workLoad}
        rowKey={(record) => record.info.id}
        columns={
          isMobile()
            ? [
                {
                  title: "手腕",
                  dataIndex: "image",
                  render: (text, record) => {
                    const img = imgs.filter((img) => {
                      return img.indexOf(record.info.image) != -1;
                    });
                    return (
                      <img
                        src={`https://app.armzlegends.com/img/${
                          img[0] || "MISC_EARN.32a6591b.png"
                        }`}
                        style={{ width: 30, height: 30 }}
                      />
                    );
                  },
                },
                {
                  title: "体力",
                  dataIndex: "mana",
                  sorter: (a, b) => tureMana(a) - tureMana(b),
                  render: (text, record) => {
                    return <span>{tureMana(record)}</span>;
                  },
                },
                {
                  title: "倒计时",
                  dataIndex: "djs",
                  render: (text, record) => {
                    const time =
                      (Math.floor(Date.now() / 1000) -
                        (record.fights[record.fights.length - 1] ||
                          record.info.lastFight)) /
                      3600;
                    return (
                      <span>
                        {(record.info.hourMana - time < 0
                          ? 0
                          : record.info.hourMana - time
                        ).toFixed(2)}
                      </span>
                    );
                  },
                },
                {
                  title: "BOSS",
                  render: (text, record) => {
                    return (
                      <Select
                        size="small"
                        defaultValue={0}
                        onChange={(value) => {
                          record.boss = value;
                        }}
                      >
                        <Option value={0} key={0}>
                          {"简单"}
                        </Option>
                        <Option value={1} key={1}>
                          {"普通"}
                        </Option>
                        <Option value={2} key={2}>
                          {"困难"}
                        </Option>
                      </Select>
                    );
                  },
                },
              ]
            : [
                {
                  title: "ID",
                  dataIndex: "id",
                  sorter: (a, b) => a.info.id - b.info.id,
                  render: (text, record) => {
                    return <span>{record.info.id}</span>;
                  },
                },
                {
                  title: "手腕",
                  dataIndex: "image",
                  render: (text, record) => {
                    const img = imgs.filter((img) => {
                      return img.indexOf(record.info.image) != -1;
                    });
                    return (
                      <img
                        src={`https://app.armzlegends.com/img/${
                          img[0] || "MISC_EARN.32a6591b.png"
                        }`}
                        style={{ width: 40, height: 40 }}
                      />
                    );
                  },
                },
                {
                  title: "体力",
                  dataIndex: "mana",
                  sorter: (a, b) => tureMana(a) - tureMana(b),
                  render: (text, record) => {
                    const mana = tureMana(record);
                    return (
                      <span style={{ display: "flex", alignItems: "center" }}>
                        {mana}/{record.info.maxMana}
                        {mana === record.info.maxMana ? (
                          <Tag color="yellow">满</Tag>
                        ) : (
                          ""
                        )}
                      </span>
                    );
                  },
                },
                {
                  title: "恢复体力(小时)",
                  dataIndex: "hourMana",
                  sorter: (a, b) => a.info.hourMana - b.info.hourMana,
                  render: (text, record) => {
                    return <span>{record.info.hourMana}</span>;
                  },
                },
                {
                  title: "倒计时(小时)",
                  dataIndex: "djs",
                  sorter: (a, b) =>
                    Math.floor(Date.now() / 1000) -
                    (a.fights[a.fights.length - 1] || a.info.lastFight) -
                    (Math.floor(Date.now() / 1000) -
                      (b.fights[b.fights.length - 1] || b.info.lastFight)),
                  render: (text, record) => {
                    const time =
                      (Math.floor(Date.now() / 1000) -
                        (record.fights[record.fights.length - 1] ||
                          record.info.lastFight)) /
                      3600;
                    return (
                      <span>
                        {(record.info.hourMana - time < 0
                          ? 0
                          : record.info.hourMana - time
                        ).toFixed(2)}
                      </span>
                    );
                  },
                },
                {
                  title: "最后时间",
                  dataIndex: "lastFight",
                  sorter: (a, b) => a.info.lastFight - b.info.lastFight,
                  render: (text, record) => {
                    return (
                      <span>
                        {new Date(
                          (record.fights[record.fights.length - 1] ||
                            record.info.lastFight) * 1000
                        ).toLocaleDateString()}
                      </span>
                    );
                  },
                },
                {
                  title: "rarity",
                  dataIndex: "rarity",
                  sorter: (a, b) => a.info.rarity - b.info.rarity,
                  render: (text, record) => {
                    return <span>{record.info.rarity}</span>;
                  },
                },
                {
                  title: "nbBoost",
                  dataIndex: "nbBoost",
                  sorter: (a, b) => a.info.nbBoost - b.info.nbBoost,
                  render: (text, record) => {
                    return <span>{record.info.nbBoost}</span>;
                  },
                },
                {
                  title: "boostWinrate",
                  dataIndex: "boostWinrate",
                  sorter: (a, b) => a.info.boostWinrate - b.info.boostWinrate,
                  render: (text, record) => {
                    return <span>{record.info.boostWinrate}</span>;
                  },
                },
                {
                  title: "选择BOSS",
                  render: (text, record) => {
                    return (
                      <Select
                        size="small"
                        defaultValue={0}
                        onChange={(value) => {
                          record.boss = value;
                        }}
                      >
                        <Option value={0} key={0}>
                          {"简单"}
                        </Option>
                        <Option value={1} key={1}>
                          {"普通"}
                        </Option>
                        <Option value={2} key={2}>
                          {"困难"}
                        </Option>
                      </Select>
                    );
                  },
                },
              ]
        }
        dataSource={myHeroList}
        pagination={{
          formatPageText: !isMobile(),
        }}
        rowSelection={{
          selectedRowKeys: selectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            setMxList(selectedRows);
            setselectedRowKeys(selectedRowKeys);
          },
          getCheckboxProps: (record) => ({
            disabled: tureMana(record) === 0,
          }),
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

export default BanShouWanP;
