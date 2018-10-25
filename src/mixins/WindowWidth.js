export default {
  data: () => ({
    windowWidth: window.innerWidth
  }),
  mounted() {
    window.addEventListener('resize', this.onReSize)
  },
  methods: {
    onReSize(){
      this.windowWidth = window.innerWidth
    }
  }
}