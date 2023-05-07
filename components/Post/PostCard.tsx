'use client';

import {
  ArrowPathIcon,
  BoltIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

import { nip19 } from 'nostr-tools';

import { BaseAvatar } from '@/components/Avatar';
import AvatarLoader from '@/components/Avatar/AvatarLoader';
import BoxLoader from '@/components/BoxLoader';
import CardContainer from '@/components/CardContainer';
import PostContent from '@/components/Post/PostContent';
import RelativeTime from '@/components/RelativeTime';
import Name from '@/components/Name';
import Spinner from '@/components/Spinner';

import { usePostEvent, usePostReactions, useProfileContent } from '@/hooks';
import { useRouter } from 'next/navigation';
import {MouseEventHandler, useMemo} from "react";
import {getReplyingToEvent, getThreadRoot, isRepost} from "@/utils/event";

type Props = {
  postId: string,
  showReplies?: number,
  standalone?: boolean,
  asReply?: boolean,
  asRepliedMessage?: boolean,
  asInlineQuote?: boolean,
};

const PostCard = ({ postId, showReplies, standalone, asReply, asRepliedMessage, asInlineQuote }: Props) => {
  const router = useRouter();
  const { isFetching, postEvent, createdAt, nip19NoteId } =
    usePostEvent(postId);

  const { displayName, picture } = useProfileContent(
    postEvent?.pubkey || ''
  );
  const npub = nip19.npubEncode(postEvent?.pubkey || '');

  const { reactionEvents } = usePostReactions(postId);

  // don't re-sort on every render, only when reactionEvents changed
  const sortedReactions = useMemo(() => {
    return reactionEvents.sort((a, b) => a.created_at - b.created_at);
  }, [reactionEvents]);

  const onClick: MouseEventHandler = (e) => {
    if (standalone) return;
    const target = e.target as HTMLElement;
    const selectors = ['a', 'button', '.btn'];

    const isMatch = selectors.some((selector) => target.closest(selector));

    if (!isMatch) {
      e.preventDefault();
      router.push(`/post/${nip19NoteId}`);
    }
  }

  const replyingToEvent = postEvent && getReplyingToEvent(postEvent);
  const replyingToUsers = postEvent?.tags?.filter(
    (tag) => tag[0] === "p" && tag[3] !== "mention"
  );
  const threadRoot = replyingToEvent && getThreadRoot(postEvent);

  if (!postEvent) {
    return (
      <CardContainer>
        <div onClick={onClick} className="flex flex-col gap-2 cursor-pointer">
          <Spinner />
        </div>
      </CardContainer>
    );
  }

  return (
    <>
      {postEvent && !asInlineQuote && !asReply && !asRepliedMessage && threadRoot && (threadRoot !== replyingToEvent) ? (
        <Link href={`/post/${threadRoot}`} className="-mb-2 mt-2 text-sm opacity-50 flex items-center gap-2 px-4">
          Show thread
        </Link>
      ) : ''}
      {(standalone && replyingToEvent) ? (
        <PostCard postId={replyingToEvent} asRepliedMessage={true} showReplies={0} />
      ) : ''}
      <CardContainer>
        <div className={`flex flex-col gap-2 ${standalone ? '' : 'cursor-pointer'}`} onClick={onClick}>
          <div className="flex items-center gap-2">
            <Link
              prefetch={false}
              href={`/profile/${npub}`}
              className="flex items-center gap-2"
            >
              {picture ? (
                <BaseAvatar url={picture || '/nostribe.png'} width="w-12" />
              ) : isFetching ? (
                <div className="w-12 h-12 flex items-center">
                  <AvatarLoader />
                </div>
              ) : (
                <BaseAvatar url="/nostribe.png" width="w-12" />
              )}

              <div className="flex flex-col">
                {displayName ? (
                  <h4 className="font-bold leading-5">
                    {displayName.length > 25
                      ? displayName.slice(0, 10) +
                        '...' +
                        displayName.slice(-15)
                      : displayName}
                  </h4>
                ) : (
                  isFetching && <BoxLoader />
                )}

                {createdAt && (
                  <div className="text-xs leading-5 opacity-50">
                    <RelativeTime date={new Date(createdAt)} />
                  </div>
                )}
              </div>
            </Link>

            <div className="ml-auto">
              <div className="dropdown-left dropdown">
                <label tabIndex={0} className="btn-ghost btn-circle btn m-1 text-gray-500">
                  <EllipsisHorizontalIcon width={24} />
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu rounded-box w-40 bg-base-100 p-2 shadow-lg shadow-black"
                >
                  <li>
                    <button
                      className="text-start text-xs"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          `${location.origin}/post/${nip19NoteId}`
                        )
                      }
                    >
                      Copy Link
                    </button>
                  </li>
                  <li>
                    <button
                      className="text-start text-xs"
                      onClick={() =>
                        navigator.clipboard.writeText(nip19NoteId)
                      }
                    >
                      Copy ID
                    </button>
                  </li>
                  <li>
                    <button
                      className="text-start text-xs"
                      onClick={() =>
                        navigator.clipboard.writeText(JSON.stringify(postEvent))
                      }
                    >
                      Copy Raw Data
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {replyingToEvent && replyingToUsers ? (
            <small className="opacity-50 flex items-center gap-1">
              Replying to
              {replyingToUsers.slice(0, 3).map((tag) => (
                <Link
                  prefetch={false}
                  href={`/profile/${tag[1]}`}
                  key={tag[1]}
                >
                  <Name pub={tag[1]} />
                </Link>
              ))}
              {replyingToUsers.length > 3 ? (
                <span className="opacity-50"> and {replyingToUsers.length - 3} more</span>
              ) : ''}
            </small>
          ) : ''}

          <div className="flex flex-col gap-2 break-words">
            <PostContent postEvent={postEvent} standalone={standalone || false} />
          </div>
        </div>

        {!asInlineQuote ? (
          <>
            <hr className="-mx-4 mt-2 opacity-10" />

            <div className="-m-4 flex flex-wrap">
              <button className="btn-ghost hover:bg-transparent text-gray-500 hover:text-iris-orange btn w-1/4 content-center gap-2 rounded-none p-2">
                <BoltIcon width={18} />

                {reactionEvents.filter((event) => event.kind === 9735).length}
              </button>

              <Link href={`/post/${nip19NoteId}`} className="btn-ghost hover:bg-transparent text-gray-500 hover:text-iris-blue btn w-1/4 content-center gap-2 rounded-none p-2">
                <ChatBubbleOvalLeftIcon width={18} />

                {reactionEvents.filter((event) => event.kind === 1).length}
              </Link>

              <button className="btn-ghost hover:bg-transparent text-gray-500 hover:text-iris-purple btn w-1/4 content-center gap-2 rounded-none p-2">
                <HeartIcon width={18} />

                {reactionEvents.filter((event) => event.kind === 7).length}
              </button>

              <button className="btn-ghost hover:bg-transparent text-gray-500 hover:text-iris-green btn w-1/4 content-center gap-2 rounded-none p-2">
                <ArrowPathIcon width={18} />
                {reactionEvents.filter((event) => isRepost(event)).length}
              </button>
            </div>
          </>
        ) : ''}
      </CardContainer>
      {showReplies ? (
        sortedReactions.filter((event) => {
          if (event.kind !== 1) return false;
          const isMention = event.tags?.find((tag) => tag[0] === 'e' && tag[1] === postEvent.id && tag[3] === 'mention');
          return !isMention;
        }).map((event) => (
          <PostCard postId={event.id} key={event.id} showReplies={1} asReply={true} />
        ))
      ) : ''}
    </>
  );
};

export default PostCard;