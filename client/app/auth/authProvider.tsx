"use client";

import React, { useEffect } from "react";
import { Amplify } from "aws-amplify";
import {
    Authenticator,
    Heading,
    SelectField,
    useAuthenticator,
    View,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID!,
            userPoolClientId:
                process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID!,
        },
    },
});

const components = {
    SignIn: {
        Header() {
            return (
                <View className="mb-4">
                    <Heading level={3} className="!text-2xl !font-bold">
                        RENT
                        <span className="text-secondary-500 font-light hover:!text-primary-300">
                            IFUL
                        </span>
                    </Heading>
                    <p className="text-muted-foreground mt-2">
                        <span className="font-bold">Welcome!</span> Please sign in to continue
                    </p>
                </View>
            );
        },
        Footer() {
            const { toSignUp } = useAuthenticator();
            return (
                <View className="text-center mt-2">
                    <p className="text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <button
                            onClick={toSignUp}
                            className="text-primary hover:underline bg-transparent border-none p-0 cursor-pointer"
                        >
                            Sign up here
                        </button>
                    </p>
                </View>
            );
        },
    },
    SignUp: {
        Header() {
            return (
                <View className="mb-4">
                    <Heading level={3} className="!text-2xl !font-bold">
                        RENT
                        <span className="text-secondary-500 font-light hover:!text-primary-300">
                            IFUL
                        </span>
                    </Heading>
                    <p className="text-muted-foreground mt-2">
                        <span className="font-bold">Welcome!</span> Please sign up to continue
                    </p>
                </View>
            );
        },
        FormFields() {
            const { validationErrors } = useAuthenticator();

            return (
                <>
                    <Authenticator.SignUp.FormFields />
                    <div>
                        <SelectField
                            label="Role"
                            name="custom:role"
                            errorMessage={validationErrors?.["custom:role"] as string}
                            hasError={!!validationErrors?.["custom:role"]}
                            isRequired
                        >
                            <option value="">Select a role</option>
                            <option value="tenant">Tenant</option>
                            <option value="manager">Manager</option>
                        </SelectField>
                    </div>
                </>
            );
        },

        Footer() {
            const { toSignIn } = useAuthenticator();
            return (
                <View className="text-center mt-2">
                    <p className="text-muted-foreground">
                        Already have an account?{" "}
                        <button
                            onClick={toSignIn}
                            className="text-primary hover:underline bg-transparent border-none p-0 cursor-pointer"
                        >
                            Sign in
                        </button>
                    </p>
                </View>
            );
        },
    },
};

const formFields = {
    signIn: {
        username: {
            placeholder: "Enter your email",
            label: "Email",
            isRequired: true,
        },
        password: {
            placeholder: "Enter your password",
            label: "Password",
            isRequired: true,
        },
    },
    signUp: {
        username: {
            order: 1,
            placeholder: "Choose a username",
            label: "Username",
            isRequired: true,
        },
        email: {
            order: 2,
            placeholder: "Enter your email address",
            label: "Email",
            isRequired: true,
        },
        password: {
            order: 3,
            placeholder: "Create a password",
            label: "Password",
            isRequired: true,
        },
        confirm_password: {
            order: 4,
            placeholder: "Confirm your password",
            label: "Confirm Password",
            isRequired: true,
        },
    },
};

const Auth = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuthenticator((context) => [context.user]);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Check if we are on the auth page
    const isAuthPage = pathname === "/auth";
    const isDashboardPage =
        pathname.startsWith("/manager") || pathname.startsWith("/tenants");

    const [mounted, setMounted] = React.useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Redirect authenticated users away from auth pages
    useEffect(() => {
        if (user && isAuthPage) {
            router.push("/landing");
        }
    }, [user, isAuthPage, router]);

    // Allow access to public pages without authentication
    if (!isAuthPage && !isDashboardPage) {
        return <>{children}</>;
    }

    if (!mounted) return <div className="h-screen flex items-center justify-center">
        <div>
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
        </div>
    </div>;

    const initialAuthState = searchParams.get('mode') === 'signup' ? 'signUp' : 'signIn';

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-t from-secondary-100 to-white">
            <Authenticator
                initialState={initialAuthState}
                components={components}
                formFields={formFields}
            >
                {() => <>{children}</>}
            </Authenticator>
        </div>
    );
};

export default Auth;