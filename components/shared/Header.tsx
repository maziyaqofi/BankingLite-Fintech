export default function Header() {
  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500">
          Welcome back, Maziya 👋
        </p>
      </div>

      <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold">
        M
      </div>
    </header>
  );
}