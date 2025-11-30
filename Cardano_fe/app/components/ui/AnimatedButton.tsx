"use client";

import { useState, ReactNode } from "react";
import Image from "next/image";

interface AnimatedButtonProps {
  text: string;
  icon?: ReactNode;
  onClick?: () => void;
  size?: number; // diameter
  variant?: "gradient" | "glass" | "soft";
}

const AnimatedButton = ({
  text,
  icon,
  onClick,
  size = 140,
  variant = "gradient",
}: AnimatedButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const baseStyle = `
    flexCenter rounded-full p-[2px] cursor-pointer 
    transition-all duration-300 ease-out
    hover:scale-110 hover:rotate-1
    ${isPressed ? "scale-95" : ""}
    shadow-lg hover:shadow-cyan-400/60
  `;

  const variants = {
    gradient: "bg-blue-gradient",
    glass: "bg-white/10 border border-white/20 backdrop-blur-lg",
    soft: "bg-neutral-800",
  };

  return (
    <div
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]}`}
      style={{ width: size, height: size }}
    >
      <div
        className="
          flexCenter flex-col w-full h-full rounded-full 
          bg-black/30 backdrop-blur-md
        "
      >
        <div className="flexStart flex-row items-center gap-1">
          <span className="font-poppins font-medium text-[18px] text-gradient">
            {text}
          </span>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default AnimatedButton;
