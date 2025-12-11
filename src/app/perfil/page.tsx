"use client";

import { useState, useRef } from "react";
import { Camera, User, Mail, Lock, Bell, Shield, Palette } from "lucide-react";

export default function PerfilPage() {
  const [profileData, setProfileData] = useState({
    name: "Maria Silva",
    email: "maria@email.com",
    bio: "Apaixonada por autocuidado e bem-estar. Membro desde 2024.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
  });

  const [preferences, setPreferences] = useState({
    notifications: true,
    newsletter: true,
    privateProfile: false,
  });

  const [progress] = useState({
    conversations: 24,
    productsReviewed: 8,
    communityPosts: 12,
    level: "Gold Member",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({ ...profileData, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log("Salvando perfil:", profileData, preferences);
    alert("Perfil atualizado com sucesso!");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Meu Perfil</h1>
          <p className="text-muted-foreground">
            Gerencie suas informações e preferências
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-6">
          {/* Avatar Section */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
            <div className="relative">
              <img
                src={profileData.avatar}
                alt="Avatar"
                className="w-32 h-32 rounded-full object-cover border-4 border-primary"
              />
              <button
                onClick={handleAvatarClick}
                className="absolute bottom-0 right-0 p-3 gradient-venus text-white rounded-full hover:opacity-90 transition-all shadow-lg"
              >
                <Camera className="w-5 h-5" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold mb-2">{profileData.name}</h2>
              <p className="text-muted-foreground mb-3">{profileData.email}</p>
              <div className="inline-block px-4 py-1 gradient-venus text-white text-sm font-semibold rounded-full">
                {progress.level}
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <User className="w-4 h-4" />
                Nome
              </label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) =>
                  setProfileData({ ...profileData, name: e.target.value })
                }
                className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
                className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <User className="w-4 h-4" />
                Bio
              </label>
              <textarea
                value={profileData.bio}
                onChange={(e) =>
                  setProfileData({ ...profileData, bio: e.target.value })
                }
                className="w-full h-24 px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Progress Card */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-6">
          <h3 className="text-xl font-bold mb-6">Seu Progresso</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <ProgressStat label="Conversas" value={progress.conversations} />
            <ProgressStat label="Reviews" value={progress.productsReviewed} />
            <ProgressStat label="Posts" value={progress.communityPosts} />
            <ProgressStat label="Nível" value={progress.level} />
          </div>
        </div>

        {/* Preferences Card */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-6">
          <h3 className="text-xl font-bold mb-6">Preferências</h3>
          <div className="space-y-4">
            <PreferenceToggle
              icon={<Bell className="w-5 h-5" />}
              label="Notificações Push"
              description="Receba notificações sobre novidades e mensagens"
              checked={preferences.notifications}
              onChange={(checked) =>
                setPreferences({ ...preferences, notifications: checked })
              }
            />
            <PreferenceToggle
              icon={<Mail className="w-5 h-5" />}
              label="Newsletter"
              description="Receba dicas e ofertas exclusivas por email"
              checked={preferences.newsletter}
              onChange={(checked) =>
                setPreferences({ ...preferences, newsletter: checked })
              }
            />
            <PreferenceToggle
              icon={<Shield className="w-5 h-5" />}
              label="Perfil Privado"
              description="Apenas você pode ver suas atividades"
              checked={preferences.privateProfile}
              onChange={(checked) =>
                setPreferences({ ...preferences, privateProfile: checked })
              }
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleSave}
            className="flex-1 py-3 gradient-venus text-white rounded-xl font-semibold hover:opacity-90 transition-all"
          >
            Salvar Alterações
          </button>
          <button className="px-6 py-3 bg-muted hover:bg-muted/80 rounded-xl font-semibold transition-all">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

function ProgressStat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold gradient-accent-text mb-2">
        {value}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function PreferenceToggle({
  icon,
  label,
  description,
  checked,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl">
      <div className="w-10 h-10 rounded-lg gradient-venus flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="font-semibold mb-1">{label}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-6 rounded-full transition-all ${
          checked ? "bg-primary" : "bg-muted-foreground/30"
        }`}
      >
        <div
          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
            checked ? "left-7" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}
