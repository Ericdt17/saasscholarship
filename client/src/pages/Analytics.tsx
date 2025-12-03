import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

const scholarshipsPerMonth = [
  { month: "Jan", count: 12 },
  { month: "Feb", count: 19 },
  { month: "Mar", count: 15 },
  { month: "Apr", count: 22 },
  { month: "May", count: 28 },
  { month: "Jun", count: 24 },
  { month: "Jul", count: 31 },
  { month: "Aug", count: 26 },
  { month: "Sep", count: 35 },
  { month: "Oct", count: 29 },
  { month: "Nov", count: 38 },
  { month: "Dec", count: 42 },
];

const userGrowth = [
  { month: "Jan", users: 2400 },
  { month: "Feb", users: 3200 },
  { month: "Mar", users: 4100 },
  { month: "Apr", users: 5300 },
  { month: "May", users: 6800 },
  { month: "Jun", users: 7900 },
  { month: "Jul", users: 8700 },
  { month: "Aug", users: 9500 },
  { month: "Sep", users: 10200 },
  { month: "Oct", users: 11100 },
  { month: "Nov", users: 12000 },
  { month: "Dec", users: 12847 },
];

const countriesData = [
  { name: "United States", value: 45 },
  { name: "United Kingdom", value: 32 },
  { name: "Germany", value: 28 },
  { name: "Australia", value: 22 },
  { name: "Canada", value: 18 },
  { name: "Others", value: 103 },
];

const levelsData = [
  { name: "Bachelor", value: 45 },
  { name: "Master", value: 120 },
  { name: "PhD", value: 58 },
  { name: "Postdoc", value: 25 },
];

const applicationsPerMonth = [
  { month: "Jan", submitted: 120, accepted: 45 },
  { month: "Feb", submitted: 180, accepted: 62 },
  { month: "Mar", submitted: 210, accepted: 78 },
  { month: "Apr", submitted: 165, accepted: 55 },
  { month: "May", submitted: 245, accepted: 89 },
  { month: "Jun", submitted: 198, accepted: 72 },
];

const deadlinesDistribution = [
  { month: "Jan", count: 8 },
  { month: "Feb", count: 12 },
  { month: "Mar", count: 15 },
  { month: "Apr", count: 22 },
  { month: "May", count: 18 },
  { month: "Jun", count: 10 },
  { month: "Jul", count: 5 },
  { month: "Aug", count: 8 },
  { month: "Sep", count: 14 },
  { month: "Oct", count: 20 },
  { month: "Nov", count: 25 },
  { month: "Dec", count: 18 },
];

const COLORS = ["hsl(239, 84%, 67%)", "hsl(142, 76%, 36%)", "hsl(38, 92%, 50%)", "hsl(0, 84%, 60%)", "hsl(280, 84%, 60%)", "hsl(200, 84%, 60%)"];

const Analytics = () => {
  return (
    <DashboardLayout title="Platform insights and statistics">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Analytics</h2>
            <p className="text-sm text-muted-foreground">
              Track your platform's performance
            </p>
          </div>
          <Select defaultValue="12months">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="3months">Last 3 months</SelectItem>
              <SelectItem value="12months">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Scholarships Per Month */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">New Scholarships per Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={scholarshipsPerMonth}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="month" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="count" fill="hsl(239, 84%, 67%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* User Growth */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">User Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={userGrowth}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="month" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="users"
                      stroke="hsl(142, 76%, 36%)"
                      fill="hsl(142, 76%, 36%, 0.2)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Countries Distribution */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">Scholarships by Country</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={countriesData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {countriesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {countriesData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-xs text-muted-foreground">
                      {entry.name} ({entry.value})
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Levels Distribution */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">Popular Levels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={levelsData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis type="number" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis dataKey="name" type="category" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} width={80} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="value" fill="hsl(38, 92%, 50%)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Applications */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">Applications Submitted vs Accepted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={applicationsPerMonth}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="month" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Line type="monotone" dataKey="submitted" stroke="hsl(239, 84%, 67%)" strokeWidth={2} dot={{ fill: 'hsl(239, 84%, 67%)' }} />
                    <Line type="monotone" dataKey="accepted" stroke="hsl(142, 76%, 36%)" strokeWidth={2} dot={{ fill: 'hsl(142, 76%, 36%)' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-xs text-muted-foreground">Submitted</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success" />
                  <span className="text-xs text-muted-foreground">Accepted</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Deadlines Distribution */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">Deadlines Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={deadlinesDistribution}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="month" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="count"
                      stroke="hsl(0, 84%, 60%)"
                      fill="hsl(0, 84%, 60%, 0.2)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
