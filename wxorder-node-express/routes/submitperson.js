const express = require("express");
const submitPersonHandle = require("../handle/submitperson");
const sysConfigHandle = require("../handle/sysconfig");
const router = express.Router();
const ReturnData = require("../tools/ReturnData")
// 新增修改
router.post('/manage', async (req, res, next) => {
    const RD = new ReturnData(res);
    try {
        const data = await submitPersonHandle.addOrUpdate(req.body);
        if (data) {
            RD.success(data)
        } else {
            RD.fail()
        }
    }
    catch (err) {
        console.log(err)
        next(err)
    }
})

router.get('/getUserMsg', async (req, res, next) => {
    try {
        const { code } = req.query;
        const RD = new ReturnData(res);
        if (code) {
            const data = await submitPersonHandle.getOpenId(code);
            // console.log(data)
            if (data.data.errcode) {
                let msg = "";
                // 调取微信错误
                switch (data.data.errcode) {
                    case 40013:
                        //APPID错误
                        msg = "APPID配置错误"
                    case 40163:
                        //code被使用过
                        msg = "code被使用过"
                    case 40125:
                        //SECRET错误
                        msg = "APPSECRET配置错误"
                    default:
                        msg = data.data.errmsg;
                }
                // code过期
                RD.success(null, { code: data.data.errcode, msg })
            } else if (data.data.access_token) {
                //获取APPID  access_token成功  
                // 获取用户信息
                const access_token = data.data.access_token;
                const openId = data.data.openid
                const userWhchatMsg = await submitPersonHandle.getUserWechatMsg(access_token, openId);
                if (userWhchatMsg.data.nickname) {
                    // 返回用户信息
                    RD.success(userWhchatMsg.data)
                } else if (userWhchatMsg.data.errcode) {
                    RD.success(userWhchatMsg.data, { code: userWhchatMsg.data.errcode, msg: userWhchatMsg.data.errmsg });
                }
            } else {
                RD.fail(data.data)
            }
        }
    }
    catch (err) {
        console.log(err)
        next(err)
    }

})

//获取code 
router.get('/isregister', async (req, res, next) => {
    try {
        const openId = req.query.openId
        const data = await submitPersonHandle.isExist(openId)
        const RD = new ReturnData(res);
        if (data) {
            RD.success(data)
        } else {
            RD.success(null, { code: 10001 })
        }
    } catch (error) {
        next(error)
    }
})

// 根据id获取个人信息
router.get('/userInfo', async (req, res, next) => {
    try {
        const { id } = req.query;
        const data = await submitPersonHandle.getMsgByPerpleId(id)
        if (data) {
            const RD = new ReturnData(res);
            RD.success(data)
        } else {
            RD.fail()
        }
    } catch (error) {
        next(error)
    }
})



module.exports = router;