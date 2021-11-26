https://game.binaryx.pro//v1/equipment/equiphandles  
{"code":1,"msg":"處理成功","data":[]}

https://game.binaryx.pro//v1/equipment/user
CategoryId=&SubCategoryId=&GoldAddress=0x3B0D325D60b288139535e8Ee772d9e22E140444F&Page=1&Limit=36&OutStatus=0&IsBc=&lang=zh-tw&sign=ac7699716a63fa3ecc215351e9a26f63

{"code":1,"msg":"處理成功","data":{"Lists":[{"id":4514,"uuid":"416363951371183","name":"黑鐵長劍","ext_id":4,"cate":1,"sub_cate":112,"lv_limit":0,"e_lv":1,"q":10,"q_name":"普通","desc":"","r_req":"戰士 卡特莉娜","q_range":"普通-普通","weight":0,"eq_s":0,"eq_token_id":"","atk_mul":1.01,"fix_damage":0,"def":0,"mdef":0,"hp":0,"str":0,"int":0,"agi":0,"phy":3,"vol":0,"spr":0,"str_req":0,"int_req":0,"agi_req":0,"phy_req":0,"vol_req":0,"spr_req":0,"img":"https://binaryx-prize.s3.ap-northeast-1.amazonaws.com/Ck9eCwwCO1.png","is_bc":0,"token":"","o_s":0,"h_s":0,"h_t":0}],"TotalAmount":1,"Page":1}}


getenq: function (e, t) {
            o.$http.post(o.$dungeonURL + '/v1/equipment/checkhandles', {
              UserEquipmentId: e,
              Handle: t
            }).then((function (n) {
              n.data ? (s.getEquipList(), s.getEntrantList(), oe['a'].success({
                title: i(1 === t ? 'game.成功' : 2 === t ? 'game.入庫成功' : 'game.出庫成功'),
                duration: 3000
              })) : setTimeout((function () {
                s.getenq(e, t)
              }), 10000)
            })).catch((function () {
            }))
          },

          s.equipoperaContract.methods.getToken(s.dialogInfo.token).send({
                      from: s.address,
                      gas: t
                    }).then((function (e) {
                      s.showDialog = !1,
                      s.dialogDisabled = !1,
                      s.sethandle(s.dialogInfo.id, 3),
                      s.getenq(s.dialogInfo.id, 3)
                    })).catch((function (e) {
                      s.dialogDisabled = !1,
                      s.showDialog = !1,
                      oe['a'].error({
                        title: i('game.手續費支付失敗')
                      })
                    }));

                    s.equipoperaContract.methods.saveToken(s.dialogInfo.token).send({
                      from: s.address,
                      gas: n
                    }).then((function (e) {
                      s.showDialog = !1,
                      s.dialogDisabled = !1,
                      s.sethandle(s.dialogInfo.id, 2),
                      s.getenq(s.dialogInfo.id, 2)
                    })).catch((function (e) {
                      s.showDialog = !1,
                      s.dialogDisabled = !1,
                      oe['a'].error({
                        title: i('game.手續費支付失敗')
                      })
                    }));


                    Object { cumulativeGasUsed: 95055738, to: "0xde9ffb228c1789fef3f08014498f2b16c57db855", blockHash: "0x982b799a29d7f3909a281bc89f8806f6a5381c72466af479b0bec3e137f5b65a", contractAddress: null, gasUsed: 118588, logsBloom: "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000", status: true, transactionHash: "0x6804ea9dd506a586a7e1f139a74461d455e8d79eadfb101e570066e7608a2e85", transactionIndex: 675, type: "0x0", … }
​
blockHash: "0x982b799a29d7f3909a281bc89f8806f6a5381c72466af479b0bec3e137f5b65a"
​
blockNumber: 12958879
​
contractAddress: null
​
cumulativeGasUsed: 95055738
​
events: Object { Fight: {…} }
​​
Fight: Object { blockNumber: 12958879, transactionHash: "0x6804ea9dd506a586a7e1f139a74461d455e8d79eadfb101e570066e7608a2e85", blockHash: "0x982b799a29d7f3909a281bc89f8806f6a5381c72466af479b0bec3e137f5b65a", … }
​​​
address: "0xde9fFb228C1789FEf3F08014498F2b16c57db855"
​​​
blockHash: "0x982b799a29d7f3909a281bc89f8806f6a5381c72466af479b0bec3e137f5b65a"
​​​
blockNumber: 12958879
​​​
event: "Fight"
​​​
id: "log_f31a3902"
​​​
logIndex: 1737
​​​
raw: Object { data: "0x0000000000000000000000003b0d325d60b288139535e8ee772d9e22e140444f000000000000000000000000000000000000000000000000000000000002119d0000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000190", topics: (1) […] }
​​​
removed: false
​​​
returnValues: Object { 0: "0x3B0D325D60b288139535e8Ee772d9e22E140444F", 1: "135581", 2: "6", … }
​​​​
0: "0x3B0D325D60b288139535e8Ee772d9e22E140444F"
​​​​
1: "135581"
​​​​
2: "6"
​​​​
3: "0"
​​​​
4: "0"
​​​​
5: "400"
​​​​
_attackingHero: "135581"
​​​​
enemyType: "6"
​​​​
hpLoss: "400"
​​​​
player: "0x3B0D325D60b288139535e8Ee772d9e22E140444F"
​​​​
rewards: "0"
​​​​
xpGained: "0"
​​​​
<prototype>: Object { … }
​​​
signature: "0x505f4a3c1325113d6ec360c82b53cda696a6ff2d3c1ea993834624861563628a"
​​​
transactionHash: "0x6804ea9dd506a586a7e1f139a74461d455e8d79eadfb101e570066e7608a2e85"
​​​
transactionIndex: 675
​​​
<prototype>: Object { … }
​​
<prototype>: Object { … }
​
from: "0x3b0d325d60b288139535e8ee772d9e22e140444f"
​
gasUsed: 118588
​
logsBloom: "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000"
​
status: true
​
to: "0xde9ffb228c1789fef3f08014498f2b16c57db855"
​
transactionHash: "0x6804ea9dd506a586a7e1f139a74461d455e8d79eadfb101e570066e7608a2e85"
​
transactionIndex: 675
​
type: "0x0"
​
<prototype>: Object { … }
BNBH.jsx:323


_attackingHero: "135581"
​​​​
enemyType: "6"
​​​​
hpLoss: "400"
​​​​
player: "0x3B0D325D60b288139535e8Ee772d9e22E140444F"
​​​​
rewards: "0"
​​​​
xpGained: "0"

0xca39e5ef00000000000000000000000000000000000000000000000000000000000211b00000000000000000000000000000000000000000000000000000000000000005
0xca39e5ef00000000000000000000000000000000000000000000000000000000000211b00000000000000000000000000000000000000000000000000000000000000005
0xca39e5ef00000000000000000000000000000000000000000000000000000000000211b00000000000000000000000000000000000000000000000000000000000000006