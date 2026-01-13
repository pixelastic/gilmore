import { firostError } from 'firost';

/**
 * Push current tag to remote (no-op if no current tag)
 **/
export async function pushTag() {
  const currentTagName = await this.currentTag();

  // No-op if no current tag
  if (!currentTagName) {
    return;
  }

  const currentRemoteName = await this.currentRemoteName();
  if (!currentRemoteName) {
    throw new firostError('GILMORE_PUSH_TAG_NO_REMOTE', 'No remote configured');
  }

  const command = `push ${currentRemoteName} ${currentTagName}`;

  await this.run(command);
}
