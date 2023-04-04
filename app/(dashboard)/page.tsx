'use client';

import { useEffect } from 'react';

import { PostCard, Spinner } from '@/components';

import useStore from '@/store';

export default function Feed() {
  const { clear, data, error, fetchFeed, isLoading } = useStore(
    (state) => state.feed
  );

  useEffect(() => {
    fetchFeed();

    return () => clear();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <>{error}</>;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      {data.posts.map((event, index) => (
        <PostCard key={index} event={event} metadata={event.metadata} />
      ))}
    </>
  );
}