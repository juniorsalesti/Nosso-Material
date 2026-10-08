import coverCelular from '../assets/images/cover_celular_guia_1791485791345.jpg';
import coverRainhaDaCasa from '../assets/images/cover_rainha_da_casa_1791487021901.jpg';
import { LinkItem, ThemeConfig } from '../types';

export const DEFAULT_PAGE_TITLE = '✨ Nossos materiais';

export const INITIAL_LINKS: LinkItem[] = [
  {
    id: 'link-1',
    imagem: coverCelular,
    titulo: 'Seu Celular Não Pode Ser um Estranho',
    url: 'https://pay.kiwify.com.br/OtrhZqv',
    ativo: true,
  },
  {
    id: 'link-2',
    imagem: coverRainhaDaCasa,
    titulo: 'Método Rainha da Casa',
    url: 'https://kiwify.app/mtnhgqL?afid=tcdzG0Pe',
    ativo: true,
  },
];

export const LIGHT_THEME: ThemeConfig = {
  mode: 'light',
  bgColor: '#F7F7F7',
  cardColor: '#FFFFFF',
  textColor: '#111111',
  borderColor: '#D9D9D9',
};

export const DARK_THEME: ThemeConfig = {
  mode: 'dark',
  bgColor: '#121212',
  cardColor: '#1E1E1E',
  textColor: '#EDEDED',
  borderColor: '#2E2E2E',
};
