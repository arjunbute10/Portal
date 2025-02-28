
import { useRef } from "react";
import isEqual  from "lodash/isEqual";
// import { useSelector } from "../../store";
// import { CurrentContextComplete, currentContextSelector } from ".";
// export function useCurrentUserContext(): CurrentContextComplete {
//     const currentContext = useSelector(currentContextSelector);
    
//     return currentContext as CurrentContextComplete;
// }

export function useDeepEqualMemo<T>(value: T) {
    const ref = useRef<T | undefined>(undefined);
  
    if (!isEqual(ref.current, value)) {
      ref.current = value;
    };
  
    return ref.current;
  }

