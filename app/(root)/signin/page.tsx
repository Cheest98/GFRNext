
import SingInForm from "@/components/forms/SignInForm";

async function Page() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text"> Logowanko</h1>
      <p className="mt-3 text-base-regular text-light-2"> tuaj do porpawy</p>
      <section className="mt-9 bg-dark-2 p-10 rounded-lg">
        <SingInForm />
      </section>
    </main>
  );
}

export default Page;
