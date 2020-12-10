<template>

  <table class="auto-table" :style="{width:tableStyle.width,}">
    <tr class="tr-style tr-header">
      <th style="width:20px">
        <a-checkbox class="special-box" @change="selectAll($event)"  value="all"/>
      </th>
      <th :style="{width:item.width}" class="th-title" v-for="(item) in colums" :key="item.dataIndex">
        <span>{{item.title}}</span>
        <down-outlined @click="sortData(item.sortMethod)" class="th-icon" v-if="item.showSort" />
        <filter-outlined :style="{color:(valueInput[item.dataIndex]&&(valueInput[item.dataIndex].length > 0)?'#6AA0FF':'')}" @click.stop="filterData(item.dataIndex, item)" class="th-icon" v-if="item.showFilter" />
        <div class="filter-search"  @click.stop="" v-if="showFilterSearch === item.dataIndex">
          <a-tooltip :trigger="['hover']" placement="topLeft" overlay-class-name="numeric-input">
            <template v-if="valueInput[item.dataIndex]" #title>
              <span class="numeric-input-title">
                {{ valueInput[item.dataIndex] }}
              </span>
            </template>
            <a-input class="filter-input" v-model:value="valueInput[item.dataIndex]" placeholder="Search">
              <template #prefix> <search-outlined /></template>
              <template #suffix>
                <close-circle-filled @click.stop="clearFilterData(item.dataIndex)" class="th-icon" v-if="valueInput[item.dataIndex]&&(valueInput[item.dataIndex].length > 0)" />
              </template>
            </a-input>
          </a-tooltip>
          <div v-if="(showFilterSearch === item.dataIndex)&&showManagerPrompt" class="prompt-wrapper">
            <a-checkbox-group v-model:value="chooseSearchList[item.dataIndex]" :options="item.filterData" @change="chooseListChange"/>
          </div>
        </div>
      </th>
    </tr>
    <div class="spin-wrapper">
      <a-spin :spinning='showLoading' class="spin-position">
        <template v-slot:indicator>
          <loading-outlined style="font-size: 35px" spin />
        </template>
      </a-spin>
    </div>
    <tr v-show="!showLoading" class="tr-style tr-body" v-for="item in thisTableData" :key="item.template_id">
      <td>
        <a-checkbox class="special-box" :checked="itemInArr(item.id||item.template_id)"  @change="selectOne($event)" :value="item.id||item.template_id"/>
      </td>
      <td class="td-style" v-for="tableItem in tableStructure" :key="tableItem.dataIndex">
        <span :title="item[tableItem.dataIndex]" v-if="!tableItem.showText">{{item[tableItem.dataIndex]}}</span>
        <slot :name="tableItem.dataIndex" :text="item[tableItem.dataIndex]" />
      </td>
    </tr>
  </table>
</template>
<script lang="ts">
interface ColumsType {
    title: string;
    showSort: boolean;
    dataIndex: string;
    showText: boolean;
}
interface ChooseListObject{
  [key: string]: string[];
}
import { Vue, Options } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { DownOutlined, FilterOutlined, SearchOutlined, CloseCircleFilled, LoadingOutlined } from '@ant-design/icons-vue';
@Options({
  components: {
    DownOutlined,
    FilterOutlined,
    SearchOutlined,
    CloseCircleFilled,
    LoadingOutlined
  },
})
export default class AutoTable extends Vue {
    @Prop({ required: true }) private colums!: ColumsType[]
    // 所有数据
    @Prop({ required: true }) private tableData!: any[]
    @Prop({ required: true }) private tableStyle!: {}
    // 是头部checkbox选择列表
    @Prop() private changeSearchValue!: any;
    // 头部过滤器
    @Prop() private serachInput!: {};
    // 头部过滤器
    @Prop() private showLoading!: {};
    private thisSelectIds: string[] = [];
    private showFilterSearch  = '';
    private valueInput: any = {}
    // 展示搜索框
    private showManagerPrompt = false;
    // 搜索框对应数据
    private filterSearchList: string[] = [];
    // 选中的数据
    private chooseSearchList: ChooseListObject = {};

    mounted() {
      this.thisTableData = this.tableData;
      window.addEventListener('click', this.onloadClick);
    }

    @Watch('$route')
    private routeChange() {
      window.removeEventListener('click', this.onloadClick);
    }

    private onloadClick() {
      this.showFilterSearch = '';
      this.showManagerPrompt = false;

    }

