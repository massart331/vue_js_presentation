<template lang="pug">
  div.product-card
    .product-card-image
      v-image.image(:image-source="image")
    .product-card-info
      .product-card-title
        .product-card-title-delivery_days
          strong Lev.tid:&nbsp;
          span {{ vehicle.delivery_days_count }} dagar
        .product-card-title-name {{ vehicle.brand }} {{ vehicle.model }}
      .product-card-description
        strong {{ vehicle.grade }}:&nbsp;
        span {{ vehicle.name }}
      .product-card-price
        .product-card-price__text
          span.num {{ price }}
          span.mes kr/mån
        a.btn.btn_og.f-w-500.btn-hover(href="#") Beställ
</template>

<script>
  import VImage from '@/components/helps/Image'
  import {vehicleLoverPrice} from '@/common/vehicle'

  export default {
    props: {
      vehicle: {}
    },
    computed: {
      image() {
        let image = ''
        if (this.vehicle.modelColors) {
          let defaultModelColor = this.vehicle.modelColors.data.find(modelColor => modelColor.default)
          image = defaultModelColor ? defaultModelColor.image.url : this.vehicle.images ? this.vehicle.images.data[0].url : ''
        }

        return image
      },
      price() {
        return vehicleLoverPrice(this.vehicle.fixedCosts)
      },
    },
    components: {
      VImage
    }
  }
</script>

<style lang="sass">
  .product-card
    margin-bottom: 30px
    border-radius: 3px
    transition: all 0.4s
    color: #414141
    display: block
    border: 2px solid transparent
    &:hover
      border-color: #EDEDED
      color: #414141
      text-decoration: none
    &-image
      height: 180px
      overflow: hidden
      display: flex
      align-items: center
      justify-content: center
    &-info
      padding: 14px 10px
      background: #eaeaea
    &-title
      display: flex
      flex-direction: column
      justify-content: space-between
      margin-bottom: 10px
      &-name
        color: #4a4a4a
        font-size: 1.4rem
        line-height: 1
        font-weight: 700
      &-delivery_days
        display: flex
        align-items: center
        font-size: 0.75rem
    &-description
      margin-bottom: 10px
      line-height: 1.4em
      min-height: 2.8em
      font-size: 0.75rem
    &-price
      display: flex
      height: 40px
      width: auto
      &__text
        flex: 1
        display: flex
        align-items: baseline
        justify-content: flex-start
        padding: 10px
        background: #fff
        .num
          margin-right: 5px
          color: #47484a
          font-size: 1.4rem
          font-weight: 700
          line-height: 1
        .mes
          color: #959697
          line-height: 1
      .btn
        padding: 8px 20px
        border-radius: 0
</style>
