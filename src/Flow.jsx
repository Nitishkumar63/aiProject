import React, { useState } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import { askAI, saveChat } from "./api";
import { motion } from "framer-motion";

export default function Flow() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const nodes = [
    {
      id: "1",
      position: { x: 0, y: 0 },
      style: {
        width: 320,
        padding: 0,

        background: "transparent",
      },
      data: {
        label: (
          <div className=" p-4 w-full">
            <h3 className="font-semibold text-lg mb-2">🧠 Input</h3>

            <textarea
              className="w-full h-32 p-3 border rounded-lg focus:outline-none resize-none"
              placeholder="Enter your prompt..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />

            <p className="text-xs text-gray-500 mt-1">
              Type your AI query here
            </p>
          </div>
        ),
      },
    },
    {
      id: "2",
      position: { x: 580, y: 0 },
      style: {
        width: 350,
        padding: 0,
        background: "transparent",
      },
      data: {
        label: (
          <div className=" p-4 w-full ">
            <h3 className="font-semibold text-lg mb-2">⚡ Result</h3>

            <div className="h-40 overflow-y-auto p-3 border rounded-lg bg-gray-50 text-sm">
              {loading ? (
                <span className="text-blue-500 animate-pulse">
                  Generating...
                </span>
              ) : result ? (
                result
              ) : (
                <span className="text-gray-400">Result will appear here</span>
              )}
            </div>
          </div>
        ),
      },
    },
  ];

  const edges = [
    {
      id: "e1-2",
      source: "1",
      target: "2",
      animated: true,
      style: { stroke: "#6366f1", strokeWidth: 2 },
    },
  ];

  const runFlow = async () => {
    if (!prompt) return alert("Enter prompt first");

    try {
      setLoading(true);
      const res = await askAI(prompt);
      setResult(res.data.reply);
    } catch (err) {
      console.error(err);
      alert("Error fetching AI response");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!prompt || !result) return alert("Nothing to save");

    try {
      await saveChat({ prompt, response: result });
      alert("Saved to DB");
      setPrompt("");
      setResult("");
    } catch (err) {
      alert("Error fetching AI response");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-blue-100">
      {/* HEADER */}
      <div className="flex justify-between items-center px-6 py-4 bg-white/80 backdrop-blur-md shadow-sm border-b">
        <h1 className="text-xl font-bold">🚀 AI Flow Builder</h1>

        <div className="flex gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={runFlow}
            className="px-4 py-2 rounded-xl cursor-pointer bg-indigo-500 text-white shadow hover:bg-indigo-600"
          >
            Run Flow
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className="px-4 py-2 rounded-xl cursor-pointer bg-emerald-500 text-white shadow hover:bg-emerald-600"
          >
            Save
          </motion.button>
        </div>
      </div>

      {/* FLOW */}
      <div className="flex-1 flex justify-center items-center">
        <div className="w-[1000px] h-[500px] rounded-3xl overflow-hidden shadow-2xl border bg-white/60 backdrop-blur-lg">
          <ReactFlow nodes={nodes} edges={edges} fitView>
            <Background gap={20} size={1} color="#e5e7eb" />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
