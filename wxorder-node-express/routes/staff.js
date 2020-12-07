var express = require('express');
var router = express.Router();
const ReturnData = require("../tools/ReturnData");
const staffHandle = require("../handle/staff");
//新建员工
router.post('/add', async (req, res, next) => {
    try {
        req.body.status = 0;
        const data = await staffHandle.addStaff(req.body)
        if (data) {
            const RD = new ReturnData(res)
            RD.success(data);
        } else {
            RD.fail()
        }

    } catch (error) {
        next(error)
    }

})

//修改  /删除
router.post('/update', async (req, res, next) => {
    try {
        const { id } = req.body
        const RD = new ReturnData(res);
        if (id) {
            const data = await staffHandle.updateStaff(req.body);
            if (data) {
                RD.success(data)
            } else {
                RD.fail()
            }
        } else {
            RD.fail("请传入ID")
        }
    } catch (error) {
        next(error)
    }


})


//获取列表
router.get('/list', async (req, res, next) => {
    try {
        const { psize, pid, username } = req.query;
        const data = await staffHandle.getStaffList(username, pid, psize);
        const RD = new ReturnData(res);
        if (data) {
            RD.success(data)
        } else {
            RD.fail()
        }
    } catch (error) {
        next(error)
    }
})

// 根据id获取是否已绑定
router.get('/isExistOpenId', async (req, res, next) => {

    try {
        const { id } = req.query
        const RD = new ReturnData(res);
        const data = await staffHandle.isExistOpenId(id);
        if (data.dataValues.openId) {
            RD.success({ isExist: true })
        } else {
            RD.success({ isExist: false })
        }
    } catch (error) {
        next(error)
    }
})

// 根据openId 返回员工信息
router.get('/staffInfo', async (req, res, next) => {
    try {
        const RD = new ReturnData(res)
        const { openId } = req.query;
        const data = await staffHandle.getStaffInfo(openId);
        if (data) {
            RD.success(data)
        } else {
            RD.fail();
        }
    } catch (error) {
        next(error)
    }
})


module.exports = router;