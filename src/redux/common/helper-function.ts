import produce from "immer";

export function createReducer(initialState: any, handleMap: any) {
  return function reducer(state = initialState, action: any) {
    return produce(state, (draft: any) => {
      const handler = handleMap[action.type];
      if (handler) {
        handler(draft, action);
      }
    });
  };
}

/**
 * 단순하게 값을 할당하는 actions 코드의 중복을 막기 위해
 * key(state), value 를 주면 해당 state 의 값을 재할당하는 action
 *
 * NOTE: 현재는 값을 할당하는 것 뿐이지만, 배열 할당, 원소 삭제 등으로 확장 가능.
 */
export function createSetValueAction(type: any) {
  return (key: any, value: any) => ({ type, key, value });
}
export function setValueReducer(draft: any, action: any) {
  draft[action.key] = action.value;
}
