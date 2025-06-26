"use client";
import React from "react";
import { Disclosure } from "@headlessui/react";
import { PlusSmallIcon, MinusSmallIcon } from "@heroicons/react/24/outline";

interface FAQDropdownProps {
  question: string;
  children: React.ReactNode;
}

export default function FAQDropdown({ question, children }: FAQDropdownProps) {
  return (
    <dl className="divide-y divide-gray-900/10">
      <Disclosure as="div" className="py-6 first:pt-0 last:pb-0">
        {({ open }) => (
          <>
            <dt>
              <Disclosure.Button className="group flex w-full items-start justify-between text-left text-gray-900">
                <span className="text-base/7 font-semibold">{question}</span>
                <span className="ml-6 flex h-7 items-center">
                  {!open ? (
                    <PlusSmallIcon aria-hidden="true" className="size-6" />
                  ) : (
                    <MinusSmallIcon aria-hidden="true" className="size-6" />
                  )}
                </span>
              </Disclosure.Button>
            </dt>
            <Disclosure.Panel as="dd" className="mt-2">
              <div className="text-base/7 text-gray-600">{children}</div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </dl>
  );
}

