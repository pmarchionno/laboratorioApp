import { NavItem } from '../model/local/NavItem';

export const menu: NavItem[] = [
  {
    displayName: 'Catalogo de libros',
    summary: 'catalog',
    iconName: '',
    disabled: false,
    route: 'book-catalog',
    children: [
      {
        displayName: 'Administrar Libro',
        iconName: '',
        disabled: false,
        route: '/book',
      },
      {
        displayName: 'Administrar Autor',
        iconName: '',
        disabled: false,
        route: '/author',
      },
      {
        displayName: 'Administrar Editorial',
        iconName: '',
        disabled: false,
        route: '/editorial',
      },
      {
        displayName: 'Administrar Area',
        iconName: '',
        disabled: false,
        route: '/area',
      },
      {
        displayName: 'Administrar Sub Area',
        iconName: '',
        disabled: false,
        route: '/sub-area',
      },
    ],
  },
  {
    displayName: 'Bibliotecas',
    summary: 'menuLib',
    iconName: '',
    disabled: false,
    route: 'library-config',
    children: [
      {
        displayName: 'Administrar Biblioteca',
        iconName: '',
        disabled: false,
        route: '/library',
      },
      {
        displayName: 'Administrar Zona',
        iconName: '',
        disabled: false,
        route: '/zone',
      },
    ],
  },
];
