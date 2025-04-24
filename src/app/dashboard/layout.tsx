"use client";

import { Loader } from "@/components/ui/loader";
import { auth } from "@/firebase/firebase.config";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { signOut } from "firebase/auth";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const defaultNavigation = [
  { name: "Tableau de bord", href: "/dashboard" },
  { name: "Mon site", href: "/dashboard/site" },
  { name: "Google Ads", href: "/dashboard/google-ads" },
  { name: "CRM", href: "/dashboard/crm" },
  { name: "Contact", href: "/dashboard/contact" },
];

const handleSignOut = async () => {
  try {
    await signOut(auth);
    window.location.href = "/auth";
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error);
  }
};

const userNavigation = [
  { name: "Paramètres", href: "/dashboard/settings" },
  { name: "Déconnexion", onClick: handleSignOut },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [user, setUser] = useState(auth.currentUser);
  const pathname = usePathname();

  useEffect(() => {
    console.log("Dashboard layout: Setting up auth listener");
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("Dashboard layout: Auth state changed:", user?.uid);
      setUser(user);
      setAuthChecked(true);

      if (!user) {
        console.log("Dashboard layout: No user, redirecting to login");
        router.push("/auth");
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (!authChecked) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  const navigation = defaultNavigation.map((item) => ({
    ...item,
    current: pathname === item.href,
  }));

  const getCurrentPageTitle = () => {
    const currentPage = navigation.find((item) => item.current);
    if (pathname === "/dashboard/settings") return "Paramètres";
    return currentPage ? currentPage.name : "Tableau de bord";
  };

  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
      </head>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Image
                        className="h-8 w-auto"
                        src="/favicon.png"
                        alt="Trouver mon chantier"
                        width={32}
                        height={32}
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Voir les notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">
                              Ouvrir le menu utilisateur
                            </span>
                            <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center">
                              <UserIcon
                                className="h-5 w-5 text-gray-300"
                                aria-hidden="true"
                              />
                            </div>
                          </Menu.Button>
                        </div>
                        <Transition
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) =>
                                  item.href ? (
                                    <a
                                      href={item.href}
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      {item.name}
                                    </a>
                                  ) : (
                                    <button
                                      onClick={item.onClick}
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block w-full text-left px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      {item.name}
                                    </button>
                                  )
                                }
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Ouvrir le menu principal</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Transition
                enter="transition duration-150 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-100 ease-in"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="md:hidden">
                  <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                    {navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "block rounded-md px-3 py-2 text-base font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                  <div className="border-t border-gray-700 pb-3 pt-4">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center">
                          <UserIcon
                            className="h-6 w-6 text-gray-300"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium text-white">
                          Utilisateur
                        </div>
                        <div className="text-sm font-medium text-gray-400">
                          user@example.com
                        </div>
                      </div>
                      <button
                        type="button"
                        className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Voir les notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      {userNavigation.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as="button"
                          onClick={
                            item.onClick ||
                            (() => (window.location.href = item.href || ""))
                          }
                          className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                  </div>
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>

        <main className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-sm">
              <div className="px-4 py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                  {getCurrentPageTitle()}
                </h1>
              </div>
            </div>
            <div className="mt-8">{children}</div>
          </div>
        </main>
      </div>
    </html>
  );
}
