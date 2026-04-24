import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> & {
    size?: "sm" | "default"
  }
>(({ className, size = "default", ...props }, ref) => {
  return (
    <SwitchPrimitive.Root
      ref={ref}
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full transition-all outline-none",

        // size
        "data-[size=default]:h-[18.4px] data-[size=default]:w-[32px]",
        "data-[size=sm]:h-[14px] data-[size=sm]:w-[24px]",

        // state
        "data-[state=checked]:bg-primary",
        "data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80",

        // disabled
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",

        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block rounded-full bg-background shadow transition-transform",

          // size thumb
          "group-data-[size=default]/switch:size-4",
          "group-data-[size=sm]/switch:size-3",

          // animation
          "group-data-[state=checked]/switch:translate-x-[calc(100%-2px)]",
          "group-data-[state=unchecked]/switch:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  )
})

Switch.displayName = "Switch"

export { Switch }