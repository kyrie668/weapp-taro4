import Taro from '@tarojs/taro'

const BASE_URL = 'https://easieresume.com/api'

interface RequestOptions {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: any
  header?: Record<string, string>
}

interface ResponseData<T = any> {
  code: number
  message: string
  data: T
}

// 请求拦截器
const requestInterceptor = (config: RequestOptions) => {
  const token = Taro.getStorageSync('token')
  const header: any = {
    'Content-Type': 'application/json',
    ...config.header
  }

  if (token) {
    header.Authorization = `Bearer ${token}`
  }

  return {
    ...config,
    header
  }
}

// 响应拦截器
const responseInterceptor = <T = any>(response: any): ResponseData<T> => {
  console.log("responseInterceptor", response);
  const { statusCode, data } = response;

  if (statusCode === 200) {
    if (data.code === 200) {
      return data
    } else {
      Taro.showToast({
        title: data.message || '请求失败',
        icon: 'none'
      })
      throw data
    }
  } else {
    let message = '网络错误'
    switch (statusCode) {
      case 401:
        message = '未授权，请重新登录'
        Taro.removeStorageSync('token')
        // Taro.navigateTo({ url: '/pages/login/index' })
        break
      case 403:
        message = '拒绝访问'
        break
      case 404:
        message = '请求错误，未找到该资源'
        break
      case 500:
        message = '服务器错误'
        break
      default:
        message = `连接错误 ${statusCode}`
    }
    Taro.showToast({
      title: message,
      icon: 'none'
    })
    throw { code: statusCode, message }
  }
}

// 封装请求方法
const request = <T = any>(options: RequestOptions): Promise<ResponseData<T>> => {
  const config = requestInterceptor(options)

  return new Promise((resolve, reject) => {
    Taro.request({
      url: BASE_URL + config.url,
      method: config.method || 'GET',
      data: config.data,
      header: config.header,
      success: (res) => {
        try {
          const data = responseInterceptor<T>(res)
          resolve(data)
        } catch (error) {
          reject(error)
        }
      },
      fail: (error) => {
        console.error('请求失败', error)
        Taro.showToast({
          title: '网络请求失败',
          icon: 'none'
        })
        reject(error)
      }
    })
  })
}

// 封装 GET 请求
export const get = <T = any>(url: string, data?: any) => {
  return request<T>({ url, method: 'GET', data })
}

// 封装 POST 请求
export const post = <T = any>(url: string, data?: any) => {
  return request<T>({ url, method: 'POST', data })
}

// 封装 PUT 请求
export const put = <T = any>(url: string, data?: any) => {
  return request<T>({ url, method: 'PUT', data })
}

// 封装 DELETE 请求
export const del = <T = any>(url: string, data?: any) => {
  return request<T>({ url, method: 'DELETE', data })
}

// 文件上传方法
interface UploadOptions {
  url: string
  filePath: string
  name?: string
  formData?: Record<string, any>
  header?: Record<string, string>
}

export const uploadFile = <T = any>(options: UploadOptions): Promise<ResponseData<T>> => {
  const {
    url,
    filePath,
    name = 'file',
    formData = {},
    header = {}
  } = options

  return new Promise((resolve, reject) => {
    Taro.uploadFile({
      url: BASE_URL + url,
      filePath,
      name,
      formData,
      header: {
        'Content-Type': 'multipart/form-data',
        ...header,
        Authorization: `Bearer ${Taro.getStorageSync('token')}`
      },
      success: (res) => {
        try {
          const data = responseInterceptor<T>({
            statusCode: 200,
            data: JSON.parse(res.data)
          })
          resolve(data)
        } catch (error) {
          reject(error)
        }
      },
      fail: (err) => {
        console.error('上传失败', err)
        Taro.showToast({
          title: '上传失败',
          icon: 'none'
        })
        reject(err)
      }
    })
  })
}

// 使用示例
// uploadFile({
//   url: 'your-upload-url',
//   filePath: 'file-path',
//   formData: {
//     key1: 'value1',
//     key2: 'value2'
//   }
// }).then(res => {
//   console.log('上传成功', res)
// }).catch(err => {
//   console.error('上传失败', err)
// })
