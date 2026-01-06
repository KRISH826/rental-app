"use client";

import React from 'react';

import StoreProvider from '@/state/redux';
import { Authenticator } from '@aws-amplify/ui-react';
import Auth from './auth/authProvider';
export default function Provider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <StoreProvider>
            <Authenticator.Provider>
                <React.Suspense fallback={<div>Loading...</div>}>
                    <Auth>{children}</Auth>
                </React.Suspense>
            </Authenticator.Provider>
        </StoreProvider>
    );
}
