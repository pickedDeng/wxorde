const express = require("express");
const router = express.Router();
const ReturnData = require("../tools/ReturnData")
const orderTypeHandle = require("../handle/ordertype");

//类型新增修改删除
router.post('/manage', async (req, res, next) => {
    const RD = new ReturnData(res);
    try {
        const data = await orderTypeHandle.addOrupdate(req.body);
        if (data) {
            RD.success(data);
        } else {
            RD.fail();
        }
    } catch (error) {
        next(error)
    }
})

// 获取列表
router.get('/list', async (req, res, next) => {
    const RD = new ReturnData(res)
    try {
        const data = await orderTypeHandle.getList();
        if (data) {
            RD.success(data)
        } else {
            RD.fail()
        }
    } catch (error) {
        next(error)
    }
})
module.exports = router 