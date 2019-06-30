import request from '../utils/request'
//import {getStore} from '../config/mUtils'

//上传
export const upload = data => request.post('/upload', data,true);

//查询文章列表
export const getArticleList = data => {
	const {pageSize,current} = data;
	return request.get(`/article/list?pageSize=${pageSize}&current=${current}`)
}

//新增文章
export const addArticle = data => request.post('/article/add', data);

//编辑文章
export const editArticle = data => request.post('/article/edit', data);

//删除文章
export const deleteArticle = data => {
	return request.post('/article/delete', data);
};
