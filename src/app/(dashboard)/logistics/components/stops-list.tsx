interface Stop {
  city: string;
  state: string;
  zip: string;
  address: string;
}

interface StopsListProps {
  stops: Stop[];
}

export function StopsList({ stops }: StopsListProps) {
  return (
    <div className="space-y-4">
      {stops.map((stop, index) => (
        <div key={index} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div
                className={`w-3 h-3 rounded-full ${
                  index === 0 ? "bg-primary" : "border-2 border-primary"
                }`}
              />
              {index < stops.length - 1 && (
                <div className="absolute top-3 left-1.5 w-[1px] h-[calc(100%+16px)] bg-primary" />
              )}
            </div>
          </div>
          <div className="pb-4">
            <div className="font-medium">{`${stop.city}, ${stop.state} ${stop.zip}`}</div>
            <div className="text-sm text-muted-foreground">{stop.address}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
