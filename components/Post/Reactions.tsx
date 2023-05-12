import {Event} from "nostr-tools";
import {ArrowPathIcon, BoltIcon, ChatBubbleOvalLeftIcon, HeartIcon} from "@heroicons/react/24/outline";
import {
  ArrowPathIcon as ArrowPathIconFull,
  BoltIcon as BoltIconFull,
  HeartIcon as HeartIconFull,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import {isRepost} from "@/utils/event";
import usePublish from "@/hooks/usePublish";
import useStore from "@/store";
import {useMemo, useState} from "react";
import Modal from "@/components/modal/Modal";
import Avatar from "@/components/Avatar";
import Name from "@/components/Name";

type Props = { event: Event, reactionEvents: Event[], nip19NoteId: string, standalone?: boolean };

const Reactions = ({ reactionEvents, nip19NoteId, event, standalone }: Props) => {
  const publish = usePublish();
  const userData = useStore((state) => state.auth.user.data);
  const myPub = userData?.publicKey || '';
  const [modalReactions, setModalReactions] = useState([] as Event[]);

  const liked = useMemo(() => {
    if (!myPub) return false;
    return reactionEvents.some((event) => event.kind === 7 && event.pubkey === myPub);
  }, [reactionEvents, myPub]);
  const like = () => {
    !liked && publish({
      kind: 7,
      content: '+',
      tags: [['e', event.id], ['p', event.pubkey]],
    });
  }

  const reposted = useMemo(() => {
    if (!myPub) return false;
    return reactionEvents.some((event) => event.pubkey === myPub && isRepost(event));
  }, [reactionEvents, myPub]);
  const repost = () => {
    !reposted && publish({
      kind: 6,
      content: '',
      tags: [['e', event.id, '', 'mention'], ['p', event.pubkey]],
    });
  }

  const likes = reactionEvents.filter((event) => event.kind === 7);
  const reposts = reactionEvents.filter((event) => isRepost(event));
  const zaps = reactionEvents.filter((event) => event.kind === 9735);
  const replies = reactionEvents.filter((event) => event.kind === 1 && !isRepost(event));

  // in standalone, show twitter-like listings that open the modal
  return (
    <>
      {standalone && (
        <>
          <hr className="-mx-4 opacity-10" />
          {modalReactions.length > 0 && (
            <Modal showContainer={true} onClose={() => setModalReactions([])}>
              <div className="flex items-center justify-between p-4">
                <h2 className="text-xl font-bold">Reactions</h2>
              </div>
              <div className="flex flex-col p-2 gap-4 overflow-y-scroll max-h-[50vh] w-96">
                {modalReactions.map((event) => (
                  <div key={event.id} className="flex items-center p-2 gap-4">
                    <Avatar pub={event.pubkey} width="w-12" />
                    <Name pub={event.pubkey} />
                  </div>
                ))}
              </div>
            </Modal>
          )}
          <div className="flex items-center gap-4">
            {likes.length > 0 && (<div className="flex-shrink-0">
              <a onClick={() => setModalReactions(likes)} className="cursor-pointer hover:underline">
                {likes.length} <span className="text-neutral-500">Likes</span>
              </a>
            </div>)}
            {reposts.length > 0 && (<div className="flex-shrink-0">
              <a onClick={() => setModalReactions(reposts)}
                       className="cursor-pointer hover:underline">
                {reposts.length} <span className="text-neutral-500">Reposts</span>
              </a>
            </div>)}
            {zaps.length > 0 && (<div className="flex-shrink-0">
              <a onClick={() => setModalReactions(zaps)}
                       className="cursor-pointer hover:underline">
                {zaps.length} <span className="text-neutral-500">Zaps</span>
              </a>
            </div>)}
          </div>
        </>
      )}
      <hr className="-mx-4 opacity-10" />

      <div className="-m-4 flex flex-wrap">
        <button className="btn-ghost hover:bg-transparent text-neutral-500 hover:text-iris-orange btn w-1/4 content-center gap-2 rounded-none p-2">
          <BoltIcon width={18} />
          {!standalone && zaps.length > 0 && zaps.length}
        </button>

        <Link href={`/${nip19NoteId}`} className="btn-ghost hover:bg-transparent text-neutral-500 hover:text-iris-blue btn w-1/4 content-center gap-2 rounded-none p-2">
          <ChatBubbleOvalLeftIcon width={18} />
          {!standalone && replies.length > 0 && replies.length}
        </Link>

        <button onClick={like} className={`btn-ghost hover:bg-transparent text-neutral-500 hover:text-iris-purple btn w-1/4 content-center gap-2 rounded-none p-2 ${liked ? 'text-iris-purple' : ''}`}>
          {liked ? <HeartIconFull width={18} /> : <HeartIcon width={18}/>}
          {!standalone && likes.length > 0 && likes.length}
        </button>

        <button onClick={repost} className={`btn-ghost hover:bg-transparent text-neutral-500 hover:text-iris-green btn w-1/4 content-center gap-2 rounded-none p-2 ${reposted ? 'text-iris-green' : ''}`}>
          {reposted ? <ArrowPathIconFull width={18} /> : <ArrowPathIcon width={18} />}
          {!standalone && reposts.length > 0 && reposts.length}
        </button>
      </div>
    </>
  )
}

export default Reactions;
