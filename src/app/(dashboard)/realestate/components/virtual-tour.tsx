import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface VirtualTourProps {
  open: boolean;
  onClose: () => void;
  url: string;
}

export function VirtualTour({ open, onClose, url }: VirtualTourProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Virtual Tour</DialogTitle>
        </DialogHeader>
        <div className="aspect-video">
          <iframe
            src={url}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

