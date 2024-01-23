import { LoginForm } from "@/components/forms/LoginForm";
import SingInForm from "@/components/forms/SignInForm";

async function Page() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <section className="mt-9 bg-dark-2 p-10 rounded-lg">
        <SingInForm />
      </section>

      <LoginForm />
    </main>
  );
}

export default Page;
