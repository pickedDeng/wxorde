<template>
  <div class="staffRegister">
    <img
        src="../../assets/serve/jiantou.png"
        alt=""
        srcset=""
        style="width:40px;height:40px;position:fixed;left:10px;top:20px"
        @click="$router.push('/serveIndex')"
      />
    <van-popover
      v-model="showPopover"
      :actions="actions"
      @select="onSelect"
      class="search_input"
    >
      <template #reference>
        <van-search
          v-model="value"
          shape="round"
          background="rgba(2, 127, 255,.1)"
          placeholder="输入搜索绑定"
          @focus="getStaffList()"
          @input="getStaffList()"
        />
      </template>
    </van-popover>

    <van-button color="#1989fa" round size="large" @click="sendOpenId"
      >点击授权</van-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      showPopover: false,
      actions: [],
      staffList: [],
      currentSelect: null,
      openId: null,
    };
  },

  created() {
    // alert(this.APPID)
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
            } else if (res.data.code == 40163) {
              //  code被用过
              this.codeHandle();
            } else {
              this.Toast("获取微信信息失败");
            }
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        this.codeHandle();
      }
    }
  },
  methods: {
    // 员工授权
    async sendOpenId() {
      // 授权
      if (!this.currentSelect) {
        this.Toast("请先输入搜索选择员工");
      } else {
        // 是否被绑定OPENID
        const isBind = await this.isExistOpenId();
        if (isBind) {
          // 已绑定
          this.Toast("该员工已绑定微信id");
        } else {
          // 发送注册
          const data = {
            id: this.currentSelect.id,
            openId: this.openId,
          };
          this.$http.post(`staff/update`, data).then((res) => {
            if (res.data.code === 10000) {
              this.Toast.success("授权成功");
            } else {
              this.Toast.fail("授权失败，刷新重试");
            }
          });
        }
      }
    },
    onSelect(action) {
      this.value = action.text;
      this.currentSelect = action;
    },
    codeHandle() {
      const url = window.encodeURIComponent(
        `${this.webPrefix}/#/staffregister`
      );
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.APPID}&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
    },
    getStaffList() {
      this.showPopover = true;
      this.$http
        .get(`staff/list?pid=1&psize=10&username=${this.value}`)
        .then((res) => {
          if (res.data.code === 10000) {
            const data = res.data.data.rows;
            const arr = [];
            if (data.length > 0) {
              this.staffList = data;
              data.forEach((value) => {
                arr.push({
                  text: value.username,
                  id: value.id,
                });
              });
            }
            this.actions = arr;
          }
        });
    },
    async isExistOpenId() {
      const res = await this.$http.get(
        `staff/isExistOpenId?id=${this.currentSelect.id}`
      );
      return res.data.data.isExist;
    },
  },
};
</script>

<style lang="less">
.staffRegister {
  background: url("../../assets/serve/hisbg.png") no-repeat;
  background-size: 100% auto;
  padding: 0 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .search_input {
    height: 60px;
    margin-top: 70px;
  }
}
</style>