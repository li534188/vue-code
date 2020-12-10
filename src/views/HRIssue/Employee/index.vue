<template>
  <div class="issue-wrapper">
    <div class="left-content">
      <employee-header />
    </div>
    <div class="divider"/>
    <div class="right-content">
      <employee-content />
    </div>

  </div>
</template>
<script lang="ts">
interface InfoType{
  title: string;
  value: string;
}
import { Options, Vue, } from 'vue-class-component';
import EmployeeHeader from './EmployeeHeader.vue';
import EmployeeContent from './EmployeeContent.vue';
import { RedoOutlined, CheckCircleOutlined } from '@ant-design/icons-vue';
// import { HRIssueModule } from '@/store/modules/hrissue';
@Options({
  components: {
    RedoOutlined,
    CheckCircleOutlined,
    EmployeeHeader,
    EmployeeContent
  },
})
export default class Employee extends Vue {
  private ridaoValue = '1';
  mounted() {
    // HRIssueModule.asyncGetIssueList();
  }
}

</script>
<style lang="scss" scoped>
  .issue-wrapper{
    width: 100%;
    height: 100%;
    padding-top: 1%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    .left-content{
      flex: 1 1 254px;
    }
    .right-content{
      flex: 1 1 80%;
    }
    .divider{
      border: 1px solid rgba($color: #000000, $alpha: .1);
      float: left;
      height: 85%;
    }
  }
</style>>