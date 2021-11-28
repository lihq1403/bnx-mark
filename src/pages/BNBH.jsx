import styled from "styled-components";
import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Dropdown,
  Space,
  Notification,
  Typography,
  Tag,
  InputNumber,
} from "@douyinfe/semi-ui";
import { isMobile, ff3, initWeb3 } from "../utils/util";
import NowAddress from "../components/NowAddress";
import Web3 from "web3";

const MyHeroContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 20px;
`;

const bosss = [
  {
    type: 1,
    name: "Red Skull 1",
    successRate: 70,
    reward: 0.0033,
    xp: 100,
    hp: 200,
  },
  {
    type: 2,
    name: "Red Skull 2",
    successRate: 67,
    reward: 0.00396,
    xp: 110,
    hp: 200,
  },
  {
    type: 3,
    name: "Red Skull 3",
    successRate: 63,
    reward: 0.00462,
    xp: 120,
    hp: 200,
  },
  {
    type: 4,
    name: "Red Skull Archer",
    successRate: 59,
    reward: 0.00528,
    xp: 130,
    hp: 200,
  },
  {
    type: 5,
    name: "Red Skull Assasin",
    successRate: 55,
    reward: 0.00594,
    xp: 150,
    hp: 200,
  },
  {
    type: 6,
    name: "Red Skull Mage",
    successRate: 51,
    reward: 0.0066,
    xp: 200,
    hp: 200,
  },
  {
    type: 7,
    name: "Zangrief",
    description:
      "Your squad spots ZANGRIEF at the stronghold gates charging towards them. Defeat Him in order to claim the stronghold once and for all!",
    successRate: 28,
    reward: 0.0242,
    xp: 400,
    hp: 400,
  },
];
const towns = ["Bank", "Town Inn", "Barracks", "Training ground"];
const townas = [
  ["+3% BNB rewards", "+3% BNB rewards", "+7% BNB rewards"],
  [
    "-5% HP Loss/Max Hero Cap 3",
    "-7% HP Loss/Max Hero Cap 4",
    "-10% HP Loss/Max Hero Cap 5",
  ],
  ["+30 XP on all fights", "+30 XP on all fights", "+30 XP on all fights"],
  [
    "+30 Attack +30 Armor +30 Speed",
    "+30 Attack +30 Armor +30 Speed",
    "+50 Attack +50 Armor +50 Speed",
  ],
];

const times = [
  [24, 24, 48],
  [24, 24, 48],
  [24, 24, 48],
  [24, 24, 24],
];

const BNBH = ({ address, contracts }) => {
  const [myCardSelectedList, setMyCardSelectedList] = useState([]);
  const [myHeroList, setMyHeroList] = useState([]);
  const [myTownList, setTownList] = useState([]);
  const [selectedRowKeys, setselectedRowKeys] = useState([]);
  const [mxlist, setMxList] = useState([]);
  const [workLoad, setWorkLoad] = useState(false);
  const [bossIndex, setBossIndex] = useState(5);
  const [claimBnb, setclaimBnb] = useState(0);
  const [gass, setGass] = useState(0);
  const [gassType, setGassType] = useState(0);
  useEffect(() => {
    setselectedRowKeys([]);
    setMyCardSelectedList([]);
    getHero();
  }, [address]);

  const getLog = () => {
    if (!address) {
      return;
    }
    const data = {
      variables: {
        network: "bsc",
        address: "0xde9fFb228C1789FEf3F08014498F2b16c57db855",
        eventType: "Fight",
        offset: 0,
        limit: 12,
        from: null,
        to: null,
        txFrom: [address],
      },
      query:
        'query ($network: EthereumNetwork!, $address: String!, $eventType: String!, $limit: Int!, $offset: Int!, $from: ISO8601DateTime, $to: ISO8601DateTime, $txFrom: [String!]) {ethereum(network: $network) {  smartContractEvents(    options: {desc: "block.height", limit: $limit, offset: $offset}    date: {since: $from, till: $to}    txFrom: {in: $txFrom}    smartContractAddress: {is: $address}    smartContractEvent: {is: $eventType}  ) {    smartContractEvent {      name      __typename    }    block {      height      timestamp {        iso8601        unixtime        __typename      }      __typename    }    arguments {      value      argument      __typename    }    __typename  }  __typename}\n}',
    };
    fetch("https://graphql.bitquery.io", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((value) => console.log(value));
  };

  const getHero = () => {
    if (!address || !contracts) {
      Notification.info({ content: "3秒后不显示钱包地址, 请刷新网页" });
      return;
    }
    // getLog();
    initWeb3(Web3.givenProvider)
      .eth.getGasPrice()
      .then((v) => {
        console.log(v);
        setGass(Number(v) / Math.pow(10, 9));
      })
      .catch(() => {});
    setselectedRowKeys([]);
    setMyHeroList([]);
    setTownList([]);
    setMyCardSelectedList([]);
    setWorkLoad(true);
    try {
      contracts.bnbhFightContract.methods
        .balances(address)
        .call()
        .then((r) => setclaimBnb((Number(r) / Math.pow(10, 18)).toFixed(4)));
      contracts.bnbhFightContract.methods
        .getHeroesByOwner(address, true)
        .call()
        .then((list) => {
          setMyHeroList(
            list.map((item) => {
              return {
                tokenId: item.tokenId,
                state: 0,
                info: item,
              };
            })
          );
          setWorkLoad(false);
        })
        .catch(() => setWorkLoad(false));
      contracts.bnbhFightContract.methods
        .getTownsOfPlayer(address)
        .call()
        .then((list) => {
          console.log(list);
          setTownList(list);
        })
        .catch(() => {});
    } catch (error) {
      setWorkLoad(false);
    }
  };

  const fight = (item) => {
    let id = Notification.info({
      content: `英雄 ${item.tokenId} 战斗进行中, 请耐心等待`,
      duration: 0,
    });
    contracts.bnbhFightContract.methods
      .fight(item.tokenId, bosss[bossIndex].type - 1)
      .send({ from: address })
      .then((val) => {
        Notification.close(id);
        if (val.events.Fight.returnValues) {
          const data = val.events.Fight.returnValues;
          if (data.rewards == "0") {
            Notification.error({
              title: `英雄 ${item.tokenId} 战斗失败}`,
              content: `收益:${
                Number(data.rewards) / Math.pow(10, 18).toFixed(4)
              }   经验值:${data.xpGained}   损失血量:${data.hpLoss}`,
            });
          } else {
            Notification.success({
              title: `英雄 ${item.tokenId} 战斗胜利`,
              content: `收益:${
                Number(data.rewards) / Math.pow(10, 18).toFixed(4)
              }   经验值:${data.xpGained}   损失血量:${data.hpLoss}`,
            });
          }
          getHero();
          if (item.hp - Number(data.hpLoss) >= 200) {
            fight(item);
          } else {
            Notification.info({
              content: `英雄 ${item.tokenId} 战斗结束`,
            });
          }
        } else {
          Notification.error({
            content: `英雄 ${item.tokenId} 战斗超时, 战斗可能打完, 链上数据错误, 去官网查看一下`,
          });
        }
      })
      .catch(() => {
        Notification.close(id);
        Notification.error({
          content: `英雄 ${item.tokenId} 战斗关闭`,
        });
      });
  };

  const newherodis = () => {
    if (myHeroList.length < 2) {
      return false;
    }
    if (myHeroList.length === 2) {
      return (
        (myTownList.filter((item) => item.level + 1 == 2).length === 4) ===
        false
      );
    }
    if (myHeroList.length === 3) {
      return (
        (myTownList.filter((item) => item.level + 1 == 3).length === 4) ===
        false
      );
    }
    if (myHeroList.length === 4) {
      return (
        (myTownList.filter((item) => item.level + 1 == 4).length === 4) ===
        false
      );
    }
    if (myHeroList.length === 5) {
      return true;
    }
    return true;
  };

  return (
    <MyHeroContainer>
      <Typography.Title style={{ textAlign: "center" }}>BNBH</Typography.Title>
      <NowAddress address={address} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: 5,
        }}
      >
        <a href="https://play.bnbheroes.io" target="_blank">
          Bnbheroes官网
        </a>
      </div>
      <Space
        style={{
          display: "flex",
          justifyContent: "center",
          margin: 10,
          flexWrap: "wrap",
        }}
      >
        <Tag color="red">待提取收益: {claimBnb}BNB</Tag>
      </Space>
      {/* <Space
        style={{
          display: "flex",
          width: "90%",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <span style={{ marginRight: 5 }}>
          gas选择:{" "}
          {gassType == 0
            ? "中档(默认)"
            : gassType == -0.5
            ? "低档"
            : gassType == 0.5
            ? "快档"
            : "更快档"}
          ({gass + gassType}wei)
        </span>
        <Button size="small" type="tertiary" onClick={() => setGassType(-0.5)}>
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
      </Space> */}
      <Space
        style={{
          display: "flex",
          justifyContent: "center",
          margin: 10,
          flexWrap: "wrap",
        }}
      >
        <Typography.Text>战斗对象:</Typography.Text>
        <Dropdown
          trigger="click"
          position="bottomLeft"
          render={
            <Dropdown.Menu>
              {bosss.map((item, index) => {
                return (
                  <Dropdown.Item
                    key={item.name}
                    onClick={() => setBossIndex(index)}
                  >{`名称:${bosss[bossIndex].name}  胜率${bosss[bossIndex].successRate}% 预计收益:${bosss[bossIndex].reward}BNB`}</Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          }
        >
          <Button type="danger">{`名称:${bosss[bossIndex].name}  胜率${bosss[bossIndex].successRate}% 预计收益:${bosss[bossIndex].reward}BNB`}</Button>
        </Dropdown>
      </Space>
      <Space
        style={{
          display: "flex",
          justifyContent: "center",
          margin: 20,
          flexWrap: "wrap",
        }}
      >
        <Button
          type="primary"
          disabled={newherodis()}
          onClick={() => {
            if (!address || !contracts) {
              Notification.info({ content: "3秒后不显示钱包地址, 请刷新网页" });
              return;
            }
            ff3(0.001, address, () => {
              let id = Notification.info({
                content: `招募英雄中, 请耐心等待`,
                duration: 0,
              });
              contracts.bnbhFightContract.methods
                .createNewHero()
                .send({ from: address })
                .then((val) => {
                  Notification.close(id);
                  Notification.success({
                    content: `招募英雄成功`,
                  });
                  getHero();
                })
                .catch(() => {
                  Notification.close(id);
                  Notification.error({
                    content: `招募英雄超时`,
                  });
                });
            });
          }}
        >
          招募英雄
        </Button>
        <Button
          type="primary"
          disabled={myCardSelectedList.length === 0}
          onClick={() => {
            if (!address || !contracts) {
              Notification.info({ content: "3秒后不显示钱包地址, 请刷新网页" });
              return;
            }
            if (myCardSelectedList.length === 0) {
              Notification.info({ content: "请选择英雄" });
              return;
            }
            ff3(
              myCardSelectedList.reduce(
                (pre, item) => pre + Math.ceil(Number(item.info.hp) / 200),
                0
              ) * 0.001,
              address,
              () => {
                for (
                  let index = 0;
                  index < myCardSelectedList.length;
                  index++
                ) {
                  const hero = myCardSelectedList[index];
                  fight(hero.info);
                }
              }
            );
          }}
        >
          开始战斗
        </Button>

        <Button type="primary" onClick={getHero}>
          刷新
        </Button>
      </Space>
      <p style={{ width: "100%", textAlign: "center", fontSize: 10 }}>
        每次点击战斗按钮前, 都需要支付一笔手续费,费用为一次战斗0.001BNB
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
        rowKey={(record) => record.tokenId}
        columns={
          isMobile()
            ? [
                {
                  title: "英雄",
                  dataIndex: "tokenId",
                  render: (text, record) => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <span>
                          英雄:{record.info.tokenId} 等级:{record.info.level}
                        </span>
                        <span>
                          血量:
                          {record.info.hp > 1000000000
                            ? `英雄未到达`
                            : record.info.hp}{" "}
                          经验:{record.info.xp}/{record.info.level * 1000 + 999 }
                        </span>
                        <span>
                          攻击:{record.info.attack} 防御:{record.info.armor}{" "}
                          速度:{record.info.speed}
                        </span>
                        {record.info.xp >= record.info.level * 1000 + 999 ? (
                          <Button
                            size="small"
                            onClick={() => {
                              contracts.bnbhFightContract.methods
                                .getPriceToUnlockLevel(record.info.level + 1)
                                .call()
                                .then((v) => {
                                  const s =
                                    Math.floor(
                                      100 *
                                        initWeb3(
                                          Web3.givenProvider
                                        ).utils.fromWei(v)
                                    ) / 100;
                                  Notification.info({
                                    content: `英雄${record.tokenId} 升级LV.${
                                      record.info.level + 1
                                    }需要花费${s}BNBH`,
                                  });
                                  contracts.bnbhFightContract.methods
                                    .unLockLevel(record.info.level + 1)
                                    .send({ from: address })
                                    .then((r) => {
                                      Notification.success({
                                        content: `英雄${
                                          record.tokenId
                                        } 已升级LV${record.info.level + 1}`,
                                      });
                                    });
                                });
                            }}
                          >
                            升级
                          </Button>
                        ) : (
                          <Button
                            size="small"
                            disabled={
                              record.info.hp < 200 || record.info.attack == 0
                            }
                            onClick={() => {
                              if (!address || !contracts) {
                                Notification.info({
                                  content: "3秒后不显示钱包地址, 请刷新网页",
                                });
                                return;
                              }
                              ff3(
                                0.001 * Math.ceil(Number(record.info.hp) / 200),
                                address,
                                () => {
                                  fight(record.info);
                                }
                              );
                            }}
                          >
                            战斗
                          </Button>
                        )}
                      </div>
                    );
                  },
                },
              ]
            : [
                {
                  title: "tokenId",
                  dataIndex: "tokenId",
                },
                {
                  title: "",
                  dataIndex: "name",
                  width: 120,
                  render: (info, record) => {
                    return (
                      <img
                        src={`https://play.bnbheroes.io/cards/${record.info.name}.png`}
                        style={{ height: 100 }}
                      />
                    );
                  },
                },
                {
                  title: "等级",
                  dataIndex: "level",
                  render: (info, record) => {
                    return <span>{record.info.level}</span>;
                  },
                },
                {
                  title: "攻击",
                  dataIndex: "attack",
                  render: (info, record) => {
                    return <span>{record.info.attack}</span>;
                  },
                },
                {
                  title: "防御",
                  dataIndex: "armor",
                  render: (info, record) => {
                    return <span>{record.info.armor}</span>;
                  },
                },
                {
                  title: "速度",
                  dataIndex: "speed",
                  render: (info, record) => {
                    return <span>{record.info.speed}</span>;
                  },
                },
                {
                  title: "血量",
                  dataIndex: "hp",
                  render: (info, record) => {
                    return (
                      <span>
                        {record.info.hp > 1000000000
                          ? `英雄未到达`
                          : record.info.hp}
                      </span>
                    );
                  },
                },
                {
                  title: "经验",
                  dataIndex: "xp",
                  render: (info, record) => {
                    return <span>{record.info.xp}/{record.info.level * 1000 + 999 }</span>;
                  },
                },
                {
                  title: "操作",
                  dataIndex: "opt",
                  render: (info, record) => {
                    return (
                      <Space style={{ display: "flex", flexWrap: "wrap" }}>
                        {record.info.xp >= record.info.level * 1000 + 999 ? (
                          <Button
                            onClick={() => {
                              contracts.bnbhFightContract.methods
                                .getPriceToUnlockLevel(record.info.level + 1)
                                .call()
                                .then((v) => {
                                  const s =
                                    Math.floor(
                                      100 *
                                        initWeb3(
                                          Web3.givenProvider
                                        ).utils.fromWei(v)
                                    ) / 100;
                                  Notification.info({
                                    content: `英雄${record.tokenId} 升级LV.${
                                      record.info.level + 1
                                    }需要花费${s}BNBH`,
                                  });
                                  contracts.bnbhFightContract.methods
                                    .unLockLevel(record.info.level + 1)
                                    .send({ from: address })
                                    .then((r) => {
                                      Notification.success({
                                        content: `英雄${
                                          record.tokenId
                                        } 已升级LV${record.info.level + 1}`,
                                      });
                                    });
                                });
                            }}
                          >
                            升级
                          </Button>
                        ) : (
                          <Button
                            disabled={
                              record.info.hp < 200 || record.info.attack == 0
                            }
                            onClick={() => {
                              if (!address || !contracts) {
                                Notification.info({
                                  content: "3秒后不显示钱包地址, 请刷新网页",
                                });
                                return;
                              }
                              ff3(
                                0.001 * Math.ceil(Number(record.info.hp) / 200),
                                address,
                                () => {
                                  fight(record.info);
                                }
                              );
                            }}
                          >
                            战斗
                          </Button>
                        )}
                      </Space>
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
            setMyCardSelectedList(selectedRows);
            setselectedRowKeys(selectedRowKeys);
          },
          getCheckboxProps: (record) => {
            return {
              disabled: record.info.hp < 200,
            };
          },
        }}
        bordered
      />

      <Table
        loading={workLoad}
        rowKey={(record) => record.tokenId}
        columns={
          isMobile()
            ? [
                {
                  title: "城镇",
                  dataIndex: "tokenId",
                  render: (text, record, index) => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <span>
                          名称:{towns[index]} 等级:
                          <span>
                            {Number(record.level) + 1}
                            {record.lastUpgradedTimeStamp == 0 ||
                            record.lastUpgradedTimeStamp <
                              new Date().getTime() / 1000
                              ? ""
                              : "(升级中)"}
                          </span>
                        </span>
                        <span>
                          加成:
                          {
                            townas[index][
                              record.level == 0 ? 0 : record.level - 1
                            ]
                          }
                        </span>
                        <span>
                          升级所需时间:{times[index][record.level]}小时
                        </span>
                        <span>
                          升级结束时间:
                          <span>
                            {record.lastUpgradedTimeStamp == 0 ||
                            record.lastUpgradedTimeStamp <
                              new Date().getTime() / 1000
                              ? 0
                              : `${Math.floor(
                                  (record.lastUpgradedTimeStamp -
                                    new Date().getTime() / 1000) /
                                    3600
                                )}小时
              ${Math.floor(
                ((record.lastUpgradedTimeStamp - new Date().getTime() / 1000) %
                  3600) /
                  60
              )}分钟`}
                          </span>
                        </span>
                      </div>
                    );
                  },
                },
              ]
            : [
                {
                  title: "名称",
                  dataIndex: "level",
                  render: (text, record, index) => {
                    return <span>{towns[index]}</span>;
                  },
                },
                {
                  title: "等级",
                  dataIndex: "level",
                  render: (text, record) => {
                    return (
                      <span>
                        {Number(text) + 1}
                        {record.lastUpgradedTimeStamp == 0 ||
                        record.lastUpgradedTimeStamp <
                          new Date().getTime() / 1000
                          ? ""
                          : "(升级中)"}
                      </span>
                    );
                  },
                },
                {
                  title: "加成",
                  dataIndex: "level",
                  render: (text, record, index) => {
                    return (
                      <span>
                        {
                          townas[index][
                            record.level == 0 ? 0 : record.level - 1
                          ]
                        }
                      </span>
                    );
                  },
                },
                {
                  title: "升级所需时间",
                  dataIndex: "level",
                  render: (text, record, index) => {
                    return <span>{times[index][text]}小时</span>;
                  },
                },
                {
                  title: "升级结束时间",
                  dataIndex: "lastUpgradedTimeStamp",
                  render: (text) => {
                    return (
                      <span>
                        {text == 0 || text < new Date().getTime() / 1000
                          ? 0
                          : `${Math.floor(
                              (text - new Date().getTime() / 1000) / 3600
                            )}小时
              ${Math.floor(
                ((text - new Date().getTime() / 1000) % 3600) / 60
              )}分钟`}
                      </span>
                    );
                  },
                },
                // {
                //   title: "操作",
                //   dataIndex: "opt",
                //   render: (text, record) => {
                //     return (
                //       <Space style={{ display: "flex", flexWrap: "wrap" }}>
                //         <Button disabled={record.lastUpgradedTimeStamp != 0 || record.level >= 4} onClick={() => {

                //         }}>升级</Button>
                //       </Space>
                //     );
                //   },
                // },
              ]
        }
        dataSource={myTownList}
        pagination={{
          formatPageText: false,
        }}
        bordered
      />
    </MyHeroContainer>
  );
};

export default BNBH;
