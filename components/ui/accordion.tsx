"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const AccordionContext = React.createContext<{
  openValue?: string
  setOpenValue: (value?: string) => void
} | null>(null)

export function Accordion({
  children,
  type = "single",
  collapsible = true,
  className,
}: {
  children: React.ReactNode
  type?: "single"
  collapsible?: boolean
  className?: string
}) {
  const [openValue, setOpenValue] = React.useState<string | undefined>()

  return (
    <AccordionContext.Provider value={{ openValue, setOpenValue }}>
      <div className={cn("space-y-2", className)}>{children}</div>
    </AccordionContext.Provider>
  )
}

export function AccordionItem({
  children,
  value,
  className,
}: {
  children: React.ReactNode
  value: string
  className?: string
}) {
  return (
    <div className={cn("border-b", className)} data-value={value}>
      {children}
    </div>
  )
}

export function AccordionTrigger({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const context = React.useContext(AccordionContext)
  if (!context) throw new Error("AccordionTrigger must be used within Accordion")

  const parent = React.useRef<HTMLDivElement>(null)
  const itemValue = parent.current?.closest("[data-value]")?.getAttribute("data-value")
  const isOpen = context.openValue === itemValue

  React.useEffect(() => {
    // This is a bit hacky to get the value from the parent item
  }, [])

  return (
    <div ref={parent} className="flex">
        <button
            type="button"
            onClick={() => {
                const val = parent.current?.closest("[data-value]")?.getAttribute("data-value")
                context.setOpenValue(context.openValue === val ? undefined : val || undefined)
            }}
            className={cn(
                "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
                className
            )}
            data-state={isOpen ? "open" : "closed"}
        >
            {children}
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
        </button>
    </div>
  )
}

export function AccordionContent({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const context = React.useContext(AccordionContext)
  if (!context) throw new Error("AccordionContent must be used within Accordion")

  const parent = React.useRef<HTMLDivElement>(null)
  const itemValue = parent.current?.closest("[data-value]")?.getAttribute("data-value")
  const isOpen = context.openValue === itemValue

  return (
    <div
      ref={parent}
      className={cn(
        "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
        isOpen ? "block" : "hidden",
        className
      )}
      data-state={isOpen ? "open" : "closed"}
    >
      <div className="pb-4 pt-0">{children}</div>
    </div>
  )
}
