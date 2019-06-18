<template>
  <div class="home">
    <div class="container">
      <p class="title">米修在线</p>
      <p class="make">专注于线上教育，用心做课程，用心做服务</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.home {
  background-color: #324057;
  padding-left: 15%;
  width: 85%;
  height: 100%;
  background-image: url('../assets/index.jpg');
  background-size: cover
}
.home .container{
  width: 100%;
  height: 100%;
  padding-top: 100px;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.7);
  text-align: center;
  color: #fff
}
.home .container .title{
  font-size: 30px;
}
.home .container .make{
  font-size: 22px;
  margin-top: 50px;
}
</style>
