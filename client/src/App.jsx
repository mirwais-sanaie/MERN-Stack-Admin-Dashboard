import { useTheme } from "./contexts/ThemeProvider.jsx";

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="bg-bg text-text-primary min-h-screen p-10">
      <h1 className="text-2xl font-bold">Current Theme: {theme}</h1>

      <button
        onClick={toggleTheme}
        className="mt-6 bg-primary text-white px-4 py-2 rounded-lg"
      >
        Toggle Theme
      </button>
    </div>
  );
}
