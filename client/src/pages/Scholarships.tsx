import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Plus, MoreHorizontal, Pencil, Trash2, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const scholarships = [
  { id: 1, title: "Fulbright Scholarship Program", organizer: "U.S. Department of State", deadline: "2024-05-15", level: "Master", country: "United States", status: "published" },
  { id: 2, title: "Chevening Scholarship", organizer: "UK Government", deadline: "2024-11-02", level: "Master", country: "United Kingdom", status: "published" },
  { id: 3, title: "DAAD Scholarship", organizer: "German Academic Exchange", deadline: "2024-10-15", level: "PhD", country: "Germany", status: "draft" },
  { id: 4, title: "Erasmus Mundus Joint Masters", organizer: "European Commission", deadline: "2024-01-15", level: "Master", country: "Europe", status: "closed" },
  { id: 5, title: "Gates Cambridge Scholarship", organizer: "Gates Foundation", deadline: "2024-12-03", level: "PhD", country: "United Kingdom", status: "published" },
  { id: 6, title: "Swiss Government Excellence", organizer: "Swiss Confederation", deadline: "2024-11-15", level: "PhD", country: "Switzerland", status: "published" },
  { id: 7, title: "Australia Awards Scholarship", organizer: "Australian Government", deadline: "2024-04-30", level: "Master", country: "Australia", status: "published" },
  { id: 8, title: "Japanese MEXT Scholarship", organizer: "Japanese Government", deadline: "2024-04-15", level: "Bachelor", country: "Japan", status: "draft" },
];

const statusColors = {
  published: "bg-success/10 text-success border-success/20",
  draft: "bg-muted text-muted-foreground border-border",
  closed: "bg-destructive/10 text-destructive border-destructive/20",
};

const Scholarships = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <DashboardLayout title="Manage all scholarships">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Scholarships</h2>
            <p className="text-sm text-muted-foreground">
              {scholarships.length} scholarships total
            </p>
          </div>
          <Button asChild className="gap-2">
            <Link to="/scholarships/new">
              <Plus className="w-4 h-4" />
              Create Scholarship
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl shadow-card p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search scholarships..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select defaultValue="newest">
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="deadline">Deadline</SelectItem>
                <SelectItem value="level">Level</SelectItem>
                <SelectItem value="country">Country</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-card rounded-xl shadow-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Title</TableHead>
                <TableHead className="font-semibold">Organizer</TableHead>
                <TableHead className="font-semibold">Deadline</TableHead>
                <TableHead className="font-semibold">Level</TableHead>
                <TableHead className="font-semibold">Country</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scholarships.map((scholarship) => (
                <TableRow key={scholarship.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">
                    <Link
                      to={`/scholarships/${scholarship.id}`}
                      className="hover:text-primary transition-colors"
                    >
                      {scholarship.title}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {scholarship.organizer}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(scholarship.deadline).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{scholarship.level}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {scholarship.country}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={statusColors[scholarship.status as keyof typeof statusColors]}
                    >
                      {scholarship.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/scholarships/${scholarship.id}`} className="flex items-center gap-2">
                            <Eye className="w-4 h-4" /> View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Pencil className="w-4 h-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                          <Trash2 className="w-4 h-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Showing 1-8 of {scholarships.length} scholarships
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Scholarships;
