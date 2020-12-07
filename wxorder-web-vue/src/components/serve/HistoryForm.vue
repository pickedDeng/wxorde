<template>
  <div class="his_con">
    <div class="his_hea">
      <img
        src="../../assets/serve/jiantou.png"
        alt=""
        srcset=""
        @click="$router.go(-1)"
      />
      <p>历史工单</p>
    </div>
    <div class="his_cad">
      <div class="his_had">
        <div class="his_dat">
          <span>累计收到</span>
          <span>125</span>
        </div>
        <div class="his_lin"></div>
        <div class="his_dat">
          <span>已完结</span>
          <span>121</span>
        </div>
      </div>
      <div class="ser_cad" v-for="(item, index) in 3" :key="index">
        <img src="../../assets/serve/soft.png" alt="" srcset="" />
        <div class="ser_det">
          <span>郎网站xx</span>
          <span>类型：新增软件</span>
          <span>2020-11-23 12:34</span>
          <span
            >具体需求:
            1、麻烦xxxx</span
          >
        </div>
        <div class="ser_sta">已提交</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.his_con {
  background: #f0f1f6;
  //   padding: 0 3vw;
  .his_hea {
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
  .his_cad {
    width: 90vw;
    margin: -40px auto 0;
    position: relative;
  }
  .his_had {
    background: #fff;
    padding: 6px 0;
    display: flex;
    justify-content: space-around;
    .his_dat {
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        &:nth-child(1) {
          color: #b3b3b3;
        }
        &:nth-child(2) {
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
    .his_lin {
      border-right: 1px solid #d7d7d7;
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
        width: 56vw;
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
}
</style>