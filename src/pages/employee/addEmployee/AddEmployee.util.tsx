import { AddEmployee } from "./AddEmployee.model";
import { Config, Method, useApi } from "../../../util/fetch/ApiProvider";


export const _addEmployee = (data: AddEmployee): Config<AddEmployee> => ({
    endpoint: `/saveEmployeeDetails`,
    method: Method.PUT,
    body: data,
  });


export const useAddEmployee = () => {
    const { callApi } = useApi();
    return async (data: AddEmployee) => {
        let config: Config<AddEmployee> = _addEmployee(data);
        return callApi(config);
    };
};