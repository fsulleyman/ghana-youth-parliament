import {
  MOCK_YOUTH_MPS,
  MOCK_CONSTITUENCIES,
  MOCK_COMMITTEES,
  MOCK_NEWS,
  MOCK_EVENTS,
  MOCK_RESOURCES,
  MOCK_PETITIONS,
  MOCK_ACTIVITIES,
} from "@/services/mock-data";

export interface SearchResultItem {
  id: string;
  title: string;
  type: "mp" | "constituency" | "committee" | "news" | "event" | "resource" | "petition" | "activity";
  categoryLabel: string;
  description: string;
  url: string;
  meta: string;
}

export function performGlobalSearch(query: string): SearchResultItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const results: SearchResultItem[] = [];

  // 1. Youth MPs Search
  MOCK_YOUTH_MPS.forEach((mp) => {
    const roleText = mp.leadershipTitle || "Youth MP";
    if (
      mp.fullName.toLowerCase().includes(q) ||
      mp.constituency.toLowerCase().includes(q) ||
      mp.region.toLowerCase().includes(q) ||
      mp.committee.toLowerCase().includes(q)
    ) {
      results.push({
        id: `mp-${mp.id}`,
        title: mp.fullName,
        type: "mp",
        categoryLabel: "Youth MP",
        description: `${roleText} representing ${mp.constituency} (${mp.region} Region). Committee: ${mp.committee}.`,
        url: `/mps/${mp.id}`,
        meta: mp.constituency,
      });
    }
  });

  // 2. Constituencies Search
  MOCK_CONSTITUENCIES.forEach((c) => {
    if (
      c.name.toLowerCase().includes(q) ||
      c.region.toLowerCase().includes(q) ||
      c.capital.toLowerCase().includes(q)
    ) {
      results.push({
        id: `const-${c.id}`,
        title: `${c.name} Constituency`,
        type: "constituency",
        categoryLabel: "Constituency",
        description: `Parliamentary constituency in the ${c.region} Region. Capital: ${c.capital}. Youth Population: ${c.totalYouthPopulation}.`,
        url: `/constituencies/${c.id}`,
        meta: c.region,
      });
    }
  });

  // 3. Committees Search
  MOCK_COMMITTEES.forEach((comm) => {
    if (
      comm.name.toLowerCase().includes(q) ||
      comm.mandate.toLowerCase().includes(q)
    ) {
      results.push({
        id: `comm-${comm.id}`,
        title: comm.name,
        type: "committee",
        categoryLabel: "Parliamentary Committee",
        description: comm.mandate,
        url: `/committees/${comm.id}`,
        meta: `${comm.memberCount} Members`,
      });
    }
  });

  // 4. News Articles Search
  MOCK_NEWS.forEach((n) => {
    if (
      n.title.toLowerCase().includes(q) ||
      n.summary.toLowerCase().includes(q) ||
      n.category.toLowerCase().includes(q)
    ) {
      results.push({
        id: `news-${n.id}`,
        title: n.title,
        type: "news",
        categoryLabel: "News Article",
        description: n.summary,
        url: `/news/${n.id}`,
        meta: n.date,
      });
    }
  });

  // 5. Events Search
  MOCK_EVENTS.forEach((e) => {
    if (
      e.title.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q) ||
      e.location.toLowerCase().includes(q)
    ) {
      results.push({
        id: `event-${e.id}`,
        title: e.title,
        type: "event",
        categoryLabel: "Calendar Event",
        description: e.description,
        url: `/events/${e.id}`,
        meta: `${e.date} • ${e.location}`,
      });
    }
  });

  // 6. Resources Search
  MOCK_RESOURCES.forEach((r) => {
    if (
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q)
    ) {
      results.push({
        id: `res-${r.id}`,
        title: r.title,
        type: "resource",
        categoryLabel: "Resource Document",
        description: r.description,
        url: "/resources",
        meta: `${r.fileType} (${r.fileSize})`,
      });
    }
  });

  // 7. Petitions Search
  MOCK_PETITIONS.forEach((p) => {
    if (
      p.title.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q) ||
      p.committee.toLowerCase().includes(q)
    ) {
      results.push({
        id: `pet-${p.id}`,
        title: p.title,
        type: "petition",
        categoryLabel: "Public Petition",
        description: p.summary,
        url: "/engagement",
        meta: `${p.signaturesCount.toLocaleString()} Signatures`,
      });
    }
  });

  // 8. MP Activities Search
  MOCK_ACTIVITIES.forEach((act) => {
    if (
      act.title.toLowerCase().includes(q) ||
      act.description.toLowerCase().includes(q) ||
      act.mpName.toLowerCase().includes(q)
    ) {
      results.push({
        id: `act-${act.id}`,
        title: act.title,
        type: "activity",
        categoryLabel: "MP Initiative",
        description: act.description,
        url: "/activities",
        meta: `${act.mpName} (${act.constituency})`,
      });
    }
  });

  return results;
}
