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
      links: ['init', 'add', 'status', 'commit', 'commitAll'],
    },
    {
      name: 'Commits',
      links: ['currentCommit', 'commitList', 'commitExists', 'changedFiles'],
    },
    {
      name: 'Branches',
      links: ['currentBranch', 'branchList', 'branchExists', 'switchBranch'],
    },
    {
      name: 'Files',
      links: [
        'readFile',
        'readFileJson',
        'writeFile',
        'writeFileJson',
        'removeFile',
      ],
    },
    {
      name: 'Config',
      links: ['getConfig', 'setConfig', 'deleteConfig'],
    },
    {
      name: 'Helpers',
      links: ['run', 'root'],
    },
  ],
};
