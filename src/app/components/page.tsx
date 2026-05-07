"use client";

import React from "react";
import { Button, Card, Input, Label } from "@/components/ui";
import { MainLayout } from "@/components/layout/MainLayout";

export default function ComponentsPage() {
  return (
    <MainLayout title="Components">
      <div className="max-w-6xl mx-auto p-8 space-y-16 pb-24">
        <header className="space-y-4">
          <div className="inline-block px-3 py-1 border-2 border-border text-xs font-bold tracking-widest text-zinc-900 dark:text-white uppercase">
            UI Library
          </div>
          <h1 className="text-6xl font-black tracking-tighter text-zinc-900 dark:text-white">
            Design Primitives
          </h1>
          <p className="text-2xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed font-medium">
            You don't need to create or change those elements yourself – Tailwind already has everything you need. Just ask your coding agent to implement actual pages, forms and other elements.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Buttons Section */}
          <section className="space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-widest border-b-2 border-border pb-2">Interactions</h2>
            <Card className="p-8 space-y-10">
              <div className="space-y-4">
                <Label className="text-zinc-400">Variants</Label>
                <div className="flex flex-wrap gap-4 items-center">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <Label className="text-zinc-400">Actions</Label>
                <div className="flex flex-wrap gap-4 items-center">
                  <Button variant="ghost">Ghost Action</Button>
                  <Button variant="danger">Destructive</Button>
                </div>
              </div>
            </Card>
          </section>

          {/* Forms Section */}
          <section className="space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-widest border-b-2 border-border pb-2">Data Entry</h2>
            <Card className="p-8 space-y-8">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-xl font-black">Email Address</Label>
                <Input id="email" placeholder="name@company.com" />
              </div>

              <div className="space-y-3">
                <Label htmlFor="search" className="text-xl font-black">Quick Search</Label>
                <Input id="search" placeholder="Search components..." />
              </div>

              <div className="flex items-center gap-3 p-4 wireframe-border">
                <input type="checkbox" id="terms" className="w-5 h-5 rounded-none border-2 border-border accent-zinc-900" />
                <Label htmlFor="terms" className="cursor-pointer font-bold">I agree to the terms</Label>
              </div>
            </Card>
          </section>
        </div>

        <section className="space-y-6">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b-2 border-border pb-2">Surface & Aesthetics</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="p-8">
              <h3 className="text-xl font-black mb-2 tracking-tighter">Sharp Edges</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed font-medium">
                All elements use rounded-none and 2px borders for a true wireframe feel.
              </p>
            </Card>

            <Card className="p-8 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
              <h3 className="text-xl font-black mb-2 tracking-tighter">Inverted Style</h3>
              <p className="text-sm leading-relaxed font-medium">
                Use high-contrast inversion to highlight critical UI sections or primary calls to action.
              </p>
            </Card>

            <Card className="p-8 border-dashed border-2">
              <h3 className="text-xl font-black mb-2 text-zinc-400 tracking-tighter">Ghost Area</h3>
              <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                Dashed borders represent optional or placeholder content areas in the prototype.
              </p>
            </Card>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
