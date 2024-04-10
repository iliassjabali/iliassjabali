"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogContent,
  Dialog,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createInsertSchema } from "drizzle-zod";
import { comments } from "@/lib/db/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { z } from "zod";

const formSchema = createInsertSchema(comments);
type formType = z.input<typeof formSchema>;

// https://api.ipify.org?format=json
export const AddComment = ({ post_slug }: { post_slug: string }) => {
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      post_slug,
    },
  });
  function onSubmit(values: formType) {
    console.log("values", values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost">
          Add comment
        </Button>
      </DialogTrigger>
      <DialogContent className="space-y-6 rounded-lg bg-white p-6 text-gray-800 shadow-lg  sm:max-w-sm">
        <DialogHeader className="text-lg font-semibold">
          <DialogTitle>Add your comment</DialogTitle>
          <DialogDescription>
            Enter your name and comment below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="user_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? undefined} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comment"
              defaultValue={""}
              render={({ field }) => (
                <FormItem>
                  <Label>Comment</Label>
                  <Textarea {...field} value={field.value ?? undefined} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            type="submit"
            className="w-full bg-blue-500 text-white hover:bg-blue-600"
            onClick={form.handleSubmit(onSubmit)}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
