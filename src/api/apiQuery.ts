import { Cookies } from 'react-cookie';

import { QueryFunctionContext, QueryKey } from '@tanstack/react-query';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { serialize } from 'object-to-formdata';

import { configEnv } from '~/config/environment';

export interface APIError<T = any> extends AxiosError<T> {}

interface APIRequestConfig extends AxiosRequestConfig {
  useFormData?: boolean;
  deliveryURL?: boolean;
}

export type APIQueryKey = QueryKey | [options: APIRequestConfig];

interface APIQueryContext {
  queryKey: QueryFunctionContext<APIQueryKey>['queryKey'];
  pageParam?: number | unknown;
}

export const apiAxios = axios.create({
  // baseURL: configEnv.API_URL,
  withCredentials: false,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
});

const cookies = new Cookies();

export async function apiQuery<T = unknown>({
  queryKey,
  pageParam,
}: APIQueryContext) {
  //@ts-ignore
  let options: APIRequestConfig = {};

  if (typeof queryKey[0] === 'string') {
    options.url = queryKey[0];
  }

  if (typeof queryKey[queryKey.length - 1] === 'object') {
    const _option = queryKey[queryKey.length - 1];
    options = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      ...options,
      ...(queryKey[queryKey.length - 1] as APIRequestConfig),
    };
  }

  // headers 초기화
  if (!options.headers) {
    options.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }

  if (pageParam) {
    options.params = {
      ...(options.params ?? {}),
      page: pageParam,
    };
  }

  if (options.useFormData) {
    // @ts-ignore
    options.headers['Content-Type'] = undefined;
    options.data = serialize(options.data);
  }
  const AuthorizationToken = cookies?.get('osung_food_access_token');
  if (AuthorizationToken) {
    options.headers = {
      ...options.headers,
      Authorization: 'Bearer ' + AuthorizationToken,
    };
  }
  //

  // apiAxios.defaults.baseURL = options.deliveryURL
  //   ? configEnv.DELIVEY_TRACKING_URL
  //   : configEnv.API_URL;

  apiAxios.defaults.baseURL = configEnv.API_URL;

  const { data } = await apiAxios.request<T>(options);

  return data;
}
