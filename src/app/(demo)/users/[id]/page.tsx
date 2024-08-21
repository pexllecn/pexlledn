import React from "react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  BriefcaseIcon
} from "lucide-react";

// This would typically come from an API or database
const user = {
  id: 1,
  name: "Alice Johnson",
  email: "alice@example.com",
  role: "Admin",
  avatarUrl: "https://i.pravatar.cc/150?img=1",
  department: "IT",
  joinDate: "2022-03-15",
  phone: "+1 (555) 123-4567",
  location: "New York, NY",
  bio: "Experienced IT professional with a passion for cybersecurity and cloud computing. Always eager to learn and implement new technologies.",
  skills: ["Python", "React", "AWS", "Docker", "Kubernetes"],
  projects: [
    { name: "Cloud Migration", status: "Completed" },
    { name: "Security Audit", status: "In Progress" },
    { name: "DevOps Pipeline", status: "Planning" }
  ]
};

export default function UserProfilePage() {
  return (
    <ContentLayout title={`Profile: ${user.name}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
              <p className="text-muted-foreground mb-4">{user.email}</p>
              <div className="flex space-x-2 mb-4">
                <Badge>{user.role}</Badge>
                <Badge variant="outline">{user.department}</Badge>
              </div>
              <Button className="w-full">Edit Profile</Button>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2 text-muted-foreground" />
                <span>Joined {user.joinDate}</span>
              </div>
              <div className="flex items-center">
                <PhoneIcon className="h-5 w-5 mr-2 text-muted-foreground" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center">
                <MapPinIcon className="h-5 w-5 mr-2 text-muted-foreground" />
                <span>{user.location}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardContent className="p-6">
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Bio</h3>
                <p className="text-muted-foreground mb-4">{user.bio}</p>
                <h3 className="text-lg font-semibold mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="projects" className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Projects</h3>
                <div className="space-y-4">
                  {user.projects.map((project, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">{project.name}</h4>
                          <Badge
                            variant={
                              project.status === "Completed"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {project.status}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="activity" className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <p className="text-muted-foreground">
                  Activity feed coming soon...
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </ContentLayout>
  );
}
