"use client";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { comments } from "@/lib/db/schema";
import { z } from "zod";

const formSchema = createInsertSchema(comments);
type FormSchema = z.input<typeof formSchema>;

// https://api.ipify.org?format=json
export const AddComment = ({ post_slug }: { post_slug: string }) => {
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
        <div className="space-y-4">
          <div>
            <Label className="sr-only" htmlFor="user_name">
              Name
            </Label>
            <Input
              className="w-full font-semibold"
              id="user_name"
              placeholder="Name"
            />
          </div>
          <div>
            <Label className="sr-only" htmlFor="comment">
              Comment
            </Label>
            <Textarea
              className="min-h-[100px] w-full resize-none"
              id="comment"
              placeholder="Your comment"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="w-full bg-blue-500 text-white hover:bg-blue-600"
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
