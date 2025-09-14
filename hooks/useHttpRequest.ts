import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useSnackbar } from "notistack";

interface RequestOptions<T = any> {
  url: string;
  config?: AxiosRequestConfig;
  notification?: {
    success?: string;
    error?: string;
  };
  callback?: {
    onTry?: (response: AxiosResponse<T>) => void;
    onCatch?: (error: AxiosError) => void;
    onFinally?: () => void;
  };
}

export function useHttpRequest() {

  const { enqueueSnackbar } = useSnackbar();

  return makeRequest;

  async function makeRequest<T = any>({
    url, config, notification, callback
  }: RequestOptions<T>): Promise<T | null> {

    try {
      const response = await axios<T>(url, config);
      if (notification?.success) enqueueSnackbar(notification.success, { variant: 'success' });
      callback?.onTry?.(response)
      return response.data;
    }
    catch (e) {
      const error = e as AxiosError<{ error: string; }>
      if (error.response?.data?.error) {
        enqueueSnackbar(error.response.data.error, { variant: 'error' })
      }
      else if (notification?.error) {
        enqueueSnackbar(notification.error, { variant: 'error' })
      }
      else {
        enqueueSnackbar('Уууупс... Что-то пошло не так', { variant: 'error' });
      }
      callback?.onCatch?.(error);

      return null;
    }
    finally {
      callback?.onFinally?.()
    }

  }

}
