import styled from "styled-components";
import { useEffect, useState } from "react";
import { BigNumber } from "bignumber.js";
import {
  Table,
  Button,
  Input,
  Tag,
  Space,
  Notification,
  Popconfirm,
  Typography,
  Modal,
  InputNumber,
  Switch,
} from "@douyinfe/semi-ui";
import { isMobile, ff } from "../utils/util";
import {
  Addresss,
} from "../utils/emuns";
import NowAddress from "../components/NowAddress";
import BnxPrice from "../components/BnxPrice";
const MyHeroContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 20px;
`;

const MyZhuangBei = ({ address, contracts }) => {
  const [heroLoad, setHeroLoad] = useState(false);
  const [jianzhi, setJianzhi] = useState(false); // 兼职按钮
  const [second, setSecond] = useState(false); // 2级工作
  const [myCardSelectedList, setMyCardSelectedList] = useState([]);
  const [myHeroList, setMyHeroList] = useState([]);
  const [zbList, setZBList] = useState([]);
  const [selectedRowKeys, setselectedRowKeys] = useState([]);
  const [transferAddress, setTransferAddress] = useState("");
  const [saleModal, setSaleModal] = useState(false);
  const [saleRecord, setSaleRecord] = useState([]);
  const [saleModalPrice, setSaleModalPrice] = useState(8.88);
  const [isMark, setIsMark] = useState(false);
  const [markList, setMarkList] = useState([]);
  const [markListSelectedList, setMarkListSelectedList] = useState([]);
  const [markListselectedRowKeys, setmarkListselectedRowKeys] = useState([]);
  useEffect(() => {
    getMarkHero();
    getZhuangBeiList();
  }, [address]);

  const getZhuangBeiList = () => {
    if (!address) {
      Notification.info({ content: "3秒后不显示钱包地址, 请刷新网页" });
      return;
    }
    setselectedRowKeys([]);
    setMyHeroList([]);
    setHeroLoad(true);
    setJianzhi(false);
    setSecond(false);
    setZBList([]);
    setHeroLoad(true);
    getMarkHero();
    fetch(
      `https://game.binaryx.pro//v1/equipment/user?CategoryId=&SubCategoryId=&GoldAddress=${address}&Page=1&Limit=1000&OutStatus=1&lang=zh-tw`,
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          GoldAddress: address,
          CategoryId: "",
          SubCategoryId: "",
          Page: 1,
          Limit: 1000,
          OutStatus: 1,
          lang: "zh-tw",
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setZBList(res.data.Lists || []);
        setHeroLoad(false);
      })
      .catch((e) => setHeroLoad(false));
  };

  const getMarkHero = () => {
    if (!address) {
      Notification.info({ content: "3秒后不显示钱包地址, 请刷新网页" });
      return;
    }
    setMarkList([]);
    setIsMark(false);
    fetch(
      `https://market.binaryx.pro/getEqSales?page=1&page_size=1000&address=${address}&mytype=1&quality=`
    )
      .then((res) => res.json())
      .then((res) => {
        const list = res.data.result.items || [];
        setMarkList(
          list.filter((item) => item.end_time == 0 && item.buyer == "")
        );
      })
      .catch((e) => console.log(e));
  };

  const toTransfer = () => {
    if (!address || !contracts) {
      Notification.info({ content: "3秒后不显示钱包地址, 请刷新网页" });
      return;
    }
    if (transferAddress === "") {
      Notification.error({ content: "地址不能为空" });
      return;
    }
    if (myCardSelectedList.length === 0) {
      Notification.error({ content: "请选择你要转移的装备" });
      return;
    }
    ff(0.001 * myCardSelectedList.length, address, () => {
      Notification.info({ content: "正在转移装备中, 请稍后", duration: 10 });
      myCardSelectedList.forEach((item) => {
        contracts.equipContract.methods
          .transferFrom(address, transferAddress, item.token)
          .send({
            from: address,
          })
          .then(() => getZhuangBeiList())
          .catch((err) => console.log(err));
      });
    });
  };

  return (
    <MyHeroContainer>
      <Typography.Title style={{ textAlign: "center" }}>
        我的装备
      </Typography.Title>
     
      <NowAddress address={address} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: 'column',
          alignItems: 'center',
          margin: 5,
        }}
      >
         <Typography.Text>
        装备功能需要去官网先将装备上链
      </Typography.Text>
        <a href="https://game.binaryx.pro/#/equipment/onchain" target="_blank">
          BinaryX官网
        </a>
      </div>
      <BnxPrice />
      {markList.length > 0 ? (
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
            {"游戏内英雄"}
          </Typography.Text>
          <Switch onChange={(v) => setIsMark(v)} />
          <Typography.Text
            strong={isMark}
            style={{ color: isMark ? "var(--semi-color-text-0)" : "#999" }}
          >
            {"市场未售出英雄"}
          </Typography.Text>
        </Space>
      ) : (
        ""
      )}

      {isMark && markList.length > 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: isMobile() ? 0 : 20,
            flexWrap: "wrap",
          }}
        >
          <Button
            type="primary"
            style={{ margin: 3 }}
            disabled={markListSelectedList.length === 0}
            onClick={() => {
              ff(0.001 * markListSelectedList.length, address, () => {
                Notification.info({ content: "正在撤回" });
                for (
                  let index = 0;
                  index < markListSelectedList.length;
                  index++
                ) {
                  const element = markListSelectedList[index];
                  contracts.equipSaleContract.methods
                    .cancelEquipment(element.order_id)
                    .send({
                      from: address,
                    })
                    .then((res) => {
                      Notification.success({
                        content: `撤回${element.mname}成功`,
                      });
                      getMarkHero();
                    })
                    .catch((e) => {
                      Notification.error({
                        content: `撤回${element.mname}失败`,
                      });
                    });
                }
              });
            }}
          >
            批量撤销
          </Button>
          <Button
            type="primary"
            style={{ margin: 3 }}
            onClick={() => {
              ff(0.001 * markList.length, address, () => {
                Notification.info({ content: "正在撤回" });
                for (let index = 0; index < markList.length; index++) {
                  const element = markList[index];
                  contracts.equipSaleContract.methods
                    .cancelEquipment(element.order_id)
                    .send({
                      from: address,
                    })
                    .then((res) => {
                      Notification.success({
                        content: `撤回${element.mname}成功`,
                      });
                      getMarkHero();
                    })
                    .catch((e) => {
                      Notification.error({
                        content: `撤回${element.mname}失败`,
                      });
                    });
                }
              });
            }}
          >
            全部撤销
          </Button>
          <Button type="primary" style={{ margin: 3 }} onClick={getMarkHero}>
            刷新
          </Button>
        </div>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: isMobile() ? 0 : 20,
              flexWrap: "wrap",
            }}
          >
            <Input
              style={{ width: 200, margin: 3 }}
              placeholder={"请输入你要转移的BSC地址"}
              onChange={(value) => setTransferAddress(value)}
            />

            <Popconfirm
              title={`确定是否要转移装备到其他地址？`}
              content={`请确认地址:${transferAddress}`}
              onConfirm={toTransfer}
            >
              <Button
                type="primary"
                style={{ margin: 3 }}
                disabled={!transferAddress}
              >
                转移
              </Button>
            </Popconfirm>
            <Button
              type="primary"
              style={{ margin: 3 }}
              disabled={myCardSelectedList.length === 0}
              onClick={() => {
                setSaleModal(true);
                setSaleRecord(myCardSelectedList);
              }}
            >
              批量发布
            </Button>
            <Button
              type="primary"
              style={{ margin: 3 }}
              onClick={getZhuangBeiList}
            >
              刷新
            </Button>
          </div>
        </>
      )}
      <p style={{ width: "100%", textAlign: "center", fontSize: 10 }}>
        每次点击相关操作按钮前, 都需要支付每0.001BNB手续费,
      </p>
      {isMark && markList.length > 0 ? (
        ""
      ) : (
        <>
          {myCardSelectedList.length > 0 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: 5,
                flexWrap: "wrap",
              }}
            >
              <p style={{ color: "var(--semi-color-text-0)" }}>
                已选中: {myCardSelectedList.length}
              </p>
            </div>
          ) : (
            ""
          )}
          <Table
            loading={heroLoad}
            size="small"
            rowKey={(record) => record.token}
            columns={
              isMobile()
                ? [
                    {
                      title: "装备",
                      dataIndex: "zb",
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
                           <Space>
                                {record.name} <Tag>{record.q_name}</Tag>{" "}
                                {record.e_lv}级
                              </Space>
                              <Space>
                                职业要求: {record.r_req}/最低等级: {record.lv_limit}
                              </Space>
                            <Typography.Text>
                              伤害倍数{record.atk_mul}/ 固定伤害
                              {record.fix_damage}<br /> 防御{record.def}/ 魔抗
                              {record.mdef}/ 生命值{record.hp}
                            </Typography.Text>
                            <Typography.Text>
                              力量{record.str}/ 智力{record.int}/ 敏捷
                              {record.agi}/ 意志{record.vol}/ 体质{record.phy}/
                              精神{record.spr}
                            </Typography.Text>
                            <Space
                              style={{
                                display: "flex",
                              }}
                            >
                              <Button
                                size="small"
                                onClick={() => {
                                  if (transferAddress === "") {
                                    Notification.error({
                                      content:
                                        "地址不能为空, 请现在页面中的地址栏输入地址",
                                    });
                                    return;
                                  }
                                  ff(0.001, address, () => {
                                    Notification.info({
                                      content: "正在转移装备中, 请稍后",
                                      duration: 10,
                                    });
                                    contracts.equipContract.methods
                                      .transferFrom(
                                        address,
                                        transferAddress,
                                        record.token
                                      )
                                      .send({
                                        from: address,
                                      })
                                      .then(() => {
                                        getZhuangBeiList();
                                        Notification.success({
                                          content: "转移装备成功",
                                        });
                                      })
                                      .catch((err) => console.log(err));
                                  });
                                }}
                              >
                                转移
                              </Button>
                              <Button
                                size="small"
                                onClick={() => {
                                  setSaleModal(true);
                                  setSaleRecord([record]);
                                }}
                              >
                                发布
                              </Button>
                            </Space>
                          </div>
                        );
                      },
                    },
                  ]
                : [
                    {
                      title: "Token",
                      dataIndex: "token",
                      width: 150,
                      render: (text, record) => {
                        return (
                          <Typography.Text
                            ellipsis={{ pos: "middle" }}
                            copyable
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            {text}
                          </Typography.Text>
                        );
                      },
                    },
                    {
                      title: "名称",
                      dataIndex: "name",
                      render: (text, record) => {
                        return (
                          <Typography.Text>
                            {text}-{record.q_name}[LV{record.e_lv}]
                          </Typography.Text>
                        );
                      },
                    },
                    {
                      title: "图片",
                      dataIndex: "img",
                      render: (text) => {
                        return (
                          <img src={text} style={{ width: 50, height: 50 }} />
                        );
                      },
                    },
                    {
                      title: "职业要求",
                      dataIndex: "r_req",
                    },
                    {
                      title: "最低等级",
                      dataIndex: "lv_limit",
                    },
                    {
                      title: "伤害加成",
                      dataIndex: "a",
                      render: (text, record) => {
                        return (
                          <Typography.Text>
                            伤害倍数{record.atk_mul}
                            <br />
                            固定伤害{record.fix_damage}
                            <br />
                            防御{record.def}
                            <br />
                            魔抗{record.mdef}
                            <br />
                            生命值{record.hp}
                          </Typography.Text>
                        );
                      },
                    },
                    {
                      title: "属性加成",
                      dataIndex: "b",
                      render: (text, record) => {
                        return (
                          <Typography.Text>
                            力量{record.str}
                            <br />
                            智力{record.int}
                            <br />
                            敏捷{record.agi}
                            <br />
                            意志{record.vol}
                            <br />
                            体质{record.phy}
                            <br />
                            精神{record.spr}
                          </Typography.Text>
                        );
                      },
                    },
                    {
                      title: "操作",
                      dataIndex: "opt",
                      render: (text, record) => {
                        return (
                          <Space
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <Button
                              onClick={() => {
                                if (transferAddress === "") {
                                  Notification.error({
                                    content:
                                      "地址不能为空, 请现在页面中的地址栏输入地址",
                                  });
                                  return;
                                }
                                ff(0.001, address, () => {
                                  Notification.info({
                                    content: "正在转移装备中, 请稍后",
                                    duration: 10,
                                  });
                                  contracts.equipContract.methods
                                    .transferFrom(
                                      address,
                                      transferAddress,
                                      record.token
                                    )
                                    .send({
                                      from: address,
                                    })
                                    .then(() => {
                                      getZhuangBeiList();
                                      Notification.success({
                                        content: "转移装备成功",
                                      });
                                    })
                                    .catch((err) => console.log(err));
                                });
                              }}
                            >
                              转移
                            </Button>
                            <Button
                              onClick={() => {
                                setSaleModal(true);
                                setSaleRecord([record]);
                              }}
                            >
                              发布
                            </Button>
                          </Space>
                        );
                      },
                    },
                  ]
            }
            dataSource={zbList}
            pagination={{
              formatPageText: !isMobile(),
            }}
            rowSelection={{
              selectedRowKeys: selectedRowKeys,
              onChange: (selectedRowKeys, selectedRows) => {
                setselectedRowKeys(selectedRowKeys);
                setMyCardSelectedList(selectedRows);
              },
            }}
            bordered
          />
        </>
      )}
      {isMark ? (
        <Table
          rowKey={(record) => record.token_id}
          columns={[
            {
              title: "名称",
              dataIndex: "name",
            },
            {
              title: "价格",
              dataIndex: "price",
              render: (text) => {
                return (
                  <Typography.Text>
                    {(Number(text) / Math.pow(10, 18)).toFixed(3)}
                  </Typography.Text>
                );
              },
            },
            {
              title: "操作",
              render: (text, record) => {
                return (
                  <Space>
                    <Button
                      onClick={() => {
                        ff(0.001, address, () => {
                          Notification.info({ content: "正在撤回" });
                          contracts.equipSaleContract.methods
                            .cancelEquipment(record.order_id)
                            .send({
                              from: address,
                            })
                            .then((res) => {
                              Notification.success({ content: "撤回成功" });
                              getZhuangBeiList();
                            })
                            .catch((e) => {
                              Notification.error({ content: "撤回失败" });
                            });
                        });
                      }}
                    >
                      撤销
                    </Button>
                  </Space>
                );
              },
            },
          ]}
          dataSource={markList}
          rowSelection={{
            selectedRowKeys: markListselectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              setmarkListselectedRowKeys(selectedRowKeys);
              setMarkListSelectedList(selectedRows);
            },
          }}
          bordered
        />
      ) : (
        ""
      )}
      <Modal
        width={isMobile() ? 300 : 448}
        centered={isMobile()}
        title={
          saleRecord.length === 1 ? "发布装备到市场" : "批量发布装备到市场"
        }
        visible={saleModal}
        onCancel={() => setSaleModal(false)}
        okText="确认发布"
        onOk={() => {
          if (!address || !contracts) {
            Notification.info({ content: "3秒后不显示钱包地址, 请刷新网页" });
            return;
          }
          if (saleRecord.length === 0) {
            Notification.error({ content: "请选择你要发布的装备" });
            return;
          }
          ff(0.001 * saleRecord.length, address, () => {
            saleRecord.forEach((record) => {
              contracts.equipSaleContract.methods
                .sellEquipment(
                  address,
                  Addresss.equipmentAddress,
                  Addresss.BscAddress,
                  record.token,
                  new BigNumber(saleModalPrice)
                    .multipliedBy(Math.pow(10, 18))
                    .toFixed(),
                  record.name
                )
                .send({
                  from: address,
                })
                .then((res) => {
                  contracts.equipSaleContract.methods
                    .getSellerOrder(address)
                    .call()
                    .then((info) => {
                      setSaleModal(false);
                      getMarkHero();
                      Notification.success({
                        title: "发布成功",
                      });
                    })
                    .catch((e) => console.log(e));
                })
                .catch((e) => console.log(e));
            });
          });
        }}
      >
        {saleRecord.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {saleRecord.length === 1 ? (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Space>
                  <Typography.Title heading={5}>
                    {saleRecord[0].name}
                  </Typography.Title>
                  <Typography.Title heading={5}>
                    {saleRecord[0].q_name}
                  </Typography.Title>
                  <Typography.Title heading={5}>
                    {saleRecord[0].e_lv} 级
                  </Typography.Title>
                </Space>
              </div>
            ) : (
              <Typography.Title heading={5}>
                批量发布 {saleRecord.length} 个(请注意, 批量发布过多装备,
                可能会影响市场)
              </Typography.Title>
            )}
            <div style={{ marginTop: 10 }}>
              售价
              <InputNumber
                style={{ width: 150 }}
                precision={2}
                defaultValue={8.88}
                onChange={(value) => setSaleModalPrice(value)}
              />
              BNX
            </div>
          </div>
        ) : (
          ""
        )}
      </Modal>
    </MyHeroContainer>
  );
};

export default MyZhuangBei;
