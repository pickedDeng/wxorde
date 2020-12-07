const express = require("express");
const router = express.Router();
const ReturnData = require("../tools/ReturnData")
const deptHandle = require("../handle/dept");
// 新增修改
router.post('/manage', async (req, res, next) => {
    const RD = new ReturnData(res);
    const { id } = req.body;
    try {
        if (id) {
            // 修改
            const data = await deptHandle.updateDept(req.body);
            if (data) {
                RD.success(data);
            } else {
                RD.fail()
            }
        } else {
            // 新增
            const data = await deptHandle.addDept(req.body);
            if (data) {
                RD.success(data);
            } else {
                RD.fail()
            }
        }

    } catch (error) {
        next(error)
    }
})

//删除
router.get('/del', async (req, res, next) => {
    try {
        const RD = new ReturnData(res);
        const { id } = req.query
        if (id) {
            const params = {
                status: -1,
                id
            }
            const data = await deptHandle.updateDept(params);
            if (data) {
                RD.success(data);
            } else {
                RD.fail();
            }
        } else {
            RD.fail()
        }

    } catch (error) {
        next(error)
    }
})
//列表树
router.get('/tree', async (req, res, next) => {
    try {
        const RD = new ReturnData(res);
        const { faid } = req.query
        const resArr = await deptHandle.getDeptByFaid(faid);
        // 递归返回树
        if (resArr) {
            RD.success(resArr)
        } else {
            RD.fail()
        }
    } catch (error) {
        next(error)
    }
})


module.exports = router;