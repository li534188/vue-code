<template>
  <div class="content">
    <header>
      {{ticketNumber}}
    </header>
    <a-spin :spinning='showLoading' class="spin-position">
      <template v-slot:indicator>
        <loading-outlined style="font-size: 24px" spin />
      </template>
    </a-spin>
    <section  class="content-details">
      <a-row class="list-style" v-for="(val, key, index) in employeeInfo" :key="index">
        <a-col  :span="8">
          <span class="details-lable">{{`${key} :`}}</span>
        </a-col>
        <a-col  :span="16">
          <span class="details-content">{{val}}</span>
          <span class="template-exit" v-show="key === 'Job Title'">{{hasTemplate?'Template Exists!':'Template Does Not Exist!'}}</span>
        </a-col>
      </a-row>
      <a-button @click="createHrissue" :disabled="!hasTemplate" :class="[hasTemplate?'create-button':'no-create',]">
        Auto-Create
      </a-button>
    </section>
    <div v-show="hasTemplate" class="content-divider">
      <span class="divider-info">Creating tickets and Confluence page for Employee B…  </span>
      <div class="content-progress">
        <div>50%</div>
        <a-progress class="content-process" strokeColor="#3aca60" :percent="50" size="small" :showInfo="false" status="active" />
      </div>
    </div>
    <section v-if="hasTemplate" class="content-list">
      <a-tabs v-model="activeKey">
        <a-tab-pane key="1">
          <template v-slot:tab>
            <span>
              <apple-outlined />
              Access Tickets
            </span>
          </template>
          <employee-content-tab :datas="datas"/>
        </a-tab-pane>
        <a-tab-pane key="2">
          <template v-slot:tab>
            <span>
              <android-outlined />
              SOP Tickets
            </span>
          </template>
          <employee-content-tab :datas="datas"/>
        </a-tab-pane>
      </a-tabs>
    </section>
    <section v-else>
      <div class="create-template">
        <div class="create-text">
          Template does not exist.
        </div>
        <a-button @click="jumpToTemplate" class="create-button new-template">
          Create New Template
        </a-button>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
interface InfoType{
  title: string;
  value: string;
}

import { Options, Vue, } from 'vue-class-component';
import { RedoOutlined, CheckCircleOutlined, LoadingOutlined  } from '@ant-design/icons-vue';
import EmployeeContentTab from './EmployeeContentTab.vue';
import { HRIssueModule } from '@/store/modules/hrissue';
@Options({
  components: {
    RedoOutlined,
    CheckCircleOutlined,
    LoadingOutlined,
    EmployeeContentTab
  },
})
export default class EmployeeContent extends Vue {
  private ridaoValue = '1';
  private activeKey = '1';
  private showLoading = false;
  private ticketNumber = ''
  private hasTemplate = false;

  get employeeInfo() {
    this.showLoading = true;
    setTimeout(() => {
      this.showLoading = false;
    }, 500);
    const { employeeInfo } = HRIssueModule;
    this.ticketNumber = employeeInfo.issue_number;
    const issueInfo = { Name: employeeInfo.name,
      'Perfered Name': employeeInfo.preferred_full_name,
      'Job Title': employeeInfo.job_title,
      Company: employeeInfo.company,
      Location: employeeInfo.location,
      department: employeeInfo.Department,
      'Start Date': employeeInfo.start_date,
      Manager: employeeInfo.manager,
    };
    return issueInfo;
  }

  private jumpToTemplate() {
    this.$router.push('/hrissue/template/detail/create');
  }

  private datas: {title: string; status: boolean}[] = [
    {
      title: 'Ant Design Title 1',
      status: true,
    },
    {
      title: 'Ant Design Title 2',
      status: false,
    },
    {
      title: 'Ant Design Title 3',
      status: true,
    },
    {
      title: 'Ant Design Title 4',
      status: false,
    },
  ];

  private createHrissue() {
    console.log('9999999');
  }
}

</script>
<style lang="scss" scoped>
    .content{
      height: 100%;
      margin-left: 40px;
      font-family: HelveticaNeue;
      position: relative;
      font-size: 12px;
      padding-right:34px;
      .spin-position{
        position: absolute;
        top: 20%;
        left: 25%;
      }
      header{
          color: #2063d1;
          font-size: 14px;
          line-height: 24px;
          margin-left: -2rem;
      }
      .content-details{
        height: 249px;
        line-height: 1.8rem;
        .template-exit{
          margin-left: 10px;
          color: #c377f0;
          cursor: pointer;
        }
        .list-style{
          line-height: 25px;
        }
      }
      .create-button{
        height: 15px;
        line-height: 15px;
        font-size: 10px;
        border: 1px solid orange!important;
        color: orange!important;
        font-size: 9px;
        margin: 10px 0 20px 0;
        &.new-template{
          margin-top: 3rem;
        }
      }
      .no-create{
        height: 15px;
        line-height: 15px;
        font-size: 9px;
        margin: 10px 0 20px 0;
      }
      .content-divider{
        height: 50px;
        border-top: 2px solid rgba($color: #000000, $alpha: .1);
        border-bottom: 2px solid rgba($color: #000000, $alpha: .1);
        color: #5d656f;
        display: flex;
        justify-content: center;
        align-items: center;
        .divider-info{
          width: 300px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-style: italic;
          font-size: 12px;
          font-weight: 100;
          opacity: 0.8;
          letter-spacing: 0.5px;
          color: #5d656f
        }
        span{
          line-height: 3rem;
          margin-right: 2rem;
        }
      }
      .content-progress{
        // width: 20%;
        flex: 0 0 120px;
        flex-direction: column;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .details-lable{
        color: #5d656f;
      }
      .details-content{
        color: #000000;
      }
      .create-template{
        border-top: 2px solid rgba($color: #000000, $alpha: .1);
        display: flex;
        align-items: center;
        flex-direction: column;
        .create-text{
          margin-top: 10%;
          color: #5d656f;
        }
      }
    }
</style>