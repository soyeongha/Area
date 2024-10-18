<template>
    <div>
        <AreaHeader/>
     <div class="main-box">
      <h2 style="padding: 20px;">구역 관리</h2>
      <div id="area-table"></div>
      <div style="margin-left: 100px;">
        <input v-model="newAreaName" placeholder="구역명을 입력하세요" />
        <label>
          <input type="checkbox" v-model="newAreaActive" />
          사용 여부
        </label>
        <button @click="addArea">구역 추가</button>
      </div>
    </div>
    </div>
  </template>
  
  <script>
  import { TabulatorFull as Tabulator } from 'tabulator-tables';
  import 'tabulator-tables/dist/css/tabulator.min.css';
  import areaData from '@/assets/areaData.json';  // JSON 데이터 불러오기
  import AreaHeader from '@/components/AreaHeader.vue';

  
  export default {
    components: {
        AreaHeader
    },
  data() {
    return {
      areas: [],  // 데이터를 나중에 JSON에서 로드
      table: null,
      newAreaName: '',  // 새로 추가할 구역명
      newAreaActive: false,  // 새로 추가할 구역의 사용 여부
    };
  },
  mounted() {
    this.areas = areaData;  // JSON 데이터를 사용
    this.initTable();
  },
  methods: {
    initTable() {
      this.table = new Tabulator("#area-table", {
        data: this.areas,
        layout: "fitColumns",
        widthGrow: 1,
        columns: [
          { title: "ID", field: "id", width: 100 }, // 고정 너비 지정
          { title: "구역명", field: "name", editor: "input" },
          {
            title: "사용 유무", width: 100,
            field: "active", 
            formatter: "tickCross", 
            editor: "tickCross"
          },
          {
            title: "수정", width: 100,
            formatter: () => "<button>수정</button>",
            cellClick: (e, cell) => {
              const area = cell.getRow().getData();
              this.editArea(area.id);
            },
          },
          {
            title: "삭제", width: 100,
            formatter: () => "<button>삭제</button>",
            cellClick: (e, cell) => {
              const area = cell.getRow().getData();
              if (!area.active) {
                this.deleteArea(area.id);
              } else {
                alert('사용 중인 구역은 삭제할 수 없습니다.');
              }
            },
          },
        ],
      });
    },
    addArea() {
      if (!this.newAreaName) {
        alert('구역명을 입력하세요.');
        return;
      }

      const newId = this.areas.length + 1;
      const newArea = { id: newId, name: this.newAreaName, active: this.newAreaActive };
      this.areas.push(newArea);
      this.table.addRow(newArea);

      // 입력 필드 초기화
      this.newAreaName = '';
      this.newAreaActive = false;
    },
    editArea(id) {
      const area = this.areas.find((area) => area.id === id);
      if (area) {
        const newName = prompt('구역명을 수정하세요:', area.name);
        if (newName) {
          area.name = newName;
          this.table.updateData([area]);
        }
      }
    },
    deleteArea(id) {
      this.table.deleteRow(id);
      this.areas = this.areas.filter((area) => area.id !== id);
    },
  },
};
</script>
  
  <style scoped>
  .main-box{
    text-align: center; 
    margin: 6px auto;
    border-radius: 10px;
    width: 100%;
    height: 625px;
    background-color: rgb(228, 235, 239);
    padding: 20px 0; /* 상하로 20px의 패딩 추가 */
    overflow: hidden; /* 스크롤이 생기지 않게 설정 */
    box-sizing: border-box; /* 패딩과 보더를 포함한 크기로 계산 */
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
  #area-table {
    width: 80%;   /* 테이블의 너비를 100%로 지정 */
    margin-top: 20px;
    margin: 20px auto; /* 위쪽 여백 20px, 좌우 여백을 auto로 설정하여 중앙 정렬 */
    text-align: center;  /* 위쪽 여백 20px, 좌우 자동 여백으로 중앙 정렬 */
  }
  button {
    margin-top: 10px;
  }
  </style>
  