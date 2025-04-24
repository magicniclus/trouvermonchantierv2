/* eslint-disable @next/next/no-img-element */

"use client";

import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { PhoneIcon, PlayCircleIcon } from "@heroicons/react/20/solid";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const products = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: ArrowPathIcon,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Nav = ({ withMenu }: { withMenu?: boolean }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-5xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Trouver mon chantier</span>
            <img className="h-8 w-auto" src="/logo.png" alt="terabois" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        {withMenu !== false && (
          <PopoverGroup className="hidden lg:flex lg:gap-x-12">
            <a
              href="#why"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Comment ça marche ?
            </a>
            <a
              href="#avantages"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Ce que vous gagnez
            </a>
            <a
              href=""
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              F.A.Q
            </a>
          </PopoverGroup>
        )}
        {withMenu !== false && (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="#pricing"
              className="block px-6 py-3 text-base font-semibold bg-yellow-500 hover:bg-yellow-400 text-white rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Obtenir mes chantiers
            </a>
          </div>
        )}
      </nav>
      <Dialog
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Trouver mon chantier</span>
              <img
                className="h-8 w-auto"
                src="/favicon.png"
                alt="Trouver mon chantier"
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              {withMenu !== false && (
                <div className="space-y-2 py-6">
                  <a
                    href="#why"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Comment ça marche ?
                  </a>
                  <a
                    href="#avantages"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Ce que vous gagnez
                  </a>
                  <a
                    href="#faq"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    F.A.Q
                  </a>
                </div>
              )}
              {withMenu !== false && (
                <div className="py-6 px-4">
                  <a
                    href="#pricing"
                    className="block w-full text-center px-6 py-4 text-base font-semibold bg-yellow-500 hover:bg-yellow-400 text-white rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl mx-auto"
                  >
                    Obtenir mes chantiers
                  </a>
                </div>
              )}
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Nav;
