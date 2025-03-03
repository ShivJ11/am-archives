import { LoginForm } from "@/components/login-form"
import MangaHeader from "../components/layout/mangaHeader"

export default function Page() {
  return (
    <>
      <MangaHeader />
      <div className="flex min-h-svh w-full justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </>
  )
}
