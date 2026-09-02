import { useState, useMemo, type FC, type FormEvent } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import {
  Button,
  Card,
  Badge,
  PageHeaderBanner,
  SearchInput,
  Tabs,
  Text,
  Muted,
} from "@/components/ui";
import { performGlobalSearch } from "@/services/search-service";

export const SearchResultsPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawQuery = searchParams.get("q") || "";

  const [queryInput, setQueryInput] = useState(rawQuery);
  const [selectedType, setSelectedType] = useState<string>("all");

  const searchResults = useMemo(() => {
    return performGlobalSearch(rawQuery);
  }, [rawQuery]);

  const filteredResults = useMemo(() => {
    if (selectedType === "all") return searchResults;
    return searchResults.filter((item) => item.type === selectedType);
  }, [searchResults, selectedType]);

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: queryInput });
  };

  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = { all: searchResults.length };
    searchResults.forEach((item) => {
      counts[item.type] = (counts[item.type] || 0) + 1;
    });
    return counts;
  }, [searchResults]);

  const filterTabs = [
    { id: "all", label: "All Results", count: searchResults.length },
    { id: "mp", label: "Youth MPs", count: typeCounts.mp || 0 },
    { id: "constituency", label: "Constituencies", count: typeCounts.constituency || 0 },
    { id: "committee", label: "Committees", count: typeCounts.committee || 0 },
    { id: "news", label: "News Articles", count: typeCounts.news || 0 },
    { id: "event", label: "Events", count: typeCounts.event || 0 },
    { id: "resource", label: "Resources", count: typeCounts.resource || 0 },
    { id: "petition", label: "Petitions", count: typeCounts.petition || 0 },
    { id: "activity", label: "MP Initiatives", count: typeCounts.activity || 0 },
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Page Header Banner */}
      <PageHeaderBanner
        title="Global Search Engine"
        description="Unified search across Youth MPs, 275 constituencies, parliamentary committees, news releases, calendar events, standing orders, and public petitions."
        breadcrumbs={[{ label: "Search Results" }]}
        badge={
          <Badge variant="accent" icon={<Search className="w-3.5 h-3.5" />}>
            Platform Search Engine
          </Badge>
        }
      />

      <div className="container-custom space-y-10">
        {/* Search Query Input Bar */}
        <section className="bg-slate-50 border border-slate-200 p-6 rounded-md shadow-xs">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
            <SearchInput
              placeholder="Search by keyword, MP name, constituency, committee, or topic..."
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              className="w-full text-sm"
            />
            <Button type="submit" variant="primary" size="md" className="shrink-0">
              Search Platform
            </Button>
          </form>
        </section>

        {/* Results Metadata Bar & Category Filter Tabs */}
        {rawQuery && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Search Results for <span className="text-[#187B28]">"{rawQuery}"</span>
                </h3>
                <Muted className="text-xs">
                  Found <span className="font-bold text-slate-900">{searchResults.length}</span> matching record(s)
                </Muted>
              </div>
            </div>

            {/* Filter Tabs */}
            <Tabs
              tabs={filterTabs}
              activeTab={selectedType}
              onTabChange={(tabId: string) => setSelectedType(tabId)}
            />

            {/* Search Results List */}
            {filteredResults.length === 0 ? (
              <Card className="p-12 text-center space-y-4">
                <Search className="w-10 h-10 text-slate-400 mx-auto" />
                <h4 className="text-base font-bold text-slate-800">
                  No matching records found for "{rawQuery}"
                </h4>
                <Text className="text-xs text-slate-600 max-w-md mx-auto">
                  Try broadening your search query, checking spelling, or selecting a different category filter above.
                </Text>
                <div className="pt-2 flex justify-center gap-2 text-xs">
                  <button
                    onClick={() => {
                      setQueryInput("Subin");
                      setSearchParams({ q: "Subin" });
                    }}
                    className="text-[#187B28] underline font-medium cursor-pointer"
                  >
                    Try "Subin"
                  </button>
                  <span>•</span>
                  <button
                    onClick={() => {
                      setQueryInput("Education");
                      setSearchParams({ q: "Education" });
                    }}
                    className="text-[#187B28] underline font-medium cursor-pointer"
                  >
                    Try "Education"
                  </button>
                  <span>•</span>
                  <button
                    onClick={() => {
                      setQueryInput("Standing Orders");
                      setSearchParams({ q: "Standing Orders" });
                    }}
                    className="text-[#187B28] underline font-medium cursor-pointer"
                  >
                    Try "Standing Orders"
                  </button>
                </div>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredResults.map((item) => (
                  <Card
                    key={item.id}
                    className="p-5 hover:border-[#187B28] transition-colors border-l-4 border-l-[#187B28] flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="accent">{item.categoryLabel}</Badge>
                        <span className="text-xs text-slate-500 font-mono">{item.meta}</span>
                      </div>

                      <Link to={item.url} className="block group">
                        <h4 className="font-bold text-base text-[#181818] group-hover:text-[#187B28] transition-colors">
                          {item.title}
                        </h4>
                      </Link>

                      <Text className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {item.description}
                      </Text>
                    </div>

                    <Link to={item.url} className="shrink-0">
                      <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                        View Record
                      </Button>
                    </Link>
                  </Card>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};
