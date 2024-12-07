"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon, MinusIcon } from "lucide-react";

export function MapView() {
  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d211747.0556443474!2d-118.51437799519287!3d34.16126055444683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x80c2c5d3e1e0e1d1%3A0x45f5e2d9b3b39c8c!2sLos%20Angeles%2C%20CA%2090063!3m2!1d34.0522342!2d-118.2436849!4m5!1s0x80e8247b58b20c27%3A0x87fac31f357f0e85!2sThousand%20Oaks%2C%20CA%2091362!3m2!1d34.1705609!2d-118.8375937!5e0!3m2!1sen!2sus!4v1628897660952!5m2!1sen!2sus"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
