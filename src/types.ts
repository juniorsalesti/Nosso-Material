export interface LinkItem {
  id: string;
  imagem: string;
  titulo: string;
  url: string;
  ativo: boolean;
}

export type ThemeMode = 'light' | 'dark' | 'custom';

export interface ThemeConfig {
  mode: ThemeMode;
  bgColor: string;
  cardColor: string;
  textColor: string;
  borderColor: string;
}
