import React from "react";
import { FaApple, FaDeezer, FaSpotify, FaYoutube } from "react-icons/fa";

export const SpotifyIcon = ({ className = "w-5 h-5" }: { className?: string }) => <FaSpotify className={className} />;

export const AppleMusicIcon = ({ className = "w-5 h-5" }: { className?: string }) => <FaApple className={className} />;

export const YouTubeMusicIcon = ({ className = "w-5 h-5" }: { className?: string }) => <FaYoutube className={className} />;

export const DeezerIcon = ({ className = "w-5 h-5" }: { className?: string }) => <FaDeezer className={className} />;
