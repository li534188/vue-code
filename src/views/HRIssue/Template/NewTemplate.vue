<template>
  <div class="template-wrapper">
    <div class="template-title">
      <left-outlined @click="goBack" class="template-title-icon" />
      <span class="template-title-info">{{templateModel==='create'?'New Template':'test'}}</span>
      <span v-if="templateModel === 'edit'">
        <span v-if="allowEdit">
          <span><img  class='edit-img'  src='@/assets/img/pen.svg'></span>
          <span class='template-title-edit'>edit</span>
        </span>
        <span v-else>
          <span @click="enterEdit"><img  class='edit-img'  src='@/assets/img/penBlack.svg'></span>
          <delete-filled  @click="deleteTemplate" class="delete-icon"  />
        </span>
      </span>
    </div>
    <div class="form-wrapper">
      <section class="input-wrapper">
        <div class="input-lebal">Name</div>
        <a-input class="search-name" :disabled="!allowEdit" v-model:value="form.name" placeholder="Consultant" />
      </section>
      <section class="input-wrapper">
        <div class="input-lebal">Company</div>
        <a-select
          class="search-select"
          v-model:value="form.Company"
          placeholder="pleace select"
          :disabled="!allowEdit"
        >
          <a-select-option v-for="(item, index) in companyList" :key="index" :value="item">
            <div :class="'company-info-'+(index+1)">{{item}}</div>
          </a-select-option>
        </a-select>
      </section>
      <section class="input-wrapper search-manager-wrapper">
        <div class="input-lebal">Manager</div>
        <a-input class="search-manager" :disabled="!allowEdit" v-model:value="form.manager" placeholder="Manager">
          <template #prefix> <search-outlined /></template>
        </a-input>
        <div v-if="showManagerPrompt" class="prompt-wrapper">
          <div @click.stop="chooseManager(item,)" class="prompt-item" v-for="(item,) in managerList" :key="item">
            {{item}}
          </div>
        </div>
      </section>
    </div>

    <a-tabs>
      <a-tab-pane key="1">
        <template  v-slot:tab>
          <span class="tab-title">
            Access
          </span>
        </template>
        <access />
      </a-tab-pane>
      <a-tab-pane key="2">
        <template v-slot:tab>
          <span class="tab-title">
            Sop
          </span>
        </template>
        <sop />
      </a-tab-pane>
    </a-tabs>
    <div class="template-button-wrapper">
      <a-button v-if="templateModel==='edit'" class="auto-button template-buttons save">Save</a-button>
      <a-button v-if="templateModel==='edit'" class="auto-button template-buttons">Cancel</a-button>
      <a-button v-if="templateModel==='create'" class="auto-button template-buttons">Create</a-button>
    </div>
    <a-modal
      v-model:visible="visible"
      title="Are you sure to delete it?"
      ok-text="ok"
      cancel-text="cancal"
      class="special-modal"
      @ok="hideModal"
    >
      <p></p>
    </a-modal>
  </div>
</template>

<script lang="ts">
interface FormType{
  manager: string;
  company: string;
  name: string;
}


import { Options, Vue, } from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { SearchOutlined, LeftOutlined, DeleteFilled } from '@ant-design/icons-vue';
import * as _ from 'lodash';
import Sop from './Sop.vue';
import Access from './Access.vue';
@Options({
  components: {
    Sop,
    Access,
    SearchOutlined,
    LeftOutlined,
    DeleteFilled
  },
})
export default class NewTemplate extends Vue {
  private form: FormType = { manager: '', company: '', name: '' };
  private companyList = ['ALL', 'DAI', 'ODS', 'IBD', 'OCM', 'WON'];
  private managerList = ['good', 'greate', 'error', 'no', 'computer']
  private showManagerPrompt = false;
  private templateModel = 'create';
  private allowEdit = false;
  private visible = false;
  mounted() {
    // HRIssueModule.asyncGetIssueList();

    console.log(this.fb(10));

    this.templateModel = this.$route.params.type as string;
    if (this.templateModel ==='create') {
      this.allowEdit = true;
    } else {
      this.allowEdit = false;
    }
    document.addEventListener('click', () => {
      this.showManagerPrompt = false;
    });
  }

