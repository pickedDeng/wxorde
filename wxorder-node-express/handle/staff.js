
/**
 * 
 * @author pickeddeng
 * 
 * staff 处理层面
 */
const Models = require("../db/models/index");
const staffModel = Models.Staff
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const staffHandle = {
    async getStaffInfo(openId) {
        const res = await staffModel.findOne({
            attributes:["id","username","openId","deptId","status","createdAt","updatedAt"],
            where: {
                openId,
                status: 0
            }
        })
        return res
    },
    async isExistOpenId(id) {
        const res = await staffModel.findOne({
            attributes: ["openId"],
            where: {
                id
            }
        })
        return res
    },
    async addStaff(data) {
        const res = await staffModel.create(data);
        return res
    },
    async updateStaff(data) {
        const res = await staffModel.update(data, {
            where: {
                id: data.id
            }
        })
        return res
    },
    async getStaffList(username, pid, psize) {
        const data = await staffModel.findAndCountAll({
            attributes: ['username', 'status', "openId", "createdAt", "updatedAt", "id"],
            where: {
                status: 0,
                username: {
                    [Op.like]: "%" + username + "%"
                }
            },
            limit: Number(psize) || 10,
            offset: (Number(pid) - 1) * psize
        })
        return data
    },
    async getOpenIdByStaffId(straffId) {
        const res = await staffModel.findOne({
            attributes: ["openId", "username"],
            where: {
                id: straffId,
                status: 0
            }
        });

        return res
    },

}

module.exports = staffHandle;
