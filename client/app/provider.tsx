"use client";

import StoreProvider from "@/state/redux";

export default function Provider({ children }: { children: React.ReactNode }) {
    return (
        <StoreProvider>
            {children}
        </StoreProvider>
    );
}