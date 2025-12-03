import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Bookmark, MapPin, Calendar, ExternalLink, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const savedScholarships = [
  {
    id: 1,
    title: "Fulbright Scholarship Program",
    organizer: "U.S. Department of State",
    country: "United States",
    deadline: "2024-05-15",
    level: "Master",
    funding: "Full Funding",
  },
  {
    id: 2,
    title: "Chevening Scholarship",
    organizer: "UK Government",
    country: "United Kingdom",
    deadline: "2024-11-02",
    level: "Master",
    funding: "Full Funding",
  },
  {
    id: 3,
    title: "DAAD Scholarship",
    organizer: "German Academic Exchange",
    country: "Germany",
    deadline: "2024-10-15",
    level: "PhD",
    funding: "Partial Funding",
  },
  {
    id: 5,
    title: "Gates Cambridge Scholarship",
    organizer: "Gates Foundation",
    country: "United Kingdom",
    deadline: "2024-12-03",
    level: "PhD",
    funding: "Full Funding",
  },
];

const SavedScholarships = () => {
  return (
    <DashboardLayout title="Your bookmarked scholarships">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Saved Scholarships</h2>
            <p className="text-sm text-muted-foreground">
              {savedScholarships.length} scholarships saved
            </p>
          </div>
        </div>

        {/* Saved List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedScholarships.map((scholarship) => (
            <Card key={scholarship.id} className="shadow-card hover-lift">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-start justify-between">
                      <Link
                        to={`/scholarships/${scholarship.id}`}
                        className="font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        {scholarship.title}
                      </Link>
                      <Button variant="ghost" size="icon" className="shrink-0 text-primary">
                        <Bookmark className="w-4 h-4 fill-current" />
                      </Button>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {scholarship.organizer}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{scholarship.level}</Badge>
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                        {scholarship.funding}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {scholarship.country}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(scholarship.deadline).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/scholarships/${scholarship.id}`}>
                          <ExternalLink className="w-3.5 h-3.5 mr-1" />
                          View Details
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="w-3.5 h-3.5 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {savedScholarships.length === 0 && (
          <div className="text-center py-12">
            <Bookmark className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No saved scholarships
            </h3>
            <p className="text-muted-foreground mb-4">
              Start saving scholarships to keep track of your favorites.
            </p>
            <Button asChild>
              <Link to="/scholarships">Browse Scholarships</Link>
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SavedScholarships;
