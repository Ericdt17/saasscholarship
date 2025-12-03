import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentScholarships } from "@/components/dashboard/RecentScholarships";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import {
  GraduationCap,
  CheckCircle,
  Users,
  Clock,
  FileText,
} from "lucide-react";

const stats = [
  {
    title: "Total Scholarships",
    value: 248,
    change: "+12% from last month",
    changeType: "positive" as const,
    icon: GraduationCap,
    iconColor: "bg-primary/10 text-primary",
  },
  {
    title: "Published",
    value: 186,
    change: "75% of total",
    changeType: "neutral" as const,
    icon: CheckCircle,
    iconColor: "bg-success/10 text-success",
  },
  {
    title: "Total Users",
    value: "12,847",
    change: "+23% from last month",
    changeType: "positive" as const,
    icon: Users,
    iconColor: "bg-warning/10 text-warning",
  },
  {
    title: "Expiring Soon",
    value: 18,
    change: "Next 30 days",
    changeType: "neutral" as const,
    icon: Clock,
    iconColor: "bg-destructive/10 text-destructive",
  },
  {
    title: "Active Applications",
    value: 1842,
    change: "+8% from last week",
    changeType: "positive" as const,
    icon: FileText,
    iconColor: "bg-primary/10 text-primary",
  },
];

const Index = () => {
  return (
    <DashboardLayout title="Welcome back! Here's your overview.">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentScholarships />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
