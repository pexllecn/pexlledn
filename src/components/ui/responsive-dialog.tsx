"use client";

import * as React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

/**
 * A Dialog on desktop, a bottom Drawer on mobile — the same responsive
 * pattern used on the sign-in page. API mirrors Dialog so it's a drop-in.
 * The breakpoint decision is shared via context so every sub-part agrees.
 */
const DesktopContext = React.createContext(false);
const useIsDesktop = () => React.useContext(DesktopContext);

type RootProps = React.ComponentProps<typeof Dialog>;

function ResponsiveDialog({ children, ...props }: RootProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const Root = isDesktop ? Dialog : Drawer;
  return (
    <DesktopContext.Provider value={isDesktop}>
      <Root {...props}>{children}</Root>
    </DesktopContext.Provider>
  );
}

function ResponsiveDialogTrigger({
  children,
  ...props
}: React.ComponentProps<typeof DialogTrigger>) {
  const Trigger = useIsDesktop() ? DialogTrigger : DrawerTrigger;
  return <Trigger {...props}>{children}</Trigger>;
}

function ResponsiveDialogClose({
  children,
  ...props
}: React.ComponentProps<typeof DialogClose>) {
  const Close = useIsDesktop() ? DialogClose : DrawerClose;
  return <Close {...props}>{children}</Close>;
}

function ResponsiveDialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogContent>) {
  const isDesktop = useIsDesktop();
  if (isDesktop) {
    return (
      <DialogContent className={className} {...props}>
        {children}
      </DialogContent>
    );
  }
  return (
    <DrawerContent>
      <div className="mx-auto w-full max-w-lg px-4 pb-2">{children}</div>
    </DrawerContent>
  );
}

function ResponsiveDialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const Header = useIsDesktop() ? DialogHeader : DrawerHeader;
  return <Header className={cn(!useIsDesktop() && "px-0 text-left", className)} {...props} />;
}

function ResponsiveDialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const Footer = useIsDesktop() ? DialogFooter : DrawerFooter;
  return <Footer className={cn(!useIsDesktop() && "px-0", className)} {...props} />;
}

function ResponsiveDialogTitle({
  ...props
}: React.ComponentProps<typeof DialogTitle>) {
  const Title = useIsDesktop() ? DialogTitle : DrawerTitle;
  return <Title {...props} />;
}

function ResponsiveDialogDescription({
  ...props
}: React.ComponentProps<typeof DialogDescription>) {
  const Description = useIsDesktop() ? DialogDescription : DrawerDescription;
  return <Description {...props} />;
}

/** Optional body wrapper for content between header and footer. */
function ResponsiveDialogBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={className} {...props} />;
}

export {
  ResponsiveDialog,
  ResponsiveDialogTrigger,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogFooter,
  ResponsiveDialogTitle,
  ResponsiveDialogDescription,
  ResponsiveDialogClose,
  ResponsiveDialogBody,
};
