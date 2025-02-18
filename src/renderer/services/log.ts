import request from '@/utils/request';

// 获取更新内容
export async function GetLog() {
  try {
    const { body } = await request<
      {
        date: string;
        version: string;
        contents: string[];
      }[]
    >(`https://hook.1zilc.top/ff/blog`, {
      responseType: 'json',
    });
    return body;
  } catch (error) {
    return [];
  }
}
