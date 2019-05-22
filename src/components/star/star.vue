<template>
  <div :class="starType">
    <span class="star-item" v-for="(item,index) in result" :key="index" :class="item"></span>
  </div>
</template>

<script>
const LENGTH = 5;
const ON_STAR = "on"; //  on 满星
const HALF_STAR = "half"; // half 半星
const OFF_STAR = "off"; // off 没有星星
export default {
  props: ["score", "size"],
  computed: {
    starType() {
      return "star-" + this.size;
    },
    result() {
      let result = [];
      let score = Math.floor(this.score * 2) / 2;
      let onlength = Math.floor(score);
      let halfstar = score - onlength;
      for (let i = 0; i < onlength; i++) {
        result.push(ON_STAR);
      }
      if (halfstar) {
        result.push(HALF_STAR);
      }
      // 灰色星星
      var l = result.length;
      for (let i = 0; i < LENGTH - l; i++) {
        result.push(OFF_STAR);
      }
      return result;
    }
  }
};
</script>

<style lang="scss">
.star-48 {
  .star-item {
    width: 24px;
    height: 24px;
    display: inline-block;
    margin-right: 20px;
    background-repeat: no-repeat;
    background-size: 24px 24px;
    &:last-child {
      margin-right: 0;
    }
    &.on {
      background-image: url(./img/star48_on@2x.png);
    }
    &.half {
      background-image: url(./img/star48_half@2x.png);
    }
    &.off {
      background-image: url(./img/star48_off@2x.png);
    }
  }
}
.star-36 {
  .star-item {
    width: 18px;
    height: 18px;
    display: inline-block;
    margin-right: 6px;
    background-repeat: no-repeat;
    background-size: 18px 18px;
    &.on {
      background-image: url(./img/star36_on@2x.png);
    }
    &.half {
      background-image: url(./img/star36_half@2x.png);
    }
    &.off {
      background-image: url(./img/star36_off@2x.png);
    }
  }
}
.star-24 {
  .star-item {
    width: 12px;
    height: 12px;
    display: inline-block;
    margin-right: 3px;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    &.on {
      background-image: url(./img/star24_on@2x.png);
    }
    &.half {
      background-image: url(./img/star24_half@2x.png);
    }
    &.off {
      background-image: url(./img/star24_off@2x.png);
    }
  }
}
</style>