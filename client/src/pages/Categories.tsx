import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2, GraduationCap, Layers, Globe } from "lucide-react";

const levels = [
  { id: 1, name: "Bachelor", count: 45, color: "bg-primary/10 text-primary" },
  { id: 2, name: "Master", count: 120, color: "bg-success/10 text-success" },
  { id: 3, name: "PhD", count: 58, color: "bg-warning/10 text-warning" },
  { id: 4, name: "Postdoc", count: 25, color: "bg-destructive/10 text-destructive" },
];

const categories = [
  { id: 1, name: "STEM", count: 89 },
  { id: 2, name: "Arts & Humanities", count: 45 },
  { id: 3, name: "Business", count: 62 },
  { id: 4, name: "Medicine", count: 38 },
  { id: 5, name: "Law", count: 22 },
  { id: 6, name: "Social Sciences", count: 54 },
];

const countries = [
  { id: 1, name: "United States", code: "US", count: 45 },
  { id: 2, name: "United Kingdom", code: "UK", count: 32 },
  { id: 3, name: "Germany", code: "DE", count: 28 },
  { id: 4, name: "Australia", code: "AU", count: 22 },
  { id: 5, name: "Canada", code: "CA", count: 18 },
  { id: 6, name: "France", code: "FR", count: 15 },
  { id: 7, name: "Japan", code: "JP", count: 12 },
  { id: 8, name: "Switzerland", code: "CH", count: 10 },
];

const Categories = () => {
  const [newCategory, setNewCategory] = useState("");

  return (
    <DashboardLayout title="Manage categories and levels">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Categories & Levels</h2>
            <p className="text-sm text-muted-foreground">
              Organize scholarships by category, level, and country
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Levels */}
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg">Education Levels</CardTitle>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Plus className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Level</DialogTitle>
                    <DialogDescription>
                      Create a new education level for scholarships.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="level-name">Level Name</Label>
                      <Input id="level-name" placeholder="e.g., Certificate" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add Level</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent className="space-y-3">
              {levels.map((level) => (
                <div
                  key={level.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className={level.color}>
                      {level.count}
                    </Badge>
                    <span className="font-medium">{level.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Pencil className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Categories */}
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-success" />
                <CardTitle className="text-lg">Subject Categories</CardTitle>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Plus className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Category</DialogTitle>
                    <DialogDescription>
                      Create a new subject category for scholarships.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="category-name">Category Name</Label>
                      <Input
                        id="category-name"
                        placeholder="e.g., Engineering"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add Category</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent className="space-y-3">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">{category.count}</Badge>
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Pencil className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Countries */}
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-warning" />
                <CardTitle className="text-lg">Countries</CardTitle>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Plus className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Country</DialogTitle>
                    <DialogDescription>
                      Add a new country to the scholarship database.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="country-name">Country Name</Label>
                      <Input id="country-name" placeholder="e.g., Netherlands" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country-code">Country Code</Label>
                      <Input id="country-code" placeholder="e.g., NL" maxLength={2} />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add Country</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent className="space-y-3 max-h-[400px] overflow-y-auto">
              {countries.map((country) => (
                <div
                  key={country.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="font-mono text-xs">
                      {country.code}
                    </Badge>
                    <span className="font-medium">{country.name}</span>
                    <span className="text-sm text-muted-foreground">
                      ({country.count})
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Pencil className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Categories;
