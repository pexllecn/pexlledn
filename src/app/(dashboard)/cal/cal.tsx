"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Bitcoin, EclipseIcon as Ethereum } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEventSource } from "@/hooks/useEventSource";

const formatNumber = (num: string | number) => {
  const value = typeof num === "string" ? Number.parseFloat(num) : num;
  return new Intl.NumberFormat("en-EU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const formatNumberWithCommas = (value: string) => {
  const parts = value.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

export default function CryptoCalculator() {
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [targetPrice, setTargetPrice] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [aggregatorMode, setAggregatorMode] = useState(false);
  const [selectedToken, setSelectedToken] = useState<"BTC" | "ETH">("BTC");
  // Additional state for other tabs
  const [initialValue, setInitialValue] = useState("0");
  const [targetValue, setTargetValue] = useState("0");
  const [baseNumber, setBaseNumber] = useState("0");
  const [percentageInput, setPercentageInput] = useState("0");

  const { data: priceData, error } = useEventSource(
    `/api/${selectedToken.toLowerCase()}-price-stream`
  );

  useEffect(() => {
    if (priceData) {
      try {
        const parsedData = JSON.parse(priceData);
        if (parsedData.error) {
          console.error("Error fetching price:", parsedData.error);
          setCurrentPrice(null);
        } else {
          setCurrentPrice(Number.parseFloat(parsedData.price));
        }
      } catch (error) {
        console.error("Failed to parse price data:", error);
        setCurrentPrice(null);
      }
    }
  }, [priceData]);

  useEffect(() => {
    if (error) {
      console.error("Error in price stream:", error);
      // Optionally, update UI to show error state
    }
  }, [error]);

  const calculateInvestmentReturn = () => {
    if (!currentPrice || !targetPrice || !investmentAmount)
      return { profit: "0", total: "0", multiplier: "0", percentage: "0" };

    const investment = Number.parseFloat(investmentAmount);
    const target = Number.parseFloat(targetPrice);
    const multiplier = target / currentPrice;
    const result = investment * multiplier;
    const percentageChange = ((result - investment) / investment) * 100;

    return {
      profit: (result - investment).toFixed(2),
      total: result.toFixed(2),
      multiplier: multiplier.toFixed(2),
      percentage: percentageChange.toFixed(2),
    };
  };

  const TokenIcon = selectedToken === "BTC" ? Bitcoin : Ethereum;

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Card className="bg-background shadow-none rounded-md">
        <CardContent className="p-0">
          <Tabs defaultValue="investment" className="w-full">
            <div className="p-6 flex items-center justify-between">
              <TabsList className="grid w-full grid-cols-3 gap-3">
                <TabsTrigger value="investment">Investment</TabsTrigger>
                <TabsTrigger value="target">Target</TabsTrigger>
                <TabsTrigger value="percentage">Percentage</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="investment" className="mt-0">
              <div className="px-6 pb-6 space-y-6">
                <Card className="bg-muted border-none">
                  <CardContent className="p-6">
                    {" "}
                    <div className="space-y-2">
                      <span className="text-muted-foreground text-base">
                        You invest
                      </span>
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={formatNumberWithCommas(investmentAmount)}
                          onChange={(e) => {
                            const numeric = e.target.value
                              .replace(/[^0-9.-]/g, "")
                              .replace(/(\..*)\./g, "$1")
                              .replace(/^(-)*(\d+)\.(\d).*$/, "$1$2.$3");
                            setInvestmentAmount(numeric);
                          }}
                          className="text-4xl font-normal bg-transparent border-none outline-none w-full placeholder:text-gray-200"
                          placeholder="0"
                        />
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="flex items-center bg-background rounded-full px-4 py-2 shadow-sm hover:bg-muted/50 transition-colors">
                              <TokenIcon className="w-6 h-6 text-orange-400 mr-2" />
                              <span className="text-base font-medium">
                                {selectedToken}
                              </span>
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => setSelectedToken("BTC")}
                              className="flex items-center"
                            >
                              <Bitcoin className="w-5 h-5 text-orange-400 mr-2" />
                              <span>BTC</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setSelectedToken("ETH")}
                              className="flex items-center"
                            >
                              <Ethereum className="w-5 h-5 text-orange-400 mr-2" />
                              <span>ETH</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="text-base text-muted-foreground">
                        ≈ €{formatNumber(investmentAmount || 0)}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted border-none">
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      {" "}
                      <span className="text-muted-foreground text-base">
                        Target price
                      </span>
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={formatNumberWithCommas(targetPrice)}
                          onChange={(e) => {
                            const numeric = e.target.value
                              .replace(/[^0-9.-]/g, "")
                              .replace(/(\..*)\./g, "$1")
                              .replace(/^(-)*(\d+)\.(\d).*$/, "$1$2.$3");
                            setTargetPrice(numeric);
                          }}
                          className="text-4xl font-normal bg-transparent border-none outline-none w-full placeholder:text-gray-200"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <div className="space-y-4 text-base">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Current {selectedToken} Price</span>
                      <span>
                        {currentPrice
                          ? `€${formatNumber(currentPrice)}`
                          : "Error loading price"}
                      </span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Balance</span>
                      <span
                        className={cn(
                          "text-2xl font-normal",
                          Number.parseFloat(calculateInvestmentReturn().total) >
                            0
                            ? "text-green-500"
                            : Number.parseFloat(
                                calculateInvestmentReturn().total
                              ) < 0
                            ? "text-red-500"
                            : "text-black"
                        )}
                      >
                        €{formatNumber(calculateInvestmentReturn().total)}
                      </span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Profit/Loss</span>
                      <span
                        className={cn(
                          "text-2xl font-normal",
                          Number.parseFloat(
                            calculateInvestmentReturn().profit
                          ) > 0
                            ? "text-green-500"
                            : Number.parseFloat(
                                calculateInvestmentReturn().profit
                              ) < 0
                            ? "text-red-500"
                            : "text-black"
                        )}
                      >
                        {Number.parseFloat(calculateInvestmentReturn().profit) >
                        0
                          ? "+"
                          : Number.parseFloat(
                              calculateInvestmentReturn().profit
                            ) < 0
                          ? "-"
                          : ""}
                        €
                        {formatNumber(
                          Math.abs(
                            Number.parseFloat(
                              calculateInvestmentReturn().profit
                            )
                          )
                        )}{" "}
                        (
                        {Number.parseFloat(
                          calculateInvestmentReturn().percentage
                        ) > 0
                          ? "+"
                          : Number.parseFloat(
                              calculateInvestmentReturn().percentage
                            ) < 0
                          ? "-"
                          : ""}
                        {Math.abs(
                          Number.parseFloat(
                            calculateInvestmentReturn().percentage
                          )
                        ).toFixed(2)}
                        %)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="target" className="mt-0">
              <div className="px-6 pb-6 space-y-6">
                <Card className="bg-muted border-none">
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      <span className="text-muted-foreground text-base">
                        Initial Value (€)
                      </span>
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={
                            initialValue === "0"
                              ? ""
                              : formatNumberWithCommas(initialValue)
                          }
                          onChange={(e) => {
                            const numeric = e.target.value
                              .replace(/[^0-9.-]/g, "")
                              .replace(/(\..*)\./g, "$1")
                              .replace(/^(-)*(\d+)\.(\d).*$/, "$1$2.$3");
                            setInitialValue(numeric || "0");
                          }}
                          className="text-4xl font-normal bg-transparent border-none outline-none w-full placeholder:text-gray-200"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted border-none">
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      <span className="text-muted-foreground text-base">
                        Target Value (€)
                      </span>
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={
                            targetValue === "0"
                              ? ""
                              : formatNumberWithCommas(targetValue)
                          }
                          onChange={(e) => {
                            const numeric = e.target.value
                              .replace(/[^0-9.-]/g, "")
                              .replace(/(\..*)\./g, "$1")
                              .replace(/^(-)*(\d+)\.(\d).*$/, "$1$2.$3");
                            setTargetValue(numeric || "0");
                          }}
                          className="text-4xl font-normal bg-transparent border-none outline-none w-full placeholder:text-gray-200"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="p-4 rounded-md">
                  <div className="text-right">
                    <div className="text-base text-muted-foreground">
                      Percentage Change
                    </div>
                    <div
                      className={cn(
                        "text-4xl font-normal",
                        initialValue === "0" && targetValue === "0"
                          ? ""
                          : Number.parseFloat(
                              calculatePercentageChange(
                                initialValue,
                                targetValue
                              )
                            ) > 0
                          ? "text-green-500"
                          : Number.parseFloat(
                              calculatePercentageChange(
                                initialValue,
                                targetValue
                              )
                            ) < 0
                          ? "text-red-500"
                          : "text-black"
                      )}
                    >
                      {Number.parseFloat(
                        calculatePercentageChange(initialValue, targetValue)
                      ) > 0
                        ? "+"
                        : Number.parseFloat(
                            calculatePercentageChange(initialValue, targetValue)
                          ) < 0
                        ? "-"
                        : ""}
                      {formatNumber(
                        Math.abs(
                          Number.parseFloat(
                            calculatePercentageChange(initialValue, targetValue)
                          )
                        )
                      )}
                      %
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="percentage" className="mt-0">
              <div className="px-6 pb-6 space-y-6">
                <Card className="bg-muted border-none">
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      <span className="text-muted-foreground text-base">
                        Base Number (€)
                      </span>
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={
                            baseNumber === "0"
                              ? ""
                              : formatNumberWithCommas(baseNumber)
                          }
                          onChange={(e) => {
                            const numeric = e.target.value
                              .replace(/[^0-9.-]/g, "")
                              .replace(/(\..*)\./g, "$1")
                              .replace(/^(-)*(\d+)\.(\d).*$/, "$1$2.$3");
                            setBaseNumber(numeric || "0");
                          }}
                          className="text-4xl font-normal bg-transparent border-none outline-none w-full placeholder:text-gray-200"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted border-none">
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      <span className="text-muted-foreground text-base">
                        Percentage (%)
                      </span>
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={
                            percentageInput === "0"
                              ? ""
                              : formatNumberWithCommas(percentageInput)
                          }
                          onChange={(e) => {
                            const numeric = e.target.value
                              .replace(/[^0-9.-]/g, "")
                              .replace(/(\..*)\./g, "$1")
                              .replace(/^(-)*(\d+)\.(\d).*$/, "$1$2.$3");
                            setPercentageInput(numeric || "0");
                          }}
                          className="text-4xl font-normal bg-transparent border-none outline-none w-full placeholder:text-gray-200"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="p-4 rounded-md">
                  <div className="text-right">
                    <div className="text-base text-muted-foreground">
                      Result
                    </div>
                    <div
                      className={cn(
                        "text-4xl font-normal",
                        baseNumber === "0" && percentageInput === "0"
                          ? ""
                          : Number.parseFloat(
                              calculateFromPercentage(
                                baseNumber,
                                percentageInput
                              )
                            ) > Number.parseFloat(baseNumber)
                          ? "text-green-500"
                          : Number.parseFloat(
                              calculateFromPercentage(
                                baseNumber,
                                percentageInput
                              )
                            ) < Number.parseFloat(baseNumber)
                          ? "text-red-500"
                          : "text-black"
                      )}
                    >
                      €
                      {formatNumber(
                        calculateFromPercentage(baseNumber, percentageInput)
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

const calculatePercentageChange = (initialVal: string, targetVal: string) => {
  const initial = Number.parseFloat(initialVal || "0");
  const target = Number.parseFloat(targetVal || "0");
  if (initial === 0 && target === 0) return "0";
  if (target === 0) return "0"; // Return 0 when there's no target value
  if (initial === 0) return target > 0 ? "100" : "-100";
  const percentageChange = ((target - initial) / Math.abs(initial)) * 100;
  return percentageChange.toFixed(2);
};

const calculateFromPercentage = (baseNum: string, percentageVal: string) => {
  const base = Number.parseFloat(baseNum || "0");
  const percentage = Number.parseFloat(percentageVal || "0");
  const result = base * (1 + percentage / 100);
  return result.toFixed(2);
};
