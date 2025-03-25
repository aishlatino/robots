'use client';

export default function TaskCard({ task, count, onAction, onAutomate }) {
  return (
    <div className="bg-white/5 border border-gray-700 p-6 rounded-lg shadow-xl">
      <h2 className="text-2xl font-semibold mb-2">Current task: {task.name} {task.emoji}</h2>
      <p className="text-sm text-gray-400 mb-4">You've done this manually <strong>{count}</strong> times.</p>
      <button
        onClick={onAction}
        className="px-4 py-2 bg-cyan-600 rounded hover:bg-cyan-500 text-white font-bold mb-4"
      >
        ✅ Let’s {task.name.toLowerCase()}!
      </button>
      {count >= 3 && (
        <button
          onClick={onAutomate}
          className="ml-4 px-4 py-2 bg-pink-600 rounded hover:bg-pink-500 text-white font-bold"
        >
          🤖 Automate this task
        </button>
      )}
    </div>
  );
}

