import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Download, Clock, Award, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

interface Question {
  id: number;
  text: string;
  subject: string;
  year: number;
  difficulty: "easy" | "medium" | "hard";
  options: string[];
  answer: string;
}

const QUESTION_BANKS: Record<string, Question[]> = {
  mpsc: [
    {
      id: 1,
      text: "Which is the capital of Maharashtra?",
      subject: "Geography",
      year: 2024,
      difficulty: "easy",
      options: ["Mumbai", "Pune", "Nagpur", "Aurangabad"],
      answer: "Mumbai"
    },
    {
      id: 2,
      text: "In which year was the Indian Constitution adopted?",
      subject: "History",
      year: 2023,
      difficulty: "easy",
      options: ["1947", "1950", "1949", "1952"],
      answer: "1950"
    },
    {
      id: 3,
      text: "Who is the architect of Indian Constitution?",
      subject: "Polity",
      year: 2024,
      difficulty: "easy",
      options: ["B.R. Ambedkar", "Jawaharlal Nehru", "Sardar Vallabhbhai Patel", "Dr. Rajendra Prasad"],
      answer: "B.R. Ambedkar"
    },
    {
      id: 4,
      text: "What is the total number of states in India?",
      subject: "Geography",
      year: 2023,
      difficulty: "medium",
      options: ["28", "29", "31", "32"],
      answer: "28"
    },
    {
      id: 5,
      text: "Which river is the longest in India?",
      subject: "Geography",
      year: 2024,
      difficulty: "medium",
      options: ["Brahmaputra", "Ganges", "Godavari", "Yamuna"],
      answer: "Ganges"
    }
  ],
  upsc: [
    {
      id: 1,
      text: "What is the smallest country in the world by area?",
      subject: "Geography",
      year: 2024,
      difficulty: "easy",
      options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
      answer: "Vatican City"
    },
    {
      id: 2,
      text: "Which is the largest planet in our solar system?",
      subject: "Science",
      year: 2023,
      difficulty: "easy",
      options: ["Saturn", "Jupiter", "Neptune", "Uranus"],
      answer: "Jupiter"
    },
    {
      id: 3,
      text: "In which year did India gain independence?",
      subject: "History",
      year: 2024,
      difficulty: "easy",
      options: ["1945", "1947", "1950", "1949"],
      answer: "1947"
    },
    {
      id: 4,
      text: "Who was the first President of India?",
      subject: "Polity",
      year: 2023,
      difficulty: "medium",
      options: ["Dr. Rajendra Prasad", "S. Radhakrishnan", "Zakir Husain", "V.V. Giri"],
      answer: "Dr. Rajendra Prasad"
    },
    {
      id: 5,
      text: "What is the currency of Japan?",
      subject: "Economics",
      year: 2024,
      difficulty: "medium",
      options: ["Yuan", "Won", "Yen", "Rupiah"],
      answer: "Yen"
    }
  ]
};

export default function QuestionBanks() {
  const [selectedExam, setSelectedExam] = useState<"mpsc" | "upsc">("mpsc");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [, setLocation] = useLocation();

  const questions = selectedYear
    ? QUESTION_BANKS[selectedExam].filter(q => q.year === selectedYear)
    : QUESTION_BANKS[selectedExam];

  const years = Array.from(new Set(QUESTION_BANKS[selectedExam].map(q => q.year))).sort((a, b) => b - a);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header variant="citizen" />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <Award className="h-8 w-8 text-[#f97316]" /> Question Banks
            </h1>
            <p className="text-gray-600 mt-2">MPSC & UPSC previous year questions</p>
          </div>
          <Button
            variant="outline"
            onClick={() => setLocation("/citizen/dashboard")}
            data-testid="button-back-to-dashboard"
          >
            <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
            Back to Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Select Exam & Year</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs value={selectedExam} onValueChange={(v) => setSelectedExam(v as "mpsc" | "upsc")}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="mpsc">MPSC</TabsTrigger>
                    <TabsTrigger value="upsc">UPSC</TabsTrigger>
                  </TabsList>

                  <TabsContent value="mpsc" className="space-y-4">
                    <div className="space-y-3">
                      <Button
                        variant={selectedYear === null ? "default" : "outline"}
                        onClick={() => setSelectedYear(null)}
                        className="w-full justify-start"
                        data-testid="button-year-all-mpsc"
                      >
                        All Years
                      </Button>
                      {years.map(year => (
                        <Button
                          key={year}
                          variant={selectedYear === year ? "default" : "outline"}
                          onClick={() => setSelectedYear(year)}
                          className="w-full justify-start"
                          data-testid={`button-year-${year}-mpsc`}
                        >
                          <Clock className="h-4 w-4 mr-2" />
                          Year {year}
                        </Button>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="upsc" className="space-y-4">
                    <div className="space-y-3">
                      <Button
                        variant={selectedYear === null ? "default" : "outline"}
                        onClick={() => setSelectedYear(null)}
                        className="w-full justify-start"
                        data-testid="button-year-all-upsc"
                      >
                        All Years
                      </Button>
                      {years.map(year => (
                        <Button
                          key={year}
                          variant={selectedYear === year ? "default" : "outline"}
                          onClick={() => setSelectedYear(year)}
                          className="w-full justify-start"
                          data-testid={`button-year-${year}-upsc`}
                        >
                          <Clock className="h-4 w-4 mr-2" />
                          Year {year}
                        </Button>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Questions List */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Questions ({questions.length})</span>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" /> Download PDF
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {questions.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No questions available</p>
                ) : (
                  questions.map((q, idx) => (
                    <div
                      key={q.id}
                      className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-3"
                      data-testid={`question-card-${q.id}`}
                    >
                      <div className="flex items-start justify-between">
                        <h3 className="font-bold text-gray-800 flex-1">
                          Q{idx + 1}. {q.text}
                        </h3>
                        <span className={`text-xs font-bold px-2 py-1 rounded ${
                          q.difficulty === "easy" ? "bg-green-100 text-green-700" :
                          q.difficulty === "medium" ? "bg-orange-100 text-orange-700" :
                          "bg-red-100 text-red-700"
                        }`}>
                          {q.difficulty.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex gap-4 text-xs text-gray-600">
                        <span>📚 {q.subject}</span>
                        <span>📅 {q.year}</span>
                      </div>
                      <div className="space-y-2">
                        {q.options.map((opt, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <input type="radio" name={`q${q.id}`} id={`q${q.id}o${i}`} />
                            <label htmlFor={`q${q.id}o${i}`} className="text-sm cursor-pointer">
                              {String.fromCharCode(65 + i)}. {opt}
                            </label>
                          </div>
                        ))}
                      </div>
                      <div className="text-xs pt-2 border-t">
                        <span className="text-gray-500">Answer: </span>
                        <span className="font-bold text-green-700">{q.answer}</span>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
