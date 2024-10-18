<template>
  <router-view /> <!-- 현재 활성화된 컴포넌트가 여기에 렌더링됨 -->

</template>

<script>


export default {
  name: 'App',
  
}
</script>

<style>
body {
  margin: 0; /* 페이지 전체 여백 제거 */
  padding: 0;
  overflow-x: hidden; /* 좌우 스크롤 방지 */

}
</style>
