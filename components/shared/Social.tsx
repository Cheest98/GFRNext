"use client"
import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { Button } from '../ui/button';
export const Social = () => {
    return (
        <div className="flex justify-center w-full">
          <Button
            size="lg"
            variant="outline"
            onClick={() => console.log("google")}
          >
            <FcGoogle className="h-5 w-5" />
          </Button>
        </div>
      );
}
