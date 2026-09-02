import { useState, type FC, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, Lock } from "lucide-react";
import {
  Button,
  Card,
  Badge,
  Alert,
  PageHeaderBanner,
  Input,
  Select,
  FormField,
  Text,
  Muted,
  SectionTitleBlock,
} from "@/components/ui";
import { useAuth, DEMO_USERS, type UserRole } from "@/context/AuthContext";

export const LoginPage: FC = () => {
  const { user, login, loginAsDemo, logout } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("public_citizen");
  const [resetRequested, setResetRequested] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    login(email, role);
    navigate("/");
  };

  const handleDemoLogin = (key: keyof typeof DEMO_USERS) => {
    loginAsDemo(key);
    navigate("/");
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Page Header Banner */}
      <PageHeaderBanner
        title="Official Portal Authentication"
        description="Secure portal access for Youth MPs, Committee Chairs, Secretariat Staff, and Ghanaian Citizens."
        breadcrumbs={[{ label: "Portal Sign In" }]}
        badge={
          <Badge variant="accent" icon={<Lock className="w-3.5 h-3.5" />}>
            Identity & Role Access
          </Badge>
        }
      />

      <div className="container-custom max-w-4xl space-y-10">
        {/* Active Session Status Callout */}
        {user && (
          <Alert type="success" title="Currently Authenticated" className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={user.photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=187B28&color=ffffff&bold=true`}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#187B28]"
                />
                <div>
                  <h4 className="font-bold text-sm text-[#181818]">{user.name}</h4>
                  <Muted className="text-xs">{user.title} • {user.email}</Muted>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => navigate("/")}>
                  Go to Platform Home
                </Button>
                <Button variant="danger" size="sm" onClick={logout}>
                  Sign Out
                </Button>
              </div>
            </div>
          </Alert>
        )}

        {/* Quick Demo Account Switcher Section */}
        <section className="space-y-4">
          <SectionTitleBlock title="Quick Demo Account Switcher" />
          <Text className="text-xs text-slate-600">
            Click any of the institutional roles below to instantly switch session context and test permissions across the platform:
          </Text>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Card
              className="p-4 cursor-pointer hover:border-[#187B28] transition-colors border-t-4 border-t-emerald-700 bg-white flex flex-col justify-between"
              onClick={() => handleDemoLogin("citizen")}
            >
              <div className="space-y-2">
                <Badge variant="outline">Registered Citizen</Badge>
                <h5 className="font-bold text-sm text-slate-900">Kwame Mensah</h5>
                <Muted className="text-[11px]">Ayawaso West Wuogon</Muted>
              </div>
              <Button variant="primary" size="sm" className="mt-4 w-full">
                Switch to Citizen
              </Button>
            </Card>

            <Card
              className="p-4 cursor-pointer hover:border-[#187B28] transition-colors border-t-4 border-t-[#187B28] bg-white flex flex-col justify-between"
              onClick={() => handleDemoLogin("mp")}
            >
              <div className="space-y-2">
                <Badge variant="accent">Youth MP / Speaker</Badge>
                <h5 className="font-bold text-sm text-slate-900">Hon. Emmanuel Addo</h5>
                <Muted className="text-[11px]">Rt. Hon. Speaker</Muted>
              </div>
              <Button variant="primary" size="sm" className="mt-4 w-full">
                Switch to Youth MP
              </Button>
            </Card>

            <Card
              className="p-4 cursor-pointer hover:border-[#187B28] transition-colors border-t-4 border-t-[#F9C511] bg-white flex flex-col justify-between"
              onClick={() => handleDemoLogin("chair")}
            >
              <div className="space-y-2">
                <Badge variant="accent">Committee Chair</Badge>
                <h5 className="font-bold text-sm text-slate-900">Hon. Abena Osei</h5>
                <Muted className="text-[11px]">Deputy Speaker</Muted>
              </div>
              <Button variant="primary" size="sm" className="mt-4 w-full">
                Switch to Chair
              </Button>
            </Card>

            <Card
              className="p-4 cursor-pointer hover:border-[#187B28] transition-colors border-t-4 border-t-slate-800 bg-white flex flex-col justify-between"
              onClick={() => handleDemoLogin("admin")}
            >
              <div className="space-y-2">
                <Badge variant="neutral">Secretariat Admin</Badge>
                <h5 className="font-bold text-sm text-slate-900">Mr. Kofi Mensah</h5>
                <Muted className="text-[11px]">Office of the Clerk</Muted>
              </div>
              <Button variant="primary" size="sm" className="mt-4 w-full">
                Switch to Admin
              </Button>
            </Card>
          </div>
        </section>

        {/* Credentials Form Section */}
        <section className="space-y-4 pt-6 border-t border-slate-200">
          <SectionTitleBlock title="Standard Credentials Sign In" />

          <Card className="p-8 space-y-6">
            {resetRequested && (
              <Alert type="info" title="Password Reset Request Received">
                Password recovery instructions have been dispatched to your registered institutional email address.
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField label="Institutional Account Email / ID" required>
                <Input
                  type="email"
                  required
                  placeholder="e.g. e.addo@youthparliament.gov.gh"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormField>

              <FormField label="Account Password" required>
                <Input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormField>

              <FormField label="Target Account Role" required>
                <Select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                >
                  <option value="public_citizen">Public Youth Citizen</option>
                  <option value="youth_mp">Youth Member of Parliament (Youth MP)</option>
                  <option value="committee_chair">Parliamentary Committee Chair</option>
                  <option value="secretariat_admin">Parliamentary Secretariat Staff / Admin</option>
                </Select>
              </FormField>

              <div className="flex items-center justify-between text-xs pt-2">
                <button
                  type="button"
                  onClick={() => setResetRequested(true)}
                  className="text-[#187B28] font-bold hover:underline cursor-pointer"
                >
                  Forgot institutional password?
                </button>

                <Button type="submit" variant="primary" size="md" rightIcon={<LogIn className="w-4 h-4" />}>
                  Authenticate & Sign In
                </Button>
              </div>
            </form>
          </Card>
        </section>
      </div>
    </div>
  );
};
