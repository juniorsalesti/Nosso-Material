import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Copy, Check, ExternalLink, Share2, BookOpen } from 'lucide-react';
import { LinkItem, ThemeConfig } from '../types';

interface LinkCardProps {
  item: LinkItem;
  theme: ThemeConfig;
  index: number;
}

export const LinkCard: React.FC<LinkCardProps> = ({
  item,
  theme,
}) => {
  const [imageError, setImageError] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const handleCardClick = (e: React.MouseEvent) => {
    // If user clicked inside the more menu, ignore card navigation
    if (menuRef.current && menuRef.current.contains(eventTarget(e))) {
      return;
    }
    if (item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    }
  };

  const eventTarget = (e: React.MouseEvent): Node => e.target as Node;

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(item.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.titulo,
          url: item.url,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      handleCopyLink(e);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick(e as unknown as React.MouseEvent);
        }
      }}
      style={{
        backgroundColor: theme.cardColor,
        borderColor: theme.borderColor,
        color: theme.textColor,
      }}
      className="group relative flex items-center w-full min-h-[72px] sm:min-h-[76px] px-3.5 sm:px-4 py-3 rounded-2xl border transition-all duration-200 cursor-pointer select-none hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
    >
      {/* 1. Capa no lado esquerdo */}
      <div className="shrink-0 mr-3.5 sm:mr-4">
        <div
          className="w-12 h-14 sm:w-14 sm:h-16 rounded-xl overflow-hidden flex items-center justify-center border shadow-xs"
          style={{ borderColor: theme.borderColor }}
        >
          {item.imagem && !imageError ? (
            <img
              src={item.imagem}
              alt={item.titulo}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-800"
              style={{ color: theme.textColor }}
            >
              <BookOpen className="w-5 h-5 opacity-60" />
            </div>
          )}
        </div>
      </div>

      {/* 2. Nome do material centralizado */}
      <div className="flex-1 min-w-0 px-1 text-center">
        <h2
          className="font-medium text-sm sm:text-base leading-snug line-clamp-2 tracking-tight transition-opacity duration-200"
          style={{ color: theme.textColor }}
        >
          {item.titulo}
        </h2>
      </div>

      {/* 3. Ícone de três pontinhos no lado direito */}
      <div className="shrink-0 ml-3.5 sm:ml-4 relative" ref={menuRef}>
        <button
          type="button"
          aria-label="Mais opções"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((prev) => !prev);
          }}
          className="w-10 h-10 -mr-1 flex items-center justify-center rounded-full hover:bg-neutral-500/10 active:bg-neutral-500/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
          style={{ color: theme.textColor }}
        >
          <MoreVertical className="w-5 h-5 opacity-70 group-hover:opacity-100" />
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div
            className="absolute right-0 top-11 z-30 w-48 py-1.5 rounded-xl border shadow-xl animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md"
            style={{
              backgroundColor: theme.cardColor,
              borderColor: theme.borderColor,
              color: theme.textColor,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleCopyLink}
              className="w-full px-3.5 py-2 text-left text-xs sm:text-sm flex items-center gap-2.5 hover:bg-neutral-500/10 transition-colors font-normal"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">Link copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 opacity-75" />
                  <span>Copiar link</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="w-full px-3.5 py-2 text-left text-xs sm:text-sm flex items-center gap-2.5 hover:bg-neutral-500/10 transition-colors font-normal"
            >
              <Share2 className="w-4 h-4 opacity-75" />
              <span>Compartilhar</span>
            </button>

            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="w-full px-3.5 py-2 text-left text-xs sm:text-sm flex items-center gap-2.5 hover:bg-neutral-500/10 transition-colors font-normal"
            >
              <ExternalLink className="w-4 h-4 opacity-75" />
              <span>Abrir destino</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

