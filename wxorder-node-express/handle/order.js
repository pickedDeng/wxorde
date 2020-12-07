/**
 * @author pickeddeng
 * @summary  工单提交 
 *
 * 
 */
// 
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const axios = require("axios");
const Models = require("../db/models");
const OrderModel = Models.Order;
const sysConfigHandle = require("./sysconfig");
const orderTypeHandle = require("./ordertype");
const historyHandle = require("./handlehistory");
const staffHandle = require("./staff");

const orderHandle = {
    async setSignEnd(ids) {
        const conditionArr = [];
        if (ids.length > 0) {
            ids.forEach(value => {
                conditionArr.push({
                    id: value
                })
            })
            const res = await OrderModel.update(
                {
                    handleState: 3
                }, {
                where: {
                    [Op.or]: conditionArr
                }
            })
            return res
        } else {
            return false
        }

    },
    async getEndedOrderList(id) {
        const isManage = await orderTypeHandle.findIsManage(id);
        if (isManage) {
            // 是管理员
            const res = await OrderModel.findAndCountAll({
                attributes: ["id", "orderType", "submitPeople", "customerName", "handleState", "createdAt", "updatedAt"],
                where: {
                    orderType: isManage.dataValues.typeName,
                    handleState: 2,
                }
            })
            return res;
        } else {
            return {
                rows: [],
                count: 0
            }
        }
    },
    async addOrupdate(data) {
        // const res = await this.getAccess_token();
        if (!data.id) {
            // 新增工单
            const typeManageObj = await orderTypeHandle.findstaffIdByTypeName(data.orderType);
            const handleId = typeManageObj.dataValues.traffId;
            data.currentHandleId = handleId;
            const res = await OrderModel.create(data);
            // console.log(res)
            if (res) {
                // 创建历史记录
                const insertData = {
                    orderId: res.dataValues.id,
                    sendPeople: data.submitPeople,
                    besendPeople: data.orderType,
                    sendType: "提交工单"
                }
                await historyHandle.addHistory(insertData);

                // 工单创建成功  开启调用微信openID
                const orderTypeManageOpenId = await orderTypeHandle.findOpenIdByName(data.orderType);

                if (orderTypeManageOpenId) {
                    // 设置回调页
                    const WEBPREFIX = await sysConfigHandle.getContentByName("WEBPREFIX");
                    // 找到openId
                    const seedMSG = this.setData({
                        openId: orderTypeManageOpenId,
                        url: `${WEBPREFIX}/#/serveIndex`,
                        id: res.dataValues.id,
                        orderType: res.dataValues.orderType,
                        createAt: res.dataValues.createdAt,
                        person: data.submitPeople,
                        area: data.customerName,
                        remark: data.needText
                    });
                    const finalRes = await this.sendWechatMsg(seedMSG);
                    return finalRes
                } else {
                    return false
                }
            } else {
                return false;
            }
        } else {
            // 修改工单
            const res = await OrderModel.update(data, {
                where: {
                    id: data.id
                }
            })
            return res
        }


    },
    async getAccess_token() {
        const APPID = await sysConfigHandle.getContentByName("APPID");
        const SECRET = await sysConfigHandle.getContentByName("SECRET");
        const res = await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${SECRET}`);
        return res.data.access_token

    },
    async sendWechatMsg(data) {
        const access_token = await this.getAccess_token();
        const res = await axios.post(`https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${access_token}`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return res.data
    },
    setData(data) {
        return {
            "touser": data.openId,
            "template_id": "dpibqxlBy8ZCYiwQE2vxME5RljZPSzFvoB8MiNA48T0",
            "url": data.url,
            "topcolor": "#FF0000",
            "data": {
                "first": {
                    "value": data.title || "您现在收到一条新的工单",
                    "color": "#173177"
                },
                "keyword1": {
                    "value": data.id,
                    "color": "#173177"
                },
                "keyword2": {
                    "value": data.orderType,
                    "color": "#173177"
                },
                "keyword3": {
                    "value": data.createAt,
                    "color": "#173177"
                },
                "keyword4": {
                    "value": data.person,
                    "color": "#173177"
                },
                "keyword5": {
                    "value": data.area,
                    "color": "#173177"
                },
                "remark": {
                    "value": data.remark,
                    "color": "#173177"
                }
            }
        }
    },
    setHandleData(data) {
        return {
            "touser": data.openId,
            "template_id": "mqNTxaNEfEv4vv3svR3yweyOw9fg9Xan36F4SKSdK4s",
            "url": data.url,
            "topcolor": "#FF0000",
            "data": {
                "first": {
                    "value": data.title || "工单待处理",
                    "color": "#173177"
                },
                "keyword1": {
                    "value": data.id,
                    "color": "#173177"
                },
                "keyword2": {
                    "value": data.orderType,
                    "color": "#173177"
                },
                "keyword3": {
                    "value": data.createAt,
                    "color": "#173177"
                },
                "keyword4": {
                    "value": data.person,
                    "color": "#173177"
                },
                "keyword5": {
                    "value": data.area,
                    "color": "#173177"
                },
                "level": {
                    "value": data.remark,
                    "color": "#173177"
                },
                "finishTime": {
                    "value": data.finishTime,
                    "color": "#173177"
                }
            }
        }
    },
    async sendTo(data, sendPeopleName, operateType) {
        const res = OrderModel.update(data, {
            where: {
                id: data.id
            }
        });
        if (res) {
            // 派发成功
            // 历史记录添加
            // 获取被指派人姓名 openID
            const besendMsg = await staffHandle.getOpenIdByStaffId(data.currentHandleId);
            const openId = besendMsg.dataValues.openId
            const username = besendMsg.dataValues.username

            // 封装发送数据
            const handleData = this.setHandleData({
                openId,
                url: "http://www.baidu.com",
                id: 1225,
                orderType: data.orderType,
                createAt: "2020年11月15日",
                person: data.submitPeople,
                area: data.customerName,
                level: data.level,
                finishTime: data.finishTime
            })
            // 操作的历史数据
            const historyData = {
                orderId: data.id,
                sendPeople: sendPeopleName,
                besendPeople: username,
                sendType: operateType
            }

            const innsertHistRes = await historyHandle.addHistory(historyData);
            const sendStaffRes = await this.sendWechatMsg(handleData)
            if (innsertHistRes && sendStaffRes) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    },
    async getOrderListById(id, pid, psize) {
        const res = await OrderModel.findAndCountAll({
            limit: parseInt(psize),
            offset: (parseInt(pid) - 1) * parseInt(psize),
            where: {
                submitId: id,
                status: 0
            },
            order: [["createdAt", "desc"]]
        })
        const finishedNumber = await this.getFinishedOrderNumber(id);
        res.finishedNumber = finishedNumber.count;
        res.pid = pid;
        res.psize = psize;
        return res
    },
    //获取完成数字
    async getFinishedOrderNumber(id) {
        const res = await OrderModel.findAndCountAll({
            where: {
                submitId: id,
                handleState: 3,
                status: 0
            }
        })
        return res
    },

    // 根据ID获取待处理点单
    async getStaffWaitHandleOrderList(staffId, manage) {
        const res = await OrderModel.findAndCountAll({
            attributes: ["id", "submitPeople", "createdAt", "needText", "orderType", "handleState", "currentHandleId"],
            where: {
                currentHandleId: staffId,
                handleState: manage ? 0 : 1,// 是类型管理员 查询0 状态   员工查询1
            },
            order: [["createdAt", "desc"]]
        })
        return res
    },
    async getOrderDetailById(id) {
        const res = await OrderModel.findOne({
            where: {
                id
            }
        })
        return res
    }
}

module.exports = orderHandle