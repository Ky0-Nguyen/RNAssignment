import axios, {Method} from 'axios';
import {HTTP_STATUS} from './http-status';

const METHOD_GET = 'GET';
const METHOD_POST = 'POST';
const METHOD_PUT = 'PUT';
const METHOD_DELETE = 'DELETE';

export interface PropsParams {
  actionURL: string;
  headers: any;
  method: Method;
  dataBody: any;
  timeout?: number;
  params?: any;
}

type AxiosConfig = {
  method: Method;
  url: string;
  headers: any;
  baseURL: string;
  data?: any;
  timeout: number;
  params?: any;
};

class BaseAPI {
  public requestAPI = async (props: PropsParams) => {
    const {actionURL, method, dataBody, headers, params} = props;
    headers['Content-Type'] = 'application/json';
    headers.Authorization =
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MjRiZWVmNDY3ZTU5NDlkMGYwY2ViNmNkMmFlMjUxNiIsInN1YiI6IjY2MmY0NjY0OGE4OGIyMDEyYWNlYmJjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hBlkp6NRtm31DUzNUdQca8SurVrVVShzZAlK_kFj2hM';

    let config: AxiosConfig = {
      params,
      method,
      timeout: 5000,
      headers,
      url: actionURL,
      baseURL: 'https://api.themoviedb.org/3',
    };
    if (dataBody) {
      config = {
        ...config,
        data: dataBody,
      };
    }

    try {
      const response = await axios(config);
      return response;
    } catch (error) {
      throw await this.handleError(error);
    }
  };

  public get = (actionURL: any, headers: any = {}, params?: any) => {
    return this.requestAPI({
      actionURL,
      method: METHOD_GET,
      dataBody: null,
      headers,
      params,
    });
  };

  public post = (actionURL: any, dataBody: any, headers = {}) => {
    return this.requestAPI({
      actionURL,
      method: METHOD_POST,
      dataBody,
      headers,
    });
  };

  public put = (actionURL: any, dataBody: any, headers = {}) => {
    return this.requestAPI({
      actionURL,
      method: METHOD_PUT,
      dataBody,
      headers,
    });
  };

  public delete = (actionURL: any, dataBody: any, headers = {}) => {
    return this.requestAPI({
      actionURL,
      method: METHOD_DELETE,
      dataBody,
      headers,
    });
  };

  handleError = async (error: any) => {
    let result;
    let data;
    const {response} = error;

    if (response) {
      data = await response.data;
      switch (response.status) {
        case HTTP_STATUS.notFound.code:
          result = {...HTTP_STATUS.notFound, data};
          break;
        case HTTP_STATUS.forbidden.code:
          result = {...HTTP_STATUS.forbidden, data};
          break;
        case HTTP_STATUS.unauthorized.code:
          return {...HTTP_STATUS.unauthorized, data};
        case HTTP_STATUS.badRequest.code:
          result = {...HTTP_STATUS.badRequest, data};
          break;
        case HTTP_STATUS.upgradeRequired.code:
          result = {...HTTP_STATUS.upgradeRequired, data};
          break;
        case HTTP_STATUS.notAcceptable.code:
          if (data.message && data.message === 'invalid_tenant') {
            return;
          } else {
            // a.authenticate.logout();
          }
          return {...HTTP_STATUS.notAcceptable};
        default:
          result = {message: 'server error', data};
          break;
      }
    } else {
      result = {message: error.message, data};
    }
    return result;
  };
}

const instance = new BaseAPI();
export {instance as BaseAPI};
