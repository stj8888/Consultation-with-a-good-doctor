<script setup lang="ts">
const props= defineProps<{title:string; title2:string}>()
const emit = defineEmits(['cance','confirm'])
const cancel = () =>{
  emit('cance')
}
const confirm = () => {
  emit('confirm')
}
</script>
<template>
  <div class="paper">
    <div class="dialog">
      <h1>{{ props.title }}</h1>
      <h2>{{ props.title2 }}</h2>
      <div class="btn">
        <button @click="cancel">取消</button>
        <button style="color: red;" @click="confirm">确认</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.paper {
  .dialog {
    width: 350px;
    height: 150px;
    background-color: #ffffff;
    border-radius: 20px;
    position: relative;
    margin: 60% auto;
    opacity: 100;

    h1,
    h2 {
      text-align: center;
    }

    .btn {
      position: relative;
      bottom: -30px;

      button {
        background-color: aliceblue;
        border-radius: 10px;
        width: 100px;
        height: 50px;
        text-align: center;
      }

      display: flex;
      justify-content: space-around;
    }
  }

  position: fixed;
  top: 0;
  background-color: #494a4a;
  width: 100vw;
  height: 100vh;
  z-index:100;
  opacity: 0.9;
}</style>