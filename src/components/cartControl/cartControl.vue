<template>
  <div>
    <div class="cart-control-wrapper" ref="cartWrapper">
      <transition name="move">
        <span class="decrease move-transition" v-show="food.count">
          <span class="icon-remove_circle_outline inner" v-if="food.count" @click="decreaseCount"></span>
        </span>
      </transition>
      <span class="cont" v-if="food.count">{{food.count}}</span>
      <span class="icon-add_circle" @click="addCount"></span>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import bus from "../../bus.js"
export default {
  props: ["food"],
  methods: {
    addCount() {
      if (!this.food.count) {
        Vue.set(this.food, "count", 1);
      } else {
        this.food.count++;
      }
      bus.$emit('cart-add',this.$refs.cartWrapper);
    },
    decreaseCount() {
      if (this.food.count) {
        this.food.count--;
        
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.cart-control-wrapper {
  display: inline-block;
  span {
    line-height: 24px;
    display: inline-block;
    vertical-align: middle;
    &.move-transition {
      opacity: 1;
      transform: translate3d(0, 0, 0);
      transition: all 0.4s linear;
      .icon-remove_circle_outline {
        font-size: 24px;
        color: rgb(0, 160, 220);
        transform: rotate(0deg);
        transition: all 0.4s linear;
      }
      &.move-enter {
        opacity: 0;
        transform: translate3d(24px, 0, 0);
        .inner {
          transform: rotate(360deg);
        }
      }
    }

    &.icon-add_circle {
      font-size: 24px;
      color: rgb(0, 160, 220);
    }
    &.cont {
      font-size: 10px;
      color: rgb(147, 153, 159);
      width: 24px;
      text-align: center;
    }
  }
}
</style>