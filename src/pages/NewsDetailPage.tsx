import type { FC } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, User, ArrowLeft, ShieldCheck } from "lucide-react";
import {
  Button,
  Card,
  Badge,
  Alert,
  PageHeaderBanner,
  Muted,
} from "@/components/ui";
import { getNewsArticleById, MOCK_NEWS } from "@/services/mock-data";

export const NewsDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const article = id ? getNewsArticleById(id) : undefined;
  const relatedArticles = MOCK_NEWS.filter((n) => n.id !== id).slice(0, 3);

  if (!article) {
    return (
      <div className="container-custom py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Article Not Found</h2>
        <p className="text-xs text-slate-600">The requested news article does not exist or has been removed.</p>
        <Link to="/news">
          <Button variant="primary" size="sm" leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}>
            Return to News Directory
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      {/* Page Header Banner */}
      <PageHeaderBanner
        title={article.title}
        description={`Published in ${article.category} on ${article.date}`}
        breadcrumbs={[
          { label: "News & Announcements", href: "/news" },
          { label: article.category },
        ]}
        badge={
          <Badge variant="accent" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
            Official Release
          </Badge>
        }
      />

      <div className="container-custom space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Article Content (2 Columns) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Meta Information Bar */}
            <div className="p-4 bg-white border border-slate-200 rounded-md flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-4 text-slate-600">
                <span className="flex items-center gap-1 font-semibold">
                  <User className="w-3.5 h-3.5 text-[#187B28]" /> {article.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#187B28]" /> {article.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#187B28]" /> {article.readTime}
                </span>
              </div>
              <Badge variant="primary">{article.category}</Badge>
            </div>

            {/* Featured Image */}
            {article.imageUrl && (
              <div className="rounded-md overflow-hidden border border-slate-200 shadow-xs max-h-96">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Article Content Body */}
            <Card className="p-8 space-y-6">
              <p className="text-base font-semibold text-[#187B28] leading-relaxed border-b border-slate-100 pb-4">
                {article.summary}
              </p>

              <div className="prose max-w-none text-sm text-slate-800 leading-relaxed space-y-4 whitespace-pre-line">
                {article.content}
              </div>
            </Card>

            {/* Official Publication Notice Footer */}
            <Alert type="info" title="Official Parliamentary Secretariat Release">
              <p className="text-xs text-slate-700 leading-relaxed">
                This news publication is issued by the Communications Bureau of the Ghana Youth Parliament. Re-publication permission is granted for official media reporting with attribution.
              </p>
            </Alert>
          </div>

          {/* Sidebar (Related Articles) */}
          <div className="space-y-6">
            <Card className="p-5 space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#187B28] border-b border-slate-100 pb-2">
                Related Announcements
              </h4>
              <div className="space-y-4">
                {relatedArticles.map((rel) => (
                  <div key={rel.id} className="space-y-1 border-b border-slate-100 pb-3 last:border-b-0 last:pb-0">
                    <Badge variant="neutral">{rel.category}</Badge>
                    <h5 className="font-bold text-xs text-[#181818] hover:text-[#187B28] leading-snug">
                      <Link to={`/news/${rel.id}`}>{rel.title}</Link>
                    </h5>
                    <Muted className="text-[10px]">{rel.date}</Muted>
                  </div>
                ))}
              </div>
            </Card>

            <Link to="/news" className="block">
              <Button variant="outline" size="sm" className="w-full" leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}>
                Back to All News Articles
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
