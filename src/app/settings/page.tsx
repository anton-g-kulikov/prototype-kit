"use client";

import React from "react";
import { useSettings } from "@/lib/SettingsContext";
import { Button, Card, Input, Label } from "@/components/ui";
import { MainLayout } from "@/components/layout/MainLayout";

export default function SettingsPage() {
  const { settings, updateSettings } = useSettings();

  return (
    <MainLayout title="Settings">
      <div className="max-w-5xl mx-auto p-8 space-y-16 pb-24">
        <header className="space-y-4">
          <div className="inline-block px-3 py-1 border-2 border-border text-xs font-bold tracking-widest text-zinc-900 dark:text-white uppercase">
            Preferences
          </div>
          <h1 className="text-6xl font-black tracking-tighter text-zinc-900 dark:text-white">
            Workspace Settings
          </h1>
          <p className="text-2xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed font-medium">
            Configure your development environment and simulate different user contexts. 
            Settings are stored locally in your browser.
          </p>
        </header>

        <div className="grid gap-12 lg:grid-cols-2">
          <section className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="h-8 w-1 bg-zinc-900 dark:bg-white"></div>
              <h2 className="text-2xl font-black tracking-tighter">Visual Style</h2>
            </div>
            
            <div className="space-y-6">
              <Card className="p-8 space-y-6">
                <div className="space-y-2">
                  <Label className="text-xl font-black">Appearance</Label>
                  <p className="text-sm text-zinc-500 mb-4 font-medium">Choose a theme that suits your workflow.</p>
                  <div className="grid grid-cols-3 gap-3">
                    {['light', 'dark', 'system'].map((t) => (
                      <Button 
                        key={t}
                        variant={settings.theme === t ? 'primary' : 'outline'} 
                        size="sm"
                        className="capitalize"
                        onClick={() => updateSettings({ theme: t as any })}
                      >
                        {t}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t-2 border-border space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="compact" className="text-lg font-black">Compact View</Label>
                      <p className="text-xs text-zinc-500 font-medium">Reduce padding and scale down elements.</p>
                    </div>
                    <div 
                      onClick={() => updateSettings({ compactMode: !settings.compactMode })}
                      className={`w-12 h-6 wireframe-border p-1 cursor-pointer transition-colors duration-300 ${settings.compactMode ? 'bg-zinc-900 dark:bg-white' : 'bg-transparent'}`}
                    >
                      <div className={`w-3 h-3 transition-transform duration-300 ${settings.compactMode ? 'translate-x-6 bg-white dark:bg-zinc-900' : 'bg-zinc-900 dark:bg-white'}`}></div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          <section className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="h-8 w-1 bg-zinc-900 dark:bg-white"></div>
              <h2 className="text-2xl font-black tracking-tighter">User Simulation</h2>
            </div>
            
            <Card className="p-8 space-y-8">
              <div className="space-y-4">
                <Label className="text-xl font-black">Access Level</Label>
                <p className="text-sm text-zinc-500 font-medium">Switching roles will toggle feature availability across the app.</p>
                
                <div className="space-y-4">
                  {[
                    { id: 'user', title: 'Standard User', desc: 'Default access for general interaction.' },
                    { id: 'admin', title: 'Administrator', desc: 'Full system control and user management.' }
                  ].map((role) => (
                    <div 
                      key={role.id}
                      onClick={() => updateSettings({ userMode: role.id as any })}
                      className={`group p-5 border-2 cursor-pointer transition-all duration-300 ${
                        settings.userMode === role.id 
                          ? 'border-border bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' 
                          : 'border-zinc-200 bg-transparent text-zinc-400 hover:border-border hover:text-zinc-900 dark:border-zinc-800 dark:hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-black text-lg tracking-tighter">
                          {role.title}
                        </span>
                        {settings.userMode === role.id && (
                          <div className="h-2 w-2 bg-white dark:bg-zinc-900 animate-pulse"></div>
                        )}
                      </div>
                      <p className="text-sm font-medium">
                        {role.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </section>
        </div>

        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 bg-zinc-900 dark:bg-white"></div>
            <h2 className="text-2xl font-black tracking-tighter">Review System</h2>
          </div>
          
          <Card className="p-8">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-xl font-black">Stakeholder Annotations</Label>
                <p className="text-sm text-zinc-500 font-medium">Enable or disable the floating comment system for reviewers.</p>
              </div>
              <Button 
                variant={settings.showComments ? 'primary' : 'outline'}
                onClick={() => updateSettings({ showComments: !settings.showComments })}
                className="min-w-[120px]"
              >
                {settings.showComments ? 'Active' : 'Hidden'}
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </MainLayout>
  );
}
