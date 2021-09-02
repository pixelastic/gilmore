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
      name: 'Commits',
      links: ['currentCommit', 'commitList', 'commitExists', 'changedFiles'],
    },
    {
      name: 'Branches',
      links: [
        'currentBranchName',
        'branchList',
        'branchExists',
        'switchBranch',
      ],
    },
    {
      name: 'Remotes',
      links: [
        'currentRemoteName',
        'remoteList',
        'remoteExists',
        'getRemote',
        'createRemote',
        'switchRemote',
        'setRemote',
      ],
    },
    {
      name: 'GitHub',
      links: ['githubRepoSlug', 'githubRepoOwner', 'githubRepoName'],
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
