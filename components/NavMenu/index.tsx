import {
  Cog8ToothIcon,
  HomeIcon,
  InformationCircleIcon,
  PaperAirplaneIcon,
  QrCodeIcon,
  BellIcon,
} from '@heroicons/react/24/outline';
import {
  Cog8ToothIcon as Cog8ToothIconFull,
  HomeIcon as HomeIconFull,
  InformationCircleIcon as InformationCircleIconFull,
  PaperAirplaneIcon as PaperAirplaneIconFull,
  BellIcon as BellIconFull,
} from '@heroicons/react/24/solid';
import {Avatar} from "@/components";
import UserEmber from "@/components/NavMenu/UserEmber";

const APPLICATIONS = [
  { url: '/', text: 'Home', icon: HomeIcon, activeIcon: HomeIconFull },
  { url: '/chat', text: 'Messages', icon: PaperAirplaneIcon, activeIcon: PaperAirplaneIconFull },
  { url: '/notifications', text: 'Notifications', icon: BellIcon, activeIcon: BellIconFull },
  { url: '/settings', text: 'Settings', icon: Cog8ToothIcon, activeIcon: Cog8ToothIconFull },
  {
    url: '/about',
    text: 'About',
    icon: InformationCircleIcon,
    activeIcon: InformationCircleIconFull,
  },
];

export default function NavMenu() {
  return (
    <aside className="hidden md:w-16 lg:w-1/4 flex-col gap-4 px-2 py-4 md:flex justify-between">
      <div>
              <nav className="space-y-2">
        <div className="flex items-center gap-2 px-3 mb-4">
          <Avatar width={"w-8"} url="/img/icon128.png" />

          <h1 className="hidden lg:flex text-3xl">
            iris
          </h1>
        </div>
        {APPLICATIONS.map((a, index) => {
          const isActive = false; // Determine if the current route is active
          const Icon = isActive ? a.activeIcon : a.icon;
          return (
            <div key={index}>
              <a
              href={a.url}
              className={`inline-flex w-auto flex items-center space-x-4 p-3 rounded-full transition-colors duration-200 ${isActive ? 'text-primary' : ''} hover:bg-gray-900`}
            >
              <Icon className="w-6 h-6" />
              <span className={`hidden lg:flex`}>{a.text}</span>
              {a.text === 'messages' && (
                <span className="flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-red-500 rounded-full">
                  2
                </span>
              )}
            </a>
            </div>
          );
        })}
      </nav>
      <div className="flex lg:flex-row md:flex-col gap-2 mt-4">
        <button className="btn btn-primary rounded-full">
          <svg className="w-6 h-6" viewBox="0 0 512 512" fill="currentColor">
            <g>
              <path d="M473.818,0.003c0,0-18.578,28.297-139.938,70.172c-123.719,42.688-199.875,216.406-199.875,216.406 c-18.344,35.578-90.813,183.453-90.813,183.453c-19.953,38.172,16.625,60.734,38.063,21.313 c41.156-75.703,67.688-144.875,130.25-146.844c91.219-2.875,153.609-84.109,133.984-80.359 c-25.844,11.484-82.781,0.875-49.234-4.391c80.531-6.594,130.125-68.297,113.969-72.5c-28.563,11.219-55.172,0.578-60.391-2.656 C491.959,166.987,473.818,0.003,473.818,0.003z"></path>
            </g>
          </svg>
        </button>
        <button className="btn rounded-full">
          <QrCodeIcon className="w-6 h-6" />
        </button>
      </div>
      </div>
      <UserEmber />
    </aside>
  );
}