import React, { createContext, useContext, useMemo } from "react";
import { useGitHubData } from "../hooks/useGitHubData";
import { useLeetCodeData } from "../hooks/useLeetCodeData";

const ProfileDataContext = createContext(null);

export function ProfileDataProvider({ children }) {
  const github = useGitHubData();
  const leetcode = useLeetCodeData();
  const value = useMemo(() => ({ github, leetcode }), [github, leetcode]);
  return (
    <ProfileDataContext.Provider value={value}>
      {children}
    </ProfileDataContext.Provider>
  );
}

export function useProfileData() {
  const ctx = useContext(ProfileDataContext);
  if (!ctx) {
    throw new Error("useProfileData must be used within ProfileDataProvider");
  }
  return ctx;
}
