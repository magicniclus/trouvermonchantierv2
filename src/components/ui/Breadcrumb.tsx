import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

export interface BreadcrumbPage {
  name: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbProps {
  pages: BreadcrumbPage[];
}

export default function Breadcrumb({ pages }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex mb-6 max-w-6xl mx-auto md:px-12">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link href="/" className="text-gray-400 hover:text-gray-500">
              <HomeIcon aria-hidden="true" className="size-5 shrink-0" />
              <span className="sr-only">Accueil</span>
            </Link>
          </div>
        </li>
        {pages.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <ChevronRightIcon aria-hidden="true" className="size-5 shrink-0 text-gray-400" />
              <Link
                href={page.href}
                aria-current={page.current ? 'page' : undefined}
                className={
                  'ml-4 text-sm font-medium ' +
                  (page.current
                    ? 'text-gray-700 font-semibold'
                    : 'text-gray-500 hover:text-gray-700')
                }
                title={page.name}
              >
                {page.name.length > 15 ? `${page.name.slice(0, 15)}…` : page.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
