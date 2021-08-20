module.exports = {
  // docSearch: {
  //   apiKey: 'XXXXXX',
  //   indexName: 'pixelastic_XXXXXX',
  // },
  navigation: [
    {
      name: 'Overview',
      links: [
        {
          title: 'Getting Started',
          href: '/',
        },
      ],
    },
    {
      name: 'Actions',
      links: ['init', 'add', 'commit', 'commitAll'],
    },
    {
      name: 'Commits',
      links: ['currentCommit', 'commitList'],
    },
    {
      name: 'Files',
      links: ['status', 'readFile', 'readFileJson', 'writeFile'],
    },
    {
      name: 'Helpers',
      links: ['run', 'newFile'],
    },
  ],
};