    @Watch('showManagerPrompt')
    private getNewData(value: boolean) {
      if (!value)
        this.changeSearchValue(this.valueInput);
    }

    get tableStructure() {
      const structure: {dataIndex: string;showText: boolean}[] = [];
      this.colums.map(item => {
        structure.push({ dataIndex: item.dataIndex, showText: item.showText });
      });
      return structure;
    }

    get thisTableData() {
      return this.tableData;
    }

    set thisTableData(value: any) {
      this.$emit('update:tableData', value);
    }

    private sortData(method: any) {
      if (!method) {
        return;
      }
      const newData = JSON.parse(JSON.stringify(this.tableData));
      const res = this.sort(newData, method);
      this.thisTableData(res);
    }

    // 采用冒泡排序和传递的方法进行排序
    private sort(element: any[], method: any) {
      for (let i = 0; i<element.length-1; i++) {
        for (let j = 0; j<element.length-i-1; j++) {
          if (method(element[j], element[j+1])) {
            const swap = element[j];
            element[j] = element[j+1];
            element[j+1] = swap;
          }
        }
      }
      return element;
    }

    private selectAll(e: any) {
      const { target: { checked }} = e;
      if (checked) {
        const selectIds = this.tableData.map(item => {
          return item.id||item.template_id;
        });
        this.thisSelectIds = selectIds;
      } else {
        this.thisSelectIds = [];
      }
    }

    private selectOne(e: any) {
      const { target: { checked, value }} = e;
      if (!value) {
        return;
      }
      if (checked) {
        this.thisSelectIds.push(value);
      } else {
        const arr = this.thisSelectIds.filter(item => {
          return item !== value;
        });
        this.thisSelectIds = arr;
      }
    }

    @Watch('thisSelectIds')
    private whenSelectChange(value: any[]) {
      this.$emit('update:selectIds', value);
    }

    // @Watch('deepValueInput', { deep: true })
    // private whenInputValueChange(newValue: any, oldValue: any) {
    //   console.log('fffffffffff');
    //   console.log(this.valueInput);
    //   console.log(newValue, oldValue);
    //   for (const key in newValue) {
    //     if (newValue[key] !== oldValue[key]) {
    //       this.filterSearchList = [];
    //     }
    //   }
    // }

    // get deepValueInput() {
    //   return { ...this.valueInput };
    // }

    private itemInArr(value: string) {
      return this.thisSelectIds.some(item => item === value);
    }

    private filterData(dataIndex: string,) {
      this.showFilterSearch = dataIndex;
      this.showManagerPrompt = true;
    }

    private chooseListChange(value: string[]) {
      console.log('ffffffff');
      console.log('777777');
      console.log(value);
      if (value.length > 0) {
        const selectValue = value.reduce((pre, cur, index, arr) => {
          console.log(index, arr);
          return `${pre},${cur}`;
        });
        this.valueInput[this.showFilterSearch] = selectValue;
      } else {
        this.valueInput[this.showFilterSearch] = '';
      }
    }

    private clearFilterData(index: string) {
      this.valueInput[index] = '';
      this.chooseSearchList[index] = [];
    }


}
</script>
<style lang="scss">
    .spin-wrapper{
      position: absolute;
      top:40%;
      left: 55%;
    }
    .tr-style{
        border-bottom: solid 1px rgba(0, 0, 0, 0.06);
        height: 24px;
        line-height: 24px;
        font-size: 11px;
        color: #5d656f;
        &.tr-header{
            font-size: 12px;
            font-weight: bold;
            .th-icon{
                font-size: 10px;
                margin-left: 8px;
            }
        }
        &.tr-body:hover{
            background-color: #eceff1;
        }
    }
    .td-style{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .auto-table{
        table-layout: fixed;
        font-family: 'HelveticaNeue';
    }
    .special-box{
        transform: scale(0.8);
    }
    .th-title{
      position: relative;
      .filter-search{
        position: absolute;
        .prompt-wrapper{
          width: 122px;
          height: 158px;
          margin: 1px 0 0;
          padding: 0 0 1px;
          border-radius: 8px;
          overflow: scroll;
          background-color: #fff;
          z-index: 9;
          .ant-checkbox{
            transform: scale(0.7);
          }
          .ant-checkbox-wrapper{
            width: 80%;
            margin-left: 5px;
            font-size: 10px;
            font-weight: normal;
            color: #3b4859;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .filter-input{
          width: 122px;
          line-height: 26px;
          input{
            height: 26px;
            font-size: 12px;
          }
        }
      }
    }
</style>
