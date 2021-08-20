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
      links: ['currentCommit', 'commitList', 'commitExists'],
    },
    {
      name: 'Files',
      links: [
        'status',
        'changedFiles',
        'readFile',
        'readFileJson',
        'writeFile',
        'writeJsonFile',
        'removeFile',
      ],
    },
    {
      name: 'Helpers',
      links: ['run', 'newFile'],
    },
  ],
};
