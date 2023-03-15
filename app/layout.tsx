import './globals.css';

import { Header, Navbar } from '@/components';

import {
  ArrowsPointingInIcon,
  ChatBubbleLeftRightIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  LinkIcon,
  PlusIcon,
  TagIcon,
  UsersIcon,
  WifiIcon,
} from '@heroicons/react/24/outline';

export const metadata = {
  title: 'Nostribe',
  description: 'Join the tribe, join the vibe.',
  keywords:
    'Nostribe, Nostr, Nostr protocol, decentralized, censorship-resistant, social media, web client, social network',
  manifest: '/manifest.json',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    title: 'Nostribe',
    description: 'Join the tribe, join the vibe.',
    images: [
      {
        url: 'https://raw.githubusercontent.com/sepehr-safari/nostribe-web-client/main/public/nostribe.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full w-full" data-theme="nostribish">
      <body className="overflow-x-hidden overflow-y-auto">
        <header className="w-full z-20 shadow-lg shadow-black fixed top-0">
          <Header />

          <Navbar />
        </header>

        <section className="flex justify-center pt-32">
          <div className="flex w-full max-w-screen-xl justify-between">
            <aside className="hidden lg:flex flex-col w-1/4 px-2 py-4 gap-4">
              <div className="card bg-neutral text-neutral-content shadow-2xl shadow-black">
                <div className="card-body p-4">
                  <h2 className="card-title">
                    Relays
                    <LinkIcon width={20} />
                  </h2>

                  <ul className="text-sm my-2">
                    <li className="flex justify-between">
                      <p>wss://relay.damus.io</p>
                      <WifiIcon width={16} />
                    </li>
                    <li className="flex justify-between">
                      <p>wss://eden.nostr.land</p>
                      <WifiIcon width={16} />
                    </li>
                    <li className="flex justify-between">
                      <p>wss://relay.snort.social</p>
                      <WifiIcon width={16} />
                    </li>
                    <li className="flex justify-between">
                      <p>wss://offchain.pub</p>
                      <EllipsisHorizontalIcon width={16} />
                    </li>
                    <li className="flex justify-between">
                      <p>wss://nos.lol</p>
                      <WifiIcon width={16} />
                    </li>
                  </ul>

                  <div className="card-actions justify-end">
                    <button className="btn btn-xs btn-ghost">
                      Manage Relays
                      <ChevronRightIcon width={16} />
                    </button>
                  </div>
                </div>
              </div>
            </aside>

            <main className="flex flex-col w-full md:w-3/4 lg:w-1/2 px-2 py-4 gap-4">
              <div className="alert alert-warning shadow-lg text-sm">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current flex-shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span>
                    Nostribe is still under development. Some parts are may not
                    functioning yet.
                  </span>
                </div>
              </div>

              {children}
            </main>

            <aside className="hidden md:flex flex-col md:w-1/4 px-2 py-4 gap-4">
              <div className="card bg-neutral text-neutral-content shadow-2xl shadow-black">
                <div className="card-body p-4">
                  <h2 className="card-title">
                    Nostribians
                    <UsersIcon width={20} />
                  </h2>

                  <ul className="text-sm my-2">
                    <li className="flex justify-between">
                      <p>@Himmel</p>
                      <button className="btn btn-ghost btn-xs gap-2">
                        <PlusIcon width={16} />
                        Follow
                      </button>
                    </li>
                    <li className="flex justify-between">
                      <p>@Jack</p>
                      <button className="btn btn-ghost btn-xs gap-2">
                        <PlusIcon width={16} />
                        Follow
                      </button>
                    </li>
                    <li className="flex justify-between">
                      <p>@GIGI</p>
                      <button className="btn btn-ghost btn-xs gap-2">
                        <PlusIcon width={16} />
                        Follow
                      </button>
                    </li>
                  </ul>

                  <div className="card-actions justify-end">
                    <button className="btn btn-xs btn-ghost">
                      Discover More
                      <ChevronRightIcon width={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="card bg-neutral text-neutral-content shadow-2xl shadow-black">
                <div className="card-body p-4">
                  <h2 className="card-title">
                    Popular Chat Rooms
                    <ChatBubbleLeftRightIcon width={20} />
                  </h2>

                  <ul className="text-sm my-2">
                    <li className="flex justify-between">
                      <p>Nostr Lovers</p>
                      <button className="btn btn-ghost btn-xs gap-2">
                        <ArrowsPointingInIcon width={16} />
                        Join
                      </button>
                    </li>
                    <li className="flex justify-between">
                      <p>PV Nostribians</p>
                      <button className="btn btn-ghost btn-xs gap-2">
                        <ArrowsPointingInIcon width={16} />
                        Join
                      </button>
                    </li>
                    <li className="flex justify-between">
                      <p>Coolers</p>
                      <button className="btn btn-ghost btn-xs gap-2">
                        <ArrowsPointingInIcon width={16} />
                        Join
                      </button>
                    </li>
                    <li className="flex justify-between">
                      <p>Satoshi</p>
                      <button className="btn btn-ghost btn-xs gap-2">
                        <ArrowsPointingInIcon width={16} />
                        Join
                      </button>
                    </li>
                  </ul>

                  <div className="card-actions justify-end">
                    <button className="btn btn-xs btn-ghost">
                      Discover More
                      <ChevronRightIcon width={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="card bg-neutral text-neutral-content shadow-2xl shadow-black">
                <div className="card-body p-4">
                  <h2 className="card-title">
                    Popular Tags
                    <TagIcon width={20} />
                  </h2>

                  <ul className="text-sm flex gap-2 flex-wrap my-2">
                    <li>
                      <button className="btn btn-outline btn-xs">nostr</button>
                    </li>
                    <li>
                      <button className="btn btn-outline btn-xs">jack</button>
                    </li>
                    <li>
                      <button className="btn btn-outline btn-xs">zap</button>
                    </li>
                    <li>
                      <button className="btn btn-outline btn-xs">
                        bitcoin
                      </button>
                    </li>
                    <li>
                      <button className="btn btn-outline btn-xs">
                        lightning
                      </button>
                    </li>
                    <li>
                      <button className="btn btn-outline btn-xs">
                        nostribe
                      </button>
                    </li>
                  </ul>

                  <div className="card-actions justify-end">
                    <button className="btn btn-xs btn-ghost">
                      Discover More
                      <ChevronRightIcon width={16} />
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </body>
    </html>
  );
}
