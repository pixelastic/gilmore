import { error: firostError } from 'firost';

/**
 * Rename a branch
 * @param {string} branchOne Name of the first branch
 * @param {string} branchTwo Name of the second branch
 *
 * If branchOne and branchTwo are specified: rename branchOne to branchTwo
 * If only branchOne is specified: rename current branch to branchOne
 **/
export default async function (branchOne, branchTwo = '') {
  // Source branch does not exist
  if (branchTwo && !(await this.branchExists(branchOne))) {
    throw new firostError(
      'GILMORE_BRANCH_RENAME_DOES_NOT_EXIST',
      `Branch ${branchOne} does not exist`
    );
  }

  // Destination branch already exists
  const branchDestination = branchTwo || branchOne;
  if (await this.branchExists(branchDestination)) {
    throw new firostError(
      'GILMORE_BRANCH_RENAME_ALREADY_EXISTS',
      `Branch ${branchDestination} already exists`
    );
  }

  await this.run(`branch --move ${branchOne} ${branchTwo}`);
};
