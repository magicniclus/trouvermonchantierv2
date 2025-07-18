"use client";

import Script from "next/script";
import { useEffect } from "react";

export default function ChatWidget() {
  return (
    <>
      <Script
        src="https://widgets.leadconnectorhq.com/loader.js"
        data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
        data-widget-id="6877b4e88bb9bcf918cbdefe"
        strategy="lazyOnload"
      />
    </>
  );
}
