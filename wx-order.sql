/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : wx-order

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2020-12-07 15:06:50
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for customers
-- ----------------------------
DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of customers
-- ----------------------------
INSERT INTO `customers` VALUES ('1', '郎溪', '0', '2020-11-26 17:43:01', '2020-11-26 17:43:01');
INSERT INTO `customers` VALUES ('2', '金寨', '0', '2020-11-26 17:43:07', '2020-11-26 17:43:07');

-- ----------------------------
-- Table structure for depts
-- ----------------------------
DROP TABLE IF EXISTS `depts`;
CREATE TABLE `depts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `deptName` varchar(255) DEFAULT NULL,
  `faid` varchar(255) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of depts
-- ----------------------------
INSERT INTO `depts` VALUES ('1', 'UI设计1', '0', 'UI设计1', '0', '2020-11-26 17:42:38', '2020-11-26 17:42:38');
INSERT INTO `depts` VALUES ('2', '研发部', '0', '研发部', '0', '2020-11-26 17:42:49', '2020-11-26 17:42:49');
INSERT INTO `depts` VALUES ('3', '产品组', '1', '产品组', '0', '2020-11-26 10:07:43', '2020-11-26 10:07:43');

-- ----------------------------
-- Table structure for handlehistories
-- ----------------------------
DROP TABLE IF EXISTS `handlehistories`;
CREATE TABLE `handlehistories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderId` int(11) DEFAULT NULL,
  `sendPeople` varchar(255) DEFAULT NULL,
  `besendPeople` varchar(255) DEFAULT NULL,
  `sendType` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of handlehistories
-- ----------------------------
INSERT INTO `handlehistories` VALUES ('3', '4', '张大林', '张三', '派发', '2020-12-02 09:18:22', '2020-12-02 09:18:22');
INSERT INTO `handlehistories` VALUES ('4', '1', '张大林', '张三', '派发', '2020-12-02 09:20:16', '2020-12-02 09:20:16');
INSERT INTO `handlehistories` VALUES ('6', '1', '张三', '李四', '派发', '2020-12-02 09:36:10', '2020-12-02 09:36:10');
INSERT INTO `handlehistories` VALUES ('7', '6', '邓余财(Some Deng)', '软件', '提交工单', '2020-12-02 09:56:28', '2020-12-02 09:56:28');
INSERT INTO `handlehistories` VALUES ('8', '6', '张大林', '李四', '派发', '2020-12-02 09:59:17', '2020-12-02 09:59:17');
INSERT INTO `handlehistories` VALUES ('9', '7', '邓余财(Some Deng)', '软件', '提交工单', '2020-12-03 01:33:32', '2020-12-03 01:33:32');
INSERT INTO `handlehistories` VALUES ('10', '8', '邓余财(Some Deng)', '软件', '提交工单', '2020-12-03 01:33:35', '2020-12-03 01:33:35');
INSERT INTO `handlehistories` VALUES ('11', '9', '邓余财(Some Deng)', '软件', '提交工单', '2020-12-03 01:33:37', '2020-12-03 01:33:37');
INSERT INTO `handlehistories` VALUES ('12', '10', '邓余财(Some Deng)', '软件', '提交工单', '2020-12-03 01:33:38', '2020-12-03 01:33:38');
INSERT INTO `handlehistories` VALUES ('13', '11', '邓余财(Some Deng)', '软件', '提交工单', '2020-12-03 01:33:40', '2020-12-03 01:33:40');
INSERT INTO `handlehistories` VALUES ('14', '12', '邓余财(Some Deng)', '软件', '提交工单', '2020-12-03 01:33:42', '2020-12-03 01:33:42');
INSERT INTO `handlehistories` VALUES ('15', '13', '邓余财(Some Deng)', '软件', '提交工单', '2020-12-03 05:56:03', '2020-12-03 05:56:03');
INSERT INTO `handlehistories` VALUES ('16', '14', '邓余财(Some Deng)', '软件', '提交工单', '2020-12-03 05:56:25', '2020-12-03 05:56:25');
INSERT INTO `handlehistories` VALUES ('17', '15', '邓余财(Some Deng)', '软件', '提交工单', '2020-12-03 05:58:12', '2020-12-03 05:58:12');
INSERT INTO `handlehistories` VALUES ('18', '16', '邓余财(Some Deng)', '软件', '提交工单', '2020-12-03 07:13:38', '2020-12-03 07:13:38');
INSERT INTO `handlehistories` VALUES ('19', '17', '邓余财(Some Deng)', '软件', '提交工单', '2020-12-03 07:29:32', '2020-12-03 07:29:32');
INSERT INTO `handlehistories` VALUES ('20', '18', '邓余财(Some Deng)', '软件', '提交工单', '2020-12-03 07:33:19', '2020-12-03 07:33:19');
INSERT INTO `handlehistories` VALUES ('21', '18', '邓余财', '邓余财', '派发', '2020-12-03 09:01:00', '2020-12-03 09:01:00');
INSERT INTO `handlehistories` VALUES ('22', '18', '邓余财', '邓余财', '派发', '2020-12-03 09:11:37', '2020-12-03 09:11:37');
INSERT INTO `handlehistories` VALUES ('23', '19', '邓余财(Some Deng)', '软件', '提交工单', '2020-12-03 09:43:50', '2020-12-03 09:43:50');
INSERT INTO `handlehistories` VALUES ('24', '20', '邓余财(Some Deng)', '软件', '提交工单', '2020-12-04 07:15:21', '2020-12-04 07:15:21');
INSERT INTO `handlehistories` VALUES ('25', '21', '邓余财(Some Deng)', '软件', '提交工单', '2020-12-04 07:18:37', '2020-12-04 07:18:37');
INSERT INTO `handlehistories` VALUES ('26', '22', '邓余财(Some Deng)', '软件', '提交工单', '2020-12-07 05:26:05', '2020-12-07 05:26:05');
INSERT INTO `handlehistories` VALUES ('27', '22', '主管', '职员张三', '派发', '2020-12-07 13:32:44', '2020-12-07 13:32:48');
INSERT INTO `handlehistories` VALUES ('28', '22', '职员张三', '职员李四', '派发', '2020-12-07 13:33:29', '2020-12-07 13:33:33');
INSERT INTO `handlehistories` VALUES ('29', '22', '职员李四', '职员李四', '完成', '2020-12-07 13:33:56', '2020-12-07 13:33:58');

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `submitId` int(11) DEFAULT NULL,
  `submitPeople` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `orderType` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `customerName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `finishTime` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `level` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `needText` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `currentHandleId` int(11) DEFAULT NULL,
  `needSource` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `handleState` int(11) DEFAULT '0' COMMENT '0 调教 1 派发 2 完成 3结单',
  `status` int(11) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES ('20', '1', '邓余财(Some Deng)', '软件', '金寨', null, null, '111', '1', '[]', '2', '0', '2020-12-04 07:15:21', '2020-12-04 07:15:21');
