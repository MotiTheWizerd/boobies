import React from "react";
import { BarChart, Clock, Image } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import { Skeleton } from "../../components/ui/Skeleton";

interface Campaign {
  id: string;
  status: string;
  _count?: {
    ads: number;
  };
}

interface StatsOverviewProps {
  campaigns: Campaign[];
  loading: boolean;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({
  campaigns,
  loading,
}) => {
  const activeCount = campaigns.filter((c) => c.status === "active").length;
  const totalAdsCount = campaigns.reduce(
    (sum, campaign) => sum + (campaign._count?.ads || 0),
    0
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="hover:shadow-md transition-shadow bg-card text-card-foreground">
        <CardHeader className="pb-2">
          <CardTitle className="text-muted-foreground text-sm font-normal">
            סה"כ קמפיינים
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <BarChart className="w-6 h-6 text-primary me-2" />
            {loading ? (
              <Skeleton className="h-8 w-12" />
            ) : (
              <span className="text-2xl font-bold">{campaigns.length}</span>
            )}
          </div>
        </CardContent>
      </Card>
      <Card className="hover:shadow-md transition-shadow bg-card text-card-foreground">
        <CardHeader className="pb-2">
          <CardTitle className="text-muted-foreground text-sm font-normal">
            קמפיינים פעילים
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Clock className="w-6 h-6 text-green-500 me-2" />
            {loading ? (
              <Skeleton className="h-8 w-12" />
            ) : (
              <span className="text-2xl font-bold">{activeCount}</span>
            )}
          </div>
        </CardContent>
      </Card>
      <Card className="hover:shadow-md transition-shadow bg-card text-card-foreground">
        <CardHeader className="pb-2">
          <CardTitle className="text-muted-foreground text-sm font-normal">
            סה"כ מדיה
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Image className="w-6 h-6 text-blue-500 me-2" />
            {loading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <span className="text-2xl font-bold">{totalAdsCount}</span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsOverview;
