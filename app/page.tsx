import GetStartedButton from "@/components/shared/GetStartedButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">
        Fintech Bank Lite
      </h1>

      <GetStartedButton />
    </main>
  );
}