INSERT INTO `orders` VALUES ('21', '1', '邓余财(Some Deng)', '软件', '金寨', null, null, '22', '1', '[]', '2', '0', '2020-12-04 07:18:37', '2020-12-04 07:18:37');
INSERT INTO `orders` VALUES ('22', '1', '邓余财(Some Deng)', '软件', '金寨', null, null, '2222', '1', '[\"http://localhost/wechatorder/wechat-order-node/res\\\\upload_2258ac4391de3da37095136c1a521b26.png\"]', '2', '0', '2020-12-07 05:26:05', '2020-12-07 05:26:05');

-- ----------------------------
-- Table structure for ordertypes
-- ----------------------------
DROP TABLE IF EXISTS `ordertypes`;
CREATE TABLE `ordertypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `typeName` varchar(255) DEFAULT NULL,
  `traffId` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ordertypes
-- ----------------------------
INSERT INTO `ordertypes` VALUES ('1', '软件', '3', '0', '2020-12-02 02:56:01', '2020-12-02 02:56:01');
INSERT INTO `ordertypes` VALUES ('2', '硬件', '3', '0', '2020-12-02 02:56:11', '2020-12-02 02:56:11');

-- ----------------------------
-- Table structure for sequelizemeta
-- ----------------------------
DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of sequelizemeta
-- ----------------------------
INSERT INTO `sequelizemeta` VALUES ('20201126093632-create-dept.js');
INSERT INTO `sequelizemeta` VALUES ('20201126093640-create-order-type.js');
INSERT INTO `sequelizemeta` VALUES ('20201126093648-create-customer.js');
INSERT INTO `sequelizemeta` VALUES ('20201126093655-create-staff.js');
INSERT INTO `sequelizemeta` VALUES ('20201126093716-create-submit-person.js');
INSERT INTO `sequelizemeta` VALUES ('20201126093725-create-order.js');
INSERT INTO `sequelizemeta` VALUES ('20201126093733-create-handle-history.js');
INSERT INTO `sequelizemeta` VALUES ('20201126093859-create-sysconfig.js');
INSERT INTO `sequelizemeta` VALUES ('20201202074632-create-order.js');

-- ----------------------------
-- Table structure for staffs
-- ----------------------------
DROP TABLE IF EXISTS `staffs`;
CREATE TABLE `staffs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `openId` varchar(255) DEFAULT NULL,
  `deptId` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of staffs
-- ----------------------------
INSERT INTO `staffs` VALUES ('3', '邓余财', '123456', 'oHm3E6Blexg4GEW5uhlr9fUk-t5Y', '1', '0', '2020-12-04 15:43:37', '2020-12-07 05:22:47');

-- ----------------------------
-- Table structure for submitpeople
-- ----------------------------
DROP TABLE IF EXISTS `submitpeople`;
CREATE TABLE `submitpeople` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `wechatName` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `customerId` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  `openId` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of submitpeople
-- ----------------------------
INSERT INTO `submitpeople` VALUES ('1', '邓余财(Some Deng)', '19966475060', '2', null, 'oHm3E6Blexg4GEW5uhlr9fUk-t5Y', '2020-11-26 17:46:46', '2020-11-26 17:46:46');

-- ----------------------------
-- Table structure for sysconfigs
-- ----------------------------
DROP TABLE IF EXISTS `sysconfigs`;
CREATE TABLE `sysconfigs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sysconfigs
-- ----------------------------
INSERT INTO `sysconfigs` VALUES ('1', 'APPID', 'wxbaf57552c144dd07', '2020-11-26 17:42:03', '2020-11-26 17:42:03');
INSERT INTO `sysconfigs` VALUES ('2', 'SECRET', 'fdfc40cbe54e6ef8242ea330afcd8d98', '2020-11-26 17:42:23', '2020-11-26 17:42:23');
INSERT INTO `sysconfigs` VALUES ('3', 'NODEPREFIX', 'http://localhost/wechatorder/wechat-order-node/', '2020-12-02 03:25:01', '2020-12-03 07:37:49');
INSERT INTO `sysconfigs` VALUES ('4', 'WEBPREFIX', 'http://wxorder.fst1994.cn', '2020-12-04 07:11:53', '2020-12-04 07:11:53');
