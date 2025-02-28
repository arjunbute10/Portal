
export interface CurrentContextComplete {
    userName: string,
    token: string,
    employeeId: string,
    employeeName: string,
    role: string
}

/** Use the useCurrentUserContext hook to get state.context.current */
export type CurrentContext = CurrentContextComplete;

export interface ContextStoreState {
    current: CurrentContext
}