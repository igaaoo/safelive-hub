export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Safelive Hub",
  description:
    "Portal de relatórios",
  mainNav: [
    {
      title: "Relatórios",
      href: "/",
      security: 'public',
    },
    {
      title: "Configurações",
      href: "/configuracoes",
      security: ['administrador'],
      type: 'dropdown',
      links: [
        {
          title: 'Administração Usuário',
          href: '/configUsuario'
        },
        {
          title: 'Configurar Clientes',
          href: '/configClientes'
        },
      ]
    },
  ],
  links: {
    home: "/",
    // dashboard: "/dash",
  },
};
