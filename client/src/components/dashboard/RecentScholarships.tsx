import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const recentScholarships = [
  {
    id: 1,
    title: "Fulbright Scholarship Program",
    organizer: "U.S. Department of State",
    country: "United States",
    deadline: "2024-05-15",
    level: "Master",
    status: "published",
  },
  {
    id: 2,
    title: "Chevening Scholarship",
    organizer: "UK Government",
    country: "United Kingdom",
    deadline: "2024-11-02",
    level: "Master",
    status: "published",
  },
  {
    id: 3,
    title: "DAAD Scholarship",
    organizer: "German Academic Exchange",
    country: "Germany",
    deadline: "2024-10-15",
    level: "PhD",
    status: "draft",
  },
  {
    id: 4,
    title: "Erasmus Mundus Joint Masters",
    organizer: "European Commission",
    country: "Europe",
    deadline: "2024-01-15",
    level: "Master",
    status: "closed",
  },
  {
    id: 5,
    title: "Gates Cambridge Scholarship",
    organizer: "Gates Foundation",
    country: "United Kingdom",
    deadline: "2024-12-03",
    level: "PhD",
    status: "published",
  },
];

const statusColors = {
  published: "bg-success/10 text-success border-success/20",
  draft: "bg-muted text-muted-foreground border-border",
  closed: "bg-destructive/10 text-destructive border-destructive/20",
};

export function RecentScholarships() {
  return (
    <div className="bg-card rounded-xl shadow-card animate-fade-in">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Recent Scholarships</h3>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/scholarships" className="gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
      <div className="divide-y divide-border">
        {recentScholarships.map((scholarship) => (
          <div
            key={scholarship.id}
            className="p-4 hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1 flex-1">
                <Link
                  to={`/scholarships/${scholarship.id}`}
                  className="font-medium text-foreground hover:text-primary transition-colors"
                >
                  {scholarship.title}
                </Link>
                <p className="text-sm text-muted-foreground">
                  {scholarship.organizer}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {scholarship.country}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(scholarship.deadline).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge
                  variant="outline"
                  className={statusColors[scholarship.status as keyof typeof statusColors]}
                >
                  {scholarship.status}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {scholarship.level}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
