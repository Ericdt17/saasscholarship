import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Pencil,
  Trash2,
  ExternalLink,
  Calendar,
  MapPin,
  Building,
  GraduationCap,
  DollarSign,
  FileText,
  CheckCircle,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

const scholarshipData = {
  id: 1,
  title: "Fulbright Scholarship Program",
  organizer: "U.S. Department of State",
  country: "United States",
  deadline: "2024-05-15",
  level: "Master",
  status: "published",
  funding: "Full Funding",
  description:
    "The Fulbright Program is the flagship international educational exchange program sponsored by the U.S. government and is designed to increase mutual understanding between the people of the United States and the people of other countries.",
  eligibility: [
    "Must be a citizen of an eligible country",
    "Bachelor's degree or equivalent",
    "English language proficiency",
    "Strong academic background",
    "Demonstrated leadership qualities",
  ],
  documents: [
    "Statement of Purpose",
    "Academic transcripts",
    "Letters of recommendation (3)",
    "CV/Resume",
    "Language proficiency test scores",
    "Valid passport copy",
  ],
  benefits: [
    "Full tuition coverage",
    "Monthly living stipend",
    "Health insurance",
    "Round-trip airfare",
    "Book and research allowance",
  ],
  applyLink: "https://foreign.fulbrightonline.org/",
  createdAt: "2024-01-15",
  updatedAt: "2024-03-20",
};

const ScholarshipDetails = () => {
  const { id } = useParams();

  return (
    <DashboardLayout title="Scholarship Details">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/scholarships">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-foreground">
                  {scholarshipData.title}
                </h2>
                <Badge
                  variant="outline"
                  className="bg-success/10 text-success border-success/20"
                >
                  {scholarshipData.status}
                </Badge>
              </div>
              <p className="text-muted-foreground mt-1">
                ID: #{id} • Last updated:{" "}
                {new Date(scholarshipData.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Pencil className="w-4 h-4" />
              Edit
            </Button>
            <Button variant="destructive" className="gap-2">
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Card */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {scholarshipData.description}
                </p>
              </CardContent>
            </Card>

            {/* Eligibility Card */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Eligibility Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {scholarshipData.eligibility.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Documents Card */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Required Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {scholarshipData.documents.map((doc, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span className="text-muted-foreground">{doc}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Benefits Card */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {scholarshipData.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <DollarSign className="w-5 h-5 text-success mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Building className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Organizer</p>
                    <p className="text-sm font-medium">{scholarshipData.organizer}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-warning/10">
                    <MapPin className="w-4 h-4 text-warning" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Country</p>
                    <p className="text-sm font-medium">{scholarshipData.country}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-destructive/10">
                    <Calendar className="w-4 h-4 text-destructive" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Deadline</p>
                    <p className="text-sm font-medium">
                      {new Date(scholarshipData.deadline).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-success/10">
                    <GraduationCap className="w-4 h-4 text-success" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Level</p>
                    <p className="text-sm font-medium">{scholarshipData.level}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <DollarSign className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Funding</p>
                    <p className="text-sm font-medium">{scholarshipData.funding}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Apply Button */}
            <Button className="w-full gap-2" size="lg" asChild>
              <a href={scholarshipData.applyLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
                Visit Application Page
              </a>
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ScholarshipDetails;
