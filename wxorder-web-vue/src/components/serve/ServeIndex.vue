<template>
  <div class="ser_con">
    <div class="tab">
      <div class="head_wrapper">
        <span
          @click="active = true"
          :class="{ head_font: true, head_border: active }"
          >待处理</span
        >
        <span
          @click="active = false"
          :class="{ head_font: true, head_border: !active }"
          >我的</span
        >
      </div>
    </div>
    <!-- 待处理工单 -->
    <div v-show="active">
      <div
        class="ser_cad"
        v-for="item in waitedOrderList"
        @click="$router.push(`/serveDetail?orderId=${item.id}`)"
        :key="item.id"
      >
        <img src="../../assets/serve/hardware.png" alt="" srcset="" />
        <div class="ser_det">
          <span>提交：{{ item.submitPeople }}</span>
          <span>类型：{{ item.orderType }}</span>
          <span>{{ item.createdAt }}</span>
          <span>具体需求: {{ item.needText }}</span>
        </div>
        <div class="ser_sta" v-if="item.handleState == 0">已提交</div>
        <div class="ingClass" v-if="item.handleState == 1">派单中...</div>
        <div class="finishedClass" v-if="item.handleState == 2">已完成</div>
        <div class="overClass" v-if="item.handleState == 3">已结单</div>
      </div>
    </div>

    <!-- 我的工单 -->
    <div v-show="!active" class="my_for">
      <div
        class="my_hea"
        v-if="wechatInfo"
        @click="$router.push('/staffregister')"
      >
        <img src="../../assets/serve/one.png" alt="" srcset="" />
        <div>
          <p>{{ wechatInfo.username }}</p>
        </div>
      </div>
      <div v-else class="my_hea">
        <div @click="$router.push('/staffregister')">
          <p>暂未授权</p>
        </div>
      </div>
      <!-- <div class="my_btn" @click="goToHistory">
        <img src="../../assets/serve/order.png" alt="" srcset="" />
        <span>历史工单</span>
      </div> -->
    </div>
    <div v-show="active" class="ser_sum" @click="goToFormSum">
      <img src="../../assets/serve/sum.png" alt="" />
      <span>结单</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: true,
      openId: null,
      waitedOrderList: [],
      wechatInfo: null,
    };
  },
  created() {
    const staffInfo = localStorage.staffInfo;
    if (!staffInfo) {
      if (location.href.indexOf("code") > 0) {
        // 有code
        try {
          const code = location.href.split("?code=")[1].split("&")[0];
          this.$http.get(`submitperson/getUserMsg?code=${code}`).then((res) => {
            console.log(res);
            if (res.data.code === 10000) {
              this.openId = res.data.data.openid;
              this.getWaitedOrder();
              this.$http
                .get(`staff/staffInfo?openId=${this.openId}`)
                .then((fnres) => {
                  if (fnres.data.code === 10000) {
                    localStorage.staffInfo = JSON.stringify(fnres.data.data);
                  }
                });
            } else {
              this.codeHandle();
            }
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        this.codeHandle();
      }
    } else {
      const openId = JSON.parse(staffInfo).openId;
      this.openId = openId;
      this.getWaitedOrder();
    }
  },
  mounted() {
    // 获取微信信息
    try {
      const info = JSON.parse(localStorage.staffInfo);
      this.wechatInfo = info;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    // 获取待处理工单
    getWaitedOrder() {
      this.$http
        .get(`order/staffOrderList?openId=${this.openId}`)
        .then((res) => {
          if (res.data.code === 10000) {
            this.waitedOrderList = res.data.data.rows;
          } else {
            this.Toast(res.data.msg);
          }
        });
    },
    // 进入历史工单页
    goToHistory() {
      this.$router.push({ path: "/historyForm" });
    },

    // 进入工单结算页
    goToFormSum() {
      this.$router.push({ path: "/finishedForm" });
    },
    // 员工获取code
    codeHandle() {
      const url = window.encodeURIComponent(
        `${this.webPrefix}/#/serveIndex?backFlag=true`
      );
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.APPID}&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
    },
  },
  beforeRouteEnter: (to, from, next) => {
    next((vm) => {
      const { backFlag } = to.query;
        if (backFlag) {
          vm.active = true;
        } else {
          vm.active = false;
        }
    });
  },
};
</script>

<style lang="less" scoped>
.ser_con {
  background: #f0f1f6;
  position: relative;
  padding: 0 3vw;
  .ingClass {
    color: orange;
  }
  .finishedClass {
    color: #0bd4a1;
  }
  .overClass {
    color: #e92322;
  }
  .tab {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f0f1f6;
    font-size: 16px;
    padding: 20px 0;
    .head_wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      width: 54vw;
      border-radius: 35px;
      .head_font {
        width: 100%;
        height: 36px;
        display: inline-block;
        border-radius: 18px;
        text-align: center;
        line-height: 36px;
      }
      .head_border {
        border: 1px solid#027FFF;
        background: #027fff;
        color: #fff;
      }
    }
    div {
      width: 100%;
      height: 100%;
    }
  }
  .ser_cad {
    padding: 4vw 3vw;
    display: flex;
    justify-content: space-between;
    background: #fff;
    img {
      width: 33px;
      height: 33px;
    }
    margin: 10px 0;
    .ser_det {
      display: flex;
      flex-direction: column;
      span {
        width: 60vw;
        color: #8c8c8c;
        margin-left: 1vw;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .ser_sta {
      color: #66aeff;
    }
  }
  .my_for {
    // width: 80vw;
    height: 300px;
    margin: 0 auto;
    background: #fff;
    border-radius: 10px;
    .my_hea {
      padding-bottom: 5px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ededed;
      span {
        display: inline-block;
        color: #bdbdbd;
        margin-top: 5px;
      }
    }
  }
  .my_btn {
    width: 130px;
    padding: 6px 0;
    margin: 90px auto 0;
    border-radius: 25px;
    background: linear-gradient(-35deg, #027fff, #3b99fa);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 20px;
      padding-right: 13px;
    }
  }
  .ser_sum {
    position: fixed;
    right: 0;
    bottom: 40px;
    width: 109px;
    height: 43px;
    background: #027fff;
    box-shadow: -9px 7px 24px 0px rgba(2, 127, 255, 0.33);
    border-radius: 44px 0px 0px 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      color: #fff;
      padding-left: 10px;
      font-size: 15px;
    }
    img {
      width: 20px;
    }
  }
}
</style>