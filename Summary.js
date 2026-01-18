import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";

export default function Summary() {
const { state } = useLocation();
const navigate = useNavigate();

if (!state) {
navigate("/");
return null;
}

return (
   <div className="container">
      <h2>Submitted Details</h2>

      {Object.entries(state).map(([key, value]) => (
      <p key={key}>
         <strong>{key}:</strong> {value}
      </p>
      ))}

      <button onClick={() => navigate("/")}>Back</button>
   </div>
);
}
