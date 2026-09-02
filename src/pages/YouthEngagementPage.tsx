import { useState, type FC, type FormEvent } from "react";
import {
  Users,
  FileSignature,
  MessageSquare,
  Vote,
  CheckCircle2,
  Send,
  PlusCircle,
} from "lucide-react";
import {
  Button,
  Card,
  Badge,
  Alert,
  PageHeaderBanner,
  Select,
  Input,
  FormField,
  Text,
  Muted,
  SectionTitleBlock,
} from "@/components/ui";
import {
  MOCK_PETITIONS,
  MOCK_POLLS,
  MOCK_CONSTITUENCIES,
  getYouthMPByConstituencyId,
  PARLIAMENTARY_COMMITTEES,
  type MockPetition,
} from "@/services/mock-data";

export const YouthEngagementPage: FC = () => {
  const [petitions, setPetitions] = useState<MockPetition[]>(MOCK_PETITIONS);
  const [signedPetitions, setSignedPetitions] = useState<Record<string, boolean>>({});
  const [showPetitionForm, setShowPetitionForm] = useState(false);
  const [petitionSubmitted, setPetitionSubmitted] = useState(false);

  // Constituency Issue Form State
  const [selectedConstituencyId, setSelectedConstituencyId] = useState(MOCK_CONSTITUENCIES[0].id);
  const [issueSubmitted, setIssueSubmitted] = useState(false);

  // Poll State
  const [pollVotes, setPollVotes] = useState<Record<string, number>>({
    "opt-1": 680,
    "opt-2": 410,
    "opt-3": 190,
    "opt-4": 140,
  });
  const [selectedPollOption, setSelectedPollOption] = useState<string | null>(null);
  const [hasVotedPoll, setHasVotedPoll] = useState(false);

  const assignedMp = selectedConstituencyId ? getYouthMPByConstituencyId(selectedConstituencyId) : undefined;

  const handleSignPetition = (petitionId: string) => {
    if (signedPetitions[petitionId]) return;

    setSignedPetitions((prev) => ({ ...prev, [petitionId]: true }));
    setPetitions((prev) =>
      prev.map((pet) =>
        pet.id === petitionId
          ? { ...pet, signaturesCount: pet.signaturesCount + 1 }
          : pet
      )
    );
  };

  const handleNewPetitionSubmit = (e: FormEvent) => {
    e.preventDefault();
    setPetitionSubmitted(true);
    setTimeout(() => {
      setShowPetitionForm(false);
      setPetitionSubmitted(false);
    }, 3000);
  };

  const handleIssueSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIssueSubmitted(true);
  };

  const handlePollVote = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedPollOption || hasVotedPoll) return;

    setPollVotes((prev) => ({
      ...prev,
      [selectedPollOption]: (prev[selectedPollOption] || 0) + 1,
    }));
    setHasVotedPoll(true);
  };

  const totalPollVotes = Object.values(pollVotes).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-12 pb-20">
      {/* Page Header Banner */}
      <PageHeaderBanner
        title="Youth Engagement & Participation Hub"
        description="Submit public petitions, report local constituency issues directly to your Youth MP, and participate in policy polls."
        breadcrumbs={[{ label: "Youth Engagement" }]}
        badge={
          <Badge variant="accent" icon={<Users className="w-3.5 h-3.5" />}>
            Civic Participation
          </Badge>
        }
      />

      <div className="container-custom space-y-12">
        {/* Section 1: Public Petitions Hub */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-3">
            <SectionTitleBlock title="Public Petitions & Policy Memos" className="border-b-0 pb-0" />
            <Button
              variant="primary"
              size="sm"
              leftIcon={<PlusCircle className="w-3.5 h-3.5" />}
              onClick={() => setShowPetitionForm(!showPetitionForm)}
            >
              {showPetitionForm ? "Close Petition Form" : "Submit New Petition"}
            </Button>
          </div>

          {/* New Petition Form */}
          {showPetitionForm && (
            <Card className="p-6 bg-slate-50 border-2 border-[#187B28] space-y-4">
              <h4 className="font-bold text-sm text-[#187B28] flex items-center gap-2">
                <FileSignature className="w-4 h-4" /> Submit a Policy Petition to Parliamentary Secretariat
              </h4>

              {petitionSubmitted ? (
                <Alert type="success" title="Petition Registered">
                  Your petition submission has been received and forwarded to the Standing Committee on Constitutional & Legal Affairs for review.
                </Alert>
              ) : (
                <form onSubmit={handleNewPetitionSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="Petition Title" required>
                      <Input required placeholder="e.g. Petition for Student Tech Grants" />
                    </FormField>
                    <FormField label="Target Standing Committee" required>
                      <Select required>
                        {PARLIAMENTARY_COMMITTEES.filter((c) => c !== "All Committees").map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </Select>
                    </FormField>
                  </div>

                  <FormField label="Lead Petitioner / Organization Name" required>
                    <Input required placeholder="e.g. National Union of Ghana Students" />
                  </FormField>

                  <FormField label="Petition Summary & Legislative Demand" required>
                    <textarea
                      required
                      rows={3}
                      placeholder="State clearly the policy change or administrative action requested..."
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-[#187B28]"
                    />
                  </FormField>

                  <div className="flex justify-end">
                    <Button type="submit" variant="primary" size="sm">
                      Register Public Petition
                    </Button>
                  </div>
                </form>
              )}
            </Card>
          )}

          {/* Active Petitions List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {petitions.map((pet) => {
              const progressPercent = Math.min(
                100,
                Math.round((pet.signaturesCount / pet.targetSignatures) * 100)
              );
              const isSigned = signedPetitions[pet.id];

              return (
                <Card key={pet.id} className="p-6 space-y-4 border-l-4 border-l-[#187B28] flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="accent">{pet.committee}</Badge>
                      <Badge variant={pet.status === "Open for Support" ? "primary" : "warning"}>
                        {pet.status}
                      </Badge>
                    </div>

                    <h4 className="font-bold text-base text-[#181818] leading-snug">{pet.title}</h4>
                    <Text className="text-xs text-slate-600 leading-relaxed">{pet.summary}</Text>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-700">Digital Signatures</span>
                        <span className="text-[#187B28] font-mono">
                          {pet.signaturesCount.toLocaleString()} / {pet.targetSignatures.toLocaleString()} ({progressPercent}%)
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#187B28] transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <Muted>By: {pet.leadPetitioner}</Muted>
                      <Button
                        variant={isSigned ? "outline" : "primary"}
                        size="sm"
                        disabled={isSigned || pet.status !== "Open for Support"}
                        onClick={() => handleSignPetition(pet.id)}
                        leftIcon={isSigned ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : undefined}
                      >
                        {isSigned ? "Signed" : "Sign Petition"}
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Section 2: Constituency Issue Reporting Tool */}
        <section className="space-y-6 pt-6 border-t border-slate-200">
          <SectionTitleBlock title="Constituency Issue Reporting Tool" />

          <Card className="p-8 space-y-6">
            <div className="space-y-1">
              <h4 className="font-bold text-base text-[#187B28] flex items-center gap-2">
                <MessageSquare className="w-4 h-4" /> Report Local Community Challenge to Your Youth MP
              </h4>
              <Text className="text-xs text-slate-600">
                Directly communicate local infrastructure, youth unemployment, or educational issues in your constituency.
              </Text>
            </div>

            {issueSubmitted ? (
              <Alert type="success" title="Constituency Issue Submitted" className="p-6">
                <div className="space-y-2 text-xs">
                  <p className="text-slate-700">
                    Your report has been logged and transmitted directly to the constituent office of{" "}
                    <span className="font-bold text-[#187B28]">{assignedMp?.fullName || "your Youth MP"}</span>.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setIssueSubmitted(false)}>
                    Report Another Issue
                  </Button>
                </div>
              </Alert>
            ) : (
              <form onSubmit={handleIssueSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Select Your Constituency" required>
                    <Select
                      value={selectedConstituencyId}
                      onChange={(e) => setSelectedConstituencyId(e.target.value)}
                    >
                      {MOCK_CONSTITUENCIES.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.region})
                        </option>
                      ))}
                    </Select>
                  </FormField>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded flex items-center gap-3">
                    <img
                      src={assignedMp?.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"}
                      alt={assignedMp?.fullName}
                      className="w-10 h-10 rounded-full object-cover border border-[#187B28]"
                    />
                    <div className="text-xs">
                      <Muted>Assigned Youth MP</Muted>
                      <span className="font-bold text-[#187B28] block">{assignedMp?.fullName}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Issue Category" required>
                    <Select required>
                      <option value="Education & TVET">Education & TVET Facilities</option>
                      <option value="Youth Unemployment">Youth Unemployment & Jobs</option>
                      <option value="Sanitation & Climate">Sanitation & Environment</option>
                      <option value="Community Infrastructure">Community Infrastructure</option>
                    </Select>
                  </FormField>

                  <FormField label="Issue Headline" required>
                    <Input required placeholder="Brief summary of the issue..." />
                  </FormField>
                </div>

                <FormField label="Detailed Description & Recommendations" required>
                  <textarea
                    required
                    rows={3}
                    placeholder="Provide specific locations, affected youth numbers, and recommended actions..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-[#187B28]"
                  />
                </FormField>

                <div className="flex justify-end">
                  <Button type="submit" variant="primary" size="md" rightIcon={<Send className="w-3.5 h-3.5" />}>
                    Send Issue Report to Youth MP
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </section>

        {/* Section 3: Interactive Youth Opinion Polls */}
        <section className="space-y-6 pt-6 border-t border-slate-200">
          <SectionTitleBlock title="Youth Opinion Polls & Policy Surveys" />

          {MOCK_POLLS.map((poll) => (
            <Card key={poll.id} className="p-8 space-y-6 border-t-4 border-t-[#F9C511]">
              <div className="flex items-center justify-between">
                <Badge variant="accent">{poll.category}</Badge>
                <span className="text-xs font-mono text-slate-500 font-semibold">
                  Total Votes Cast: {totalPollVotes.toLocaleString()}
                </span>
              </div>

              <h4 className="font-bold text-base text-[#181818]">{poll.question}</h4>

              <form onSubmit={handlePollVote} className="space-y-4">
                <div className="space-y-3">
                  {poll.options.map((opt) => {
                    const optionVotes = pollVotes[opt.id] || opt.votes;
                    const percent = Math.round((optionVotes / totalPollVotes) * 100);

                    return (
                      <label
                        key={opt.id}
                        className={`block p-4 border rounded cursor-pointer transition-colors ${
                          selectedPollOption === opt.id
                            ? "border-[#187B28] bg-emerald-50/50"
                            : "border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-semibold mb-1">
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name={`poll-${poll.id}`}
                              disabled={hasVotedPoll}
                              checked={selectedPollOption === opt.id}
                              onChange={() => setSelectedPollOption(opt.id)}
                              className="accent-[#187B28]"
                            />
                            <span className="text-slate-800">{opt.text}</span>
                          </div>
                          {hasVotedPoll && (
                            <span className="font-mono font-bold text-[#187B28]">{percent}%</span>
                          )}
                        </div>

                        {hasVotedPoll && (
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-2">
                            <div
                              className="h-full bg-[#187B28] transition-all duration-500"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                        )}
                      </label>
                    );
                  })}
                </div>

                {!hasVotedPoll && (
                  <div className="flex justify-end pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                      disabled={!selectedPollOption}
                      leftIcon={<Vote className="w-3.5 h-3.5" />}
                    >
                      Submit Official Vote
                    </Button>
                  </div>
                )}
              </form>
            </Card>
          ))}
        </section>
      </div>
    </div>
  );
};
