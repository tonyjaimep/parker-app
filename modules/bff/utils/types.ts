import { AxiosResponse } from "axios";

export type BffHookOptions<T> = {
  onSuccess: (response: AxiosResponse<T>) => void;
  onError: () => void;
};
