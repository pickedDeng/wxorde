const express = require("express");
const router = express.Router();
const ReturnData = require("../tools/ReturnData")
const customerHandle = require("../handle/customer");
// 新增修改删除
router.post('/manage', async (req, res, next) => {
    const RD = new ReturnData(res);
    try {
        const data = await customerHandle.addOrUpdate(req.body);
        if (data) {
            RD.success(data)
        } else {
            RD.fail()
        }
    } catch (error) {
        next(error)
    }
})

// 列表
router.get('/list', async (req, res, next) => {
    const RD = new ReturnData(res);
    try {
        const { name } = req.query
        const data = await customerHandle.getList(name);
        if (data) {
            RD.success(data)
        } else (
            RD.fail()
        )
    } catch (error) {
        next(error)
    }
})

module.exports = router;