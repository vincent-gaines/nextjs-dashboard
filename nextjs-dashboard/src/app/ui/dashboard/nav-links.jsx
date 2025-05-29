'use client';
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/ui/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/ui/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/ui/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
/* Now it’s time to dive into how exactly the <Link> component works in Next.js for navigating 
between the pages:

Automatic code-splitting by route segments: Next.js automatically divides your application's code 
based on its routes. Unlike traditional React SPAs, where all code is loaded up front, Next.js 
loads only the code necessary for the current route. It optimizes the initial page load time
 because the browser downloads only the required code, improving performance.
Isolated pages: By splitting code by routes, each page becomes isolated. This means that if 
there's an error on one page, it won't affect the functionality of other pages. This feature 
enhances the reliability and robustness of your application, as errors are contained and isolated 
to specific pages.
Prefetching: Next.js takes navigation optimization further by prefetching the code for linked 
routes in production. When <Link> components are visible in the browser's viewport, Next.js
 automatically starts fetching the code for the linked route in the background. This prefetching
  process ensures that when the user selects a link, the code for the destination page is already 
  loaded, resulting in near-instant page transitions. This prefetching mechanism enhances the 
  perceived speed of your application and provides a smoother user experience. */