  @Watch('form.manager')
  private changeShow(value: string) {
    if (value) {
      this.showManagerPrompt = true;
      this.managerList = this.managerList.filter(item => item.indexOf(value)>-1);
    } else {
      this.showManagerPrompt = false;
      this.managerList = ['good', 'greate', 'error', 'no', 'computer'];
    }
  }

  @Watch('form.name')
  private watchName = _.debounce((value) => {
    console.log(value);
  }, 1000);


  @Watch('form')
  private watchForm(value: any) {
    console.log(value);
    console.log('999999999');
  }


  chooseManager(value: string,) {
    this.form.manager = value;
    setTimeout(() => {
      this.showManagerPrompt = false;
    }, 100);
  }

  goBack() {
    this.$router.go(-1);
  }

  private enterEdit() {
    this.allowEdit = true;
  }

  private deleteTemplate() {
    this.visible = true;
  }

  private hideModal() {
    console.log('删除数据');
    this.visible = false;
  }
  private fb(n: number): number {
    if (n <= 2) {
      return 1;
    } else {
      return this.fb(n-1) + this.fb(n-2);
    }
  }

}
</script>


<style lang="scss">
  $free-color: #e64856, #ff8c00, #47d040, #8864b8, #fff100, #36c2ef;
    @each $c in $free-color{
      $i:index($free-color,$c);
        .company-info-#{$i}::before{
          border: 2.5px $c solid;
          width: 12px;
          height: 12px;
          content:'';
          display: inline-block;
          border-radius: 50%;
          margin-right:5px
        }
    }
  h1{
    font-size: 30px;
  }
  .form-wrapper{
    font-family: HelveticaNeue;
    display: flex;
    font-size: 12px;
    input{
      font-size: 12px;
    }
    .input-lebal{
      height: 1.4rem;
      font-size: 12px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.5;
      letter-spacing: normal;
      color: #3b4859;
      margin-bottom: 10px;
    }
    .input-wrapper{
      margin-right: 3rem;
    }
    .search-name{
      width: 384px;
    }
    .search-select{
      width: 122px;
    }
    .search-manager-wrapper{
      position: relative;
      width: 122px;
      .prompt-wrapper{
        position: absolute;
        width: 122px;
        height: 158px;
        margin: 1px 0 0;
        padding: 0 0 1px;
        border-radius: 8px;
        overflow: scroll;
        background-color: #fff;
        z-index: 9;
        .prompt-item{
          line-height: 27px;
          color: #3b4859;
          padding-left: 5px;
          font-size: 1rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding-left: 15px;
          &:hover{
            background-color: #f1f5fc;
          }
        }
      }
    }
  }
  .special-modal{
    .ant-modal-header{
      border: unset;
      text-align: center;
    }
    .ant-modal-body{
      display: none;
    }
    .ant-modal-footer{
      border: unset;
    }
  }
  .template-wrapper{
    padding: 26px 38px;
    position: relative;
    height: 100%;
    .template-title-icon{
      cursor: pointer;
    }
    .template-title{
      font-size: 16px;
      margin-left: -20px;
      color: #6a778b;
      margin-bottom: 16px;
    }
    .template-title-info{
      margin: 0 10px 0 5px;
    }
    .template-title-edit{
      color: #f05107;
      margin: 0 6px;
      font-size: 10px;
      cursor: pointer;
    }
    .edit-img{
      width: 16px;
      height: 16px;
      margin-bottom: 3px;
      cursor: pointer;
    }
    .delete-icon{
      color: #000;
      margin: 0 6px;
      cursor: pointer;
    }
    .search{
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
      align-items: center;
      .search-input{
        flex:0 0 60%;
      }
      .search-tag{
        flex:0 0 auto;
        margin-left: 2rem;
      }
    }
    .tab-title{
      font-family: HelveticaNeue;
      color: #3b4859;
      font-size: 1.16rem;
    }
    .template-button-wrapper{
      float: right;
      margin-right: 100px;
      margin-top:20px;
      .template-buttons{
        height: 18px;
        line-height: 18px;
        font-size: 9px;
        &.save{
          margin-right: 10px;
        }
      }
    }
  }
</style>
