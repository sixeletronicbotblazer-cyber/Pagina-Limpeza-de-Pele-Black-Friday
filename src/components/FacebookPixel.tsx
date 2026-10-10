import Script from "next/script";

const PIXEL_ID = "900080772936894";

/**
 * Facebook Pixel (Meta Pixel) — base code.
 * Loaded once on the client. PageView is fired automatically by fbq('init', ..., {})
 * because Meta recommends sending a PageView right after init.
 *
 * Pixel ID: 900080772936894
 */
export default function FacebookPixel() {
  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`
        (function() {
          if (window.__fbPixelLoaded) return;
          window.__fbPixelLoaded = true;
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
          document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${PIXEL_ID}');
          fbq('track', 'PageView');
        })();
      `}
    </Script>
  );
}

/**
 * Fire a custom Meta Pixel event from client-side interactions.
 */
export function trackPixel(event: string, data?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { fbq?: (...args: unknown[]) => void };
  if (w.fbq) {
    if (data) w.fbq("track", event, data);
    else w.fbq("track", event);
  }
}
