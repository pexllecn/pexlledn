import { Card } from "@/components/ui/card";

interface ShipmentCardProps {
  loadId: string;
  status: "Delivery" | "Transfer" | "Pick Up";
  from: {
    city: string;
    state: string;
    zip: string;
    address: string;
    dateTime: string;
  };
  to: {
    city: string;
    state: string;
    zip: string;
    address: string;
    dateTime: string;
  };
  isSelected?: boolean;
}

export function ShipmentCard({
  loadId,
  status,
  from,
  to,
  isSelected,
}: ShipmentCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivery":
        return "bg-emerald-500/10 border-emerald-500/20 text-emerald-500";
      case "Transfer":
        return "bg-blue-500/10 border-blue-500/20 text-blue-500";
      case "Pick Up":
        return "bg-orange-500/10 border-orange-500/20 text-orange-500";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Card
      className={`p-4 mb-4 hover:bg-accent/50 transition-colors rounded-lg ${
        isSelected ? "border-primary bg-primary/15 border" : ""
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Load ID:</span>
          <span className="font-medium">{loadId}</span>
        </div>
        <span
          className={`px-3 py-1 rounded-lg text-sm ${getStatusColor(status)}`}
        >
          {status}
        </span>
      </div>
      <div className="space-y-4">
        <div className="flex items-start gap-2">
          <div className="mt-2 w-2 h-2 rounded-full bg-primary" />
          <div>
            <div className="font-medium">{`${from.city}, ${from.state} ${from.zip}`}</div>
            <div className="text-sm text-muted-foreground">{from.address}</div>
            <div className="text-sm text-muted-foreground">{from.dateTime}</div>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <div className="mt-2 w-2 h-2 rounded-full border-2 border-primary" />
          <div>
            <div className="font-medium">{`${to.city}, ${to.state} ${to.zip}`}</div>
            <div className="text-sm text-muted-foreground">{to.address}</div>
            <div className="text-sm text-muted-foreground">{to.dateTime}</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
