"use client";

import React, { useState, useEffect, useRef } from "react";
import { Editor, Frame, Element, useEditor } from "@craftjs/core";
import { 
  Plus, Trash2, LayoutGrid, Type, Image as ImageIcon, Sparkles, 
  Save, LogOut, RefreshCw, Layers, Sliders, CheckCircle 
} from "lucide-react";
import Link from "next/link";

import {
  resolver,
  UserHero,
  UserText,
  UserImage,
  UserContainer,
  UserLaunchesAndOffers,
  UserEditorialInterstitial,
  UserSignaturePieces,
  UserValueMarquee,
  UserTestimonials,
  UserNewsletter,
  UserFooter,
} from "./UserComponents";

// ─── EDITOR CONTROLLER / INTERNAL WORKSPACE ───
const EditorWorkspace = () => {
  const { actions, query, selected, isDeletable } = useEditor((state, queryFromState) => {
    const [selectedId] = state.events.selected;
    return {
      selected: selectedId ? {
        id: selectedId,
        name: state.nodes[selectedId].data.displayName || state.nodes[selectedId].data.name,
        settings: state.nodes[selectedId].related && state.nodes[selectedId].related.settings,
      } : null,
      isDeletable: selectedId ? queryFromState.node(selectedId).isDeletable() : false,
    };
  });

  const [activeTab, setActiveTab] = useState<"toolbox" | "settings">("toolbox");
  const [publishing, setPublishing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  // Fetch initial layout from python backend
  useEffect(() => {
    const fetchLayout = async () => {
      try {
        const res = await fetch("/api/v1/pages/home");
        if (res.ok) {
          const data = await res.json();
          if (data && data.content) {
            actions.deserialize(data.content);
          }
        }
      } catch (err) {
        console.error("Error loading layout from DB:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLayout();
  }, [actions]);

  // Keep track of the previously selected node ID
  const prevSelectedIdRef = useRef<string | null>(null);

  // Handle selected node changing: auto-switch tab to settings
  useEffect(() => {
    const currentSelectedId = selected ? selected.id : null;
    if (currentSelectedId && currentSelectedId !== prevSelectedIdRef.current) {
      // Defer state update to avoid synchronous cascading renders warning
      const handle = setTimeout(() => setActiveTab("settings"), 0);
      prevSelectedIdRef.current = currentSelectedId;
      return () => clearTimeout(handle);
    }
    prevSelectedIdRef.current = currentSelectedId;
  }, [selected]);

  // Handle layout publishing
  const handlePublish = async () => {
    setPublishing(true);
    setSaveStatus("idle");
    try {
      const serialized = query.serialize();
      
      const res = await fetch("/api/v1/pages/home", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_CMS_API_KEY || "ruyra-secret-token"}`
        },
        body: JSON.stringify({ content: serialized }),
      });

      if (!res.ok) {
        throw new Error("Failed to save layout");
      }

      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (err) {
      console.error("Publishing error:", err);
      setSaveStatus("error");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F4F0] text-[#3E2C24] flex flex-col font-sans antialiased select-none">
      
      {/* ─── TOP ACTION BAR ─── */}
      <header className="h-16 bg-[#F6F4F0] border-b border-[#3E2C24]/10 px-6 flex items-center justify-between shrink-0 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <span className="font-serif text-xl tracking-[0.25em] font-bold text-[#3E2C24]">RUYRA</span>
          <span className="h-4 w-px bg-[#3E2C24]/20" />
          <span className="font-sans text-[10px] tracking-widest uppercase bg-[#B85B3F]/10 text-[#B85B3F] font-bold px-2 py-0.5 rounded-sm">
            CMS Editor
          </span>
        </div>

        <div className="flex items-center gap-4">
          {saveStatus === "success" && (
            <span className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
              <CheckCircle className="w-4 h-4" /> Layout Published Live
            </span>
          )}
          {saveStatus === "error" && (
            <span className="text-xs text-rose-700 font-medium">
              Publishing failed. Check logs.
            </span>
          )}

          <button
            onClick={handlePublish}
            disabled={publishing}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#B85B3F] text-white font-sans text-xs tracking-wider uppercase font-bold rounded-md hover:bg-[#B85B3F]/90 hover:shadow-md transition-all cursor-pointer disabled:opacity-60"
          >
            {publishing ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            {publishing ? "Publishing..." : "Publish Storefront"}
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#3E2C24]/20 text-[#3E2C24] font-sans text-xs tracking-wider uppercase font-semibold rounded-md hover:bg-[#3E2C24]/5 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            Exit Editor
          </Link>
        </div>
      </header>

      {/* ─── WORKSPACE LAYOUT ─── */}
      <div className="flex-1 flex overflow-hidden h-[calc(100vh-64px)]">
        
        {/* ─── CENTRAL CANVAS AREA ─── */}
        <main className="flex-1 bg-stone-100 overflow-y-auto p-8 flex justify-center">
          <div className="w-full max-w-7xl bg-white shadow-2xl rounded-2xl border border-stone-200 overflow-hidden flex flex-col min-h-full">
            {loading ? (
              <div className="flex-1 flex flex-col gap-3 items-center justify-center py-20 text-[#3E2C24]/40 font-serif">
                <RefreshCw className="w-8 h-8 animate-spin text-[#B85B3F]" />
                <span className="text-sm tracking-widest uppercase font-semibold">Loading Layout Canvas...</span>
              </div>
            ) : (
              <Frame>
                <Element is={UserContainer} padding="p-8" bg="bg-white" id="root" canvas>
                  <UserHero 
                    headingText="Sanctuary in Every Detail" 
                    subText="Botanical rituals handcrafted with organic amber, soy wax, and pure intentions." 
                    imageUrl="/hero_bg.png" 
                    ctaText="Shop Amber Collection"
                    ctaLink="/shop"
                  />
                  <UserValueMarquee />
                  <UserLaunchesAndOffers />
                  <UserEditorialInterstitial />
                  <UserSignaturePieces />
                  <UserTestimonials />
                  <UserNewsletter />
                  <UserFooter />
                </Element>
              </Frame>
            )}
          </div>
        </main>

        {/* ─── RIGHT SIDEBAR ─── */}
        <aside className="w-80 bg-[#F6F4F0] border-l border-[#3E2C24]/10 flex flex-col shrink-0">
          {/* Tab Selection */}
          <div className="flex border-b border-[#3E2C24]/10 shrink-0">
            <button
              onClick={() => setActiveTab("toolbox")}
              className={`flex-1 py-3 text-center font-sans text-xs tracking-wider uppercase font-bold flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
                activeTab === "toolbox"
                  ? "border-[#B85B3F] text-[#B85B3F] bg-[#3E2C24]/5"
                  : "border-transparent text-[#3E2C24]/50 hover:text-[#3E2C24] hover:bg-[#3E2C24]/2"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Toolbox
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex-1 py-3 text-center font-sans text-xs tracking-wider uppercase font-bold flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
                activeTab === "settings"
                  ? "border-[#B85B3F] text-[#B85B3F] bg-[#3E2C24]/5"
                  : "border-transparent text-[#3E2C24]/50 hover:text-[#3E2C24] hover:bg-[#3E2C24]/2"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              Settings
            </button>
          </div>

          {/* Sidebar Tab Panels */}
          <div className="flex-1 overflow-y-auto p-5 scrollbar-thin">
            {activeTab === "toolbox" && <ToolboxPanel />}
            {activeTab === "settings" && (
              <SettingsPanel 
                selected={selected} 
                isDeletable={isDeletable}
                actions={actions}
              />
            )}
          </div>
        </aside>

      </div>
    </div>
  );
};

// ─── TOOLBOX PANEL ───
const ToolboxPanel = () => {
  const { connectors: { create } } = useEditor();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-[10px] font-bold tracking-widest uppercase text-[#3E2C24]/50 mb-3">Draggable Content Blocks</h3>
        <div className="grid grid-cols-2 gap-3">
          
          <button
            ref={(ref) => { if (ref) create(ref, <UserHero />); }}
            className="flex flex-col items-center justify-center p-4 bg-white border border-[#3E2C24]/10 rounded-lg hover:border-[#B85B3F] hover:shadow-sm transition-all cursor-grab active:cursor-grabbing text-center text-[#3E2C24]"
          >
            <Sparkles className="w-6 h-6 text-[#B85B3F] mb-2" />
            <span className="font-sans text-[10px] uppercase tracking-wider font-bold">Hero Banner</span>
          </button>

          <button
            ref={(ref) => { if (ref) create(ref, <UserText />); }}
            className="flex flex-col items-center justify-center p-4 bg-white border border-[#3E2C24]/10 rounded-lg hover:border-[#B85B3F] hover:shadow-sm transition-all cursor-grab active:cursor-grabbing text-center text-[#3E2C24]"
          >
            <Type className="w-6 h-6 text-[#B85B3F] mb-2" />
            <span className="font-sans text-[10px] uppercase tracking-wider font-bold">Text Block</span>
          </button>

          <button
            ref={(ref) => { if (ref) create(ref, <UserImage />); }}
            className="flex flex-col items-center justify-center p-4 bg-white border border-[#3E2C24]/10 rounded-lg hover:border-[#B85B3F] hover:shadow-sm transition-all cursor-grab active:cursor-grabbing text-center text-[#3E2C24]"
          >
            <ImageIcon className="w-6 h-6 text-[#B85B3F] mb-2" />
            <span className="font-sans text-[10px] uppercase tracking-wider font-bold">Image Block</span>
          </button>

          <button
            ref={(ref) => { if (ref) create(ref, <Element is={UserContainer} canvas />); }}
            className="flex flex-col items-center justify-center p-4 bg-white border border-[#3E2C24]/10 rounded-lg hover:border-[#B85B3F] hover:shadow-sm transition-all cursor-grab active:cursor-grabbing text-center text-[#3E2C24]"
          >
            <LayoutGrid className="w-6 h-6 text-[#B85B3F] mb-2" />
            <span className="font-sans text-[10px] uppercase tracking-wider font-bold">Layout Grid</span>
          </button>

        </div>
      </div>

      <div>
        <h3 className="text-[10px] font-bold tracking-widest uppercase text-[#3E2C24]/50 mb-3">Storefront Sections</h3>
        <div className="flex flex-col gap-2">
          
          <button
            ref={(ref) => { if (ref) create(ref, <UserLaunchesAndOffers />); }}
            className="w-full text-left p-3.5 bg-white border border-[#3E2C24]/10 rounded-md hover:border-[#B85B3F] hover:shadow-sm transition-all cursor-grab active:cursor-grabbing font-sans text-xs tracking-wider uppercase font-bold text-[#3E2C24] flex items-center justify-between"
          >
            Launches & Offers
            <Plus className="w-4 h-4 text-[#B85B3F]" />
          </button>

          <button
            ref={(ref) => { if (ref) create(ref, <UserEditorialInterstitial />); }}
            className="w-full text-left p-3.5 bg-white border border-[#3E2C24]/10 rounded-md hover:border-[#B85B3F] hover:shadow-sm transition-all cursor-grab active:cursor-grabbing font-sans text-xs tracking-wider uppercase font-bold text-[#3E2C24] flex items-center justify-between"
          >
            Editorial Text Reveal
            <Plus className="w-4 h-4 text-[#B85B3F]" />
          </button>

          <button
            ref={(ref) => { if (ref) create(ref, <UserSignaturePieces />); }}
            className="w-full text-left p-3.5 bg-white border border-[#3E2C24]/10 rounded-md hover:border-[#B85B3F] hover:shadow-sm transition-all cursor-grab active:cursor-grabbing font-sans text-xs tracking-wider uppercase font-bold text-[#3E2C24] flex items-center justify-between"
          >
            Signature Products
            <Plus className="w-4 h-4 text-[#B85B3F]" />
          </button>

          <button
            ref={(ref) => { if (ref) create(ref, <UserValueMarquee />); }}
            className="w-full text-left p-3.5 bg-white border border-[#3E2C24]/10 rounded-md hover:border-[#B85B3F] hover:shadow-sm transition-all cursor-grab active:cursor-grabbing font-sans text-xs tracking-wider uppercase font-bold text-[#3E2C24] flex items-center justify-between"
          >
            Values Marquee
            <Plus className="w-4 h-4 text-[#B85B3F]" />
          </button>

          <button
            ref={(ref) => { if (ref) create(ref, <UserTestimonials />); }}
            className="w-full text-left p-3.5 bg-white border border-[#3E2C24]/10 rounded-md hover:border-[#B85B3F] hover:shadow-sm transition-all cursor-grab active:cursor-grabbing font-sans text-xs tracking-wider uppercase font-bold text-[#3E2C24] flex items-center justify-between"
          >
            Customer Testimonials
            <Plus className="w-4 h-4 text-[#B85B3F]" />
          </button>

          <button
            ref={(ref) => { if (ref) create(ref, <UserNewsletter />); }}
            className="w-full text-left p-3.5 bg-white border border-[#3E2C24]/10 rounded-md hover:border-[#B85B3F] hover:shadow-sm transition-all cursor-grab active:cursor-grabbing font-sans text-xs tracking-wider uppercase font-bold text-[#3E2C24] flex items-center justify-between"
          >
            Newsletter Form
            <Plus className="w-4 h-4 text-[#B85B3F]" />
          </button>

          <button
            ref={(ref) => { if (ref) create(ref, <UserFooter />); }}
            className="w-full text-left p-3.5 bg-white border border-[#3E2C24]/10 rounded-md hover:border-[#B85B3F] hover:shadow-sm transition-all cursor-grab active:cursor-grabbing font-sans text-xs tracking-wider uppercase font-bold text-[#3E2C24] flex items-center justify-between"
          >
            Storefront Footer
            <Plus className="w-4 h-4 text-[#B85B3F]" />
          </button>

        </div>
      </div>
    </div>
  );
};

interface SettingsPanelProps {
  selected: {
    id: string;
    name: string;
    settings?: React.ElementType | null;
  } | null;
  isDeletable: boolean;
  actions: {
    delete: (id: string) => void;
  };
}

const SettingsPanel = ({ selected, isDeletable, actions }: SettingsPanelProps) => {
  return (
    <div className="space-y-6">
      {selected ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#3E2C24]/10">
            <div>
              <span className="text-[9px] font-bold tracking-widest uppercase text-[#3E2C24]/50">Selected Component</span>
              <h4 className="font-serif text-sm font-semibold text-[#3E2C24] mt-0.5">{selected.name}</h4>
            </div>

            {isDeletable && (
              <button
                onClick={() => actions.delete(selected.id)}
                className="p-1.5 text-stone-400 hover:text-[#B85B3F] hover:bg-[#B85B3F]/10 rounded-md transition-all cursor-pointer"
                title="Delete Component"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="bg-white p-4 border border-[#3E2C24]/5 rounded-lg shadow-xs">
            {selected.settings ? (
              React.createElement(selected.settings)
            ) : (
              <p className="text-xs text-[#3E2C24]/40 text-center py-4 font-sans">
                This component does not have editable settings properties.
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Sliders className="w-8 h-8 text-[#3E2C24]/20 mb-3" />
          <p className="font-sans text-xs font-semibold text-[#3E2C24]/40 uppercase tracking-widest">
            Select a canvas node
          </p>
          <p className="font-sans text-[11px] text-[#3E2C24]/30 mt-1 max-w-40 leading-relaxed">
            Click on any element in the central canvas to adjust its properties.
          </p>
        </div>
      )}
    </div>
  );
};

// ─── MAIN EDITOR COMPONENT WITH GLOBAL CONTAINER ───
export default function AdminEditor() {
  return (
    <Editor resolver={resolver}>
      <EditorWorkspace />
    </Editor>
  );
}
