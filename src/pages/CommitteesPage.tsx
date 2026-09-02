import { useState, useMemo, type FC } from "react";
import { Link } from "react-router-dom";
import { Users, FileText, ArrowRight, BookOpen } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  Badge,
  PageHeaderBanner,
  SearchInput,
  Text,
  Muted,
} from "@/components/ui";
import { MOCK_COMMITTEES } from "@/services/mock-data";

export const CommitteesPage: FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCommittees = useMemo(() => {
    return MOCK_COMMITTEES.filter((comm) => {
      return (
        comm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comm.mandate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comm.chairName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [searchQuery]);

  return (
    <div className="space-y-10 pb-20">
      {/* Page Header Banner */}
      <PageHeaderBanner
        title="Parliamentary Committees"
        description="Standing committees of the Ghana Youth Parliament conducting policy research, bill scrutiny, and public hearings."
        breadcrumbs={[{ label: "Committees" }]}
        badge={
          <Badge variant="accent" icon={<BookOpen className="w-3.5 h-3.5" />}>
            Standing Committees
          </Badge>
        }
      />

      <div className="container-custom space-y-8">
        {/* Search Bar */}
        <div className="p-4 bg-white border border-slate-200 rounded-md shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <SearchInput
            placeholder="Search committee by name, mandate, or chair..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md w-full"
          />
          <Muted>
            Showing <span className="font-bold text-slate-900">{filteredCommittees.length}</span> standing committees
          </Muted>
        </div>

        {/* Committee Grid */}
        {filteredCommittees.length === 0 ? (
          <div className="inst-card p-12 text-center space-y-3">
            <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No committees found</h3>
            <Muted>Try adjusting your search criteria.</Muted>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCommittees.map((comm) => (
              <Card key={comm.id} className="flex flex-col justify-between hover:border-[#187B28] transition-colors border-t-4 border-t-[#187B28]">
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="accent">Standing Committee</Badge>
                    <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                      <Users className="w-3 h-3 text-[#187B28]" /> {comm.memberCount} MPs
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-[#187B28]">{comm.name}</h3>

                  <Text className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {comm.mandate}
                  </Text>

                  <div className="pt-3 border-t border-slate-100 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Committee Chair:</span>
                      <span className="font-semibold text-slate-900">{comm.chairName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Vice Chair:</span>
                      <span className="font-medium text-slate-700">{comm.viceChairName}</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-[#187B28]" /> {comm.reportsCount} Reports Published
                  </span>
                  <Link to={`/committees/${comm.id}`}>
                    <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                      Committee Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
