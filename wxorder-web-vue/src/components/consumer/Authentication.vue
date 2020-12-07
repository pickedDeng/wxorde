<template>
  <div class="submitRegister" v-if="showFlag">
    <div class="aut_con"></div>
    <div class="aut_btm">
      <div class="aut_cad">
        <van-field
          v-model="wechatName"
          name="昵称"
          label="昵称"
          placeholder=""
          disabled
        />
        <van-field
          v-model="realname"
          name="姓名"
          label="姓名"
          required
          placeholder="请输入姓名"
        />
        <van-field
          v-model="phone"
          name="手机号"
          label="手机号"
          placeholder="请输入手机号"
        />
        <van-field
          readonly
          clickable
          name="picker"
          :value="customerName"
          label="单位"
          required
          placeholder="请选择您的单位"
          @click="showPicker = true"
        />

        <div style="margin: 30px 16px">
          <van-button
            round
            block
            type="info"
            native-type="submit"
            style="font-weight: 700; font-size: 18px"
            @click="customerRegister"
          >
            认证
          </van-button>
        </div>
      </div>
      <div class="aut_spn">
        <img src="../../assets/consumer/gantan.png" alt="" srcset="" />
        <div class="aut_fon">
          <p>仅第一次提交需要验证</p>
          <p>工单实名是为了技术对有疑惑的需求，能够更快捷的为您提供服务</p>
        </div>
      </div>
    </div>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      btnLoading: false, // 认证按钮加载状态
      realname: "",
      phone: "",
      wechatName: "",
      customerId: null,
      customerName: null,
      columns: [],
      showPicker: false,
      customerList: [],
      openId: "",
      showFlag: false,
    };
  },
  async created() {
    const wechatUser = localStorage.userInfo;
    
    if (!wechatUser) {
      if (location.href.indexOf("code") > 0) {
        // 有code
        try {
          const code = location.href.split("?code=")[1].split("&")[0];
          this.$http.get(`submitperson/getUserMsg?code=${code}`).then((res) => {
            console.log(res);
            if (res.data.code === 10000) {
              this.wechatName = res.data.data.nickname;
              this.openId = res.data.data.openid;
              this.isRegister(this.openId);
            } else {
              this.Toast("获取微信信息失败");
            }
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        const url = window.encodeURIComponent(`${this.webPrefix}`);
        console.log(this.APPID)
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.APPID}&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
      }
    }else{
      this.openId = JSON.parse(wechatUser).openId;
      this.isRegister(this.openId);
    }
  },
  mounted() {
    this.getCustomerList("");
  },
  methods: {
    //提交表单
    customerRegister() {
      if (!this.realname || !this.customerName) {
        this.Toast("请检查必填项是否填写");
      }
      const data = {
        wechatName: `${this.realname}(${this.wechatName})`,
        phone: this.phone,
        customerId: this.customerId,
        openId: this.openId,
      };
      this.$http.post("submitperson/manage", data).then((res) => {
        if (res.data.code === 10000) {
          this.Toast("操作成功");
          setTimeout(() => {
            this.$router.push("/form");
          }, 2000);
        } else {
          this.Toast(res.data.data.msg);
        }
      });
    },
    onConfirm(value) {
      this.customerName = value;
      this.customerList.forEach((value) => {
        if (value.name == this.customerName) {
          this.customerId = value.id;
          return;
        }
      });
      this.showPicker = false;
    },
    //获取客户单位列表
    getCustomerList(name) {
      this.$http.get(`customer/list?name=${name}`).then((res) => {
        if (res.data.code === 10000) {
          this.customerList = res.data.data;
          res.data.data.forEach((value) => {
            this.columns.push(value.name);
          });
        } else if (res.data.code == 40163) {
          //  code被用过
          const url = window.encodeURIComponent(`${this.webPrefix}`);
          window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.APPID}&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
        } else {
          this.Toast("获取客户单位失败");
        }
      });
    },
    //是否注册过
    isRegister(openId) {
      this.$http.get(`submitperson/isregister?openId=${openId}`).then((res) => {
        if (res.data.code === 10000) {
          // 注册过
          localStorage.submitId = res.data.data.id;
          this.$router.push("/form");
        } else {
          this.$router.push("/");
          this.showFlag = true;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.submitRegister {
}
.aut_con {
  height: 120px;
  background: url("../../assets/consumer/indexbg.png");
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
}
.aut_btm {
  position: relative;
  height: calc(100vh - 120px);
  background: #f0f1f6;
  padding: 0 3vw;
  .aut_cad {
    position: absolute;
    padding: 2vw 4vw 8vw;
    background: #fff;
    border-radius: 5px;
    width: 86vw;
    left: 50%;
    transform: translate(-50%);
    top: -25px;
    .inp_item {
      display: flex;
      align-items: center;
      margin: 25px 0;
      input {
        flex: 3;
        border: #ececec solid 1px;
        padding: 4px 0 4px 4px;
        border-radius: 3px;
      }
      input::-webkit-input-placeholder {
        color: #a7a7a7;
        font-size: 10px;
      }
      div {
        flex: 1;
        .spa_red {
          color: red;
        }
      }
    }
    .btn_wra {
      width: 80vw;
      height: 30px;
      margin: 40px auto 0;
      .btn_aut {
        width: 100%;
        height: 100%;
        font-size: 16px;
      }
    }
  }
  .aut_spn {
    position: absolute;
    bottom: 20px;
    display: flex;
    align-items: flex-start;
    .aut_fon {
      width: 86vw;
      margin: -2px 0 0 5px;
      p {
        color: #999;
        margin-bottom: 10px;
        font-size: 12px;
      }
    }
  }
}
</style>