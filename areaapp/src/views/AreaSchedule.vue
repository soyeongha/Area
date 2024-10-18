<template>
    <div>
      <AreaHeader />
      <h2 style="text-align: center; margin: 50px; padding: 20px;">{{ currentMonth }}월 스케줄 관리</h2>
      <div id="schedule-table"></div> <!-- Tabulator 테이블 -->
    </div>
  </template>
  
  <script>
  import { TabulatorFull as Tabulator } from 'tabulator-tables'; // Tabulator 임포트
  import 'tabulator-tables/dist/css/tabulator.min.css'; // Tabulator 스타일 임포트
  import AreaHeader from '@/components/AreaHeader.vue';
  
  export default {
    components: {
      AreaHeader
    },
    data() {
      return {
        currentMonth: parseInt(this.$route.params.month), // 선택한 달
        users: [
          { name: 'admin', attendance: {} },
          { name: 'soyeong', attendance: {} },
          { name: 'kim', attendance: {} }
        ], // 사용자 목록 및 출석 데이터
        daysInMonth: [], // 해당 월의 일 수
        table: null, // Tabulator 테이블 인스턴스
      };
    },
    mounted() {
      this.daysInMonth = this.getDaysInMonth(this.currentMonth, new Date().getFullYear()); // 해당 월의 일 수 계산
      this.prepareUserAttendance(); // 사용자 출석 기본 값 설정
      this.initTable(); // Tabulator 테이블 초기화
    },
    methods: {
      // 월의 일수 계산 함수
      getDaysInMonth(month, year) {
        return Array.from({ length: new Date(year, month, 0).getDate() }, (_, i) => i + 1);
      },
      // 사용자 출석 기본 값 설정 함수
      prepareUserAttendance() {
        this.users = this.users.map(user => {
          this.daysInMonth.forEach(day => {
            user.attendance[day] = false; // 기본 값 false (출석 안 함)
          });
          return user;
        });
      },
      // Tabulator 테이블 초기화 함수
      initTable() {
        const columns = [
          { title: 'User', field: 'name', width: 150 },
          ...this.daysInMonth.map(day => ({
            title: `${day}일`,
            field: `attendance.${day}`,

            formatter: "tickCross", // 체크박스로 표시
            editor: true // 편집 가능
          }))
        ];
  
        this.table = new Tabulator("#schedule-table", {
          data: this.users,
          layout: "fitDataStretch",
          columns: columns,

          autoColumns: false,
        });
      }
    }
  };
  </script>
  
  <style scoped>
  #schedule-table {
    width: 95%;   /* 테이블의 너비를 100%로 지정 */
    margin-top: 20px;
    margin: 20px auto; /* 위쪽 여백 20px, 좌우 여백을 auto로 설정하여 중앙 정렬 */
    text-align: center;  /* 위쪽 여백 20px, 좌우 자동 여백으로 중앙 정렬 */
  }
  
  </style>
  