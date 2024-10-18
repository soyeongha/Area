<template>
  <div>
    <AreaHeader />
    
    <!-- 햄버거 메뉴 버튼 (작은 화면에서 사이드바 열기) -->
    <button class="hamburger-menu" @click="toggleSidebar">
      &#9776;
    </button>

    <!-- 사이드바 -->
    <div class="sidebar" :class="{ open: isSidebarOpen }">
      <h3 style="text-align: center;">월별 상태</h3>
      <ul>
        <li v-for="month in months" :key="month.id">
          <button style="font-size: 15px;"
            :disabled="month.status === '결제완료'"
            @click="handleMonthClick(month)"
            :class="month.status"
          >
            {{ month.name }}
          </button>
          <span>{{ month.status }}</span>
        </li>
      </ul>
    </div>

    <!-- 메인 영역 -->
    <div class="main-content">
      <h1 style="font-size: 24px;">
        <button @click="previousYear">◀</button>
        {{ currentYear }}년 구역 관리
        <button @click="nextYear">▶</button>
      </h1>
      <div id="use-area-table"></div> <!-- Tabulator 테이블 -->
    </div>

    <!-- 모달 -->
    <div v-if="showModal" class="modal">
      <p>{{ modalMessage }}</p>
      <button @click="closeModal">닫기</button>
    </div>
  </div>
</template>

<script>
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import 'tabulator-tables/dist/css/tabulator.min.css';
import areaData from '@/assets/areaData.json';
import monthsData from '@/assets/months.json';
import AreaHeader from '@/components/AreaHeader.vue';

export default {
  components: {
    AreaHeader
  },
  data() {
    return {
      areas: [],
      table: null,
      filterValue: '',
      currentYear: new Date().getFullYear(),
      months: [], // 월별 상태 정보
      showModal: false, // 모달 표시 여부
      modalMessage: "", // 모달 메시지
      isSidebarOpen: false // 사이드바 열림 상태를 관리하는 변수
    };
  },
  mounted() {
    this.areas = areaData.filter(area => area.active);
    this.initTable();
    this.originalMonths = JSON.parse(JSON.stringify(monthsData.months));
    this.updateMonthStatus();  // 현재 날짜 기준으로 월 상태 업데이트
  },
  methods: {
    initTable() {
      this.table = new Tabulator("#use-area-table", {
        data: this.areas,
        layout: "fitColumns",
        widthGrow: 1,
        columns: [
          { title: "ID", field: "id", width: 100 },
          { title: "구역명", field: "name", width: 100 },
          {
            title: "월별 관리",
            field: "months",
            formatter: () => {
              const months = [
                "1월", "2월", "3월", "4월", "5월", "6월",
                "7월", "8월", "9월", "10월", "11월", "12월"
              ];
              return months.map((month, index) => 
                `<button class="month-btn" data-month="${index + 1}">${month}</button>`
              ).join(' ');
            }
          },
        ],
        placeholder: "활성화된 구역이 없습니다.",
        autoColumns: false,
        movableColumns: true,
        responsiveLayout: "collapse",
      });

      // 테이블 셀 클릭 이벤트 처리
      document.addEventListener("click", (e) => {
        const target = e.target;
        if (target.classList.contains("month-btn")) {
          const month = target.getAttribute("data-month");
          this.navigateToSchedule(month);
        }
      });
    },
    
    handleMonthClick(month) {
      if (month.status === "결제완료") {
        // 결제 완료된 월일 경우 모달을 띄움
        this.modalMessage = `${month.name}은 결제완료되어 수정할 수 없습니다.`;
        this.showModal = true;
      } else if (month.status === "진행중") {
        // 진행중 상태일 경우에만 페이지 이동
        const monthNumber = month.id;
        this.$router.push({ 
          name: "AreaSchedule", 
          params: { year: this.currentYear, month: monthNumber },
        });
      }
    },
    
    closeModal() {
      this.showModal = false; // 모달 닫기
    },
    
    previousYear() {
      this.currentYear--; // 이전 년도로 변경
      this.updateMonthStatus(); // 월 상태 업데이트
    },
    
    nextYear() {
      this.currentYear++; // 다음 년도로 변경
      this.updateMonthStatus(); // 월 상태 업데이트
    },

    updateMonthStatus() {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1; // 현재 월

      this.months = this.originalMonths.map(month => {
        let status = "대기중"; // 기본 상태는 '대기중'
        if (this.currentYear < currentYear || (this.currentYear === currentYear && month.id < currentMonth)) {
          status = "결제완료"; // 과거 월은 '결제완료'
        } else if (this.currentYear === currentYear && month.id === currentMonth) {
          status = "진행중"; // 현재 월은 '진행중'
        }
        
        return {
          ...month,
          status: status
        };
      });
    },

    navigateToSchedule(month) {
      if (this.months[month - 1].status === "진행중") {
        this.$router.push({ name: 'AreaSchedule', params: { month } });
        this.$router.push(`/schedule/${month}`); // 선택된 월로 이동
      } else {
        this.modalMessage = `선택하신 ${month}월은 ${this.months[month - 1].status} 상태로 수정할 수 없습니다.`;
        this.showModal = true;
      }
    },
    
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;  // 사이드바 열림/닫힘 상태 전환
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
}

#use-area-table {
  width: 60%;
  margin-top: 30px;
  overflow-x: auto;
  text-align: center;
  margin: 20px auto;
}

button {
  margin: 5px;
}

.sidebar {
  padding: 20px;
  margin: 50px auto;
  float: left;
  background-color: #fffbfb;
  border: 1px solid #fffbfb;
  color: #090909;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 1000;
  transition: transform 0.1s ease;
}

.hamburger-menu {
  display: none;
}

/* 작은 화면에서 햄버거 메뉴와 사이드바를 설정 */
@media (max-width: 1000px) {
  .hamburger-menu {
    display: block;
    background: none;
    border: none;
    font-size: 30px;
    position: absolute;
    top: 70px;
    left: 15px;
    cursor: pointer;
    z-index: 2000;
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 250px;
    transform: translateX(-100%);
    z-index: 1000;
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .main-content {
    width: 100%; /* 작은 화면에서는 테이블이 화면 전체를 차지하도록 너비 설정 */
    margin-left: 0;
  }
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  color: #000;
  text-align: center;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.modal button {
  margin-top: 20px;
}
</style>
