'use client';
import { useState, useEffect } from 'react';
import TaskCard from '../components/TaskCard';
import tasks from '../public/robots.json';

export default function Home() {
  const [level, setLevel] = useState(0);
  const [count, setCount] = useState(0);
  const [automated, setAutomated] = useState([]);
  const [robotCounts, setRobotCounts] = useState({});

  const current = tasks[level];
  const total = tasks.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setRobotCounts(prev => {
        const updated = { ...prev };
        automated.forEach(task => {
          updated[task.name] = (updated[task.name] || 0) + 1;
        });
        return updated;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [automated]);

  const handleAction = () => setCount(count + 1);
  const handleAutomate = () => {
    setAutomated([...automated, current]);
    setCount(0);
    setLevel(level + 1);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black to-purple-950 text-gray-200 px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-pink-500 text-center mb-4">Better Than You</h1>
        <p className="text-center text-gray-400 mb-8">
          A robot can do everything you do... better. Let’s find out what’s left for you.
        </p>
        <div className="mb-6">
          <p className="text-sm text-gray-400">Progress toward full automation:</p>
          <div className="w-full bg-gray-800 h-3 rounded">
            <div
              className="bg-pink-500 h-3 rounded transition-all duration-500"
              style={{ width: `${(automated.length / total) * 100}%` }}
            ></div>
          </div>
        </div>
        {level < total ? (
          <TaskCard task={current} count={count} onAction={handleAction} onAutomate={handleAutomate} />
        ) : (
          <div className="text-center mt-12">
            <h2 className="text-2xl font-semibold">Everything you do, a robot can do better.</h2>
            <p className="text-gray-400 mt-4">Robots now handle your life. From 🍳 cooking to 👨‍👧‍👦 family time.</p>
            <a
              href="https://aish.com/humans-vs-ai-will-we-remain-relevant/"
              target="_blank"
              className="inline-block mt-8 px-6 py-3 bg-pink-600 text-white font-bold rounded-lg shadow-lg hover:bg-pink-500 transition"
            >
              🌌 Discover what makes you human
            </a>
          </div>
        )}
        {automated.length > 0 && (
          <div className="mt-12">
            <h3 className="text-lg mb-4 text-pink-400 font-semibold">🤖 Robots are now doing these tasks for you:</h3>
            <ul className="space-y-2">
              {automated.map(task => (
                <li key={task.name} className="bg-white/5 border border-gray-700 p-4 rounded-lg text-sm">
                  <span className="text-xl mr-2">{task.icon}</span>
                  {task.name} — <span className="text-pink-300">{robotCounts[task.name] || 0} automated actions</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}

