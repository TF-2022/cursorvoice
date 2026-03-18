"use client";

import { useState, useEffect } from "react";
import { GITHUB_REPO, GITHUB_RELEASES_API } from "./constants";

export type Platform = "windows" | "mac-arm" | "mac-intel" | "linux" | "unknown";

interface DownloadInfo {
  platform: Platform;
  url: string;
  filename: string;
  version: string;
  loading: boolean;
  allAssets: Record<string, string>;
}

function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("win")) return "windows";
  if (ua.includes("mac")) {
    // Check for Apple Silicon via WebGL renderer
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl");
      const renderer = gl?.getExtension("WEBGL_debug_renderer_info");
      const gpu = renderer ? gl?.getParameter(renderer.UNMASKED_RENDERER_WEBGL) : "";
      if (typeof gpu === "string" && gpu.toLowerCase().includes("apple")) return "mac-arm";
    } catch {}
    return "mac-arm"; // Default to ARM for modern Macs
  }
  if (ua.includes("linux")) return "linux";
  return "unknown";
}

function matchAsset(assets: any[], pattern: string): { url: string; name: string } | null {
  const asset = assets.find((a: any) => a.name.toLowerCase().includes(pattern));
  return asset ? { url: asset.browser_download_url, name: asset.name } : null;
}

export function useDownload(): DownloadInfo {
  const [info, setInfo] = useState<DownloadInfo>({
    platform: "unknown",
    url: `${GITHUB_REPO}/releases/latest`,
    filename: "",
    version: "",
    loading: true,
    allAssets: {},
  });

  useEffect(() => {
    const platform = detectPlatform();

    fetch(GITHUB_RELEASES_API)
      .then((r) => r.json())
      .then((release) => {
        const assets = release.assets || [];
        const version = release.tag_name?.replace("v", "") || "";

        const all: Record<string, string> = {};
        const win = matchAsset(assets, "setup") || matchAsset(assets, ".exe");
        const macArm = matchAsset(assets, "arm64.dmg");
        const macIntel = assets.find((a: any) => a.name.endsWith(".dmg") && !a.name.includes("arm64"));

        if (win) all.windows = win.url;
        if (macArm) all["mac-arm"] = macArm.url;
        if (macIntel) all["mac-intel"] = macIntel.browser_download_url;

        let url = `${GITHUB_REPO}/releases/latest`;
        let filename = "";

        if (platform === "windows" && win) { url = win.url; filename = win.name; }
        else if (platform === "mac-arm" && macArm) { url = macArm.url; filename = macArm.name; }
        else if (platform === "mac-intel" && macIntel) { url = macIntel.browser_download_url; filename = macIntel.name; }

        setInfo({ platform, url, filename, version, loading: false, allAssets: all });
      })
      .catch(() => {
        setInfo((prev) => ({ ...prev, platform, loading: false }));
      });
  }, []);

  return info;
}
