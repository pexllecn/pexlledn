"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import GoogleSignInButton from "@/components/github-auth-button";

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" })
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const defaultValues = {
    email: ""
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);
    // TODO: Implement actual sign-in logic
    console.log("Sign in with email:", data.email);
    router.push("/dashboard");
    setLoading(false);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="bg-background border-none"
                    type="email"
                    placeholder="Enter your email..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} className="ml-auto w-full" type="submit">
            Continue with email
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="px-2 text-muted-foreground">Or continue </span>
        </div>
      </div>
      <Button
        disabled={loading}
        className="ml-auto w-full"
        type="button"
        onClick={() => router.push("/dashboard")}
      >
        Without email
      </Button>
      <GoogleSignInButton />
    </>
  );
}
