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