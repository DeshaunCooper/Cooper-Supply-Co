"use client";

import Script from "next/script";
import { affirmConfig } from "@/lib/affirm";

export function AffirmProvider() {
  if (!affirmConfig.publicApiKey) return null;

  const config = {
    public_api_key: affirmConfig.publicApiKey,
    script: affirmConfig.jsUrl,
  };

  return (
    <Script
      id="affirm-config"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          var _affirm_config = ${JSON.stringify(config)};
          (function(m,g,n,d,a,e,h,c){
            var b=m[n]||{},k=document.createElement(e),p=document.getElementsByTagName(e)[0],l=function(a,b,c){return function(){a[b]._.push([c,arguments])}};
            b[d]=l(b,d,"set");
            var f=b[d];b[a]={};b[a]._=[];f._=[];b._=[];
            b[a][c]=l(b,a,c);for(h in {set:set,add:1,save:1,post:1,open:1,empty:1,reset:1,on:1,off:1,trigger:1,ready:1,ui:1,jsReady:1}){b[h]=l(b,h,h)};
            k.async=!0;k.src=g[e];p.parentNode.insertBefore(k,p);delete g[e];f(g);m[n]=b
          })(window,_affirm_config,"affirm","checkout","ui","script","ready","ready");
        `,
      }}
    />
  );
}
