<template>
  <div>
    <chat-component />
  </div>
</template>

<script>
export default {
  data() {
    return {
      //
    }
  },
  components: {
    'chat-component': () => import("@/components/ChatComponent.vue")
  }
}
</script>

<style>

</style>