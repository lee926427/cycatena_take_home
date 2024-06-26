import { ErrorBoundary } from "react-error-boundary";
import {
  TransactionHistoryChart,
  LatestWeekChart,
  PaymentHistoryTable,
  IncomingChart,
  AssetsChart,
} from "./components";

import "./assets/styles/index.css";

function App() {
  return (
    <div className="grid grid-cols-9 grid-rows-12 gap-x-10 h-screen bg-stone-400 dark:bg-slate-900 px-6 pb-6">
      <header className="col-span-9"></header>
      <main className="col-span-9 grid grid-cols-9 grid-rows-12 gap-x-10 row-span-11">
        <section className="col-span-6 row-span-12 gap-y-4 grid grid-cols-6 gap-x-4">
          <div className="col-span-2 row-span-2 bg-stone-400 dark:bg-slate-800 h-40">
            <ErrorBoundary fallback={<div></div>}>
              <TransactionHistoryChart days={14} />
            </ErrorBoundary>
          </div>
          <div className="col-span-2 row-span-2 bg-stone-400 dark:bg-slate-800 h-40">
            <ErrorBoundary fallback={<div></div>}>
              <LatestWeekChart />
            </ErrorBoundary>
          </div>
          <div className="col-span-2 row-span-2 bg-stone-400 dark:bg-slate-800 h-40">
            <ErrorBoundary fallback={<div></div>}>
              <AssetsChart />
            </ErrorBoundary>
          </div>
          <div className="col-span-full row-span-10 bg-stone-400 dark:bg-slate-800 p-4 flex flex-col">
            <ErrorBoundary fallback={<div></div>}>
              <PaymentHistoryTable />
            </ErrorBoundary>
          </div>
        </section>
        <section className="col-span-3 row-span-12 bg-stone-400 dark:bg-slate-800">
          <ErrorBoundary fallback={<div></div>}>
            <IncomingChart />
          </ErrorBoundary>
        </section>
      </main>
    </div>
  );
}

export default App;
