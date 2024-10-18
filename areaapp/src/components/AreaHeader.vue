<template>
    <nav>
      <ul>
        <li class="logo-item">
        <router-link to="/">
          <img src="@/assets/logo.png" alt="로고" class="logo">
        </router-link>
        </li>
        <li><router-link to="/">홈</router-link></li>
        <li><router-link to="/AreaTable">구역 관리</router-link></li>
        <li><router-link to="/UseArea">구역 목록</router-link></li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'AreaHeader', // 컴포넌트 이름
  };
  </script>
  



<style scoped>
nav {
  width: 100%;
  padding:  20px 20px 15px 5px;
}

ul {
  display: flex; /* Flexbox로 수평 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 60px; /* 메뉴 간의 간격 */
  justify-content: flex-start; /* 메뉴를 왼쪽에 맞춰 정렬 */
}

/* 로고를 왼쪽에 배치하고 다른 메뉴와 간격 두기 */
.logo-item {
  margin-right: 7%; /* 로고와 나머지 메뉴 사이에 자동 간격 생성 */
  margin-left: 30px;
}

/* 로고 이미지 크기 설정 */
.logo {
  width: 80px; /* 로고 크기 */
  height: auto;
}

/* 일반 링크 스타일 (로고 제외) */
li:not(.logo-item) a {
  color: #181616;
  padding: 10px 20px;
  border-radius: 50px;
  text-decoration: none;
  transition: transform 0.3s ease, background-color 0.8s ease, box-shadow 0.3s ease;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

/* 일반 링크에만 호버 효과 적용 (로고는 제외) */
li:not(.logo-item) a:hover {
  background-color: #794ade;
  transform: scale(1.1);
  box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.2);
}
</style>
  