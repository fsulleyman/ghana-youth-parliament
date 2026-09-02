import { useState, useMemo, type FC } from "react";
import { Link } from "react-router-dom";
import { MapPin, Users, ArrowRight, Grid, List } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  Badge,
  PageHeaderBanner,
  SearchInput,
  Select,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableEmpty,
  Muted,
} from "@/components/ui";
import { MOCK_CONSTITUENCIES, GHANA_REGIONS } from "@/services/mock-data";

export const ConstituenciesPage: FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const filteredConstituencies = useMemo(() => {
    return MOCK_CONSTITUENCIES.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.mpName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.code.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion =
        selectedRegion === "All Regions" || c.region === selectedRegion;

      return matchesSearch && matchesRegion;
    });
  }, [searchQuery, selectedRegion]);

  return (
    <div className="space-y-10 pb-20">
      {/* Page Header Banner */}
      <PageHeaderBanner
        title="Constituency Directory"
        description="Search and explore parliamentary representation across all 275 constituencies and 16 regions of Ghana."
        breadcrumbs={[{ label: "Constituencies" }]}
        badge={
          <Badge variant="accent" icon={<MapPin className="w-3.5 h-3.5" />}>
            Regional Representation
          </Badge>
        }
      />

      <div className="container-custom space-y-8">
        {/* Search, Region Filter, and View Mode Toggle Bar */}
        <div className="p-4 bg-white border border-slate-200 rounded-md shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex-1 flex flex-col sm:flex-row items-center gap-3">
            <SearchInput
              placeholder="Search constituency by name, code, or Youth MP..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
            <Select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="sm:w-56"
            >
              {GHANA_REGIONS.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
            <Muted>
              Showing <span className="font-bold text-slate-900">{filteredConstituencies.length}</span> constituencies
            </Muted>
            <div className="flex items-center gap-1 border border-slate-200 rounded p-1 bg-slate-50">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded text-xs flex items-center gap-1 cursor-pointer transition-colors ${
                  viewMode === "grid"
                    ? "bg-[#187B28] text-white font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="Grid View"
              >
                <Grid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`p-1.5 rounded text-xs flex items-center gap-1 cursor-pointer transition-colors ${
                  viewMode === "table"
                    ? "bg-[#187B28] text-white font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="Table View"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* View Mode 1: Grid Cards */}
        {viewMode === "grid" && (
          <div>
            {filteredConstituencies.length === 0 ? (
              <div className="inst-card p-12 text-center space-y-3">
                <MapPin className="w-8 h-8 text-slate-400 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">No constituencies found</h3>
                <Muted>Try adjusting your search criteria or region filter.</Muted>
                <Button variant="outline" size="sm" onClick={() => { setSearchQuery(""); setSelectedRegion("All Regions"); }}>
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredConstituencies.map((c) => (
                  <Card key={c.id} className="flex flex-col justify-between hover:border-[#187B28] transition-colors">
                    <CardContent className="p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="primary" icon={<MapPin className="w-3 h-3" />}>
                          {c.region}
                        </Badge>
                        <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {c.code}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-[#187B28]">{c.name}</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Capital: {c.capital}</p>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {c.description}
                      </p>
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-600">
                          Youth MP: <span className="font-semibold text-slate-900">{c.mpName}</span>
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-3 bg-slate-50 border-t border-slate-100">
                      <span className="text-[11px] text-slate-500 flex items-center gap-1">
                        <Users className="w-3 h-3 text-[#187B28]" /> {c.totalYouthPopulation} Youth
                      </span>
                      <Link to={`/constituencies/${c.id}`}>
                        <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                          Details
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* View Mode 2: Data Table */}
        {viewMode === "table" && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Constituency</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Youth MP Representative</TableHead>
                <TableHead>Youth Pop.</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredConstituencies.length === 0 ? (
                <TableEmpty colSpan={6}>
                  No constituencies found matching "{searchQuery}".
                </TableEmpty>
              ) : (
                filteredConstituencies.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-bold text-[#187B28]">{c.name}</TableCell>
                    <TableCell className="font-mono text-xs text-slate-600">{c.code}</TableCell>
                    <TableCell><Badge variant="outline">{c.region}</Badge></TableCell>
                    <TableCell className="font-medium text-slate-900">{c.mpName}</TableCell>
                    <TableCell className="text-slate-600">{c.totalYouthPopulation}</TableCell>
                    <TableCell className="text-right">
                      <Link to={`/constituencies/${c.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};
