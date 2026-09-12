"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUp, Bell, CalendarDays, ChevronRight, Download, MoreHorizontal, Search, ShoppingBag, Users, WalletCards, Zap } from "lucide-react";

const metrics = [
  { label: "Revenue", value: "$48,290", delta: "12.4%", up: true, icon: WalletCards, color: "#0071e3", data: "2,27 20,22 38,24 56,12 73,16 98,3" },
  { label: "Customers", value: "2,491", delta: "8.2%", up: true, icon: Users, color: "#34c759", data: "2,25 20,26 38,18 56,21 73,9 98,5" },
  { label: "Orders", value: "1,624", delta: "4.1%", up: true, icon: ShoppingBag, color: "#af52de", data: "2,24 20,18 38,22 56,10 73,13 98,4" },
  { label: "Conversion", value: "3.82%", delta: "0.6%", up: false, icon: Zap, color: "#ff9f0a", data: "2,7 20,10 38,8 56,16 73,13 98,23" },
];
const bars = [42, 58, 48, 72, 62, 84, 76, 96, 82, 104, 98, 126];
const orders = [
  ["Emma Wilson", "Aura Headphones", "$299.00", "/avatar-40-01.jpg", "Paid"],
  ["Noah Martin", "Studio Display", "$1,599.00", "/avatar-40-02.jpg", "Paid"],
  ["Olivia Chen", "Magic Keyboard", "$199.00", "/avatar-40-03.jpg", "Pending"],
  ["Liam Davis", "AirTag 4 Pack", "$99.00", "/avatar-40-04.jpg", "Paid"],
];

export default function Dashboard() {
  const [range, setRange] = useState("Month");
  return <div className="apple-page">
    <header className="apple-topbar">
      <div className="flex items-center gap-2 text-sm font-semibold"><span className="h-2.5 w-2.5 rounded-full bg-[#34c759]"/>Pexlle</div>
      <div className="flex items-center gap-2"><button className="apple-icon-button" aria-label="Search"><Search size={17}/></button><button className="apple-icon-button relative" aria-label="Notifications"><Bell size={17}/><span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-zinc-900"/></button><img src="/profile.jpg" alt="Profile" className="h-9 w-9 rounded-full object-cover ring-1 ring-black/10"/></div>
    </header>
    <main className="mx-auto max-w-[1450px] apple-enter">
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm font-medium text-[#0071e3]">Friday, September 12</p><h1 className="apple-title">Good morning, Alex.</h1><p className="apple-subtitle">Here’s what’s happening with your business today.</p></div><div className="flex gap-2"><button className="apple-icon-button w-auto gap-2 px-4"><CalendarDays size={16}/> This month</button><button className="apple-button"><Download size={15}/> Export</button></div></div>
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{metrics.map((m,i)=><motion.article initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*.06}} className="apple-card p-5" key={m.label}><div className="flex items-start justify-between"><span className="grid h-9 w-9 place-items-center rounded-xl" style={{background:`${m.color}18`,color:m.color}}><m.icon size={18}/></span><span className={`flex items-center text-xs font-semibold ${m.up?"text-[#248a3d]":"text-[#d70015]"}`}>{m.up?<ArrowUp size={12}/>:<ArrowDown size={12}/>} {m.delta}</span></div><p className="mt-5 text-[13px] text-muted-foreground">{m.label}</p><div className="mt-1 flex items-end justify-between"><strong className="text-[27px] tracking-tight">{m.value}</strong><svg className="h-8 w-24" viewBox="0 0 100 30"><polyline points={m.data} fill="none" stroke={m.color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg></div></motion.article>)}</section>
      <section className="mt-3 grid gap-3 xl:grid-cols-[1.75fr_1fr]">
        <article className="apple-card p-5 sm:p-6"><div className="flex items-start justify-between"><div><h2 className="font-semibold">Revenue overview</h2><p className="mt-1 text-xs text-muted-foreground">Your performance over the last 12 months</p></div><div className="apple-segment">{["Week","Month","Year"].map(x=><button key={x} data-active={range===x} onClick={()=>setRange(x)}>{x}</button>)}</div></div><div className="mt-7 flex h-56 items-end gap-[3%] border-b border-black/5 px-2 dark:border-white/5">{bars.map((h,i)=><motion.div initial={{height:0}} animate={{height:`${h/1.35}%`}} transition={{delay:.15+i*.035,duration:.55,ease:[.22,1,.36,1]}} key={i} className="group relative flex-1 rounded-t-md bg-gradient-to-t from-[#0071e3] to-[#58a8f5] opacity-90 hover:opacity-100"><span className="absolute -top-7 left-1/2 hidden -translate-x-1/2 rounded bg-black px-2 py-1 text-[10px] text-white group-hover:block">${(h*392).toLocaleString()}</span></motion.div>)}</div><div className="mt-3 flex justify-between px-2 text-[10px] text-muted-foreground">{"JFMAMJJASOND".split("").map((x,i)=><span key={i}>{x}</span>)}</div></article>
        <article className="apple-card overflow-hidden"><div className="flex items-center justify-between p-5 pb-4"><div><h2 className="font-semibold">Sales by channel</h2><p className="mt-1 text-xs text-muted-foreground">This month</p></div><button className="apple-icon-button"><MoreHorizontal size={17}/></button></div><div className="grid place-items-center py-2"><div className="relative grid h-40 w-40 place-items-center rounded-full" style={{background:"conic-gradient(#0071e3 0 46%,#34c759 46% 72%,#af52de 72% 89%,#ff9f0a 89%)"}}><div className="grid h-[112px] w-[112px] place-items-center rounded-full bg-white text-center dark:bg-[#161617]"><div><strong className="text-2xl">$48.3k</strong><p className="text-[11px] text-muted-foreground">Total sales</p></div></div></div></div><div className="grid grid-cols-2 gap-y-3 p-6 pt-4 text-xs">{[["Online","46%","#0071e3"],["Retail","26%","#34c759"],["Partners","17%","#af52de"],["Other","11%","#ff9f0a"]].map(x=><div key={x[0]} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{background:x[2]}}/><span className="text-muted-foreground">{x[0]}</span><b>{x[1]}</b></div>)}</div></article>
      </section>
      <section className="mt-3 apple-card overflow-hidden"><div className="flex items-center justify-between border-b border-black/5 p-5 dark:border-white/5"><div><h2 className="font-semibold">Recent orders</h2><p className="mt-1 text-xs text-muted-foreground">Latest activity across your store</p></div><button className="flex items-center gap-1 text-sm font-medium text-[#0071e3]">View all <ChevronRight size={15}/></button></div><div>{orders.map((o,i)=><div className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-black/5 px-5 py-3.5 last:border-0 sm:grid-cols-[1.2fr_1fr_.6fr_.4fr] dark:border-white/5" key={o[0]}><div className="flex items-center gap-3"><img src={o[3]} alt="" className="h-9 w-9 rounded-full object-cover"/><div><p className="text-sm font-medium">{o[0]}</p><p className="text-xs text-muted-foreground sm:hidden">{o[1]}</p></div></div><p className="hidden text-sm text-muted-foreground sm:block">{o[1]}</p><p className="text-right text-sm font-medium sm:text-left">{o[2]}</p><span className={`hidden w-fit rounded-full px-2 py-1 text-[11px] font-medium sm:block ${o[4]==="Paid"?"bg-green-500/10 text-green-600":"bg-orange-500/10 text-orange-600"}`}>{o[4]}</span></div>)}</div></section>
    </main>
  </div>
}
