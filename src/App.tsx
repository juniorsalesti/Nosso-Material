import { INITIAL_LINKS, LIGHT_THEME, DEFAULT_PAGE_TITLE } from './constants/initialData';
import { LinkCard } from './components/LinkCard';

export default function App() {
  const links = INITIAL_LINKS.filter((item) => item.ativo);
  const theme = LIGHT_THEME;

  return (
    <div
      style={{
        backgroundColor: theme.bgColor,
        minHeight: '100vh',
        color: theme.textColor,
      }}
      className="w-full flex flex-col justify-start py-12 sm:py-16 transition-colors duration-200"
    >
      {/* Central Container - Mobile 92% / Desktop Max 600px */}
      <main className="w-[92%] max-w-[600px] mx-auto flex flex-col">
        {/* Topo da página: Apenas ✨ Nossos materiais */}
        <header className="mb-7 sm:mb-9 text-center">
          <h1
            className="text-xl sm:text-2xl font-bold tracking-tight select-none inline-block"
            style={{ color: theme.textColor }}
          >
            {DEFAULT_PAGE_TITLE}
          </h1>
        </header>

        {/* Lista vertical de cards clicáveis */}
        <div className="flex flex-col gap-3.5 sm:gap-4 w-full">
          {links.map((item, index) => (
            <LinkCard
              key={item.id}
              item={item}
              theme={theme}
              index={index}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
