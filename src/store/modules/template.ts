import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import { post } from '@/utils/httpUtils';
import { LoadingModule } from './loading';
import store from '@/store';

export enum DeviceType {
  Mobile,
  Desktop,
}



export interface AppState {
  templateList: TemplateList[];
}

interface TemplateList {
    id: string;
    template_name: string;
    company: string;
    manager: string;
    creator: string;
    created_time: string;
    [key: string]: any;
};


@Module({ dynamic: true, store, name: 'template' })
export class Template extends VuexModule implements AppState {
  public templateList: TemplateList[] = [];

  @Mutation
  changeTemplateList(data: TemplateList[]){
      this.templateList = data;
  }

  @Action
  asyncChangeTemplateList() {
    LoadingModule.asyncChangeStatus(true);
    const data: {userName: string; password: string} = { userName: 'jason.yang', password: 'j3Pp4&C0' };
    post('/api/pending-issue', data).then(res => {
      LoadingModule.asyncChangeStatus(false);
      if (res) {
        this.changeTemplateList(res);
      }
    });
  }

}

export const TemplateModule = getModule(Template);
