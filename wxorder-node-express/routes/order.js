const express = require("express");
const router = express.Router();
const ReturnData = require("../tools/ReturnData")
const orderHandle = require("../handle/order");
const orderTypeHandle = require("../handle/ordertype");
const handleHistoryHandle = require("../handle/handlehistory");
const staffHandle = require("../handle/staff");
const { json } = require("body-parser");
// 工单新建
router.post('/manage', async (req, res, next) => {
    const RD = new ReturnData(res);
    try {
        const data = await orderHandle.addOrupdate(req.body)
        if (data) {
            RD.success(data)
        } else {
            RD.fail()
        }
    } catch (error) {
        next(error)
    }
})

// 派发工单
router.post('/sendTo', async (req, res, next) => {
    const RD = new ReturnData(res);
    try {
        const id = req.body.id;
        const sendPeopleName = req.query.name;
        const operateType = req.query.operateType;
        if (!id) {
            RD.success({}, { code: 10001, msg: "请传入id" })
            return
        }

        const data = await orderHandle.sendTo(req.body, sendPeopleName, operateType);
        if (data) {
            RD.success(data);
        } else {
            RD.fail();
        }
    } catch (error) {
        next(error)
    }
})

// 结单列表

router.get('/endedOrder', async (req, res, next) => {
    try {
        const RD = new ReturnData(res);
        const { id } = req.query;
        const data = await orderHandle.getEndedOrderList(id);
        if (data) {
            RD.success(data);
        } else {
            RD.fail()
        }
    } catch (error) {
        next(error)
    }
})

// 批量结单
router.post('/signend', async (req, res, next) => {
    try {
        const RD = new ReturnData(res);
        const { ids } = req.body
        const data = await orderHandle.setSignEnd(JSON.parse(ids));
        if (data) {
            RD.success(data);
        } else {
            RD.fail();
        }

    } catch (error) {
        next(error)
    }
})

// 客户根据id获取自己工单列表
router.get('/orderList', async (req, res, next) => {
    try {
        const RD = new ReturnData(res);
        const { id, pid, psize } = req.query;
        const data = await orderHandle.getOrderListById(id, pid, psize);
        if (data) {
            RD.success(data)
        } else {
            RD.fail();
        }
    } catch (error) {
        next(error)
    }
})

router.get('/lookOrderList', async (req, res, next) => {
    try {
        const RD = new ReturnData(res);
        const { id } = req.query;
        const data = await handleHistoryHandle.getOrderHistory(id);
        if (data) {
            RD.success(data)
        } else {
            RD.fail();
        }
    } catch (error) {
        next(error)
    }
})


// 员工工单处理
router.get('/staffOrderList', async (req, res, next) => {
    try {
        const RD = new ReturnData(res);
        const { openId } = req.query
        const staffInfo = await staffHandle.getStaffInfo(openId);
        const staffId = staffInfo.dataValues.id
        const isManage = await orderTypeHandle.findIsManage(staffId)
        let manage = null;
        if (isManage.dataValues) {
            manage = true
        } else {
            manage = false
        }
        const data = await orderHandle.getStaffWaitHandleOrderList(staffId, manage)
        if (data) {
            RD.success(data)
        } else {
            RD.fail();
        }
    } catch (error) {
        next(error)
    }
})

router.get('/orderDetail', async (req, res, next) => {
    try {
        const RD = new ReturnData(res);
        const { id } = req.query;
        const data = await orderHandle.getOrderDetailById(id);
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