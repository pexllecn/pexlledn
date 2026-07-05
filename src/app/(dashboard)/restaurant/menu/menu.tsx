"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import MultipleSelector from "@/components/ui/multiselect";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Flame,
  Leaf,
  Pencil,
  Plus,
  Search,
  Star,
  Trash2,
} from "lucide-react";

const dietaryOptions = [
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "gluten-free", label: "Gluten-free" },
  { value: "spicy", label: "Spicy" },
  { value: "nut-free", label: "Nut-free" },
  { value: "signature", label: "Signature" },
];

type Dish = {
  name: string;
  category: "Starters" | "Mains" | "Desserts" | "Drinks";
  price: string;
  desc: string;
  veg: boolean;
  spicy: boolean;
  popular: boolean;
  available: boolean;
  emoji: string;
};

const dishes: Dish[] = [
  { name: "Caprese Salad", category: "Starters", price: "$14", desc: "Buffalo mozzarella, heirloom tomato, basil", veg: true, spicy: false, popular: false, available: true, emoji: "🥗" },
  { name: "Crispy Calamari", category: "Starters", price: "$16", desc: "Lemon aioli, chili flakes", veg: false, spicy: true, popular: true, available: true, emoji: "🦑" },
  { name: "Truffle Tagliatelle", category: "Mains", price: "$28", desc: "Fresh pasta, black truffle, parmesan", veg: true, spicy: false, popular: true, available: true, emoji: "🍝" },
  { name: "Wagyu Burger", category: "Mains", price: "$24", desc: "Aged cheddar, caramelised onion, brioche", veg: false, spicy: false, popular: true, available: true, emoji: "🍔" },
  { name: "Miso Salmon", category: "Mains", price: "$29", desc: "Glazed salmon, bok choy, sesame", veg: false, spicy: false, popular: false, available: false, emoji: "🐟" },
  { name: "Tiramisu", category: "Desserts", price: "$11", desc: "Mascarpone, espresso, cocoa", veg: true, spicy: false, popular: true, available: true, emoji: "🍰" },
  { name: "Dark Chocolate Fondant", category: "Desserts", price: "$12", desc: "Molten centre, vanilla gelato", veg: true, spicy: false, popular: false, available: true, emoji: "🍫" },
  { name: "Negroni", category: "Drinks", price: "$15", desc: "Gin, campari, sweet vermouth", veg: true, spicy: false, popular: false, available: true, emoji: "🍸" },
];

export default function MenuPage() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const [avail, setAvail] = useState(dishes.map((d) => d.available));

  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  const filtered = dishes.filter((d) => {
    const q = d.name.toLowerCase().includes(query.toLowerCase());
    const c = cat === "All" || d.category === cat;
    return q && c;
  });

  return (
    <ContentLayout title="Menu">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={variants}
      >
        <div className="flex-1 space-y-4 lg:p-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-3xl font-normal">Menu</h2>
              <p className="text-muted-foreground mt-1">
                {dishes.length} dishes · toggle availability in real time
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add dish
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                  <DialogTitle>Add a dish</DialogTitle>
                  <DialogDescription>
                    New dishes appear on the menu once available.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-2">
                  <div className="grid gap-2">
                    <Label htmlFor="dish-name">Name</Label>
                    <Input id="dish-name" placeholder="e.g. Lobster Ravioli" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="dish-desc">Description</Label>
                    <Textarea
                      id="dish-desc"
                      placeholder="Short, appetising description…"
                      rows={2}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="dish-price">Price</Label>
                      <Input id="dish-price" placeholder="$0" />
                    </div>
                    <div className="grid gap-2">
                      <Label>Course</Label>
                      <RadioGroup
                        defaultValue="Mains"
                        className="flex flex-wrap gap-2"
                      >
                        {["Starters", "Mains", "Desserts"].map((c) => (
                          <Label
                            key={c}
                            className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs cursor-pointer has-[:checked]:border-primary/50 has-[:checked]:bg-primary/5"
                          >
                            <RadioGroupItem
                              value={c}
                              className="sr-only"
                            />
                            {c}
                          </Label>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Dietary tags</Label>
                    <MultipleSelector
                      defaultOptions={dietaryOptions}
                      placeholder="Add tags…"
                      badgeClassName="bg-primary/15 text-primary"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button onClick={() => toast.success("Dish added to menu")}>
                      Save dish
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>Menu</MenubarTrigger>
              <MenubarContent>
                <MenubarItem onClick={() => toast("New menu created")}>
                  New menu <MenubarShortcut>⌘N</MenubarShortcut>
                </MenubarItem>
                <MenubarItem onClick={() => toast.success("Menu duplicated")}>
                  Duplicate
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem onClick={() => toast.success("Menu published")}>
                  Publish <MenubarShortcut>⌘P</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Edit</MenubarTrigger>
              <MenubarContent>
                <MenubarItem onClick={() => toast("Reordering enabled")}>
                  Reorder dishes
                </MenubarItem>
                <MenubarItem onClick={() => toast("Bulk price update")}>
                  Bulk edit prices
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>View</MenubarTrigger>
              <MenubarContent>
                <MenubarItem onClick={() => toast("Previewing customer view")}>
                  Customer preview
                </MenubarItem>
                <MenubarItem onClick={() => toast("QR code generated")}>
                  Generate QR code
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>

          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1 md:max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search dishes..."
                className="pl-9"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Tabs value={cat} onValueChange={setCat}>
              <TabsList>
                <TabsTrigger value="All">All</TabsTrigger>
                <TabsTrigger value="Starters">Starters</TabsTrigger>
                <TabsTrigger value="Mains">Mains</TabsTrigger>
                <TabsTrigger value="Desserts">Desserts</TabsTrigger>
                <TabsTrigger value="Drinks">Drinks</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((d) => {
              const idx = dishes.indexOf(d);
              return (
                <Card key={d.name} className="bg-muted border-none">
                  <CardHeader className="flex flex-row items-start gap-3 space-y-0 pb-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-background/60 text-2xl">
                      {d.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-base truncate">
                          {d.name}
                        </CardTitle>
                        {d.popular && (
                          <Star className="h-3.5 w-3.5 fill-current text-[#f5a623]" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {d.desc}
                      </p>
                    </div>
                    <span className="text-lg tabular-nums">{d.price}</span>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2 pb-3">
                    <Badge variant="secondary" className="text-1xs">
                      {d.category}
                    </Badge>
                    {d.veg && (
                      <Badge variant="success" className="text-1xs gap-1">
                        <Leaf className="h-3 w-3" />
                        Veg
                      </Badge>
                    )}
                    {d.spicy && (
                      <Badge variant="decline" className="text-1xs gap-1">
                        <Flame className="h-3 w-3" />
                        Spicy
                      </Badge>
                    )}
                  </CardContent>
                  <CardFooter className="justify-between border-t pt-3">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={avail[idx]}
                        onCheckedChange={(v) => {
                          setAvail((prev) =>
                            prev.map((t, j) => (j === idx ? v : t))
                          );
                          toast[v ? "success" : "warning"](
                            `${d.name} ${v ? "available" : "86'd"}`
                          );
                        }}
                      />
                      <span className="text-xs text-muted-foreground">
                        {avail[idx] ? "Available" : "Sold out"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => toast(`Editing ${d.name}`)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Remove {d.name}?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This takes the dish off every menu immediately.
                              You can add it back later.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                toast.error(`${d.name} removed from menu`)
                              }
                            >
                              Remove
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
