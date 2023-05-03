import { useLocation } from "react-router-dom";
export default function UserError() {
  const { state } = useLocation();
  console.log(state);
  return (
    <div>
      <h1>User error</h1>
      <p>{state && state.response.errorMessage}</p>
    </div>
  );
}
