import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "reicon-react";
import { states } from "@/data/sitedata";
import { useAuth } from "@/context/AuthContext";
import { LoginInput, RegisterInput } from "@/types";

type AuthMode = "login" | "register";

const initialRegister: RegisterInput = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  state: "Maharashtra",
  pinCode: "",
};

const initialLogin: LoginInput = {
  email: "",
  password: "",
};

export const AuthForm = () => {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<AuthMode>("login");
  const [registerForm, setRegisterForm] = useState(initialRegister);
  const [loginForm, setLoginForm] = useState(initialLogin);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    if (mode === "login") {
      const result = await login(loginForm);
      if (!result.ok) setErrorMessage(result.error ?? "Unable to sign in.");
      return;
    }

    const result = await register(registerForm);
    if (!result.ok) setErrorMessage(result.error ?? "Unable to create account.");
  };

  return (
    <section className="w-full max-w-md border border-white/15 bg-[color:oklch(0.97_0.02_105/0.96)] p-6 shadow-2xl backdrop-blur-sm sm:p-8">
      <div className="mb-6 flex gap-1 border border-[var(--line-soft)] bg-[var(--surface-base)] p-1">
        <button
          type="button"
          className={`auth-switch ${mode === "login" ? "auth-switch--active" : ""}`}
          onClick={() => {
            setMode("login");
            setErrorMessage("");
          }}
        >
          Sign In
        </button>
        <button
          type="button"
          className={`auth-switch ${mode === "register" ? "auth-switch--active" : ""}`}
          onClick={() => {
            setMode("register");
            setErrorMessage("");
          }}
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "register" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <label className="field-label">
              Full Name
              <input
                className="input-field"
                value={registerForm.name}
                onChange={(event) => setRegisterForm((prev) => ({ ...prev, name: event.target.value }))}
                placeholder="Anita Deshmukh"
              />
            </label>

            <label className="field-label">
              State
              <select
                className="input-field"
                value={registerForm.state}
                onChange={(event) => setRegisterForm((prev) => ({ ...prev, state: event.target.value }))}
              >
                {states.map((stateName) => (
                  <option key={stateName} value={stateName}>
                    {stateName}
                  </option>
                ))}
              </select>
            </label>

            <label className="field-label">
              Pin Code
              <input
                className="input-field"
                inputMode="numeric"
                maxLength={6}
                value={registerForm.pinCode}
                onChange={(event) =>
                  setRegisterForm((prev) => ({
                    ...prev,
                    pinCode: event.target.value.replace(/\D/g, "").slice(0, 6),
                  }))
                }
                placeholder="e.g. 411001"
              />
            </label>
          </motion.div>
        )}

        <label className="field-label">
          Email
          <input
            className="input-field"
            value={mode === "login" ? loginForm.email : registerForm.email}
            onChange={(event) =>
              mode === "login"
                ? setLoginForm((prev) => ({ ...prev, email: event.target.value }))
                : setRegisterForm((prev) => ({ ...prev, email: event.target.value }))
            }
            placeholder="name@example.com"
          />
        </label>

        <label className="field-label">
          Password
          <input
            type="password"
            className="input-field"
            value={mode === "login" ? loginForm.password : registerForm.password}
            onChange={(event) =>
              mode === "login"
                ? setLoginForm((prev) => ({ ...prev, password: event.target.value }))
                : setRegisterForm((prev) => ({ ...prev, password: event.target.value }))
            }
            placeholder="Minimum 6 characters"
          />
        </label>

        {mode === "register" && (
          <label className="field-label">
            Confirm Password
            <input
              type="password"
              className="input-field"
              value={registerForm.confirmPassword}
              onChange={(event) =>
                setRegisterForm((prev) => ({ ...prev, confirmPassword: event.target.value }))
              }
              placeholder="Re-enter password"
            />
          </label>
        )}

        {errorMessage && <p className="border border-[var(--tone-warn-line)] bg-[var(--tone-warn-bg)] px-3 py-2 text-sm text-[var(--tone-warn)]">{errorMessage}</p>}

        <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.99 }} className="cta-button" type="submit">
          {mode === "login" ? "Login to Dashboard" : "Create Account"}
          <ArrowRight size={16} />
        </motion.button>
      </form>
    </section>
  );
};