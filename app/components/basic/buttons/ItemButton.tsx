import { useNavigate } from "@remix-run/react";
import { useRef } from "react";

type ButtonProps = {
  className?: string;
  buttonClassName?: string;
  textClassName?: string;
  onClick?: () => void;
  children: React.ReactNode;
  to?: string;
  type?: HTMLButtonElement["type"];
  submitting?: boolean;
};

export default function ItemButton({
  className,
  buttonClassName,
  textClassName,
  onClick,
  children,
  to,
  type,
  submitting,
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const effect = () => {
    if (ref.current) {
      ref.current.style.transform = "scale(0.985)";
      setTimeout(() => {
        if (ref.current) {
          ref.current.style.transform = "scale(1.0)";
        }
      }, 200);
    }
  };

  const handleClick = () => {
    effect();
    if (onClick) {
      onClick();
    }
    if (to) {
      setTimeout(() => {
        navigate(to);
      }, 100);
    }
  };

  return (
    <div className={`relative ${className} `}>
      <button
        ref={ref}
        type="button"
        // type={!type ? "submit" : "button"}
        className={`absolute rounded-full w-full h-full button bg-item-2 ${buttonClassName} ${
          submitting ? "bg-item-2" : "hover:bg-item-2h"
        }`}
        onClick={() => {
          handleClick();
        }}
      />
      <button
        type="button"
        className={`z-10 relative w-full pointer-events-none button ${textClassName}`}
      >
        {children}
      </button>
    </div>
  );
}
