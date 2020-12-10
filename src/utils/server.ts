import { post, get } from './httpUtils';
import { message } from 'ant-design-vue';


export async function createHrIssue(data: { issueNumber: number }) {
  const res = await post('/api/template_list', data);
  if (res.statue === 'ok')
    return res.data;
  else
    message.error('Serve Error');
}

export async function searchTemplate(data: { jobTitle: string; company: string; manager: string }) {
  const res = await post('/api/search-template', data);
  return res;
}

export async function getCompanyList() {
  const res = await get('/api/list-company');
  return res;
}


export async function getManagerList() {
  const res = await get('/api/list-manager');
  return res;
}