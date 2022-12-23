import axios from "axios";
import { axiosErrorHandler } from "../modules/utils/axiosErrorHandler";
import { CategoryRecordType, CategoryTagRecordType, CategoryTagType } from "../redux/catReducer";
import { RuleRecordType, RuleType } from "../redux/ruleReducer";
import { TagRecordType } from "../redux/tagReducer";
import { ResultRecordType, TaskRecordType } from "../redux/taskReducer";
import { ThemeRecordType, ThemeType } from "../redux/themeReducer";
import { UserRecordType } from "../redux/userReducer";
import { FormDataLogType, FormDataMeUpdateType } from './../redux/appReducer'

const url = `http://127.0.0.1:8000/api/`;
const instance = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    // 'content-type': 'multipart/form-data' // do not forget this 
  },
});

instance.interceptors.request.use(
  (config) => {
    if (localStorage.access_token) {
      //@ts-ignore
      config.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`;
    }
    return config;
  },
  (error) => {
  }
);
instance.interceptors.response.use(
  (config) => {
    if (localStorage.access_token) {
      config.headers.authorization = `Bearer ${localStorage.access_token}`;
    }
    return config;
  },
  (error) => {
    if (error?.response?.status === 401) {
      if (localStorage.getItem('access_token')) {
        return instance.post("auth/refresh", {}, {
          headers: {
            'authorization': `Bearer ${localStorage.getItem('access_token')}`,
          }
        }).then((response) => {

          localStorage.setItem('access_token', response.data.access_token)
          error.config.headers.authorization = `Bearer ${response.data.access_token}`;
          return instance.request(error.config);
        });
      }
    }
    else if (error?.response?.data.message === 'The token has been blacklisted') {
      localStorage.removeItem('access_token')
      return Promise.reject(error)
    }
    return Promise.reject(error);
  }
);


export const api = {
  register: function (formData: Object) {
    return instance.post("auth/register", { ...formData }).then((response) => {
      localStorage.access_token = response.data.access_token;
    })
      .catch(err => {
        if (err.response) {
          console.log(err)
          return err.response.statusText
        } else if (err.request) {
          return 'Bad network. Try again later'
        } else {
          return 'Try again later'
        }
      });
  },
  login: function (formData: FormDataLogType) {
    return instance.post("auth/login", { ...formData }).then(response => {
      localStorage.access_token = response.data.access_token;
    }).catch(err => {
      if (err.response) {
        return err.response.statusText
      } else if (err.request) {
        return 'Bad network. Try again later'
      } else {
        return 'Try again later'
      }
    })
  },
  logout: function () {
    return instance.post("auth/logout").then(() => {
      localStorage.removeItem("access_token");
    }).catch(err => {
      if (err.response) {
        return err.response.statusText
      } else if (err.request) {
        return 'Bad network. Try again later'
      } else {
        return 'Try again later'
      }
    });
  },

  me: function () {
    return instance.post("auth/me").then((response) => {
      return response.data.data
    }).catch(err => {
      return axiosErrorHandler(err)
    });
  },
  meInfo: function () {
    return instance.get("auth/info").then((response) => {

      return response.data.data
    }).catch(err => {
      console.log(err)
      return axiosErrorHandler(err)
    });
  },
  meUpdate: function (data: FormDataMeUpdateType) {
    return instance.patch("auth/me", { ...data }).then((response) => {
      return response.data.data
    }).catch(err => {
      if (err.response) {
        return err.response.statusText
      } else if (err.request) {
        return 'Bad network. Try again later'
      } else {
        return 'Try again later'
      }
    });
  },
  //category
  getCategories: function () {
    return instance.get('admin/categories').then(res => {
      return res.data.data;
    }).catch(err => {
      if (err.response) {
        return err.response.statusText
      } else if (err.request) {
        return 'Bad network. Try again later'
      } else {
        return 'Try again later'
      }
    });
  },
  createCategory: function (category: CategoryRecordType) {
    // console.log(category)
    // return;
    return instance.post('admin/categories', { ...category }, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }).then(res => {
      return res.data.data;
    }).catch(err => {
      if (err.response.data.message) {
        return err.response.data.message
      } else if (err.response) {
        return err.response.statusText
      } else if (err.request) {
        return 'Bad network. Try again later'
      } else {
        return 'Try again later'
      }
    });
  },
  updateCategory: function (id: number, category: CategoryRecordType) {
    return instance.post(`admin/categories/${id}`, { ...category }, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }).then(res => {
      return res.data.data;
    }).catch(err => {
      if (err.response.data.message) {
        return err.response.data.message
      } else if (err.response) {
        return err.response.statusText
      } else if (err.request) {
        return 'Bad network. Try again later'
      } else {
        return 'Try again later'
      }
    });
  },
  deleteCategory: function (id: number) {
    return instance.delete(`admin/categories/${id}`).then(res => {
      return res.data.data;
    }).catch(err => {
      if (err.response) {
        return err.response.statusText
      } else if (err.request) {
        return 'Bad network. Try again later'
      } else {
        return 'Try again later'
      }
    });
  },
  //tag
  getTags: function () {
    return instance.get('admin/tags').then(res => {
      return res.data.data;
    }).catch(err => {
      if (err.response) {
        return err.response.statusText
      } else if (err.request) {
        return 'Bad network. Try again later'
      } else {
        return 'Try again later'
      }
    });
  },
  createTag: function (tag: TagRecordType) {
    return instance.post('admin/tags', { ...tag }, {
      headers: {
        'content-type': 'multipart/form-data' // do not forget this 
      }
    }).then(res => {
      return res.data.data;
    }).catch(err => {
      if (err.response.data.message) {
        return err.response.data.message
      } else if (err.response) {
        return err.response.statusText
      } else if (err.request) {
        return 'Bad network. Try again later'
      } else {
        return 'Try again later'
      }
    });
  },
  updateTag: function (id: number, tag: TagRecordType) {
    return instance.post(`admin/tags/${id}`, { ...tag }, {
      headers: {
        'content-type': 'multipart/form-data' // do not forget this 
      }
    }).then(res => {
      return res.data.data;
    }).catch(err => {
      if (err.response.data.message) {
        return err.response.data.message
      } else if (err.response) {
        return err.response.statusText
      } else if (err.request) {
        return 'Bad network. Try again later'
      } else {
        return 'Try again later'
      }
    });
  },
  deleteTag: function (id: number) {
    return instance.delete(`admin/tags/${id}`).then(res => {
      return res.data.data;
    }).catch(err => {
      if (err.response) {
        return err.response.statusText
      } else if (err.request) {
        return 'Bad network. Try again later'
      } else {
        return 'Try again later'
      }
    });
  },

  //task
  getTasks: function (category_id = '', tag_id = '', listSaved = [] as Array<number>) {
    return instance.get(`admin/tasks?category_id=${category_id}&tag_id=${tag_id}${listSaved.length > 0 && `&ids=${listSaved}`}`).then(res => {
      return res.data.data;
    }).catch(err => {
      if (err.response) {
        return err.response.statusText
      } else if (err.request) {
        return 'Bad network. Try again later'
      } else {
        return 'Try again later'
      }
    });
  },
  getTest: function (category_id: number | string, tag_id: number | string, theme_id?: number | string) {
    return instance.get(`admin/tasks?category_id=${category_id}&tag_id=${tag_id}&theme_id=${theme_id}`).then(res => {
      // return instance.get(`admin/tasks?category_id=${category_id}&tag_id=${tag_id}&${theme_id && `theme_id=${theme_id}`}`).then(res => {
      return res.data.data;
    }).catch(err => {
      if (err.response) {
        return err.response.statusText
      } else if (err.request) {
        return 'Bad network. Try again later'
      } else {
        return 'Try again later'
      }
    });
  },
  createTask: function (task: TaskRecordType) {
    return instance.post('admin/tasks', { ...task }, {
      headers: {
        'content-type': 'multipart/form-data' // do not forget this 
      }
    }).then(res => {
      return res.data.data;
    }).catch(err => {
      if (err.response.data.message) {
        return err.response.data.message
      } else if (err.response) {
        return err.response.statusText
      } else if (err.request) {
        return 'Bad network. Try again later'
      } else {
        return 'Try again later'
      }
    });
  },
  updateTask: function (id: number | string, task: TaskRecordType) {

    return instance.post(`admin/tasks/${id}`, { ...task }, {
      headers: {
        'content-type': 'multipart/form-data' // do not forget this 
      }
    }).then(res => {
      return res.data.data;
    }).catch(err => {
      if (err.response.data.message) {
        return err.response.data.message
      } else if (err.response) {
        return err.response.statusText
      } else if (err.request) {
        return 'Bad network. Try again later'
      } else {
        return 'Try again later'
      }
    });
  },
  deleteTask: function (id: number | string) {
    return instance.delete(`admin/tasks/${id}`).then(res => {

      return res.data.data;
    }).catch(err => {

      if (err.response) {
        return err.response.statusText
      } else if (err.request) {
        return 'Bad network. Try again later'
      } else {
        return 'Try again later'
      }
    });
  },
  //user
  getUsers: function (name: string, email: string, role: string) {
    return instance.get(`admin/users?name=${name}&email=${email}&role=${role}`).then(res => {
      return res.data.data;
    }).catch(err => {
      if (err.response) {
        return err.response.statusText
      } else if (err.request) {
        return 'Bad network. Try again later'
      } else {
        return 'Try again later'
      }
    });
  },
  // createUser: function (title: string) {
  //   return instance.post('admin/tags', { title }).then(res => {
  //     return res.data.data;
  //   }).catch(err => {
  //     if (err.response.data.message) {
  //       return err.response.data.message
  //     } else if (err.response) {
  //       return err.response.statusText
  //     } else if (err.request) {
  //       return 'Bad network. Try again later'
  //     } else {
  //       return 'Try again later'
  //     }
  //   });
  // },
  updateUser: function (id: number | string, title: UserRecordType) {
    return instance.patch(`admin/users/${id}`, { ...title }).then(res => {
      return res.data.data;
    }).catch(err => {
      if (err.response.data.message) {
        return err.response.data.message
      } else if (err.response) {
        return err.response.statusText
      } else if (err.request) {
        return 'Bad network. Try again later'
      } else {
        return 'Try again later'
      }
    });
  },
  deleteUser: function (id: number | string) {
    return instance.delete(`admin/users/${id}`).then(res => {
      return res.data.data;
    }).catch(err => {
      if (err.response) {
        return err.response.statusText
      } else if (err.request) {
        return 'Bad network. Try again later'
      } else {
        return 'Try again later'
      }
    });
  },
  //result
  getResult: function (categoryId: string = '', tagId: string = '') {
    return instance.get(`admin/results?categoryId=${categoryId}&tagId=${tagId}`).then(res => {
      return res.data.data;
    }).catch(err => {
      if (err.response) {
        return err.response.statusText
      } else if (err.request) {
        return 'Bad network. Try again later'
      } else {
        return 'Try again later'
      }
    });
  },
  createResult: function (result: ResultRecordType) {
    return instance.post('admin/results', { ...result }).then(res => {
      return res.data.data;
    }).catch(err => {
      if (err.response.data.message) {
        return err.response.data.message
      } else if (err.response) {
        return err.response.statusText
      } else if (err.request) {
        return 'Bad network. Try again later'
      } else {
        return 'Try again later'
      }
    });
  },
  updateResult: function (id: number | string, result: ResultRecordType) {
    console.log(id, result)
    return instance.patch(`admin/results/${id}`, { ...result }).then(res => {
      console.log(res.data)
      return res.data.data;
    }).catch(err => {
      if (err.response.data.message) {
        return err.response.data.message
      } else if (err.response) {
        return err.response.statusText
      } else if (err.request) {
        return 'Bad network. Try again later'
      } else {
        return 'Try again later'
      }
    });
  },
  deleteResult: function (id: number | string) {
    return instance.delete(`admin/results/${id}`).then(res => {
      return res.data.data;
    }).catch(err => {
      if (err.response) {
        return err.response.statusText
      } else if (err.request) {
        return 'Bad network. Try again later'
      } else {
        return 'Try again later'
      }
    });
  },
  //events
  getEvents: function () {
    return instance.get(`admin/events`).then(res => {
      return res.data.data;
    }).catch(err => {
      if (err.response) {
        return err.response.statusText
      } else if (err.request) {
        return 'Bad network. Try again later'
      } else {
        return 'Try again later'
      }
    });
  },
  createEvent: function (result: ResultRecordType) {
    return instance.post('admin/events', { ...result }).then(res => {
      return res.data.data;
    }).catch(err => {
      if (err.response.data.message) {
        return err.response.data.message
      } else if (err.response) {
        return err.response.statusText
      } else if (err.request) {
        return 'Bad network. Try again later'
      } else {
        return 'Try again later'
      }
    });
  },
  updateEvent: function (id: number | string, result: ResultRecordType) {
    return instance.patch(`admin/events/${id}`, { ...result }).then(res => {
      return res.data.data;
    }).catch(err => {
      if (err.response.data.message) {
        return err.response.data.message
      } else if (err.response) {
        return err.response.statusText
      } else if (err.request) {
        return 'Bad network. Try again later'
      } else {
        return 'Try again later'
      }
    });
  },
  deleteEvent: function (id: number | string) {
    return instance.delete(`admin/events/${id}`).then(res => {
      return res.data.data;
    }).catch(err => {
      if (err.response) {
        return err.response.statusText
      } else if (err.request) {
        return 'Bad network. Try again later'
      } else {
        return 'Try again later'
      }
    });
  },
  //cat tag
  getCategoryTags: function (categoryId: string, tagId: string) {
    return instance.get(`admin/category-tags?categoryId=${categoryId}&tagId=${tagId}`).then(res => {
      return res.data.data;
    }).catch(err => {
      if (err.response) {
        return err.response.statusText
      } else if (err.request) {
        return 'Bad network. Try again later'
      } else {
        return 'Try again later'
      }
    });
  },
  updateCategoryTag: function (id: number, categoryTag: CategoryTagRecordType) {
    return instance.post(`admin/category-tags/${id}`, { ...categoryTag }, {
      headers: {
        'content-type': 'multipart/form-data' // do not forget this 
      }
    }).then(res => {
      return res.data.data;
    }).catch(err => {
      if (err.response) {
        return err.response.statusText
      } else if (err.request) {
        return 'Bad network. Try again later'
      } else {
        return 'Try again later'
      }
    });
  },
  deleteCategoryTag: function (id: number) {
    return instance.delete(`admin/category-tags/${id}`).then(res => {
      return res.data.data;
    }).catch(err => {
      if (err.response) {
        return err.response.statusText
      } else if (err.request) {
        return 'Bad network. Try again later'
      } else {
        return 'Try again later'
      }
    });
  },
  //rules
  getRules: function (categoryId: string) {
    return instance.get(`admin/rules${categoryId ? `?category_id=${categoryId}` : ''}`).then(res => {
      return res.data.data;
    }).catch(err => {
      if (err.response) {
        return err.response.statusText
      } else if (err.request) {
        return 'Bad network. Try again later'
      } else {
        return 'Try again later'
      }
    });

  },
  createRule: function (rule: RuleRecordType) {
    return instance.post('admin/rules', { ...rule }).then(res => {
      return res.data.data;
    }).catch(err => {
      if (err.response.data.message) {
        return err.response.data.message
      } else if (err.response) {
        return err.response.statusText
      } else if (err.request) {
        return 'Bad network. Try again later'
      } else {
        return 'Try again later'
      }
    });
  },
  updateRule: function (id: number, rule: RuleRecordType) {
    return instance.patch(`admin/rules/${id}`, { ...rule }).then(res => {
      return res.data.data;
    }).catch(err => {
      if (err.response.data.message) {
        return err.response.data.message
      } else if (err.response) {
        return err.response.statusText
      } else if (err.request) {
        return 'Bad network. Try again later'
      } else {
        return 'Try again later'
      }
    });
  },
  deleteRule: function (id: number) {
    return instance.delete(`admin/rules/${id}`).then(res => {
      return res.data.data;
    }).catch(err => {
      if (err.response) {
        return err.response.statusText
      } else if (err.request) {
        return 'Bad network. Try again later'
      } else {
        return 'Try again later'
      }
    });
  },
  //themes
  getThemes: function (categoryId: string) {
    return instance.get(`admin/themes${categoryId ? `?category_id=${categoryId}` : ''}`).then(res => {
      return res.data.data;
    }).catch(err => {
      if (err.response) {
        return err.response.statusText
      } else if (err.request) {
        return 'Bad network. Try again later'
      } else {
        return 'Try again later'
      }
    });

  },
  createTheme: function (theme: ThemeRecordType) {
    return instance.post('admin/themes', { ...theme }).then(res => {
      return res.data.data;
    }).catch(err => {
      if (err.response.data.message) {
        return err.response.data.message
      } else if (err.response) {
        return err.response.statusText
      } else if (err.request) {
        return 'Bad network. Try again later'
      } else {
        return 'Try again later'
      }
    });
  },
  updateTheme: function (id: number, theme: ThemeRecordType) {
    return instance.patch(`admin/themes/${id}`, { ...theme }).then(res => {
      return res.data.data;
    }).catch(err => {
      if (err.response.data.message) {
        return err.response.data.message
      } else if (err.response) {
        return err.response.statusText
      } else if (err.request) {
        return 'Bad network. Try again later'
      } else {
        return 'Try again later'
      }
    });
  },
  deleteTheme: function (id: number) {
    return instance.delete(`admin/themes/${id}`).then(res => {
      return res.data.data;
    }).catch(err => {
      if (err.response) {
        return err.response.statusText
      } else if (err.request) {
        return 'Bad network. Try again later'
      } else {
        return 'Try again later'
      }
    });
  },
};

/*const _axios = require('axios') 
const axiosRetry = require('axios-retry') 
const axios = _axios.create() 
// https://github.com/softonic/axios-retry/issues/87 const retryDelay = (retryNumber = 0) => { 
  const seconds = Math.pow(2, retryNumber) * 1000; 
  const randomMs = 1000 * Math.random(); 
  return seconds + randomMs; 
}; 
axiosRetry(axios, { 
  retries: 2, 
  retryDelay, 
  // retry on Network Error & 5xx responses 
  retryCondition: axiosRetry.isRetryableError, 
}); 
module.exports = axios;
*/