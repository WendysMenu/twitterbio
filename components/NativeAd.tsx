'use client';
import { useEffect } from 'react';

export default function NativeAd() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://pl31351417.profitableratecpmnetwork.com/2e7082e789ee952c6c92ca80807feec2/invoke.js';
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    document.body.appendChild(script);
  }, []);

  return (
    <div className="my-6 flex justify-center items-center">
      <div id="container-2e7082e789ee952c6c92ca80807feec2"></div>
    </div>
  );
}
