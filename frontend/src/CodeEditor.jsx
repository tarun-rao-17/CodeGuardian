import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

function CodeEditor() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/auth"); // Redirect to login page after sign-out
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
      {/* Rest of your CodeEditor component */}
    </>
  );
}

export default CodeEditor;