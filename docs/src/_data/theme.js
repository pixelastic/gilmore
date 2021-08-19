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
      links: ['init', 'add', 'commit'],
    },
    {
      name: 'Commits',
      links: ['currentCommit', 'commitList'],
    },
    {
      name: 'Files',
      links: ['status'],
    },
    {
      name: 'Helpers',
      links: ['run', 'write', 'newFile'],
    },
  ],
};
