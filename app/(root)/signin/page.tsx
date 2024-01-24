import SingInForm from "@/components/forms/SignInForm";

async function Page() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <section>
        <SingInForm />
      </section>
    </main>
  );
}

export default Page;
