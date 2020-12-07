const jsonwebtoken = require("jsonwebtoken")
const tokenConfig = require("../config/token")
const jwt = {
    //生成token
    getToken(userInfo) {
        const token = jsonwebtoken.sign(userInfo, tokenConfig.tokenScreat, {
            expiresIn: tokenConfig.expiresIn, //过期时间
            issuer: tokenConfig.issuer
        })
        return token

    },

    // 解析token
    analysisToken(token) {
        if (token) {
            const userInfo = jsonwebtoken.verify(token, tokenConfig.tokenScreat)
            return userInfo
        } else {
            return false
        }

    }
}

module.exports = jwt;