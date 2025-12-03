import { Bell, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

interface HeaderProps {
  title?: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-30 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-xl font-semibold text-foreground">
            Hello Admin 👋
          </h1>
          {title && (
            <p className="text-sm text-muted-foreground">{title}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search scholarships, users..."
            className="w-64 pl-9 bg-background border-border"
          />
        </div>

        {/* Create Button */}
        <Button asChild variant="default" className="gap-2">
          <Link to="/scholarships/new">
            <Plus className="w-4 h-4" />
            Create Scholarship
          </Link>
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-destructive rounded-full" />
        </Button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-medium text-sm">
          A
        </div>
      </div>
    </header>
  );
}
