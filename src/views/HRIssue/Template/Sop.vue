<template>
  <a-form :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item >
      <a-radio-group style="width:100%" v-model:value="selectRadio">
        <a-radio v-for="(item, key) in  allData" :key="key" :value="key" >
          {{key}}
        </a-radio>
      </a-radio-group>
    </a-form-item>
    <div v-for="(item, key, index) in  selectDatas" :key="key" >
      <a-row >
        <a-col :span="24">
          <h3>
            {{key}}
          </h3>
        </a-col>
      </a-row >
      <a-checkbox-group style="width:100%" v-model:value="form['item'+index]">
        <a-row class="list-style">
          <a-col class="item-style" :title="subItem" :span="6" v-for="(subItem, key) in  item" :key="key" >
            <a-checkbox  :value="subItem">
              {{subItem}}
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
export default class Sop extends Vue {

  private radioData = [
    'Print',
    'Bindery',
    'Fulfillment/HW',
    'Leadership',
    'Shipping/Receiving'
  ];

  private allData: { [key: string]: any } = {
    'Print': {
      Policies: ['No Touch Policy', 'One Touch Policy', 'Peer to Peer Policy'],
      'Other Documents': ['Tap Test Procedure', 'Centene Hand Bind Quality Assurance', 'Production Schedules', 'Automated Daily Shift Log'],
      'Work Instructions': ['Tap Test Procedure', 'Poor Quality of Centene NCR Form'],
      SOP: ['Diggle Saddle Stitch', 'item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7', 'item8', 'item9', 'item10', 'item11', 'item12', 'item13']
    },
    'Bindery': {
      Policies: ['test', 'One Touch Policy', 'Peer to Peer Policy'],
      'Other Documents': ['Tap Test Procedure', 'Centene Hand Bind Quality Assurance', 'Production Schedules', 'Automated Daily Shift Log'],
      'Work Instructions': ['Tap Test Procedure', 'Poor Quality of Centene NCR Form'],
      SOP: ['Diggle Saddle Stitch', 'item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7', 'item8', 'item9', 'item10', 'item11', 'item12', 'item13']
    },
    'Fulfiillment/HW': {
      Policies: ['test1', 'One Touch Policy', 'Peer to Peer Policy'],
      'Other Documents': ['Tap Test Procedure', 'Centene Hand Bind Quality Assurance', 'Production Schedules', 'Automated Daily Shift Log'],
      'Work Instructions': ['Tap Test Procedure', 'Poor Quality of Centene NCR Form'],
      SOP: ['Diggle Saddle Stitch', 'item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7', 'item8', 'item9', 'item10', 'item11', 'item12', 'item13']
    },
    'Leadership': {
      Policies: ['test2', 'One Touch Policy', 'Peer to Peer Policy'],
      'Other Documents': ['Tap Test Procedure', 'Centene Hand Bind Quality Assurance', 'Production Schedules', 'Automated Daily Shift Log'],
      'Work Instructions': ['Tap Test Procedure', 'Poor Quality of Centene NCR Form'],
      SOP: ['Diggle Saddle Stitch', 'item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7', 'item8', 'item9', 'item10', 'item11', 'item12', 'item13']
    },
    'Shipping/Receiving': {
      Policies: ['test3', 'One Touch Policy', 'Peer to Peer Policy'],
      'Other Documents': ['Tap Test Procedure', 'Centene Hand Bind Quality Assurance', 'Production Schedules', 'Automated Daily Shift Log'],
      'Work Instructions': ['Tap Test Procedure', 'Poor Quality of Centene NCR Form'],
      SOP: ['Diggle Saddle Stitch', 'item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7', 'item8', 'item9', 'item10', 'item11', 'item12', 'item13']
    },
  }

  private selectData = [];

  private checkData = [
    {
      title: 'Policies',
      data: [
        'item1', 'item2', 'item3', 'item4', 'item5',
      ]
    }, {
      title: 'Other Documents',
      data: [
        'item6', 'item7', 'item8', 'item9', 'item10',
      ]
    }, {
      title: 'Work Instructions',
      data: [
        'item11', 'item12', 'item13', 'item14', 'item15',
      ]
    },
  ]

  private selectRadio = '';

  private form = {};

  mounted() {
    console.log(99999);
    const obj: {count: number} = new Proxy({ count: 0 }, {
      get(target, propKey: string, receiver) {
        console.log(`getting ${propKey}!`);
        return Reflect.get(target, propKey, receiver);
      },
      set(target, propKey: string, value, receiver) {
        console.log(`setting ${propKey}!`);
        return Reflect.set(target, propKey, value, receiver);
      }
    });
    obj.count = 1;
    ++obj.count;
    Object.keys(this.allData).forEach((key) => {
      this.selectRadio = key;
      return;
    });
  }


  @Watch('form.item0')
  private onItemChange(value: {}) {
    console.log(value);
    console.log(this.form);
  }

  get selectDatas() {
    const data =  this.allData[this.selectRadio];
    return data;
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
}
    .ant-radio{
      transform: scale(0.9);
    }
    .ant-radio-wrapper{
      font-size: 12px;
    }
</style>