
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info, Linkedin } from "lucide-react";

interface InfoDialogProps {
  userName: string;
}

export const InfoDialog: React.FC<InfoDialogProps> = ({ userName }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full bg-white/20 hover:bg-white/30">
          <Info className="h-5 w-5 text-white" />
          <span className="sr-only">About this app</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>About this Weather App</DialogTitle>
          <DialogDescription>
            Developed by Vinay Kumar
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-sm">
            This weather app was created as part of the Product Manager Accelerator program.
          </p>
          
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-medium text-sm mb-2">About PM Accelerator</h3>
            <p className="text-sm text-muted-foreground mb-4">
              PM Accelerator helps professionals transition into product management roles through 
              hands-on experience, mentorship, and real-world product development. 
              Our program accelerates your journey to becoming a successful product manager.
            </p>
            
            <a 
              href="https://www.linkedin.com/school/pmaccelerator/"
              target="_blank"
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <Linkedin size={16} />
              Visit PM Accelerator on LinkedIn
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
