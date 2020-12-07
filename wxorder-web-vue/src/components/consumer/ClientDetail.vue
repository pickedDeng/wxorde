<template>
  <div class="det_con">
    <div class="det_hea" @click="backTo">
      <img src="../../assets/serve/jiantou.png" alt="" srcset="" />
      <p>工单详情</p>
    </div>
    <div class="det_cad" v-if="historyList.length > 0">
      <van-steps direction="vertical" :active="-1" active-color="#027FFF">
        <van-step v-for="item in historyList" :key="item.id">
          <h3>{{ item.sendType }}</h3>
          <p><b>{{ item.sendPeople }}</b> &nbsp;&nbsp;&nbsp;分发到：&nbsp;&nbsp;&nbsp;<b>{{ item.besendPeople }}</b></p>
          <p></p>
          <p>{{ item.createdAt }}</p>
        </van-step>
      </van-steps>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      btnLoading: false,
      historyList: [],
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    backTo() {
      this.$router.push(`/form?backflag=true`);
    },
    //根据id获取历史记录
    getDetail() {
      const { id } = this.$route.query;
      this.$http.get(`order/lookOrderList?id=${id}`).then((res) => {
        if (res.data.code === 10000) {
          this.historyList = res.data.data;
        } else {
          this.Toast("获取操作历史失败");
        }
      });
    },
  },
};
</script>
<style>
.pop_cad .van-cell__value {
  text-align: left;
}
</style>
<style lang="less" scoped>
.det_con {
  background: #f0f1f6;
  padding-bottom: 10vw;
  .det_hea {
    height: 143px;
    background: url("../../assets/serve/hisbg.png");
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    img {
      position: absolute;
      top: 36px;
      left: 10px;
      width: 22px;
      height: 22px;
    }
    p {
      position: absolute;
      top: 36px;
      left: 50%;
      transform: translate(-50%);
      color: #fff;
      font-size: 19px;
    }
  }
  .det_cad {
    width: 85vw;
    padding: 10px 15px;
    margin: -50px auto 0;
    background: #fff;
    border-radius: 8px;
    position: relative;
    // z-index: 3;
    .cad_hea {
      display: flex;
      justify-content: space-between;
      span {
        color: #3697fa;
      }
    }
    p {
      margin: 3px 0;
    }
  }
}
</style>