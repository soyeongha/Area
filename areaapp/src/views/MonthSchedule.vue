<template>
    <div>
      <h2>{{ currentMonth }}월 스케줄 관리</h2>
  
      <!-- 사용자 추가를 위한 input 및 버튼 -->
      <div style="margin-bottom: 20px;">
        <input v-model="newTask" placeholder="새로운 Task 입력" />
        <select v-model="newStatus">
          <option value="완료">완료</option>
          <option value="대기">대기</option>
        </select>
        <button @click="addTask">추가</button>
      </div>
  
      <div id="schedule-table"></div>
    </div>
  </template>
  
  <script>
  import { TabulatorFull as Tabulator } from 'tabulator-tables';
  
  export default {
    data() {
      return {
        currentMonth: this.$route.params.month, // URL에서 월 정보를 가져옴
        table: null,
        newTask: '', // 새로운 Task의 이름을 저장할 변수
        newStatus: '대기', // 새로운 Task의 상태를 저장할 변수
      };
    },
    mounted() {
      this.initTable();
    },
    methods: {
      initTable() {
        this.table = new Tabulator("#schedule-table", {
          data: this.getMonthData(this.currentMonth), // 선택된 월 데이터를 가져옴
          layout: "fitColumns",
          columns: [
            { title: "ID", field: "id" },
            { title: "Task", field: "task" },
            { title: "Status", field: "status" },
          ],
        });
      },
      getMonthData(month) {
        // 각 월에 맞는 데이터를 리턴하는 함수
        const monthData = {
          1: [{ id: 1, task: 'Task 1', status: '완료' }],
          2: [{ id: 1, task: 'Task 2', status: '대기' }],
          // 나머지 월 데이터
        };
        return monthData[month] || [];
      },
      addTask() {
        // 사용자가 새로운 Task를 추가할 때 호출되는 함수
        if (this.newTask !== '') {
          const newRow = {
            id: this.table.getData().length + 1, // 현재 데이터 길이 + 1을 ID로 사용
            task: this.newTask,
            status: this.newStatus,
          };
          this.table.addRow(newRow); // 테이블에 새로운 행 추가
          this.newTask = ''; // 입력 필드 초기화
          this.newStatus = '대기'; // 상태 필드 초기화
        } else {
          alert("Task 이름을 입력하세요.");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  input, select {
    margin-right: 10px;
  }
  </style>
  