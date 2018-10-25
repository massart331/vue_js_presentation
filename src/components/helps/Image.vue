<template lang="pug">
  .wrap-image(:class="imageState")
    pre-loader(:show="imageState === 'loading'" size="sm")
      img(:src="resultSrc" :class="imageClass" :alt="altText")
</template>

<script>
  export default {
    name: 'VImage',
    props: {
      imageSource: {
        type: String,
        required: true
      },
      imageClass: {
        type: String,
        required: false,
        default: ''
      },
      imageErrorCallback: {
        type: Function,
        required: false,
        default: function () {
        }
      },
      imageSuccessCallback: {
        type: Function,
        required: false,
        default: function () {
        }
      },
      altText: {
        type: String,
      }
    },
    data() {
      return {
        imageWidth: 0,
        imageHeight: 0,
        imageState: 'loading',
        asyncImage: new Image(),
        resultSrc: ''
      }
    },
    watch: {
      imageSource: function (n) {
        this.fetchImage(n)
      }
    },
    methods: {
      fetchImage() {
        this.imageState = 'loading';
        this.asyncImage.onload = this.imageOnLoad;
        this.asyncImage.onerror = this.imageOnError;
        this.asyncImage.src = this.imageSource
      },
      imageOnLoad() {
        this.imageState = 'loaded';
        this.imageWidth = this.asyncImage.naturalWidth;
        this.imageHeight = this.asyncImage.naturalHeight;
        this.resultSrc = this.asyncImage.src;
        this.imageSuccessCallback()
      },
      imageOnError() {
        this.imageState = 'error';
        this.imageErrorCallback()
      }
    },
    mounted() {
      this.$nextTick(() => this.fetchImage())
    },
  }
</script>
