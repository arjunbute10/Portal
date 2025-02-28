import { Config, Method, useApi } from "../../../util/fetch/ApiProvider";
import { UserLogin } from "./Login.model";

export const _userLogin = (data: UserLogin): Config<UserLogin> => ({
    endpoint: `/loginUser`,
    method: Method.POST,
    body: data
});

export const useLogin = () => {
    const { callApi } = useApi();
    return async (data: UserLogin) => {
        let config: Config<UserLogin> = _userLogin(data);
        return callApi(config);
    };
};