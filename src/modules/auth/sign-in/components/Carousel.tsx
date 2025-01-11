import { Button } from "@nextui-org/react";
import React from "react";

export const Carousel = () => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 text-white h-full">
      <div className="relative z-10 px-8 py-12 h-full flex flex-col justify-between min-h-[400px]">
        <div className="absolute top-4 right-4 bg-white/10 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
          WHAT&apos;S NEW?
        </div>
        <div className="space-y-4 mt-12">
          <h2 className="text-4xl font-semibold">15 new integrations added</h2>
          <p className="text-white/80">
            You asked and we listened! We&apos;ve added a bunch of new
            integrations to speed up your workflow.
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            <div className="w-8 h-1.5 bg-white rounded-full" />
            <div className="w-8 h-1.5 bg-white/30 rounded-full" />
            <div className="w-8 h-1.5 bg-white/30 rounded-full" />
          </div>
          <div className="flex gap-2">
            <Button
              size="md"
              variant="ghost"
              isIconOnly
              className="text-white hover:text-white hover:bg-white/20"
            >
              <i
                className="icon-[si--chevron-left-alt-fill]"
                role="img"
                aria-hidden="true"
              ></i>
            </Button>
            <Button
              size="md"
              variant="ghost"
              isIconOnly
              className="text-white hover:text-white hover:bg-white/20"
            >
              <i
                className="icon-[si--chevron-right-alt-fill]"
                role="img"
                aria-hidden="true"
              ></i>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
