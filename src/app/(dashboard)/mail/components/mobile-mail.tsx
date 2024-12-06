"use client";

import { useState } from "react";
import { Mail } from "@/app/(dashboard)/mail/data";
import { MailList } from "@/components/mail-list";
import { MailDisplay } from "@/components/mail-display";
import { Button } from "@/components/ui/button";
import { Menu, ArrowLeft, Inbox, Send, File, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface MobileMailProps {
  mails: Mail[];
}

export function MobileMail({ mails }: MobileMailProps) {
  const [selectedMail, setSelectedMail] = useState<Mail | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-between p-4 border-b">
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[80%] sm:w-[385px]">
            <nav className="flex flex-col gap-2">
              <Button variant="ghost" className="justify-start">
                <Inbox className="mr-2 h-4 w-4" />
                Inbox
              </Button>
              <Button variant="ghost" className="justify-start">
                <Send className="mr-2 h-4 w-4" />
                Sent
              </Button>
              <Button variant="ghost" className="justify-start">
                <File className="mr-2 h-4 w-4" />
                Drafts
              </Button>
              <Button variant="ghost" className="justify-start">
                <Trash2 className="mr-2 h-4 w-4" />
                Trash
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
        <h1 className="text-xl font-bold">Mail</h1>
        <div className="w-6" /> {/* Placeholder for balance */}
      </div>

      {selectedMail ? (
        <div className="flex-1 overflow-auto">
          <div className="flex items-center p-4 border-b">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedMail(null)}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h2 className="ml-4 text-lg font-semibold">
              {selectedMail.subject}
            </h2>
          </div>
          <MailDisplay mail={selectedMail} />
        </div>
      ) : (
        <MailList
          items={mails}
          onSelectMail={(mail) => setSelectedMail(mail)}
        />
      )}
    </div>
  );
}
