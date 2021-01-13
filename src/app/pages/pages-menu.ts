import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'home-outline',
    link: '/home',
  },
  {
    title: 'Filiais',
    icon: 'layers-outline',
    link: '/filiais',
  },
  {
    title: 'Atendentes',
    icon: 'people-outline',
    link: '/atendentes',
  },
  {
    title: 'Opções',
    group: true,
  },
  {
    title: 'Usuários',
    icon: 'person-outline',
    children: [
      {
        title: 'Listar',
        link: '/usuarios',
      },
    ],
  },
];
