import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type UserRole = "public_citizen" | "youth_mp" | "committee_chair" | "secretariat_admin";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  constituency?: string;
  title?: string;
  photoUrl?: string;
}

export const DEMO_USERS: Record<string, AuthUser> = {
  citizen: {
    id: "demo-citizen",
    name: "Kwame Mensah",
    email: "kwame.m@gmail.com",
    role: "public_citizen",
    title: "Registered Youth Citizen",
    constituency: "Ayawaso West Wuogon",
    photoUrl: "https://ui-avatars.com/api/?name=Kwame+Mensah&background=187B28&color=ffffff&bold=true",
  },
  mp: {
    id: "mp-1",
    name: "Hon. Emmanuel Addo",
    email: "e.addo@youthparliament.gov.gh",
    role: "youth_mp",
    title: "Rt. Hon. Speaker & Youth MP",
    constituency: "Ayawaso West Wuogon",
    photoUrl: "https://ui-avatars.com/api/?name=Emmanuel+Addo&background=187B28&color=ffffff&bold=true",
  },
  chair: {
    id: "mp-2",
    name: "Hon. Abena Osei-Owusu",
    email: "a.owusu@youthparliament.gov.gh",
    role: "committee_chair",
    title: "Committee Chair & Deputy Speaker",
    constituency: "Subin",
    photoUrl: "https://ui-avatars.com/api/?name=Abena+Osei-Owusu&background=187B28&color=ffffff&bold=true",
  },
  admin: {
    id: "admin-1",
    name: "Mr. Kofi Mensah-Bonsu",
    email: "clerk@youthparliament.gov.gh",
    role: "secretariat_admin",
    title: "Clerk of the Secretariat",
    photoUrl: "https://ui-avatars.com/api/?name=Kofi+Mensah-Bonsu&background=187B28&color=ffffff&bold=true",
  },
};

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, role: UserRole) => void;
  loginAsDemo: (demoKey: keyof typeof DEMO_USERS) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem("ypg_auth_user");
    return saved ? JSON.parse(saved) : null; // Unauthenticated by default until explicitly logged in
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("ypg_auth_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("ypg_auth_user");
    }
  }, [user]);

  const login = (email: string, role: UserRole) => {
    const nameStr = email.split("@")[0].replace(".", " ");
    const newUser: AuthUser = {
      id: `user-${Date.now()}`,
      name: nameStr,
      email,
      role,
      title: role === "youth_mp" ? "Youth MP" : role === "secretariat_admin" ? "Secretariat Staff" : "Registered Citizen",
      photoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(nameStr)}&background=187B28&color=ffffff&bold=true`,
    };
    setUser(newUser);
  };

  const loginAsDemo = (demoKey: keyof typeof DEMO_USERS) => {
    setUser(DEMO_USERS[demoKey]);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        loginAsDemo,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
