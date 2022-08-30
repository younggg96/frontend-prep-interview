import { useReducer } from "react";
/**
 * @returns example2
 */
export const ExampleUseReducer2 = () => {
  const [userInfo, dispatch] = useReducer(
    (state, { type, payload }) => {
      switch (type) {
        case "setName":
          return {
            ...state,
            name: payload,
          };
        case "setAge":
          return {
            ...state,
            age: payload,
          };
      }
    },
    {
      name: "Jace",
      age: 18,
    }
  );

  return (
    <div>
      {JSON.stringify(userInfo)}
      <button onClick={() => dispatch({ type: "setName", payload: "John" })}>
        click
      </button>
    </div>
  );
};
