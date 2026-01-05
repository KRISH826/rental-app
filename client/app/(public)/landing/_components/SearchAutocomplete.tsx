"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverAnchor,
} from "@/components/ui/popover"

const locations = [
    { value: "new york", label: "New York" },
    { value: "london", label: "London" },
    { value: "paris", label: "Paris" },
    { value: "tokyo", label: "Tokyo" },
    { value: "dubai", label: "Dubai" },
]

export function SearchAutocomplete() {
    const [open, setOpen] = React.useState(false)
    const [inputValue, setInputValue] = React.useState("")
    const [width, setWidth] = React.useState(0)
    const containerRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        if (containerRef.current) {
            setWidth(containerRef.current.offsetWidth)

            const resizeObserver = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    setWidth(entry.contentRect.width)
                }
            })

            resizeObserver.observe(containerRef.current)
            return () => resizeObserver.disconnect()
        }
    }, [])

    const filteredLocations = locations.filter((location) =>
        location.label.toLowerCase().includes(inputValue.toLowerCase())
    )

    const handleSelect = (value: string) => {
        setInputValue(value)
        setOpen(false)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverAnchor asChild>
                <div
                    ref={containerRef}
                    className="relative flex-1 min-w-0"
                >
                    <Input
                        className="h-12 w-full rounded-none border-none bg-white text-base text-black placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Search location..."
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value)
                            if (!open) setOpen(true)
                        }}
                        onFocus={() => {
                            if (containerRef.current) {
                                setWidth(containerRef.current.offsetWidth)
                            }
                            setOpen(true)
                        }}
                    />
                </div>
            </PopoverAnchor>
            <PopoverContent
                align="start"
                className="p-1"
                style={{ width: width ? `${width}px` : "auto" }}
                onOpenAutoFocus={(e) => e.preventDefault()}
            >
                <div className="max-h-[300px] overflow-y-auto">
                    {filteredLocations.length === 0 ? (
                        <div className="py-6 text-center text-sm text-muted-foreground">
                            No location found.
                        </div>
                    ) : (
                        <div className="space-y-0.5">
                            {filteredLocations.map((location) => (
                                <div
                                    key={location.value}
                                    className={cn(
                                        "flex cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                                        inputValue.toLowerCase() === location.label.toLowerCase() && "bg-accent"
                                    )}
                                    onClick={() => handleSelect(location.label)}
                                >
                                    {location.label}
                                    {inputValue.toLowerCase() === location.label.toLowerCase() && (
                                        <Check className="h-4 w-4" />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    )
}
