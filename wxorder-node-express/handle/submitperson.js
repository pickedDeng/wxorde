/**
 * @author pickeddeng
 * @summary  客户认证人员 
 *
 * 
 */
// 
const Models = require("../db/models");
const submitModel = Models.SubmitPerson;
const customerModel = Models.Customer;
const sysCinfigHandle = require("./sysconfig");//系统配置处理
const axios = require("axios");
const submitPersonHandle = {
    async addOrUpdate(data) {
        let res = null;
        if (!data.id) {
            // 新增
            res = await submitModel.create(data);
        } else {
            // 修改
            res = await submitModel.update(data, {
                where: {
                    id: data.id
                }
            })
        }
        return res
    },
    async getOpenId(code) {
        const APPID = await this.getSysConfig("APPID");//APPID
        const SECRET = await this.getSysConfig("SECRET");//SECRET
        const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${APPID}&secret=${SECRET}&code=${code}&grant_type=authorization_code`
        const data = await axios.get(url);
        return data
    },
    async getUserWechatMsg(access_token, openId) {
        const res = await axios.get(`https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openId}&lang=zh_CN`)
        return res

    },
    async getSysConfig(name) {
        const res = await sysCinfigHandle.getContentByName(name);
        return res
    },
    async isExist(openId){
        const res = submitModel.findOne({
            attributes:["wechatName","id"],
            where:{
                openId
            }
        })
        return res
    },
    async getMsgByPerpleId(id){
        const res = await submitModel.findOne({
            where:{
                id
            }
        })
        const customerId = res.dataValues.customerId;
        console.log(customerId)
        const customerName = await customerModel.findOne({
            where:{
                id:customerId
            }
        });
        res.dataValues.customerName = customerName.dataValues.name;
        return res
    }
}

module.exports = submitPersonHandle;