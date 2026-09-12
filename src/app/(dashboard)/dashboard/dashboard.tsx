"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowDownToLine,
  ArrowUpRight,
  DollarSign,
  Users,
  CreditCard,
  Activity,
  ChevronRight,
  Check,
  LockKeyhole,
} from "lucide-react";
import {
  Avatar,
  PageHeading,
  Segments,
  useSavedState,
} from "@/components/workspace/primitives";

const periods = ["This month", "Last month"] as const;
const sales = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: 1999,
    product: "Annual subscription",
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: 39,
    product: "Monthly subscription",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: 299,
    product: "Team subscription",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    amount: 99,
    product: "Pro subscription",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: 39,
    product: "Monthly subscription",
  },
];
const money = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
const series = [
  1650, 2100, 1820, 2700, 2400, 3200, 2870, 3580, 3300, 4100, 3950, 4800,
];
function Sparkline({ down = false }: { down?: boolean }) {
  return (
    <svg className="ws-sparkline" viewBox="0 0 80 30" aria-hidden="true">
      <path
        d={
          down
            ? "M1 5 L12 9 L22 7 L33 15 L44 12 L54 19 L66 17 L79 25"
            : "M1 26 L12 20 L22 23 L33 13 L44 17 L54 8 L66 12 L79 3"
        }
        fill="none"
        stroke={down ? "#d96655" : "#389b7a"}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export default function Dashboard() {
  const [period, setPeriod] = useState<(typeof periods)[number]>("This month");
  const [view, setView] = useState<"Overview" | "Analytics">("Overview");
  const [completed, setCompleted] = useSavedState<string[]>(
    "pexlle:overview:tasks:v1",
    ["Reconcile March invoices"],
  );
  const current = period === "This month";
  const revenue = current ? 45231.89 : 37662.69;
  const goal = Math.round((revenue / 58000) * 100);
  const points = series
    .map((n, i) => `${38 + i * 42},${180 - n * (current ? 0.031 : 0.025)}`)
    .join(" ");
  function exportReport() {
    const text = `Sample workspace report\nPeriod,Revenue,Subscriptions,Sales,Active users\n${period},${revenue},${current ? 2350 : 839},${current ? 12234 : 10281},${current ? 573 : 600}\n`;
    const url = URL.createObjectURL(
      new Blob([text], { type: "text/csv;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "pexlle-sample-report.csv";
    link.click();
    URL.revokeObjectURL(url);
  }
  return (
    <div className="ws-page">
      <PageHeading
        eyebrow="Your workspace, at a glance"
        title="Good things ahead, Khaled."
        description="A little clarity for everything you’re building."
      >
        <select
          className="ws-button"
          aria-label="Report period"
          value={period}
          onChange={(e) => setPeriod(e.target.value as typeof period)}
        >
          {periods.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
        <button className="ws-button" onClick={exportReport}>
          <ArrowDownToLine size={14} />
          Export
        </button>
      </PageHeading>
      <div className="ws-overview-bar">
        <Segments
          options={["Overview", "Analytics"] as const}
          value={view}
          onChange={setView}
          label="Dashboard view"
        />
        <span className="ws-period-label">{period} · Sample data</span>
      </div>
      <div className="ws-metrics">
        {[
          {
            label: "Total revenue",
            value: money(revenue),
            change: current ? "20.1%" : "12.8%",
            icon: DollarSign,
          },
          {
            label: "Subscriptions",
            value: current ? "2,350" : "839",
            change: current ? "180.1%" : "8.4%",
            icon: Users,
          },
          {
            label: "Total sales",
            value: current ? "12,234" : "10,281",
            change: current ? "19.0%" : "14.2%",
            icon: CreditCard,
          },
          {
            label: "Active now",
            value: current ? "573" : "600",
            change: current ? "4.5%" : "2.1%",
            icon: Activity,
            down: current,
          },
        ].map(({ label, value, change, icon: Icon, down }) => (
          <article className="ws-card ws-metric" key={label}>
            <div className="ws-metric-label">
              <span>{label}</span>
              <Icon />
            </div>
            <p className="ws-metric-value">{value}</p>
            <div className="ws-metric-bottom">
              <span className={`ws-change ${down ? "negative" : ""}`}>
                <ArrowUpRight
                  size={12}
                  style={down ? { transform: "rotate(90deg)" } : undefined}
                />
                {change}{" "}
                <span className="ws-caption" style={{ fontSize: 9 }}>
                  vs. prior
                </span>
              </span>
              <Sparkline down={down} />
            </div>
          </article>
        ))}
      </div>
      <div className="ws-dashboard-grid">
        <section className="ws-card">
          <div className="ws-card-heading">
            <div>
              <h2>Revenue over time</h2>
              <p>Steady progress. A bigger picture.</p>
            </div>
            <span className="ws-caption">USD</span>
          </div>
          <div className="ws-revenue-total">
            <strong>{money(revenue)}</strong>
            <span className="ws-change">
              <ArrowUpRight size={12} />
              {current ? "20.1" : "12.8"}%
            </span>
          </div>
          <div className="ws-chart">
            <svg
              viewBox="0 0 530 220"
              role="img"
              aria-label={`Illustrative weekly revenue trend for ${period.toLowerCase()}. Monthly total ${money(revenue)}.`}
            >
              <defs>
                <linearGradient id="revenue-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#007aff" stopOpacity=".17" />
                  <stop offset="100%" stopColor="#007aff" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[30, 80, 130, 180].map((y, i) => (
                <g key={y}>
                  <line
                    x1="38"
                    x2="505"
                    y1={y}
                    y2={y}
                    className="ws-chart-grid"
                  />
                  <text x="0" y={y + 3} className="ws-chart-text">
                    {["$5k", "$3k", "$2k", "$0"][i]}
                  </text>
                </g>
              ))}
              <path
                d={`M38,180 L${points.replaceAll(" ", " L")} L500,180 Z`}
                fill="url(#revenue-fill)"
              />
              <polyline
                points={points}
                fill="none"
                stroke="#007aff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {["Week 1", "Week 2", "Week 3", "Week 4"].map((text, i) => (
                <text
                  key={text}
                  x={38 + i * 151}
                  y="207"
                  textAnchor={i === 3 ? "end" : "start"}
                  className="ws-chart-text"
                >
                  {text}
                </text>
              ))}
            </svg>
          </div>
          <div className="ws-chart-footer">
            <span>
              <i className="ws-legend-dot" />
              Revenue
            </span>
            <span>Illustrative trend · {period.toLowerCase()}</span>
          </div>
        </section>
        <section className="ws-card">
          <div className="ws-card-heading">
            <div>
              <h2>Aim a little higher.</h2>
              <p>Your monthly revenue goal</p>
            </div>
            <ArrowUpRight size={18} color="var(--ws-secondary)" />
          </div>
          <div className="ws-goal-body">
            <div className="ws-goal-ring">
              <svg
                viewBox="0 0 160 160"
                role="img"
                aria-label={`${goal} percent of revenue goal`}
              >
                <circle
                  cx="80"
                  cy="80"
                  r="65"
                  fill="none"
                  stroke="var(--ws-rail)"
                  strokeWidth="11"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="65"
                  fill="none"
                  stroke="#007aff"
                  strokeWidth="11"
                  strokeLinecap="round"
                  strokeDasharray={`${(goal / 100) * 408.4} 408.4`}
                />
              </svg>
              <div>
                <strong>{goal}%</strong>
                <span>of monthly target</span>
              </div>
            </div>
            <p>
              You’re making progress.
              <br />
              Just {money(58000 - revenue)} to reach your goal.
            </p>
            <div className="ws-goal-stats">
              <div>
                <strong>{money(revenue)}</strong>
                <span>Achieved</span>
              </div>
              <div>
                <strong>$58,000</strong>
                <span>Target</span>
              </div>
            </div>
          </div>
        </section>
        {view === "Overview" ? (
          <>
            <section className="ws-card">
              <div className="ws-card-heading">
                <div>
                  <h2>Recent sales</h2>
                  <p>The people moving your business forward.</p>
                </div>
                <span className="ws-caption">Latest 5</span>
              </div>
              <table className="ws-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Status</th>
                    <th style={{ textAlign: "right" }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {sales.map((sale, i) => (
                    <tr key={sale.name}>
                      <td>
                        <div className="ws-customer">
                          <Avatar name={sale.name} tone={i} />
                          <span>
                            <strong>{sale.name}</strong>
                            <small>{sale.product}</small>
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="ws-paid">
                          <Check size={10} />
                          Paid
                        </span>
                      </td>
                      <td style={{ textAlign: "right", fontWeight: 500 }}>
                        {money(sale.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
            <section className="ws-card">
              <div className="ws-card-heading">
                <div>
                  <h2>A little focus.</h2>
                  <p>Make room for what matters today.</p>
                </div>
                <Link
                  href="/kanban"
                  aria-label="Open projects"
                  className="ws-icon-button"
                >
                  <ChevronRight size={17} />
                </Link>
              </div>
              <div className="ws-task-list">
                {[
                  "Approve Q3 marketing budget",
                  "Review supplier contracts",
                  "Ship campaign assets",
                  "Reconcile March invoices",
                ].map((task, i) => (
                  <label
                    key={task}
                    className={`ws-task-row ${completed.includes(task) ? "completed" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={completed.includes(task)}
                      onChange={() =>
                        setCompleted((prev) =>
                          prev.includes(task)
                            ? prev.filter((t) => t !== task)
                            : [...prev, task],
                        )
                      }
                    />
                    <span>{task}</span>
                    <small>
                      {completed.includes(task)
                        ? "Done"
                        : ["Today", "Tomorrow", "Friday", ""][i]}
                    </small>
                  </label>
                ))}
              </div>
            </section>
          </>
        ) : (
          <>
            <section className="ws-card">
              <div className="ws-card-heading">
                <div>
                  <h2>Where people find you</h2>
                  <p>Traffic sources · sample distribution</p>
                </div>
              </div>
              <div className="ws-traffic">
                {["Direct", "Organic search", "Referral", "Social"].map(
                  (name, i) => (
                    <div className="ws-traffic-row" key={name}>
                      <div>
                        <span>{name}</span>
                        <span>{[38, 27, 19, 16][i]}%</span>
                      </div>
                      <div className="ws-progress">
                        <div style={{ width: `${[38, 27, 19, 16][i]}%` }} />
                      </div>
                    </div>
                  ),
                )}
              </div>
            </section>
            <section className="ws-card">
              <div className="ws-card-heading">
                <div>
                  <h2>Around the world</h2>
                  <p>Audience by region · sample data</p>
                </div>
              </div>
              <div className="ws-traffic">
                {[
                  "United States",
                  "United Kingdom",
                  "Germany",
                  "Japan",
                  "Other",
                ].map((name, i) => (
                  <div className="ws-traffic-row" key={name}>
                    <div>
                      <span>{name}</span>
                      <span>{[46, 21, 16, 11, 6][i]}%</span>
                    </div>
                    <div className="ws-progress">
                      <div style={{ width: `${[46, 21, 16, 11, 6][i]}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
      <p className="ws-bottom-note">
        <LockKeyhole size={11} />
        Your space. A clearer perspective.
      </p>
    </div>
  );
}
