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
      links: ['init', 'add', 'commit', 'commitAll', 'status'],
    },
    {
      name: 'Commits',
      links: ['currentCommit', 'commitList', 'commitExists', 'changedFiles'],
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
      name: 'Branches',
      links: ['switchBranch', 'currentBranch', 'branchList', 'branchExists'],
    },
    {
      name: 'Helpers',
      links: ['run', 'root'],
    },
  ],
};
