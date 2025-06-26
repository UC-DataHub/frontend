const menuData = [
  {
    id: 1,
    title: 'About Us',
    newTab: false,
    path: '/',
    submenu: [
      {
        id: 11,
        title: 'About Us',
        newTab: false,
        path: '/'
      },
      {
        id: 12,
        title: 'Publications',
        newTab: false,
        path: '/publications',
      },
      {
        id: 13,
        title: 'How to Cite',
        newTab: false,
        path: '/how-to-cite',
      }
    ]
  },

  {
    id: 2,
    title: 'Datasets',
    newTab: false,
    path: '/datasets', // Link to the Datasets section
  },
  // {
  //   id: 3,
  //   title: 'Publications',
  //   newTab: false,
  //   path: '/publications', // Link to the Publications section
  // },
  // {
  //   id: 4,
  //   title: 'News & Updates',
  //   newTab: false,
  //   submenu: [
  //     {
  //       id: 34,
  //       title: 'Recent Publications',
  //       newTab: false,
  //       path: '/#recent-publications', // Link to the Recent Publications section
  //     },
  //     {
  //       id: 35,
  //       title: 'APIs',
  //       newTab: false,
  //       path: 'https://backend-nx4f.onrender.com/', // Link to the APIs section
  //     },
  //     {
  //       id: 35.1,
  //       title: 'Documents',
  //       newTab: false,
  //       path: '/#documents', // Link to the Documents section
  //     },
  //   ],
  // },
  // {
  //   id: 5,
  //   title: 'Support Us',
  //   newTab: false,
  //   path: '/',
  // },
];
export default menuData;
