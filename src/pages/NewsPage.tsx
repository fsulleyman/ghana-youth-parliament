import { useState, useMemo, type FC } from "react";
import { Link } from "react-router-dom";
import { Newspaper, Calendar, Clock, User, ArrowRight } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  Badge,
  PageHeaderBanner,
  SearchInput,
  Tabs,
  PaginationControls,
  Text,
  Muted,
} from "@/components/ui";
import { MOCK_NEWS, NEWS_CATEGORIES } from "@/services/mock-data";

export const NewsPage: FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const featuredArticle = MOCK_NEWS.find((n) => n.featured) || MOCK_NEWS[0];

  const filteredNews = useMemo(() => {
    return MOCK_NEWS.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "All Categories" || article.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const paginatedNews = filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const categoryTabs = NEWS_CATEGORIES.map((cat) => ({
    id: cat,
    label: cat,
    count:
      cat === "All Categories"
        ? MOCK_NEWS.length
        : MOCK_NEWS.filter((n) => n.category === cat).length,
  }));

  return (
    <div className="space-y-10 pb-20">
      {/* Page Header Banner */}
      <PageHeaderBanner
        title="News & Announcements"
        description="Official editorial updates, parliamentary session reports, committee releases, and press announcements."
        breadcrumbs={[{ label: "News & Announcements" }]}
        badge={
          <Badge variant="accent" icon={<Newspaper className="w-3.5 h-3.5" />}>
            Official Publications
          </Badge>
        }
      />

      <div className="container-custom space-y-10">
        {/* Featured Article Hero Banner */}
        {featuredArticle && !searchQuery && activeCategory === "All Categories" && (
          <section className="bg-white border border-slate-200 rounded-md overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-64 lg:h-auto min-h-[260px]">
              <img
                src={featuredArticle.imageUrl || "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=800"}
                alt={featuredArticle.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-4 left-4">
                <Badge variant="accent">Featured Story</Badge>
              </div>
            </div>

            <div className="p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs">
                  <Badge variant="primary">{featuredArticle.category}</Badge>
                  <span className="text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#187B28]" /> {featuredArticle.date}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-[#187B28] leading-tight">
                  <Link to={`/news/${featuredArticle.id}`} className="hover:underline">
                    {featuredArticle.title}
                  </Link>
                </h2>

                <Text className="text-slate-600 line-clamp-3 leading-relaxed">
                  {featuredArticle.summary}
                </Text>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-4 text-slate-500">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#187B28]" /> {featuredArticle.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#187B28]" /> {featuredArticle.readTime}
                  </span>
                </div>
                <Link to={`/news/${featuredArticle.id}`}>
                  <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Read Full Article
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Category Tabs & Search Bar */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <Tabs
              tabs={categoryTabs}
              activeTab={activeCategory}
              onTabChange={(tabId: string) => {
                setActiveCategory(tabId);
                setCurrentPage(1);
              }}
            />
            <SearchInput
              placeholder="Search news by title or keyword..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="max-w-xs shrink-0"
            />
          </div>

          {/* News Grid */}
          {filteredNews.length === 0 ? (
            <div className="inst-card p-12 text-center space-y-3">
              <Newspaper className="w-8 h-8 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No news articles found</h3>
              <Muted>Try clearing your search query or selecting another category.</Muted>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedNews.map((article) => (
                <Card key={article.id} className="flex flex-col justify-between hover:border-[#187B28] transition-colors">
                  {article.imageUrl && (
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-44 object-cover object-center border-b border-slate-100 bg-slate-100"
                    />
                  )}
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-[11px]">
                      <Badge variant="primary">{article.category}</Badge>
                      <Muted>{article.date}</Muted>
                    </div>

                    <h3 className="font-bold text-base text-[#187B28] line-clamp-2 leading-snug">
                      <Link to={`/news/${article.id}`} className="hover:underline">
                        {article.title}
                      </Link>
                    </h3>

                    <Text className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {article.summary}
                    </Text>
                  </CardContent>

                  <CardFooter className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                    <Muted>{article.readTime}</Muted>
                    <Link to={`/news/${article.id}`}>
                      <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                        Read Story
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </section>
      </div>
    </div>
  );
};
