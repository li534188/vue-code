<template>
  <div class="template-list-wrapper">
    <div class="template-title">
      <a-input class="template-search" v-model:value="searchInput" @change="searchList" placeholder="Search">
        <template #prefix> <search-outlined /></template>
      </a-input>
      <a-button @click="jumpToDetail" class="auto-button create-button">Create New Template</a-button>
    </div>
    <div  class="table-wrapper">
      <auto-table :showLoading="showLoading" :colums="colum" v-model:table-data="filterTableData" :tableStyle="tablestyle" v-model:selectIds="selectIds" :changeSearchValue="changeSearchValue">
        <template #job_title="{ text }">
          <a @click="openTemplate(text)" class="ticket-name">{{text}}</a>
        </template>
        <template #company="{ text }">
          <span :class="['company-clolr', text]">{{text}}</span>
        </template>
      </auto-table>
      <div class="bottom-button">
        <a-pagination size="small" defaultPageSize="20" :total="tableDatas&&tableDatas.length" v-model:current="currentPage" @change="changePageNumber" />
        <a-button v-if="selectIds&&(selectIds.length > 0)" class="auto-button delete-button">delete</a-button>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { Options, Vue, } from 'vue-class-component';
import { SearchOutlined, LeftOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import moment from 'moment';
import AutoTable from '@/components/AutoTable.vue';
import Sop from './Sop.vue';
import { searchTemplate, getCompanyList, getManagerList } from '@/utils/server';
import Access from './Access.vue';
import { Watch } from 'vue-property-decorator';
import * as _ from 'lodash';
@Options({
  components: {
    Sop,
    Access,
    SearchOutlined,
    LeftOutlined,
    AutoTable,
    LoadingOutlined
  },
})
export default class TemplateList extends Vue {

    private tablestyle= {
      width: '606px',
      height: '525px'
    }
    private selectIds = [];
    private companyList = [];
    private managerList = [];
    private searchInput = '';
    private currentPage = 1;
    private showLoading = false;
    get colum() {
      return  [
        {
          title: 'Template Name',
          dataIndex: 'job_title',
          width: '180px',
          showText: true,
          showSort: false,
        }, {
          title: 'Company',
          dataIndex: 'company',
          width: '110px',
          showText: true,
          showSort: false,
          showFilter: true,
          filterData: this.companyList,
          sortMethod: (a: any, b: any) => {
            return a.company > b.company;
          }
        }, {
          title: 'Manager',
          dataIndex: 'manager',
          width: '110px',
          showSort: true,
          showFilter: true,
          filterData: this.managerList,
        }, {
          title: 'Creator',
          dataIndex: 'creater',
          width: '110px',
          showSort: false,
        }, {
          title: 'Created Time',
          dataIndex: 'created_time',
          width: '110px',
          showSort: true,
          sortMethod: (a: any, b: any) => {
            return moment(a.time).isBefore(b.time);
          }
        },
      ];
    }

    private tableDatas: any = []

    private onChange(pagination: any, filters: any, sorter: any) {
      console.log('params', pagination, filters, sorter);
    }
    private openTemplate(value: string) {
      console.log(value);
      console.log(this.$route.path);
      this.$router.push('/hrissue/template/detail/edit');
    }

    @Watch('selectIds')
    private change(value: string[]) {
      console.log(value);
    }

    mounted() {
      searchTemplate({ jobTitle: '', manager: '', company: '' }).then((res) => {
        this.tableDatas = res;
      });

      getCompanyList().then(res => {
        this.companyList = res;
      });

      getManagerList().then(res => {
        this.managerList = res;
      });
    }

    private changeSearchValue(value: { [x: string]: string }) {
      this.showLoading = true;
      console.log(value);
      searchTemplate({ jobTitle: this.searchInput, manager: value.manager||'', company: value.company||'' }).then((res) => {
        this.showLoading = false;
        this.tableDatas = res;
      });
    }

    private jumpToDetail() {
      this.$router.push('/hrissue/template/detail/create');
    }

    private searchList =  _.debounce(() => {
      this.showLoading = true;
      searchTemplate({ jobTitle: this.searchInput, manager: '', company: '' }).then((res) => {
        this.showLoading = false;
        this.tableDatas = res;
      });
    }, 500);


    get filterTableData() {
      if (this.tableDatas.length>0) {
        if (this.tableDatas.length < 20) {
          return this.tableDatas;
        } else if (this.tableDatas.length > this.currentPage * 20) {
          return this.tableDatas.slice(this.currentPage===1?0: (this.currentPage-1)*20-1, this.currentPage * 20);
        } else if (this.tableDatas.length < this.currentPage * 20) {
          return this.tableDatas.slice(this.currentPage===1?0: (this.currentPage-1)*20, this.tableDatas.length);
        }
      } else {
        return [];
      }
      return [];
    }


}
</script>


<style lang="scss" scoped>
    .template-list-wrapper{
        padding: 39px 20px 0px 55px;
    }
    .template-search{
        width: 563px;
        border-radius: 3px;
        height: 28px;
        line-height: 28px;
    }
    .delete-button{
      height: 15px;
    }
    .template-title{
        margin-bottom: 35px;
        .create-button{
            height: 15px;
            line-height: 15px;
            margin-left: 5px;
        }
    }
    .template-list-table{
        .ant-table-thead > tr > th, .ant-table-tbody > tr > td{
            padding: unset!important;
        }
    }
    $colors:(
        (title:DAI, color:#ff8c00),
        (title:ODS, color:#47d040),
        (title:IBD, color:#8864b8),
        (title:OCM, color:#fff100),
        (title:WON, color:#36c2ef),
    );
    @each $c in $colors{
        .company-clolr.#{map-get($c, title)}::before{
            border-color:map-get($c, color);
        }
    }
    .company-clolr::before{
        border-width: 2.5px;
        border-style: solid;
        width: 12px;
        height: 12px;
        content:'';
        display: inline-block;
        border-radius: 50%;
        margin-right:5px;
    }
    .bottom-button{
      display: flex;
      justify-content: space-between;
      flex-direction: row-reverse;
      margin-right: 100px;
      margin-top: 20px;
    }
    .table-wrapper{
      height: 650px;
      overflow: hidden;
    }
</style>
