import { motion } from "framer-motion";
import { AuthForm } from "@/components/auth/AuthForm";
import { BrandMark } from "@/components/common/BrandMark";

const authImage =
  "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1800&q=80";

export const AuthPage = () => (
  <main className="relative min-h-screen overflow-hidden">
    <img src={authImage} alt="Farmer in crop field" className="absolute inset-0 h-full w-full object-cover" />
    <div className="absolute inset-0 bg-[linear-gradient(110deg,oklch(0.18_0.03_150/0.93),oklch(0.28_0.04_145/0.62),oklch(0.41_0.05_145/0.24))]" />

    <div className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:py-14">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-xl space-y-6"
      >
        <BrandMark invert />
        <div className="space-y-3 text-white">
          <p className="text-xs uppercase tracking-[0.22em] text-white/80">Digital Agro Platform</p>
          <h1 className="font-display text-[clamp(2rem,4.8vw,3.8rem)] leading-[1.03]">
            Farm decisions backed by season, schemes, market, and weather.
          </h1>
          <p className="max-w-lg text-sm text-white/85 md:text-base">
            KrishiVani keeps planning practical and clear with a simple, grounded interface.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.06 }}
        className="w-full max-w-md lg:justify-self-end"
      >
        <AuthForm />
      </motion.div>
    </div>
  </main>
);