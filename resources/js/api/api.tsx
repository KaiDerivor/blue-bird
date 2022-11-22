import axios from "axios";
import { FormDataLogType } from './../redux/appReducer'

const isConnected = false;

const url = `http://127.0.0.1:8000/api/`;
const instance = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
instance.interceptors.request.use(
  (config) => {
    if (localStorage.access_token) {
      //@ts-ignore
      config.headers.authorization = `Bearer ${localStorage.access_token}`;
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
    // console.log(error)
    if (error.response.data.message === "Unauthenticated.") {
      instance
        .post(
          "auth/refresh",
          {},
          {
            headers: {
              authorization: `Bearer ${localStorage.access_token}`,
            },
          }
        )
        .then((response) => {
          console.log(response)
          localStorage.access_token = response.data.access_token;
          error.config.headers.authorization = `Bearer ${localStorage.access_token}`;
          return instance.request(error.config);
        });
      return;
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
      return response.data
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
  createCategory: function (category: string) {
    return instance.post('admin/categories', { category }).then(res => {
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
  updateCategory: function (id: number | string, category: string) {
    // console.log(id,category,`admin/categories/${id}`)
    // return ;
    return instance.patch(`admin/categories/${id}`, { category }).then(res => {
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
  deleteCategory: function (id: number | string) {
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
      return res.data;
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
  createTag: function (tag: string) {
    return instance.post('admin/tags', { tag }).then(res => {
      return res.data;
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
  updateTag: function (id: number | string, tag: string) {
    return instance.patch(`admin/tags/${id}`, { tag }).then(res => {
      return res.data;
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
  deleteTag: function (id: number | string) {
    return instance.delete(`admin/tags/${id}`).then(res => {
      return res.data;
    }).catch(err => {
      if (err.response) {
        return err.response.statusText
      } else if (err.request) {
        return 'Bad network. Try again later'
      } else {
        return 'Try again later'
      }
    });
  }

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