"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: async (headers) => {
      const session = await fetchAuthSession();
      const { idToken } = session.tokens ?? {};
      if (!idToken) {
        throw new Error("Failed to fetch id token");
      }
      headers.set("Authorization", `Bearer ${idToken}`);
      return headers;
    }
  }),
  reducerPath: "api",
  tagTypes: [],
  endpoints: (build) => ({
    getAuthUser: build.query<User, void>({
      queryFn: async (_, _queryApi, _extraOptions, fetchWithBQ) => {
        try {
          const session = await fetchAuthSession();
          const { idToken } = session.tokens ?? {};
          const user = await getCurrentUser();
          const userRole = idToken?.payload["custom:role"] as string;

          const endpoint = userRole === "tenant" ? `/tenants/${user?.userId}` : `/managers/${user?.userId}`;
          const userDetailsRes = await fetchWithBQ(endpoint);

          if (!userDetailsRes.data) {
            throw new Error("Failed to fetch user details");
          }

          return {
            data: {
              cognitoInfo: { ...user },
              userInfo: userDetailsRes.data as Tenant | Manager,
              userRole,
            }
          }

        } catch (error) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: (error as Error).message || "Could not fetch user data",
            },
          };
        }
      }
    }),

  }),
});

export const { } = api;
