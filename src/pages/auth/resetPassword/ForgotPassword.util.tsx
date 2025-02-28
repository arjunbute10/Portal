import { Config, Method, useApi } from "../../../util/fetch/ApiProvider";
import { CreateNewPassword, ForgotPasswordData } from "./ForgotPassword.model";

export const _forgotPassword = (data: ForgotPasswordData): Config<ForgotPasswordData> => ({
    endpoint: `/forgetPassword`,
    method: Method.POST,
    body: data
});


export const _createNewPassword = (data: CreateNewPassword): Config<CreateNewPassword> => ({
    endpoint: `/createNewPassword`,
    method: Method.PUT,
    body: data
});


export const useForgotPassword = () => {
    const { callApi } = useApi();
    return async (data: ForgotPasswordData) => {
        let config: Config<ForgotPasswordData> = _forgotPassword(data);
        return callApi(config);
    };
};


export const useCreateNewPassword = () => {
    const { callApi } = useApi();
    return async (data: CreateNewPassword) => {
        let config: Config<CreateNewPassword> = _createNewPassword(data);
        return callApi(config);
    };
};



