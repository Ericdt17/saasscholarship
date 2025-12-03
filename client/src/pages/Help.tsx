import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, BookOpen, MessageCircle, Mail, FileQuestion, GraduationCap, Users, BarChart3 } from "lucide-react";

const faqs = [
  {
    question: "How do I create a new scholarship?",
    answer: "Navigate to the Scholarships page and click the 'Create Scholarship' button. Fill in all the required fields including title, description, eligibility, and deadline, then click 'Publish' to make it live.",
  },
  {
    question: "How can I manage user roles?",
    answer: "Go to Settings > Security to manage user roles and permissions. You can assign Admin or User roles to different accounts based on their responsibilities.",
  },
  {
    question: "How do I track scholarship applications?",
    answer: "Visit the Applications page to see all submitted applications. You can filter by status, search by user or scholarship name, and approve or reject applications directly from the table.",
  },
  {
    question: "Can I export scholarship data?",
    answer: "Yes, you can export data from the Analytics page. Click the export button to download reports in CSV or PDF format.",
  },
  {
    question: "How do I set up deadline reminders?",
    answer: "Go to Settings > Notifications and enable 'Deadline Reminders'. The system will automatically notify you about upcoming scholarship deadlines.",
  },
  {
    question: "How can I customize the platform branding?",
    answer: "Navigate to Settings > Branding to customize the platform name, logo, and primary colors to match your organization's identity.",
  },
];

const guides = [
  {
    title: "Getting Started",
    description: "Learn the basics of managing scholarships",
    icon: GraduationCap,
  },
  {
    title: "User Management",
    description: "Guide to managing users and roles",
    icon: Users,
  },
  {
    title: "Analytics & Reports",
    description: "Understanding your platform metrics",
    icon: BarChart3,
  },
  {
    title: "FAQ",
    description: "Frequently asked questions",
    icon: FileQuestion,
  },
];

const Help = () => {
  return (
    <DashboardLayout title="Get help and support">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            How can we help you?
          </h2>
          <p className="text-muted-foreground mb-6">
            Search our knowledge base or browse the guides below
          </p>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search for help..."
              className="pl-12 h-12 text-lg"
            />
          </div>
        </div>

        {/* Quick Guides */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {guides.map((guide) => (
            <Card key={guide.title} className="shadow-card hover-lift cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <guide.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">
                  {guide.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {guide.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* FAQ */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileQuestion className="w-5 h-5" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>
                  Quick answers to common questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Contact Support */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Need More Help?
                </CardTitle>
                <CardDescription>
                  Our support team is here to assist you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full gap-2" variant="default">
                  <MessageCircle className="w-4 h-4" />
                  Start Live Chat
                </Button>
                <Button className="w-full gap-2" variant="outline">
                  <Mail className="w-4 h-4" />
                  Email Support
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Documentation
                </CardTitle>
                <CardDescription>
                  Detailed guides and API reference
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  View Documentation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Help;
