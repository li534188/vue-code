<template>
  <a-form :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
    <div>
      <a-checkbox-group style="width:100%" v-model:value="form.type">
        <a-row class="list-style">
          <a-col class="item-style" span="6" v-for="(item,index) in checkData" :key="index" >
            <a-checkbox :value="item" >
              {{item}}
            </a-checkbox>
          </a-col>
        </a-row>
      </a-checkbox-group>
    </div>
  </a-form>
</template>
<script lang="ts">
import { Vue } from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
export default class Access extends Vue {

  private labelCol = { span: 4 };
  private wrapperCol =  { span: 14 };
  private form = {
    name: '',
    region: undefined,
    date1: undefined,
    delivery: false,
    type: ['item16', 'item17'],
    resource: '',
    desc: '',
  };
  private radioData = [
    'Print',
    'Bindery',
    'Fulfillment/HW',
    'Leadership',
    'Shipping/Receiving'
  ];
  private checkData = [
    'item6xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'item7', 'item8', 'item9', 'item10',
    'item16', 'item17', 'item18', 'item19', 'item110',
    'item26', 'item27', 'item28', 'item29', 'item210',
    'item36', 'item37', 'item38', 'item39', 'item310',
    'item46', 'item47', 'item48', 'item49', 'item410',
    'item66', 'item57', 'item58', 'item59', 'item510',
  ]



  mounted() {
    console.log(9999999);
  }


  @Watch('form.item0')
  private onItemChange(value: {}) {
    console.log(value);
    console.log(this.form);
  }

  @Watch('form.type', { deep: true })
  private handel(val: string) {
    console.log(val);
  }

  @Watch('form.resource', { deep: true })
  private handel2(val: string) {
    console.log(val);
  }

}
</script>
<style lang="scss">
  .list-style{
    line-height: 2.5rem;
    .item-style{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .ant-checkbox{
      transform: scale(0.8);
    }
    .ant-checkbox-wrapper{
      font-size: 12px;
    }
  }
</style>
