import Alert from "../Alert";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SignUpForm from "../SignUpForm";

/**
 * Page for sign up of a user
 * @page
 */
export default function SignUp() {
  return (
    <div className="px-4 py-10 bg-gradient-to-b from-red-500 to-red-800 h-screen">
      <SignUpForm />
    </div>
  );
}
