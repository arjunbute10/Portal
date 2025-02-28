// // import { AnyAction } from 'redux';

// import { RootStoreState } from "../../store";

// // import { SharedActionType } from 'types';
// // import { ContextActionType, ReceiveUserInfoAction, ReceiveContextsAction, ChangeContextAction } from './actions';
// // import { CurrentContext, CaseWorkerContextModel, CaseWorkerContextIndex, ContextStoreState } from './types';

// // function list(state: Array<CaseWorkerContextModel>, action: ReceiveContextsAction) {
// //     switch (action.type) {
// //         case ContextActionType.RECEIVE_CONTEXTS:    //console.log("REDUCER context/list : action", action);
// //             return action.caseWorkerContexts;
// //         default:
// //             return state;
// //     }
// // }
// // export const contextListSelector = (state: RootStoreState) => state.context.list;

// // function index(state: CaseWorkerContextIndex, action: ReceiveContextsAction) {
// //     switch (action.type) {
// //         case ContextActionType.RECEIVE_CONTEXTS:   //console.log("REDUCER context/index : action", action);
// //             const newIndex = {} as CaseWorkerContextIndex;

// //             action.caseWorkerContexts.forEach((ctx) => {
// //                 newIndex[ctx.caseWorkerContextId] = ctx;
// //             });

// //             return newIndex;
// //         default:
// //             return state;
// //     }
// // }
// // export const contextIndexSelector = (state: RootStoreState) => state.context.index;

// // function current(state: CurrentContext, index: CaseWorkerContextIndex, action: AnyAction): CurrentContext {
// //     switch (action.type) {
// //         case ContextActionType.RECEIVE_USER_INFO:    //console.log("REDUCER context/current : action", action);
// //             const user = (action as ReceiveUserInfoAction).userInfo;

// //             // fullstory code? remove?
// //             global.FS && global.FS.identify && global.FS.identify('caseWorkerId=' + user.caseWorkerId,
// //                 {
// //                     displayName: user.firstName + ' ' + user.lastName,
// //                     email: user.emailAddress
// //                 });
// //             global.FS && global.FS.log && global.FS.log('[Source: Gardiant React App]');

// //             return {
// //                 ...state,
// //                 caseWorkerId: user.caseWorkerId,
// //                 caseWorkerName: user.firstName + ' ' + user.lastName,
// //                 caseWorkerEmail: user.emailAddress,             
// //                 policyAgreementUrls: user.policyAgreementUrls ? {
// //                     termsOfServiceReactPath: user.policyAgreementUrls.termsOfServiceReactPath,
// //                     privacyPolicyReactPath: user.policyAgreementUrls.privacyPolicyReactPath
// //                 } : undefined
// //             };
// //         case ContextActionType.CHANGE_CONTEXT:    //console.log("REDUCER context/current : action", action);
// //             const { caseWorkerContextId } = (action as ChangeContextAction);
// //             const ctx = index && index[caseWorkerContextId];

// //             if (!index) {
// //                 throw new Error(`Tried to select context ${caseWorkerContextId} before context list received!`);
// //             }
// //             else if (!ctx) {
// //                 throw new Error(`Could not find selected context ${caseWorkerContextId} in context list!`);
// //             }

// //             localStorage['context'] = ctx.caseWorkerContextId.toString();

// //             const newState: CurrentContext = {
// //                 ...state,
// //                 caseWorkerContextId: ctx.caseWorkerContextId,
// //                 firmId: ctx.firmId,
// //                 firmName: ctx.firmName,
// //                 firmTypeName: ctx.firmTypeName,
// //                 caseWorkerTitle: ctx.caseWorkerTitle,
// //                 readOnly: ctx.readOnly,
// //                 slug: ctx.slugName,
// //                 isEditAllCases: ctx.isEditAllCases,
// //                 isEditConfiguration: ctx.isEditConfiguration,
// //                 firmHasBetaAccess: ctx.firmHasBetaAccess,
// //                 hasOffice365: ctx.hasOffice365
// //             };

// //             return newState;
// //         default:
// //             return state;
// //     }
// // }
// /** Use the useCurrentUserContext hook if you want this */
// export const currentContextSelector = (state: RootStoreState) => state.context.current;

