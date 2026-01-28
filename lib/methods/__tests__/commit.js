import fs from 'node:fs/promises';
import path from 'node:path';
import { remove, tmpDirectory } from 'firost';
import Gilmore from '../../main.js';

const repoPath = tmpDirectory('gilmore/commit');
const repo = new Gilmore(repoPath, { globalConfig: false });

describe('commit', () => {
  const envSnapshot = { ...process.env };
  beforeEach(async () => {
    process.env = { ...envSnapshot };
  });
  afterEach(async () => {
    await remove(repoPath);
  });
  it('should commit all staged files', async () => {
    await repo.init();
    await repo.newFile('README.md');
    await repo.add();

    await repo.commit('commit message');

    const actual = await repo.status();
    expect(actual).toEqual([]);
  });

  it('should save the commit message', async () => {
    await repo.init();
    await repo.newFile('README.md');
    await repo.add();

    await repo.commit('commit message');

    const actual = await repo.commitList();
    expect(actual[0]).toHaveProperty('subject', 'commit message');
  });

  it('should throw an error if there are no files to commit', async () => {
    await repo.init();

    let actual;
    try {
      await repo.commitAll();
    } catch (err) {
      actual = err;
    }

    expect(actual).toHaveProperty('code', 'GILMORE_COMMIT_NOTHING_TO_COMMIT');
  });

  it('should return the commit hash', async () => {
    await repo.init();
    await repo.newFile('README.md');
    await repo.add();

    const actual = await repo.commit('commit message');

    const history = await repo.commitList();
    expect(history[0]).toHaveProperty('hash', actual);
  });

  describe('commit author', () => {
    beforeEach(async () => {
      await repo.init();
      await repo.newFile('README.md');
      await repo.add();
    });
    it('should use GIT_AUTHOR_* env variables if set', async () => {
      process.env.GIT_AUTHOR_NAME = 'Vax';
      process.env.GIT_AUTHOR_EMAIL = 'vax@voxmachina.com';

      await repo.commit('commit message');

      const history = await repo.commitList();
      expect(history[0]).toHaveProperty('author.name', 'Vax');
      expect(history[0]).toHaveProperty('author.email', 'vax@voxmachina.com');
    });
    it('should use to local config if no env variables', async () => {
      delete process.env.GIT_AUTHOR_NAME;
      delete process.env.GIT_AUTHOR_EMAIL;

      await repo.setConfig('user.name', 'Vex');
      await repo.setConfig('user.email', 'vex@voxmachina.com');

      await repo.commit('commit message');

      const history = await repo.commitList();
      expect(history[0]).toHaveProperty('author.name', 'Vex');
      expect(history[0]).toHaveProperty('author.email', 'vex@voxmachina.com');
    });
    it('should use env vars, even if local config is set', async () => {
      process.env.GIT_AUTHOR_NAME = 'Vax';
      process.env.GIT_AUTHOR_EMAIL = 'vax@voxmachina.com';
      await repo.setConfig('user.name', 'Vex');
      await repo.setConfig('user.email', 'vex@voxmachina.com');

      await repo.commit('commit message');

      const history = await repo.commitList();
      expect(history[0]).toHaveProperty('author.name', 'Vax');
      expect(history[0]).toHaveProperty('author.email', 'vax@voxmachina.com');
    });
    it('throws an error if no user defined', async () => {
      delete process.env.GIT_AUTHOR_NAME;
      delete process.env.GIT_AUTHOR_EMAIL;

      let actual;
      try {
        await repo.commit('commit message');
      } catch (err) {
        actual = err;
      }

      expect(actual).toHaveProperty(
        'code',
        'GILMORE_COMMIT_AUTHOR_IDENTITY_UNKNOWN',
      );
    });
  });

  describe('skipCi', () => {
    beforeEach(async () => {
      await repo.init();
      await repo.newFile('README.md');
      await repo.add();
    });

    it('adds [skip ci] to empty body', async () => {
      await repo.commit('commit message', { skipCi: true });

      const history = await repo.commitList();
      expect(history[0]).toHaveProperty('subject', 'commit message');
      expect(history[0]).toHaveProperty('body', '[skip ci]');
    });

    it('adds [skip ci] to existing body', async () => {
      await repo.commit('commit message', {
        body: 'existing body',
        skipCi: true,
      });

      const history = await repo.commitList();
      expect(history[0]).toHaveProperty('subject', 'commit message');
      expect(history[0]).toHaveProperty('body', 'existing body\n\n[skip ci]');
    });
  });

  describe('skipHooks', () => {
    beforeEach(async () => {
      await repo.init();
      await repo.newFile('README.md');

      // Adding a blocking pre-commit hook
      const hookPath = '.git/hooks/pre-commit';
      await repo.writeFile('#!/bin/sh\nexit 1', hookPath);
      await fs.chmod(path.resolve(repo.root, hookPath), 0o755);
    });
    it('hooks are called by default', async () => {
      let actual;
      try {
        await repo.commitAll('should fail');
      } catch (err) {
        actual = err;
      }

      expect(actual).not.toBeEmpty();
      const history = await repo.commitList();
      expect(history).toEqual([]);
    });
    it('hooks are disabled with skipHooks: true', async () => {
      await repo.commitAll('should pass', { skipHooks: true });

      const history = await repo.commitList();
      expect(history).toHaveLength(1);
    });
  });
});
