import { FileText, UserPlus, GraduationCap, CheckCircle } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "application",
    message: "New application submitted for Fulbright Scholarship",
    time: "2 minutes ago",
    icon: FileText,
    color: "bg-primary/10 text-primary",
  },
  {
    id: 2,
    type: "user",
    message: "New user registered: john@example.com",
    time: "15 minutes ago",
    icon: UserPlus,
    color: "bg-success/10 text-success",
  },
  {
    id: 3,
    type: "scholarship",
    message: "Chevening Scholarship updated",
    time: "1 hour ago",
    icon: GraduationCap,
    color: "bg-warning/10 text-warning",
  },
  {
    id: 4,
    type: "approval",
    message: "DAAD Scholarship published",
    time: "3 hours ago",
    icon: CheckCircle,
    color: "bg-success/10 text-success",
  },
  {
    id: 5,
    type: "application",
    message: "Application reviewed for Gates Cambridge",
    time: "5 hours ago",
    icon: FileText,
    color: "bg-primary/10 text-primary",
  },
];

export function RecentActivity() {
  return (
    <div className="bg-card rounded-xl shadow-card animate-fade-in">
      <div className="p-6 border-b border-border">
        <h3 className="font-semibold text-foreground">Recent Activity</h3>
      </div>
      <div className="p-4 space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${activity.color}`}>
              <activity.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm text-foreground">{activity.message}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
