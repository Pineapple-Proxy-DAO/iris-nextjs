import Embed from './index';
import Link from 'next/link';
import Name from '@/components/Name';

const pubKeyRegex =
  /(?:^|\s|nostr:|(?:https?:\/\/[\w./]+)|iris\.to\/|snort\.social\/p\/|damus\.io\/)+((?:@)?npub[a-zA-Z0-9]{59,60})(?![\w/])/gi;
const noteRegex =
  /(?:^|\s|nostr:|(?:https?:\/\/[\w./]+)|iris\.to\/|snort\.social\/e\/|damus\.io\/)+((?:@)?note[a-zA-Z0-9]{59,60})(?![\w/])/gi;

const NostrUser: Embed = {
  regex: pubKeyRegex,
  component: ({ match, index }) => {
    return (
      <Link
        key={match + index}
        href={`/profile/${match}`}
        className="text-blue-500 hover:underline mx-1"
      >
        <Name pub={match} />
      </Link>
    );
  },
};

export default NostrUser;