<template>
  <div id="expectation">
    <img src="@/assets/images/expectation.png">
    <div style="
    width:100%;
    height: 15px;
    background-color: #CBD5CA;
    position: absolute;
    top: 754px;
    left: 0px">
    </div>
  </div>
</template>

<script>
  export default {
    name: "expectation"
  }
</script>

<style lang="scss" scoped>
  #expectation{
    background: url("../assets/images/bg-expectation.jpg");
    height: 100%;
    padding: 15% 40%;
    img{
    //3s 为转速 值越小 速度越快
    -webkit-transform: rotate(360deg);
    animation: rotation 8s linear infinite;
    -moz-animation: rotation 8s linear infinite;
    -webkit-animation: rotation 8s linear infinite;
    -o-animation: rotation 8s linear infinite;
    }
  }
</style>
