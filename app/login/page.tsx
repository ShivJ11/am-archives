'use client'
import { LoginForm } from "@/components/login-form"
import MangaHeader from "../components/layout/mangaHeader"
import { UserAuth } from "../context/authContext"
export default function Page() {
  const { googleSignIn } = UserAuth();
  const handleSignIn = async () => {
    try {
      await googleSignIn();
    }
    catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <MangaHeader />
      <div className="flex min-h-svh w-full justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm handleSignIn={handleSignIn} />
        </div>
      </div>
    </>
  )
}
