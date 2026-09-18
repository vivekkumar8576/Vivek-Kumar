import { AuthProvider, useAuth } from "@/context/AuthContext";
import { AuthPage } from "@/pages/AuthPage";
import { DashboardPage } from "@/pages/DashboardPage";

const AppView = () => {
  const { user, isReady } = useAuth();

  if (!isReady) {
    return <main className="grid min-h-screen place-items-center text-sm text-[var(--ink-muted)]">Loading KrishiVani...</main>;
  }

  return user ? <DashboardPage /> : <AuthPage />;
};

export default function App() {
  return (
    <AuthProvider>
      <AppView />
    </AuthProvider>
  );
}