'use client';

import { useEffect } from 'react';

export default function BookingCalendar() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    script.type = 'text/javascript';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  return (
    <iframe
      src="https://api.leadconnectorhq.com/widget/booking/xbAWRdcBrAyMV5p9i6EV"
      style={{ width: '100%', border: 'none', overflow: 'hidden' }}
      scrolling="no"
      id="xbAWRdcBrAyMV5p9i6EV_1775780505569"
      height="700"
    />
  );
}
